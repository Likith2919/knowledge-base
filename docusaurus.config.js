/** @type {import('@docusaurus/types').DocusaurusConfig} */
const { customFields } = require('./customFields');

module.exports = {
  title: 'Knowledge Base',
  tagline: `Home to Oriserve's documentation.,Hope you learn something new today!`,
  url: 'https://knowledge-dev.oriserve.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/ori-favicon.ico',
  organizationName: 'Oriserve', // Usually your GitHub org/user name.
  projectName: 'knowledgebase', // Usually your repo name.
  themeConfig: {
    hideableSidebar: true,
    hideOnScroll: true,
    navbar: {
      title: '',
      logo: {
        alt: 'Home',
        src: 'img/ori-logo.png',
      },
      items: [
        {
          label: 'Docs',
          position: 'left',
          // docId: 'knowledge-base',
          // type: 'doc',
          to: "/docs/knowledge-base/intro",
        },
        {
          label: 'Tutorials',
          type: 'doc',
          docId: "tutorials/intro",
          position: 'left'
        },
        {
          label: "Teams",
          type: 'dropdown',
          position: "right",
          items: [
            {
              label: 'DevOps',
              to: '/docs/category/devops'
            },
            {
              label: 'Backend',
              to: '/docs/category/backend'
            },
            {
              label: 'AI',
              to: '/docs/category/ai'
            },
            {
              label: 'Frontend',
              to: '/docs/category/frontend'
            }
          ]
        },
        {
          href: 'https://oriserve.com',
          label: 'Oriserve',
          position: 'right',
        },
        {
          to: '/recents',
          label: "What's going on?",
          position: 'left'
        },
        // {
        //   to: "/coding-ground",
        //   label: "Ground 0",
        //   position: "left"
        // }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorials/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Facebook',
              href: 'https://facebook.com/oriserve/',
            },
            {
              label: 'Instagram',
              href: 'https://instagram.com/ori.serve/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/oriserve/',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/oriserve/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Ori Blog',
              to: 'https://oriserve.com/blog',
            },
            {
              label: 'Feel like imparting wisdom?',
              href: 'https://bitbucket.org/oriserve1/knowldgebase',
            },
          ],
        },
      ],
      logo: {
        alt: 'Oriserve',
        src: 'img/ori-logo.png',
        href: 'https://oriserve.com'
      },
      copyright: `Copyright © ${new Date().getFullYear()} Unlax Consumer Solutions Pvt. Ltd.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/okaidia'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          // numberPrefixParser: false,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://bitbucket.org/oriserve1/knowldgebase/src/kb-development/ori-knowledgebase/',
          docLayoutComponent: '@theme/DocPage',
          docItemComponent: '@theme/DocItem',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        blog: {
          id: 'recents',
          routeBasePath: 'recents', // URL route for the blog section of your site.
          path: './recents', //* Path to data on filesystem relative to site dir.
          showReadingTime: true,
          editUrl: 'https://bitbucket.org/oriserve1/knowldgebase/src/kb-development/ori-knowledgebase/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        docsRouteBasePath: "/docs"
      },
    ],
    [
      '@docusaurus/theme-live-codeblock',
      { liveCodeBlock: { playgroundPosition: 'bottom' } }
    ],
    // [
    //   '@docusaurus/plugin-content-blog',
    //   {
    //     id: 'recents',
    //     routeBasePath: 'recents', // URL route for the blog section of your site.
    //     path: './recents', //* Path to data on filesystem relative to site dir.
    //     showReadingTime: true,
    //     editUrl: 'https://bitbucket.org/oriserve1/knowldgebase/src/kb-development/ori-knowledgebase/',
    //   },
    // ]
  ],
  customFields
};

//npm install --save @easyops-cn/docusaurus-search-local
//https://github.com/easyops-cn/docusaurus-search-local