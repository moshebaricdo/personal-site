import Image from 'next/image';
import { XIcon, GitHubIcon, LinkedInIcon } from '../icons';
import styles from './Footer.module.css';

const socialLinks = [
  { href: 'https://x.com/moshebari', label: 'X', icon: XIcon },
  { href: 'https://github.com/moshebari', label: 'GitHub', icon: GitHubIcon },
  { href: 'https://linkedin.com/in/moshebari', label: 'LinkedIn', icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Image
          src="/images/personal/mb-white.svg"
          alt=""
          width={20}
          height={20}
          className={styles.logoIcon}
        />
        <p className={styles.blurb}>
          Designing products that feel inevitable.
        </p>
      </div>

      <nav className={styles.social} aria-label="Social links">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={link.label}
          >
            <link.icon aria-hidden="true" />
          </a>
        ))}
      </nav>
    </footer>
  );
}
