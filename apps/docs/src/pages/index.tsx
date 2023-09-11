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
            <a
              href='https://www.producthunt.com/posts/waveditor?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-waveditor'
              target='_blank'
              style={{ width: 250, height: 46 }}
            >
              <img
                src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=413639&theme=neutral'
                alt='Waveditor - Open&#0045;source&#0032;platform&#0032;for&#0032;easily&#0032;building&#0032;and&#0032;sending&#0032;emails | Product Hunt'
                style={{ width: 250, height: 46 }}
                width='250'
                height='46'
              />
            </a>
          </div>
        </div>
        <img
          src='/img/screenshot.png'
          className='main-image'
          alt='Project screenshot'
        />
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
