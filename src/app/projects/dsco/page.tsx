import { Nav } from '@/components/Nav';
import {
  CaseStudyHero,
  Chapter,
  CardStack,
  FigureStack,
  NextCaseStudy,
} from '@/components/CaseStudy';
import styles from '@/components/CaseStudy/CaseStudy.module.css';

export default function DSCOCaseStudy() {
  return (
    <main className="container">
      <Nav />

      <CaseStudyHero
        title="The design system supporting 100M+ students and teachers"
        hook="Transforming 8 years of tech debt into a scalable foundation for Code.org's learning platform, AI tools, and marketing ecosystem."
        meta={{
          role: 'Senior Product Designer',
          timeline: '2023–Present',
          scope: 'Core platform, AI tools, marketing sites',
        }}
      />

      <div className={styles.heroSeparator} />

      {/* Context */}
      <Chapter title="Context" className={styles.firstSection}>
        <div className={styles.prose}>
          <p>
            Eight years of rapid growth had produced wildly inconsistent code, no 
            design-to-production parity, and accessibility gaps across a platform 
            serving millions. Designers couldn't design consistently, and a 
            backend-heavy engineering team struggled to ship experiences that 
            matched specs.
          </p>
          <p>
            A functioning design system wasn't a nice-to-have—it was infrastructure 
            for learning tools, teacher dashboards, and marketing sites across 
            multiple brands.
          </p>
        </div>
      </Chapter>

      {/* Approach */}
      <CardStack
        title="Approach"
        cards={[
          {
            title: 'Audit first, then evangelize',
            body: 'I started by cataloging existing usages and mapping future needs. Only after understanding the landscape did I shift to evangelism and building support structures to drive adoption.',
          },
          {
            title: 'A simpler variable architecture',
            body: 'We built a semantic layer over primitives in three categories: surfaces, text, and borders. More flexible than component-driven systems, it enables brand-tailored experiences from one foundation.',
          },
          {
            title: 'Making contribution easy',
            body: 'Adoption required more than documentation. I empowered designers to use components correctly, helped engineers implement with parity, and opened the system to contributions from the wider team.',
          },
          {
            title: 'The MUI pivot',
            body: 'When our ground-up approach hit limits, we refactored onto MUI\'s unstyled components. We de-risked by testing in a secondary brand first, now progressively migrating the core platform.',
          },
        ]}
      />

      {/* Impact */}
      <Chapter title="Impact">
        <div className={styles.prose}>
          <p>
            Component usage grew from roughly 50–100 instances to thousands, and the
            system is now used by 40+ engineers across the organization.
          </p>
        </div>
      </Chapter>

      {/* Work */}
      <FigureStack
        title="Work"
        figures={[
          { caption: 'The DSCO component library—built for consistency, designed for flexibility.' },
          { caption: 'A semantic variable layer over primitives, organized into three categories.' },
          { caption: 'From ad-hoc patterns to systematic consistency.' },
          { caption: 'Components in production—powering the teacher dashboard.' },
        ]}
      />

      {/* Learnings */}
      <Chapter title="Learnings">
        <div className={styles.prose}>
          <ul>
            <li>Buy-in comes from demonstration, not enforcement.</li>
            <li>Robustness doesn't require complexity.</li>
            <li>Accessibility isn't a feature—it's a foundation.</li>
          </ul>
        </div>
      </Chapter>

      <div className={styles.separator} />

      <NextCaseStudy
        title="Web Lab 2"
        description="An AI-powered IDE for the next generation of coders."
        href="/projects/web-lab-2"
      />

      <div className={styles.pageBottom} />
    </main>
  );
}
