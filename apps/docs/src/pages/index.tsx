import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary main-header', styles.heroBanner)}
    >
      <div className='main-container'>
        <div>
          <h1 className='hero__title'>{siteConfig.title}</h1>
          <p className='hero__subtitle'>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className='button button--secondary button--lg'
              to='/docs/intro'
            >
              Documentation
            </Link>
          </div>
        </div>
        <img src='/img/screenshot.png' className='main-image' alt='Project screenshot'/>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Waveditor - open-source email builder`}
      description='Waveditor is a developer-friendly open-source low-code platform for easily building,
storing, and sending emails.'
    >
      <HomepageHeader />
    </Layout>
  );
}
