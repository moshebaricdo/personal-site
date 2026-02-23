import type { Metadata } from 'next';

import {
  CaseStudyTop,
  CaseStudyHero,
  Chapter,
  CardStack,
  FigureStack,
  NextCaseStudy,
  DetailLevelProvider,
  DetailToggle,
  DetailContent,
} from '@/components/CaseStudy';
import styles from '@/components/CaseStudy/CaseStudy.module.css';

export const metadata: Metadata = {
  title: 'DSCO',
  description: 'The design system supporting 100M+ students and teachers.',
  alternates: {
    canonical: '/projects/dsco',
  },
  openGraph: {
    title: 'DSCO',
    description: 'The design system supporting 100M+ students and teachers.',
    url: '/projects/dsco',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'DSCO',
    description: 'The design system supporting 100M+ students and teachers.',
  },
};

export default function DSCOCaseStudy() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'DSCO',
    url: 'https://moshebari.com/projects/dsco',
    description: 'The design system supporting 100M+ students and teachers.',
    creator: {
      '@type': 'Person',
      name: 'Moshe Bari',
    },
    about: ['design systems', 'education technology', 'product design'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DetailLevelProvider>
        <main className="container">
        <CaseStudyTop />

        <CaseStudyHero
          title="The design system supporting 100M+ students and teachers"
          hook="Transforming 8 years of tech debt into a scalable foundation for Code.org's learning platform, AI tools, and marketing ecosystem."
          meta={{
            role: 'Senior Product Designer',
            timeline: '2023–Present',
            scope: 'Core platform, AI tools, marketing sites',
          }}
        />

        <div className={styles.heroSeparator}>
          <div className={styles.heroSeparatorRule} />
          <DetailToggle />
          <div className={styles.heroSeparatorRule} />
        </div>

        {/* Context */}
        <Chapter title="Context" className={styles.firstSection}>
          <div className={styles.prose}>
            <DetailContent
              brief={
                <p>
                  Eight years of rapid growth left Code.org with inconsistent code,
                  no design-to-production parity, and accessibility gaps across a
                  platform serving millions.
                </p>
              }
              standard={
                <>
                  <p>
                    Eight years of rapid growth had produced wildly inconsistent code, no
                    design-to-production parity, and accessibility gaps across a platform
                    serving millions. Designers couldn&apos;t design consistently, and a
                    backend-heavy engineering team struggled to ship experiences that
                    matched specs.
                  </p>
                  <p>
                    A functioning design system wasn&apos;t a nice-to-have—it was infrastructure
                    for learning tools, teacher dashboards, and marketing sites across
                    multiple brands.
                  </p>
                </>
              }
              detailed={
                <>
                  <p>
                    Eight years of rapid growth had produced wildly inconsistent code, no
                    design-to-production parity, and accessibility gaps across a platform
                    serving millions. Designers couldn&apos;t design consistently, and a
                    backend-heavy engineering team struggled to ship experiences that
                    matched specs.
                  </p>
                  <p>
                    A functioning design system wasn&apos;t a nice-to-have—it was infrastructure
                    for learning tools, teacher dashboards, and marketing sites across
                    multiple brands.
                  </p>
                  <p>
                    The challenge was compounded by multiple brand contexts—the core learning
                    platform, teacher-facing dashboards, and a growing ecosystem of marketing
                    sites that all needed to feel cohesive while serving very different users
                    and use cases.
                  </p>
                </>
              }
            />
          </div>
        </Chapter>

        {/* Approach */}
        <DetailContent
          brief={
            <CardStack
              title="Approach"
              cards={[
                {
                  title: 'Audit first, then evangelize',
                  body: 'Cataloged existing usages and mapped future needs before shifting to evangelism and adoption support.',
                },
                {
                  title: 'A simpler variable architecture',
                  body: 'Built a semantic layer over primitives in three categories: surfaces, text, and borders.',
                },
                {
                  title: 'Making contribution easy',
                  body: 'Empowered designers and engineers to contribute directly, not just consume documentation.',
                },
                {
                  title: 'The MUI pivot',
                  body: 'Refactored onto MUI\u2019s unstyled components, de-risking by testing in a secondary brand first.',
                },
              ]}
            />
          }
          standard={
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
                  body: 'When our ground-up approach hit limits, we refactored onto MUI\u2019s unstyled components. We de-risked by testing in a secondary brand first, now progressively migrating the core platform.',
                },
              ]}
            />
          }
          detailed={
            <CardStack
              title="Approach"
              cards={[
                {
                  title: 'Audit first, then evangelize',
                  body: 'I started by cataloging every existing component usage and mapping future needs across the platform, teacher dashboards, and marketing sites. Only after understanding the full landscape—and where the biggest inconsistencies lived—did I shift to evangelism and building support structures to drive adoption across a backend-heavy engineering team.',
                },
                {
                  title: 'A simpler variable architecture',
                  body: 'We built a semantic layer over primitives in three categories: surfaces, text, and borders. This was intentionally simpler than rigid component-driven systems, enabling brand-tailored experiences from one foundation. The architecture meant new brands could plug in without rebuilding components—just remap the semantic tokens.',
                },
                {
                  title: 'Making contribution easy',
                  body: 'Adoption required more than documentation. I empowered designers to use components correctly, helped engineers implement with parity, and opened the system to contributions from the wider team. Regular pairing sessions and hands-on support were as important as the Figma library itself.',
                },
                {
                  title: 'The MUI pivot',
                  body: 'When our ground-up approach hit limits—especially around complex interactive components—we refactored onto MUI\u2019s unstyled components. We de-risked by testing the migration in a secondary brand first, validating the approach before progressively migrating the core platform.',
                },
              ]}
            />
          }
        />

        {/* Impact */}
        <Chapter title="Impact">
          <div className={styles.prose}>
            <DetailContent
              brief={
                <p>
                  Component usage grew from ~50–100 instances to thousands, now used
                  by 40+ engineers. It became the shared foundation for the learning
                  platform, AI tools, and marketing ecosystem.
                </p>
              }
              standard={
                <p>
                  Component usage grew from roughly 50–100 instances to thousands, and the
                  system is now used by 40+ engineers across the organization. It became the
                  shared foundation for the core learning platform, new AI tools like Web Lab 2,
                  and the CMS-powered marketing ecosystem—closing accessibility gaps and
                  establishing design-to-production parity for the first time.
                </p>
              }
              detailed={
                <>
                  <p>
                    Component usage grew from roughly 50–100 instances to thousands, and the
                    system is now used by 40+ engineers across the organization. It became the
                    shared foundation for the core learning platform, new AI tools like Web Lab 2,
                    and the CMS-powered marketing ecosystem—closing accessibility gaps and
                    establishing design-to-production parity for the first time.
                  </p>
                  <p>
                    The system also enabled the design team to scale: new designers could
                    onboard faster, engineers could implement with confidence, and the
                    consistent component language reduced review cycles across teams. When we
                    later split the system into independent packages for the CMS, that
                    architectural flexibility traced directly back to the semantic token model.
                  </p>
                </>
              }
            />
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
              <DetailContent
                brief={
                  <>
                    <li>Buy-in comes from demonstration, not enforcement.</li>
                    <li>Robustness doesn&apos;t require complexity.</li>
                    <li>Accessibility isn&apos;t a feature—it&apos;s a foundation.</li>
                  </>
                }
                standard={
                  <>
                    <li>
                      Buy-in comes from demonstration, not enforcement—showing working components
                      earned more adoption than any mandate.
                    </li>
                    <li>
                      Robustness doesn&apos;t require complexity—a three-category semantic layer
                      scaled further than a rigid component taxonomy.
                    </li>
                    <li>
                      Accessibility isn&apos;t a feature—it&apos;s a foundation that has to be baked
                      into the system from day one.
                    </li>
                  </>
                }
                detailed={
                  <>
                    <li>
                      Buy-in comes from demonstration, not enforcement—showing working components
                      earned more adoption than any mandate. The engineers who were most skeptical
                      became the strongest advocates once they saw the system reduce their
                      implementation time.
                    </li>
                    <li>
                      Robustness doesn&apos;t require complexity—a three-category semantic layer
                      (surfaces, text, borders) scaled further than a rigid component taxonomy.
                      Keeping the architecture simple made contribution and maintenance accessible
                      to a wider team.
                    </li>
                    <li>
                      Accessibility isn&apos;t a feature—it&apos;s a foundation that has to be baked
                      into the system from day one. Retrofitting accessible patterns into existing
                      components was far harder than building them in from the start.
                    </li>
                  </>
                }
              />
            </ul>
          </div>
        </Chapter>

        <div className={styles.separator} />

        <NextCaseStudy
          title="Web Lab"
          description="An AI-powered IDE for the next generation of coders."
          href="/projects/web-lab"
        />

        <div className={styles.pageBottom} />
        </main>
      </DetailLevelProvider>
    </>
  );
}
