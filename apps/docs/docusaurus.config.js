// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: 'Waveditor',
  tagline:
    'Developer-friendly open-source low-code platform for easily building, \n' +
    'storing, and sending emails.',
  url: 'https://demo.waveditor.qvantor.space',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Waveditor', // Usually your GitHub org/user name.
  projectName: 'waveditor', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/qvantor/waveditor/edit/apps/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      navbar: {
        title: 'Waveditor',
        logo: {
          alt: 'Waveditor Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            position: 'left',
            label: 'Demo',
            href: 'https://demo.waveditor.qvantor.space/',
          },
          {
            href: 'https://github.com/qvantor/waveditor',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Overview',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                href: 'https://demo.waveditor.qvantor.space/',
                label: 'Demo',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/qvantor/waveditor',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Waveditor, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
