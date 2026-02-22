import type { Metadata } from 'next';

import { Nav } from '@/components/Nav';
import {
  CaseStudyCover,
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
  title: 'Web Lab',
  description: 'An AI-powered IDE for the next generation of coders.',
  alternates: {
    canonical: '/projects/web-lab',
  },
  openGraph: {
    title: 'Web Lab',
    description: 'An AI-powered IDE for the next generation of coders.',
    url: '/projects/web-lab',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Web Lab',
    description: 'An AI-powered IDE for the next generation of coders.',
  },
};

export default function WebLab2CaseStudy() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Web Lab',
    url: 'https://moshebari.com/projects/web-lab',
    description: 'An AI-powered IDE for the next generation of coders.',
    creator: {
      '@type': 'Person',
      name: 'Moshe Bari',
    },
    about: ['AI education', 'product design', 'developer tools'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DetailLevelProvider>
        <main className="container">
        <Nav />

        <CaseStudyCover label="Web Lab 2 cover image" />

        <CaseStudyHero
          title="An AI-assisted web IDE built for safe, student-first learning"
          hook="A modern HTML/CSS/JS builder for Code.org's flagship AI Foundations pilot—pairing a scoped tutor with guardrails that help students learn with AI without being replaced by it."
          meta={{
            role: 'Senior Product Designer (Lead Designer)',
            timeline: '2025–Present',
            scope: 'Prototyping, user testing, product design, cross-functional collaboration',
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
                  Web Lab 1 was a dated HTML/CSS/JS environment unlikely to support
                  AI-aligned learning goals. Code.org&apos;s pivot to CS + AI education
                  demanded a new tool built on the Lab2 framework.
                </p>
              }
              standard={
                <>
                  <p>
                    Web Lab 1 was a dated, external-tool-dependent HTML/CSS/JS environment on
                    legacy foundations—unlikely to support AI-aligned learning goals or the new
                    Lab2 framework powering future labs like Music Lab and Python Lab.
                  </p>
                  <p>
                    Code.org&apos;s pivot toward CS + AI education made safe, effective AI usage a
                    core requirement for both curriculum and tools—work visible at the federal
                    conversation level around AI education policy.
                  </p>
                </>
              }
              detailed={
                <>
                  <p>
                    Web Lab 1 was a dated, external-tool-dependent HTML/CSS/JS environment on
                    legacy foundations—unlikely to support AI-aligned learning goals or the new
                    Lab2 framework powering future labs like Music Lab and Python Lab.
                  </p>
                  <p>
                    Code.org&apos;s pivot toward CS + AI education made safe, effective AI usage a
                    core requirement for both curriculum and tools—work visible at the federal
                    conversation level around AI education policy. The flagship AI Foundations
                    curriculum was central to this shift, even being highlighted at the White
                    House AI Education Task Force panel.
                  </p>
                  <p>
                    The new lab also needed to sit on a refined Lab2 design system (built on
                    DSCO) that could support multiple future labs. Part of the early work was
                    finalizing this scalable, flexible foundation alongside the product itself.
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
                  title: 'Prototype like it\u2019s production',
                  body: 'Built an interactive template wired to the design system for immersive testing with zero engineering lift.',
                },
                {
                  title: 'Curriculum-aligned AI, not a generic chatbot',
                  body: 'AI capabilities scoped per level based on learning objectives, guiding understanding over execution.',
                },
                {
                  title: 'Guardrails that build judgment',
                  body: 'Students review and commit AI-generated code with descriptions, reinforcing ownership and comprehension.',
                },
                {
                  title: 'Pilot-driven iteration',
                  body: 'Live observation and A/B-style experiments tuned the balance between independence and AI support.',
                },
              ]}
            />
          }
          standard={
            <CardStack
              title="Approach"
              cards={[
                {
                  title: 'Prototype like it\u2019s production',
                  body: 'I built an interactive Web Lab 2 template wired to our design system\u2014designing in code, validating flows without engineering lift, and giving engineers a richer reference than static handoff.',
                },
                {
                  title: 'Curriculum-aligned AI, not a generic chatbot',
                  body: 'AI capabilities are scoped per level based on learning objectives. The tutor guides students toward understanding\u2014nudging in-context help and co-creation\u2014rather than doing what they ask.',
                },
                {
                  title: 'Guardrails that build judgment',
                  body: 'When AI generates code, students review and commit it with a description\u2014reinforcing ownership. Versioning blends autosaves, user commits, and AI-assisted changes in a student-friendly model.',
                },
                {
                  title: 'Pilot-driven iteration',
                  body: 'Live observation and async feedback from pilots drove rapid iteration and lightweight A/B-style experiments to tune the balance between independent work and AI support.',
                },
              ]}
            />
          }
          detailed={
            <CardStack
              title="Approach"
              cards={[
                {
                  title: 'Prototype like it\u2019s production',
                  body: 'I built a reusable, interactive Web Lab 2 template wired to our design system so I could design in code and spin up realistic test environments quickly. This allowed me to validate complex flows without engineering lift, test with students in a much more immersive way than static Figma prototypes, and give engineers an interactive reference that was more meaningful than static handoff files.',
                },
                {
                  title: 'Curriculum-aligned AI, not a generic chatbot',
                  body: 'AI capabilities are intentionally scoped and change based on a lesson\u2019s learning objective. The tutor acts as a guide rather than an executor\u2014encouraging students to call on it for in-context help and co-creation. It also integrates features like a sketching environment and a shared \u201Cbackpack\u201D system where students can pass artifacts to the tutor.',
                },
                {
                  title: 'Guardrails that build judgment',
                  body: 'When AI generates code, students must review it and actively commit it with a description\u2014reinforcing ownership and comprehension. The lab also introduces a student-friendly versioning experience that blends AI commits, autosaves, and user commits. Lightweight panels help break down the lifecycle of API requests for debugging.',
                },
                {
                  title: 'Pilot-driven iteration',
                  body: 'Pilots allowed us to analyze and observe patterns in student behavior, rapidly iterate, and run lightweight A/B-style experiments to determine the best solutions. The lab encourages independent work with AI as a co-creator, and flexibly supports curriculum so levels can be more or less flexible based on the given objectives.',
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
                  Piloted with ~1,500 students across 8 states for Code.org&apos;s
                  flagship AI Foundations curriculum.
                </p>
              }
              standard={
                <p>
                  Piloted with ~1,500 students across 8 states, supporting Code.org&apos;s
                  flagship AI Foundations curriculum as the organization scales CS + AI education.
                </p>
              }
              detailed={
                <>
                  <p>
                    Piloted with ~1,500 students across 8 states, supporting Code.org&apos;s
                    flagship AI Foundations curriculum as the organization scales CS + AI
                    education. The tool exists for standalone usage and will be used in other
                    curricula, including the advanced course that CS50 (Harvard) is writing for
                    AI Foundations.
                  </p>
                  <p>
                    AIF aims to be the leading high school CS/AI curriculum and the foundation
                    of a CTE pathway and credentialing program. The new unit and tool are still
                    in pilot with broader metrics emerging as adoption scales.
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
            { caption: 'Web Lab 2 interface with Tutor open\u2014AI help in-context while building HTML/CSS/JS.' },
            { caption: 'Debug panel\u2014breaking down request lifecycles to make debugging teachable.' },
            { caption: 'Lab2 framework + DSCO-aligned foundation enabling reuse across future labs.' },
            { caption: 'Sketching + backpack flow\u2014students pass artifacts to the tutor for support.' },
          ]}
        />

        {/* Learnings */}
        <Chapter title="Learnings">
          <div className={styles.prose}>
            <ul>
              <DetailContent
                brief={
                  <>
                    <li>Design for hesitation, not hype.</li>
                    <li>Guardrails can be a learning mechanic.</li>
                    <li>Accessible patterns make complex tooling usable.</li>
                  </>
                }
                standard={
                  <>
                    <li>
                      Design for hesitation, not hype—human microcopy helps students treat AI as
                      one tool in their toolbox.
                    </li>
                    <li>
                      Guardrails can be a learning mechanic—review-and-commit turns AI output into
                      practice for judgment.
                    </li>
                    <li>
                      Accessible patterns and stepwise walkthroughs are what make complex tooling
                      usable for students.
                    </li>
                  </>
                }
                detailed={
                  <>
                    <li>
                      Design for hesitation, not hype—students can feel weird using AI, so we
                      carefully balanced instructions that felt human, an AI that supported without
                      doing everything, and framed it as a tool in their toolbox rather than
                      something magical.
                    </li>
                    <li>
                      Guardrails can be a learning mechanic—requiring review and commit descriptions
                      turns AI output into an opportunity to practice judgment and build mental
                      models, not just a speed boost.
                    </li>
                    <li>
                      Accessible patterns and stepwise walkthroughs are what make complex tooling
                      usable for students—interactive walkthroughs, helpful microcopy, and
                      considerate use of space turned complex flows into approachable tools.
                    </li>
                  </>
                }
              />
            </ul>
          </div>
        </Chapter>

        <div className={styles.separator} />

        <NextCaseStudy
          title="Code.org"
          description="Reimagining the marketing site with a modular page builder."
          href="/projects/code-org"
        />

        <div className={styles.pageBottom} />
        </main>
      </DetailLevelProvider>
    </>
  );
}
