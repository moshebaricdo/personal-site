import styles from './Hero.module.css';

export function Hero() {
  return (
    <header className={styles.hero}>
      <h1 className={styles.heading}>Moshe Bari</h1>
      
      <div className={styles.bioGroup}>
        <p className={styles.bio}>
          Senior Product Designer at{' '}
          <a href="https://code.org" className={styles.inlineLink}>
            Code.org
          </a>
          , where I lead design systems and shape learning tools used by millions of 
          students and teachers.
        </p>

        <p className={styles.bio}>
          Over the past decade, I've collaborated with Amazon, Paramount, Lloyds of 
          London, Hulu, PepsiCo, and others.
        </p>

        <p className={styles.bio}>
          For inquiries or collaboration, reach out at{' '}
          <a 
            href="mailto:hello@moshebari.com" 
            className={`${styles.inlineLink} ${styles.emailLink}`}
          >
            hello@moshebari.com
          </a>
          .
        </p>
      </div>
    </header>
  );
}
