'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BloomMenu, BloomMenuItem } from '../BloomMenu';
import { XIcon, GitHubIcon, LinkedInIcon } from '../icons';
import { categories } from '../Archive/data';
import type { CategoryData } from '../Archive/data';
import { projects } from '@/data/projects';
import styles from './Nav.module.css';

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isCaseStudy = pathname?.startsWith('/projects/');
  const isArchive = pathname?.startsWith('/archive');
  
  // Detect active archive category from URL
  const archiveCategorySlug = pathname?.match(/^\/archive\/(\w+)/)?.[1];
  const activeCategory = categories.find(c => c.slug === archiveCategorySlug);

  // Detect active project from URL
  const projectSlug = pathname?.match(/^\/projects\/([^/]+)/)?.[1];
  const activeProject = projects.find(p => p.slug === projectSlug);

  return (
    <nav className={`${styles.nav} text-load-in`}>
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
            <div className={styles.archiveTags}>
              <span className={styles.tag}>Case study</span>
              {activeProject && (
                <ProjectSwitcher
                  activeProject={activeProject}
                  onSelect={(slug) => router.push(`/projects/${slug}`)}
                />
              )}
            </div>
          </>
        )}

        {isArchive && (
          <>
            <span className={styles.divider} aria-hidden="true" />
            {activeCategory ? (
              <div className={styles.archiveTags}>
                <Link href="/archive" className={styles.tagLink}>Archive</Link>
                <CategorySwitcher
                  activeCategory={activeCategory}
                  onSelect={(slug) => router.push(`/archive/${slug}`)}
                />
              </div>
            ) : (
              <span className={styles.tag}>Archive</span>
            )}
          </>
        )}
      </div>

      <div className={styles.right}>
        <BloomMenu>
          <BloomMenuItem
            icon={<XIcon />}
            onSelect={() => window.open('https://x.com/imoshebari', '_blank')}
          >
            X / Twitter
          </BloomMenuItem>
          <BloomMenuItem
            icon={<GitHubIcon />}
            onSelect={() => window.open('https://github.com/moshebaricdo', '_blank')}
          >
            GitHub
          </BloomMenuItem>
          <BloomMenuItem
            icon={<LinkedInIcon />}
            onSelect={() => window.open('https://www.linkedin.com/in/moshe-bari-887681108/', '_blank')}
          >
            LinkedIn
          </BloomMenuItem>
        </BloomMenu>
      </div>
    </nav>
  );
}

/* ----------------------------------------
 * Category Switcher (archive pages only)
 * ---------------------------------------- */

interface CategorySwitcherProps {
  activeCategory: CategoryData;
  onSelect: (slug: string) => void;
}

function CategorySwitcher({ activeCategory, onSelect }: CategorySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div className={styles.switcherWrapper} ref={wrapperRef}>
      <button
        className={styles.switcherTag}
        onClick={() => setIsOpen(!isOpen)}
        data-open={isOpen}
        aria-expanded={isOpen}
        aria-label={`Current category: ${activeCategory.name}. Switch category.`}
      >
        {activeCategory.name}
        <ChevronDownIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.switcherDropdown}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {[activeCategory, ...categories.filter(c => c.slug !== activeCategory.slug)].map((category) => (
              <button
                key={category.slug}
                className={styles.switcherItem}
                data-active={category.slug === activeCategory.slug}
                onClick={() => {
                  onSelect(category.slug);
                  setIsOpen(false);
                }}
              >
                {category.name}
                <span className={styles.switcherCount}>{category.items.length}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------------------
 * Project Switcher (case study pages)
 * ---------------------------------------- */

interface ProjectSwitcherProps {
  activeProject: { title: string; slug: string };
  onSelect: (slug: string) => void;
}

function ProjectSwitcher({ activeProject, onSelect }: ProjectSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div className={styles.switcherWrapper} ref={wrapperRef}>
      <button
        className={styles.switcherTag}
        onClick={() => setIsOpen(!isOpen)}
        data-open={isOpen}
        aria-expanded={isOpen}
        aria-label={`Current project: ${activeProject.title}. Switch project.`}
      >
        {activeProject.title}
        <ChevronDownIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.switcherDropdown}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {[activeProject, ...projects.filter(p => p.slug !== activeProject.slug)].map((project) => (
              <button
                key={project.slug}
                className={styles.switcherItem}
                data-active={project.slug === activeProject.slug}
                onClick={() => {
                  onSelect(project.slug);
                  setIsOpen(false);
                }}
              >
                {project.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width={10}
      height={10}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
