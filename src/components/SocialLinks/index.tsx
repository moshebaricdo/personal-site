import { XIcon } from '../icons/XIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import styles from './SocialLinks.module.css';

const socialLinks = [
  {
    href: 'https://x.com/moshebari',
    label: 'X (Twitter)',
    icon: XIcon,
  },
  {
    href: 'https://github.com/moshebari',
    label: 'GitHub',
    icon: GitHubIcon,
  },
  {
    href: 'https://linkedin.com/in/moshebari',
    label: 'LinkedIn',
    icon: LinkedInIcon,
  },
];

export function SocialLinks() {
  return (
    <nav className={styles.nav} aria-label="Social links">
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={link.label}
        >
          <link.icon aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
