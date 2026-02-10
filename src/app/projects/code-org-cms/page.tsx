'use client';

import { Nav } from '@/components/Nav';
import {
  CaseStudyHero,
  Chapter,
  CardStack,
  FigureStack,
  NextCaseStudy,
  StatRow,
  DetailLevelProvider,
  DetailToggle,
  DetailContent,
} from '@/components/CaseStudy';
import styles from '@/components/CaseStudy/CaseStudy.module.css';

export default function CodeOrgCaseStudy() {
  return (
    <DetailLevelProvider>
      <main className="container">
        <Nav />

        <CaseStudyHero
          title="Replacing a decade of engineering bottlenecks with a self-serve marketing platform"
          hook="We moved Code.org off a proprietary, engineer-only CMS onto a governed page builder—consolidating ~800 legacy pages and shifting content ownership to the teams who needed it."
          meta={{
            role: 'Senior Product Designer (Lead Designer)',
            timeline: 'TBD',
            scope: 'Content infrastructure, page builder UX, design system integration, site migration',
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
                  Code.org&apos;s marketing site ran on a proprietary CMS built in HAML.
                  Only a handful of engineers could update pages, and the site had
                  ballooned to ~800 pages because even deprecation required engineering work.
                </p>
              }
              standard={
                <>
                  <p>
                    Code.org&apos;s marketing site ran on &quot;Pegasus,&quot; a proprietary CMS
                    built in HAML. Only a handful of engineers could update pages, changes deployed
                    on the product release schedule, and the site had ballooned to ~800 pages
                    because even deprecation required engineering work.
                  </p>
                  <p>
                    The replacement couldn&apos;t be simple: it needed to serve countries with
                    restricted internet access, support translation management, handle massive
                    traffic surges, and pass extensive security and privacy reviews—all while
                    giving teams with different access levels the autonomy to publish.
                  </p>
                </>
              }
              detailed={
                <>
                  <p>
                    Code.org&apos;s marketing site ran on &quot;Pegasus,&quot; a proprietary CMS
                    built in HAML that pulled dynamic data from spreadsheets and Dropbox. Only a
                    handful of engineers could create or update pages, and changes could only
                    deploy on the product release schedule—meaning even urgent fixes took at least
                    a day. SEO was in desperate need of attention, and the site had ballooned to
                    nearly 800 pages because even deprecation required engineering work.
                  </p>
                  <p>
                    As the marketing team grew, the friction became untenable—every content
                    update turned into a negotiation for scarce engineering resources, and
                    tensions between teams increased. But the replacement couldn&apos;t be
                    simple: it needed to serve countries with restricted internet access, support
                    translation management systems, handle massive traffic surges, pass extensive
                    security and privacy reviews, and maintain governance across teams with very
                    different levels of access and SLA requirements.
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
                  title: 'Constrain the editor, not the output',
                  body: 'Stripped out spacing, layout, and color guesswork so non-designers could build pages without second-guessing design choices.',
                },
                {
                  title: 'Shaping Contentful Studio as a first enterprise client',
                  body: 'Built a React component library with content bindings, composed into drag-and-drop section patterns.',
                },
                {
                  title: 'A content model built to outlast the marketing site',
                  body: 'Single source of truth for shared content, scoped to scale beyond marketing into the product experience.',
                },
                {
                  title: 'Migration as a product: audit, reduce, de-risk',
                  body: 'Rebuilt the IA from ~800 pages to fewer than 140, with incremental rollout and automated routing between systems.',
                },
              ]}
            />
          }
          standard={
            <CardStack
              title="Approach"
              cards={[
                {
                  title: 'Constrain the editor, not the output',
                  body: 'After testing tools like Webflow and Leadpages, we saw non-designers overwhelmed by open-ended editors. We stripped out spacing, layout, and color guesswork\u2014variable-based tokens auto-switched every element in a section when editors changed its background.',
                },
                {
                  title: 'Shaping Contentful Studio as a first enterprise client',
                  body: 'We worked directly with Contentful\u2019s PM to push their new Studio page builder to its limits. We built a React component library with content bindings and composed them into drag-and-drop section patterns for our most-used layouts.',
                },
                {
                  title: 'A content model built to outlast the marketing site',
                  body: 'Shared content updates from a single source of truth, reducing the need to republish. The model was scoped to scale beyond marketing into the product experience, with draft previews, scheduled publishing, and multi-page releases built on top.',
                },
                {
                  title: 'Migration as a product: audit, reduce, de-risk',
                  body: 'We rebuilt the IA\u2014cutting ~800 pages to fewer than 140\u2014split DSCO into independent packages so the CMS could deploy without coupling to the product, used automated routing between old and new systems, and re-illustrated 250+ outdated visuals.',
                },
              ]}
            />
          }
          detailed={
            <CardStack
              title="Approach"
              cards={[
                {
                  title: 'Constrain the editor, not the output',
                  body: 'After extensive testing with tools like Webflow and Leadpages, we watched non-designers consistently overwhelmed by open-ended editors\u2014no matter how good the templates were. We built a modular system that stripped out spacing, layout, and color guesswork. Variable-based color tokens automatically switched every element in a section when an editor changed its background, so pages stayed on-brand without manual overrides. Marketing still got controlled flexibility for custom needs.',
                },
                {
                  title: 'Shaping Contentful Studio as a first enterprise client',
                  body: 'We adopted Contentful as the content source of truth and were one of the first enterprise clients of their new \u201CStudio\u201D page builder\u2014working directly with their PM via a private Slack channel to push the tool to its limits, share feedback regularly, and help shape improvements. We built a full React component library (atomic to organism-level) with complex content bindings, and composed them into an extensive pattern library of drag-and-drop sections representing our most-used page layouts.',
                },
                {
                  title: 'A content model built to outlast the marketing site',
                  body: 'We designed a lightweight but flexible content model where shared content updated everywhere from a single source of truth\u2014reducing the need to republish pages for routine changes. The model was intentionally scoped to serve the product experience as well, not just marketing. Draft/preview modes let teams share internal links, scheduled publishing handled timed launches, and coordinated \u201Creleases\u201D published sets of changes across pages at designated launch times.',
                },
                {
                  title: 'Migration as a product: audit, reduce, de-risk',
                  body: 'Before building, we audited the entire site and rebuilt the information architecture\u2014cutting ~800 pages to fewer than 140 through extensive IA thinking and content rework. We split DSCO into independent packages so the CMS could deploy without coupling to the core product, built an automated routing system to safely split traffic between Pegasus and Contentful, rolled out incrementally starting with low-traffic pages, and hand re-illustrated 250+ massively outdated visuals to modernize the experience.',
                },
              ]}
            />
          }
        />

        {/* Impact */}
        <Chapter title="Impact">
          <div className={styles.prose}>
            <StatRow
              stats={[
                { value: 'Days \u2192 minutes', label: 'Time to ship' },
                { value: '~800 \u2192 <140', label: 'Page consolidation' },
                { value: 'Triple-digit %', label: 'SEO improvement' },
              ]}
            />
            <DetailContent
              brief={
                <p>
                  Engineering load dropped to maintenance-only. Dozens of editors now
                  publish independently, and the CMS powered Hour of AI and a new
                  subbrand launch in under a month.
                </p>
              }
              standard={
                <p>
                  Engineering load dropped to maintenance-only. Dozens of editors across
                  marketing, outreach, advocacy, and curriculum now publish independently. The
                  rebuild delivered fully accessible pages, strong Lighthouse scores, and became
                  the foundation for high-stakes launches—including spinning up an acquired
                  subbrand&apos;s site in under a month and powering Hour of AI.
                </p>
              }
              detailed={
                <>
                  <p>
                    Engineering load dropped to near maintenance-only work, with new components
                    deployable automatically via the component library&apos;s independent deploy
                    pipeline. Dozens of editors across marketing, outreach, advocacy, and
                    curriculum now publish independently—managing hundreds of pages and tens of
                    thousands of content pieces serving millions of monthly visitors.
                  </p>
                  <p>
                    The rebuild delivered fully accessible pages, a comprehensive SEO overhaul
                    with triple-digit performance increases, strong Lighthouse scores, and
                    automatic image optimization (sub-50kb AVIF conversion). It became the
                    foundation for high-stakes launches: the CMS powered Hour of AI (tens of
                    millions of users, billions of impressions), scaled the design system into a
                    new subbrand when we acquired CSforAll, and spun up a complete marketing site
                    in under a month—with marketing fully empowered to produce and launch all
                    pages independently for the first time in a decade.
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
            { caption: 'The governed page builder: layers, canvas, and a properties panel with content bindings.' },
            { caption: 'DSCO-aligned component library composed into drag-and-drop section patterns.' },
            { caption: 'Draft previews, scheduled publishing, and multi-page releases for coordinated launches.' },
            { caption: 'Before and after: ~800 legacy pages consolidated into a modern, cohesive site.' },
          ]}
        />

        {/* Learnings */}
        <Chapter title="Learnings">
          <div className={styles.prose}>
            <ul>
              <DetailContent
                brief={
                  <>
                    <li>Templates don&apos;t survive flexible editors.</li>
                    <li>Onboarding is part of the product.</li>
                    <li>Smart defaults beat manual overrides.</li>
                  </>
                }
                standard={
                  <>
                    <li>
                      Templates don&apos;t survive flexible editors—the only reliable way to
                      protect brand consistency is to remove the decisions editors shouldn&apos;t
                      have to make.
                    </li>
                    <li>
                      Onboarding is part of the product—a powerful content model means nothing if
                      editors can&apos;t navigate it.
                    </li>
                    <li>
                      Smart defaults beat manual overrides—color tokens that auto-switch per
                      section kept pages on-brand without manual work.
                    </li>
                  </>
                }
                detailed={
                  <>
                    <li>
                      Templates don&apos;t survive flexible editors—watching non-designers
                      struggle with Leadpages and Webflow confirmed that no matter how good a
                      template is, the lack of brand constraints and editor flexibility
                      overwhelms users. Removing decisions is more effective than adding
                      guardrails.
                    </li>
                    <li>
                      Onboarding is part of the product—we knew the content model would be
                      challenging for most editors to grasp, so we bet on a robust onboarding
                      process to make sure everyone came in empowered. That investment paid off
                      directly in adoption.
                    </li>
                    <li>
                      Smart defaults beat manual overrides—variable-based color tokens that
                      auto-switch per section meant editors could change a background without
                      breaking every element inside it, keeping the system self-correcting rather
                      than dependent on manual attention.
                    </li>
                  </>
                }
              />
            </ul>
          </div>
        </Chapter>

        <div className={styles.separator} />

        <NextCaseStudy
          title="DSCO"
          description="The design system supporting 100M+ students and teachers."
          href="/projects/dsco"
        />

        <div className={styles.pageBottom} />
      </main>
    </DetailLevelProvider>
  );
}
