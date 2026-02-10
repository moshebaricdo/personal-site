import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Scrapbook, getCategoryBySlug, categories } from '@/components/Archive';
import styles from './page.module.css';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return { title: 'Not Found' };
  }

  return {
    title: `${category.name} Archive`,
    description: `A visual collection of ${category.name.toLowerCase()} work.`,
  };
}

export default async function CategoryArchivePage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className="container">
        <Nav />
      </div>
      
      <Scrapbook category={category} />
    </main>
  );
}
