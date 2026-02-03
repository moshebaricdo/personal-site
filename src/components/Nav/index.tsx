'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BloomMenu, BloomMenuItem } from '../BloomMenu';
import { XIcon, GitHubIcon, LinkedInIcon } from '../icons';
import styles from './Nav.module.css';

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isCaseStudy = pathname?.startsWith('/projects/');

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Home"
          data-show-back={!isHome}
        >
          <Image
            src="/images/personal/mb-white.svg"
            alt=""
            width={24}
            height={24}
            className={styles.logoIcon}
            priority
          />
          <span className={styles.logoArrow} aria-hidden="true">
            <svg
              viewBox="0 0 640 640"
              width={24}
              height={24}
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M320 96C443.7 96 544 196.3 544 320C544 443.7 443.7 544 320 544C196.3 544 96 443.7 96 320C96 196.3 196.3 96 320 96zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM228.7 308.7C222.5 314.9 222.5 325.1 228.7 331.3L300.7 403.3C306.9 409.5 317.1 409.5 323.3 403.3C329.5 397.1 329.5 386.9 323.3 380.7L278.6 336L400 336C408.8 336 416 328.8 416 320C416 311.2 408.8 304 400 304L278.6 304L323.3 259.3C329.5 253.1 329.5 242.9 323.3 236.7C317.1 230.5 306.9 230.5 300.7 236.7L228.7 308.7z" />
            </svg>
          </span>
        </Link>

        {isCaseStudy && (
          <>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.tag}>Case study</span>
          </>
        )}
      </div>

      <div className={styles.right}>
        <BloomMenu>
          <BloomMenuItem
            icon={<XIcon />}
            onSelect={() => window.open('https://x.com/moshebari', '_blank')}
          >
            X / Twitter
          </BloomMenuItem>
          <BloomMenuItem
            icon={<GitHubIcon />}
            onSelect={() => window.open('https://github.com/moshebari', '_blank')}
          >
            GitHub
          </BloomMenuItem>
          <BloomMenuItem
            icon={<LinkedInIcon />}
            onSelect={() => window.open('https://linkedin.com/in/moshebari', '_blank')}
          >
            LinkedIn
          </BloomMenuItem>
        </BloomMenu>
      </div>
    </nav>
  );
}
