import React from 'react';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {useSidebarBreadcrumbs, useDocsSidebar, isActiveSidebarItem, findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import DocArticleStructuredData from '../../components/DocArticleStructuredData';
import {chapterLocation, outlineCopy, docLinks, samePath} from '../../components/DocumentationNavigation/model';

export default function DocBreadcrumbs() {
  const {pathname} = useLocation();
  const original = useSidebarBreadcrumbs();
  const sidebar = useDocsSidebar();
  const docId = Object.entries(docLinks(sidebar?.items ?? [])).find(([, href]) => samePath(href, pathname))?.[0];
  if (!docId) return <><DocArticleStructuredData/><OriginalDocBreadcrumbs/></>;
  const metadata = {id: docId, permalink: pathname, title: original?.at(-1)?.label ?? docId};
  const section = sidebar?.items.find((item) => item.customProps?.section && isActiveSidebarItem(item, metadata.permalink));
  if (!section) return <><DocArticleStructuredData/><OriginalDocBreadcrumbs/></>;
  const id = section.customProps.section;
  const location = chapterLocation(id, metadata.id);
  const crumbs = [{label: section.label, href: findFirstSidebarItemLink(section)}];
  if (location) crumbs.push({label: outlineCopy(id, `group.${location.group.id}`, location.group.title)});
  if (location || metadata.title !== section.label) crumbs.push({label: metadata.title, href: metadata.permalink});
  return <>
    <DocArticleStructuredData/>
    <DocBreadcrumbsStructuredData breadcrumbs={crumbs.map((entry) => ({...entry, type: 'link'}))}/>
    <nav className="theme-doc-breadcrumbs docs-d-breadcrumbs" aria-label={translate({id: 'theme.docs.breadcrumbs.navAriaLabel', message: 'Breadcrumbs'})}>
      <ul className="breadcrumbs">{crumbs.map((entry, index) => <li key={index} className={`breadcrumbs__item${index === crumbs.length - 1 ? ' breadcrumbs__item--active' : ''}`}>
        {index < crumbs.length - 1 && entry.href ? <Link className="breadcrumbs__link" to={entry.href}>{entry.label}</Link>
          : <span className="breadcrumbs__link" aria-current={index === crumbs.length - 1 ? 'page' : undefined}>{entry.label}</span>}
      </li>)}</ul>
    </nav>
  </>;
}
