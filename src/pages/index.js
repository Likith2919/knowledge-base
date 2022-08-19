import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
// import HomepageFeaturesAdditional from '../components/HomepageFeaturesAdditional';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const randomeTagline = siteConfig.tagline.split(',')[Math.floor(Math.random()*2)];
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{randomeTagline}</p>
        <span className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tutorials/intro">
            Let's get you started.
          </Link>
        </span>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Oriserver's documentation portal.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        {/* <HomepageFeaturesAdditional /> */}
      </main>
    </Layout>
  );
}
