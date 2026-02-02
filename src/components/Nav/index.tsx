'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BloomMenu, BloomMenuItem } from '../BloomMenu';
import { XIcon, GitHubIcon, LinkedInIcon } from '../icons';
import styles from './Nav.module.css';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo} aria-label="Home">
        <Image
          src="/images/personal/mb-white.svg"
          alt=""
          width={24}
          height={24}
          className={styles.logoIcon}
          priority
        />
      </Link>

      <div className={styles.right}>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </div>

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
