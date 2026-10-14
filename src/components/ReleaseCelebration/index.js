import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import styles from './styles.module.css';
import motion from './motion.module.css';
import confetti from './confetti.json';

// Mounted only after hydration, so measurement never runs during SSR.
function ConfettiOverlay() {
  const overlay = useRef(null);
  useLayoutEffect(() => {
    const element = overlay.current;
    const resize = () => element.style.setProperty('--scale', element.clientWidth / confetti.width);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={overlay} className={styles.confetti} data-release-confetti aria-hidden="true">
      <div className={styles.stage} style={{width: confetti.width, height: confetti.height}}>
        {confetti.particles.map((particle) => (
          <i key={particle.id}
            className={`${styles.particle} ${motion[`p${particle.id.replace(':', '_')}`]} ${particle.color === 'rgb(20,20,20)' ? styles.ink : ''}`}
            style={{left: particle.x, top: particle.y, width: particle.w, height: particle.h,
              '--paper-color': particle.color, borderRadius: particle.shape === 'ellipse' ? '50%' : 0}} />
        ))}
      </div>
    </div>
  );
}

export default function ReleaseCelebration({children}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let started = false;
    let timer;
    const stop = () => {
      window.clearTimeout(timer);
      setPlaying(false);
    };
    const sync = () => {
      if (preference.matches || document.hidden) {
        stop();
      } else if (!started) {
        started = true;
        setPlaying(true);
        timer = window.setTimeout(stop, confetti.durationMs);
      }
    };
    const onKeyDown = (event) => { if (event.key === 'Escape') stop(); };
    sync();
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className={styles.celebration} data-release-celebration data-playing={playing}>
      {playing && createPortal(<ConfettiOverlay />, document.body)}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
