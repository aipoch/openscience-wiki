"""Validate the repository server block against a local Nginx and built Docs."""

import argparse
from pathlib import Path
import socket
import subprocess
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        return None


def main():
    repository = Path(__file__).resolve().parent.parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--nginx', required=True, help='Path to a local Nginx binary')
    parser.add_argument('--build', type=Path, default=repository / 'build')
    args = parser.parse_args()
    build = args.build.resolve()
    assert (build / 'zh-Hans/sitemap.xml').is_file(), 'Build both locales first'

    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        port = sock.getsockname()[1]

    with tempfile.TemporaryDirectory(prefix='docs-nginx-test-') as directory:
        root = Path(directory)
        (root / 'logs').mkdir()
        (root / 'html').mkdir()
        (root / 'html/docs').symlink_to(build, target_is_directory=True)
        server = (repository / 'nginx/default.conf').read_text()
        # Only change the listen address and file root for this isolated test.
        server = server.replace('listen 80;', f'listen 127.0.0.1:{port};')
        server = server.replace('    listen [::]:80;\n', '')
        server = server.replace('/usr/share/nginx/html;', f'"{root / "html"}";')
        config = root / 'nginx.conf'
        config.write_text(
            f'pid "{root / "nginx.pid"}";\n'
            f'error_log "{root / "logs/error.log"}";\n'
            'events {}\nhttp {\n'
            'types { text/html html; application/xml xml; }\n'
            + server + '\n}\n'
        )
        command = [args.nginx, '-p', str(root), '-c', str(config)]
        subprocess.run(command + ['-t'], check=True)
        process = subprocess.Popen(command + ['-g', 'daemon off;'])
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect)

        def request(path):
            req = urllib.request.Request(
                f'http://127.0.0.1:{port}{path}',
                headers={'Host': 'aipoch.com', 'X-Forwarded-Proto': 'https'},
            )
            try:
                response = opener.open(req, timeout=5)
            except urllib.error.HTTPError as error:
                response = error
            with response:
                return response.status, response.headers, response.read()

        try:
            for attempt in range(50):
                try:
                    assert request('/docs/')[0] == 200
                    break
                except urllib.error.URLError:
                    if process.poll() is not None or attempt == 49:
                        raise
                    time.sleep(0.1)

            for path in ['/docs/intro', '/docs/zh-Hans/intro']:
                status, headers, _ = request(path)
                assert status == 301, (path, status)
                assert headers['Location'] == path + '/', dict(headers)
                assert urllib.parse.urljoin('https://aipoch.com' + path, headers['Location']) == 'https://aipoch.com' + path + '/'
                assert request(headers['Location'])[0] == 200

            status, headers, body = request('/sitemap')
            assert status == 200 and headers.get_content_type() == 'application/xml'
            assert body == (build / 'sitemap-index.xml').read_bytes()
            namespace = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            index = ET.fromstring(body)
            children = [item.text for item in index.findall('s:sitemap/s:loc', namespace)]
            expected = ['https://aipoch.com/docs/sitemap.xml', 'https://aipoch.com/docs/zh-Hans/sitemap.xml']
            assert sorted(children) == sorted(expected)
            count = 0
            for child in children:
                status, _, xml = request(urllib.parse.urlparse(child).path)
                assert status == 200, child
                for location in ET.fromstring(xml).findall('s:url/s:loc', namespace):
                    url = urllib.parse.urlparse(location.text)
                    assert url.scheme == 'https' and url.netloc == 'aipoch.com'
                    assert url.path.endswith('/')
                    assert request(url.path)[0] == 200, location.text
                    count += 1
            assert request('/docs/__missing-seo-probe__/')[0] == 404
            print(f'PASS: relative redirects, multilingual sitemap endpoint, and {count} direct HTTP 200 pages')
        finally:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait()


if __name__ == '__main__':
    main()
