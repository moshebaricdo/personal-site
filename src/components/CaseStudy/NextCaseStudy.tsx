import Link from 'next/link';
import caseStudyStyles from './CaseStudy.module.css';
import projectStyles from '../ProjectList/ProjectList.module.css';

interface NextCaseStudyProps {
  title: string;
  description: string;
  href: string;
}

export function NextCaseStudy({ title, description, href }: NextCaseStudyProps) {
  return (
    <nav className={`${caseStudyStyles.nextSection} ${caseStudyStyles.textLoadIn}`} aria-label="Next case study">
      <span className={caseStudyStyles.nextLabel}>Next</span>
      <Link href={href} className={projectStyles.link}>
        <span className={projectStyles.title}>{title}</span>
        <span className={projectStyles.meta}>
          <span className={projectStyles.description}>{description}</span>
          <span className={projectStyles.badges}>
            <span className={projectStyles.badge} title="Case Study">
              <TextIcon />
            </span>
            <span className={projectStyles.badge} title="Media">
              <ImageIcon />
            </span>
          </span>
        </span>
        <Arrow className={projectStyles.arrow} />
      </Link>
    </nav>
  );
}

function TextIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7V4h16v3" />
      <path d="M12 4v16" />
      <path d="M8 20h8" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
