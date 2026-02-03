import { Nav } from '@/components/Nav';
import {
  CaseStudyHero,
  Chapter,
  CardStack,
  FigureStack,
  NextCaseStudy,
} from '@/components/CaseStudy';
import styles from '@/components/CaseStudy/CaseStudy.module.css';

export default function WebLab2CaseStudy() {
  return (
    <main className="container">
      <Nav />

      <CaseStudyHero
        title="An AI-assisted web IDE built for safe, student-first learning"
        hook="Web Lab 2 is a modern HTML/CSS/JS app builder designed for Code.org’s flagship AI Foundations pilot—pairing a scoped, curriculum-aligned tutor with guardrails that help students learn with AI without being replaced by it."
        meta={{
          role: 'Senior Product Designer (Lead Designer)',
          timeline: '2025–Present',
          scope: 'Prototyping, user testing, product design, cross-functional collaboration',
        }}
      />

      <div className={styles.heroSeparator} />

      {/* Context */}
      <Chapter title="Context" className={styles.firstSection}>
        <div className={styles.prose}>
          <p>
            Web Lab 1 was a dated, external-tool-dependent HTML/CSS/JS environment built on legacy
            foundations—unlikely to support the next generation of AI-aligned learning goals.
          </p>
          <p>
            In parallel, Code.org’s platform pivoted toward CS + AI education, making safe and
            effective AI usage a core requirement for both curriculum and tools—including work
            visible at the federal conversation level around AI education policy.
          </p>
          <p>
            Web Lab 2 also needed to sit on the new Lab2 framework and a scalable, DSCO-aligned
            foundation that could power multiple future labs (Music Lab, Python Lab, and beyond).
          </p>
        </div>
      </Chapter>

      {/* Approach */}
      <CardStack
        title="Approach"
        cards={[
          {
            title: 'Prototype like it’s production',
            body: 'I built a reusable, interactive Web Lab 2 template wired to our design system so I could design in code, spin up realistic test environments quickly, and validate complex flows without engineering lift—while also giving engineers a richer reference than static handoff.',
          },
          {
            title: 'Curriculum-aligned AI, not a generic chatbot',
            body: 'AI capabilities are intentionally scoped and can change per level based on the learning objective. The tutor is designed to guide students toward understanding—nudging in-context help and co-creation—rather than simply doing what they ask.',
          },
          {
            title: 'Guardrails that build judgment',
            body: 'When AI generates code, students must review it and actively commit it with a description—reinforcing ownership and comprehension. Versioning blends autosaves, user commits, and AI-assisted changes in a student-friendly way.',
          },
          {
            title: 'Pilot-driven iteration',
            body: 'Using live observation and async feedback from pilots, we iterated quickly and ran lightweight A/B-style experiments to understand behaviors, reduce confusion, and tune the balance between independent work and AI support.',
          },
        ]}
      />

      {/* Impact */}
      <Chapter title="Impact">
        <div className={styles.prose}>
          <p>
            Piloted with ~1,500 students across 8 states, supporting Code.org’s flagship AI
            Foundations curriculum as the organization scales CS + AI education.
          </p>
        </div>
      </Chapter>

      {/* Work */}
      <FigureStack
        title="Work"
        figures={[
          { caption: 'Web Lab 2 interface with Tutor open—AI help in-context while building HTML/CSS/JS.' },
          { caption: 'Debug panel view—breaking down request lifecycles to make debugging teachable.' },
          { caption: 'Lab2 framework + DSCO-aligned foundation enabling reuse across future labs.' },
          { caption: 'Sketching + “backpack” flow—students can pass artifacts to the tutor for support.' },
        ]}
      />

      {/* Learnings */}
      <Chapter title="Learnings">
        <div className={styles.prose}>
          <ul>
            <li>
              Design for hesitation, not hype—human microcopy and clear expectations help students
              treat AI as one tool in their toolbox.
            </li>
            <li>
              Guardrails can be a learning mechanic—review-and-commit turns AI output into a moment
              to practice judgment and build understanding.
            </li>
            <li>
              Accessibility is part of “student-first”—when AI and complex tooling are involved,
              accessible patterns and stepwise walkthroughs make the experience usable.
            </li>
          </ul>
        </div>
      </Chapter>

      <div className={styles.separator} />

      <NextCaseStudy
        title="Code.org CMS"
        description="Reimagining the marketing site with a modular page builder."
        href="/projects/code-org-cms"
      />

      <div className={styles.pageBottom} />
    </main>
  );
}

