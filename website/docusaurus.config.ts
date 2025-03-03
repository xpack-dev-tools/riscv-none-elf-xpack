// DO NOT EDIT!
// Automatically generated from xbb-helper/templates/docusaurus/common.

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import logger from '@docusaurus/logger';

// The node.js modules cannot be used in modules imported in browser code:
// webpack < 5 used to include polyfills for node.js core modules by default.
// so the entire initialisation code must be in this file, that is
// not processed by webpack.

import {fileURLToPath} from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

// ----------------------------------------------------------------------------

function getCustomFields() {
  const pwd = fileURLToPath(import.meta.url);
  // logger.info(pwd);

  // First get the version from the top package.json.
  const topFilePath = path.join(path.dirname(path.dirname(pwd)), 'package.json');
  // logger.info(filePath);
  const topFileContent = fs.readFileSync(topFilePath);

  const topPackageJson = JSON.parse(topFileContent.toString());
  const jsonVersion = topPackageJson.version.replace(/[.-]pre/, '');

  logger.info(`package version: ${topPackageJson.version}`);

  // Remove the first part, up to the last dot.
  const npmSubversion = jsonVersion.replace(/^.*[.]/, '');

  // Remove from the last dot to the end.
  const xpackVersion = jsonVersion.replace(/[.][0-9]*$/, '');

  // Remove the pre-release.
  const xpackSemver = xpackVersion.replace(/[-].*$/, '');

  // Remove the first part, up to the dash.
  const xpackSubversion = xpackVersion.replace(/^.*[-]/, '');

  let rootPackageJson
  try {
    const rootFilePath = path.join(path.dirname(path.dirname(pwd)), 'build-assets', 'package.json');
    // logger.info(filePath);
    const rootFileContent = fs.readFileSync(rootFilePath);
    rootPackageJson = JSON.parse(rootFileContent.toString());
  } catch (error) {
    rootPackageJson = topPackageJson;
  }

  const customFields = rootPackageJson?.xpack?.properties?.customFields ?? {};

  let upstreamVersion
  if (customFields.hasTwoNumbersVersion === 'true' && xpackSemver.endsWith('.0')) {
    // Remove the patch number if zero (wine uses both 2 and 3 numbers).
    upstreamVersion = xpackSemver.replace(/[.]0*$/, '');
  } else {
    upstreamVersion = xpackSemver;
  }

  return {
    appName: rootPackageJson.xpack.properties.appName,
    appLcName: rootPackageJson.xpack.properties.appLcName,
    version: jsonVersion,
    xpackVersion,
    xpackSemver,
    xpackSubversion,
    npmSubversion,
    upstreamVersion,
    docusaurusVersion: require('@docusaurus/core/package.json').version,
    buildTime: new Date().getTime(),
    ...customFields,
  }
}

// ----------------------------------------------------------------------------

const customFields = getCustomFields();
logger.info(customFields);

// ----------------------------------------------------------------------------

const config: Config = {
  title: 'xPack GNU RISC-V Embedded GCC',
  tagline: 'A binary distribution of GNU RISC-V Embedded GCC',
  // Explicitly set in headTags.
  // favicon: '/img/favicon.ico',

  // Set the production url of your site here
  url: 'https://xpack-dev-tools.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/riscv-none-elf-gcc-xpack/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'xpack-dev-tools', // Usually your GitHub org/user name.
  projectName: 'riscv-none-elf-gcc-xpack', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Useful for the sitemap.xml, to avoid redirects, since
  // GitHub redirects all to trailing slash.
  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/edit/xpack/website/',
          // showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/edit/xpack/website/',
          showLastUpdateTime: true,
          blogSidebarCount: 8,
          authorsMapPath: '../authors.yml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-sitemap
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: [
            '/riscv-none-elf-gcc-xpack/blog/archive/**',
            '/riscv-none-elf-gcc-xpack/blog/authors/**',
            '/riscv-none-elf-gcc-xpack/blog/tags/**'
          ],
          filename: 'sitemap.xml',
        },
        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag
        // https://tagassistant.google.com
        gtag: {
          trackingID: 'G-7QE5W7V05S',
          anonymizeIP: false,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    [
      // https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-client-redirects#redirects
      '@docusaurus/plugin-client-redirects',
      {
        // fromExtensions: ['html', 'htm'], // /myPage.html -> /myPage
        // toExtensions: ['exe', 'zip'], // /myAsset -> /myAsset.zip (if latter exists)
        redirects: [
          //   // /docs/oldDoc -> /docs/newDoc
          //   {
          //     to: '/docs/newDoc',
          //     from: '/docs/oldDoc',
          //   },
          //   // Redirect from multiple old paths to the new path
          //   {
          //     to: '/docs/newDoc2',
          //     from: ['/docs/oldDocFrom2019', '/docs/legacyDocFrom2016'],
          //   },
          {
            to: '/docs/developer',
            from: '/docs/developer-info'
          },
          {
            to: '/docs/maintainer',
            from: '/docs/maintainer-info'
          },
          {
            to: '/docs/user',
            from: '/docs/user-info'
          }
        ],
        createRedirects(existingPath) {
          logger.info(existingPath);
          //   if (existingPath.includes('/evenimente')) {
          //     // logger.info(`to ${existingPath} from ${existingPath.replace('/evenimente', '/events')}`);
          //     // Redirect from /events/X to /evenimente/X
          //     return [
          //       existingPath.replace('/evenimente', '/events')
          //     ];
          //   } else if (existingPath.includes('/amintiri')) {
          //     // logger.info(`to ${existingPath} from ${existingPath.replace('/amintiri', '/blog')}`);
          //     // Redirect from /blog/Z to /amintiri/X
          //     return [
          //       existingPath.replace('/amintiri', '/blog')
          //     ];
          //   }
          //   return undefined; // Return a falsy value: no redirect created
          //   },
          if (existingPath.includes('/user-info')) {
            return [
              existingPath.replace('/user-info', '/user')
            ];
          } else if (existingPath.includes('/developer-info')) {
            return [
              existingPath.replace('/developer-info', '/developer')
            ];
          } else if (existingPath.includes('/maintainer-info')) {
            return [
              existingPath.replace('/maintainer-info', '/maintainer')
            ];
          }
        }
      }
    ],
    './src/plugins/SelectReleasesPlugin',
  ],

  // https://docusaurus.io/docs/api/docusaurus-config#headTags
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        href: '/riscv-none-elf-gcc/favicons/favicon-48x48.png',
        sizes: '48x48'
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/riscv-none-elf-gcc/favicons/favicon.svg'
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'shortcut icon',
        href: '/riscv-none-elf-gcc/favicons/favicon.ico'
      }
    },
    {
      // This might also go to themeConfig.metadata.
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-title',
        content: 'xPack'
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/riscv-none-elf-gcc/favicons/site.webmanifest'
      }
    }
  ],
  // https://docusaurus.io/docs/seo
  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'keywords',
        content: 'xpack, binary, development, tools, reproducibility, riscv-none-elf-gcc'
      }
    ],
    navbar: {
      // Overriden by i18n/en/docusaurus-theme-classic.
      title: 'The xPack Binary Development Tools',

      logo: {
        alt: 'xPack Logo',
        src: 'img/components-256.png',
        // href: 'https://xpack.github.io/',
        href: 'https://xpack-dev-tools.github.io/'
      },
      items: [
        {
          to: '/',
          // label: 'Home',
          className: 'header-home-link',
          position: 'left'
        },
        {
          type: 'dropdown',
          label: 'Documentation',
          to: 'docs/getting-started',
          position: 'left',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started'
            },
            {
              label: 'Install Guide',
              to: '/docs/install'
            },
            {
              label: 'User Information',
              to: '/docs/user'
            },
            {
              label: 'Help Centre',
              to: '/docs/support'
            },
            {
              label: 'Releases',
              to: '/docs/releases'
            },
            {
              label: 'About',
              to: '/docs/about'
            }
          ]
        },
        {
          type: 'dropdown',
          to: '/blog',
          label: 'Blog',
          position: 'left',
          items: [
            {
              label: 'Recent',
              to: '/blog'
            },
            {
              label: 'Archive',
              to: '/blog/archive'
            },
            {
              label: 'Tags',
              to: '/blog/tags'
            },
          ]
        },
        {
          href: 'https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          label: `v${customFields.xpackVersion}`,
          position: 'right',
          href: `https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/releases/tag/v${customFields.xpackVersion}`,
        },
        {
          href: 'https://github.com/xpack-dev-tools/',
          label: 'xpack-dev-tools',
          position: 'right',
        },
        {
          href: 'https://github.com/xpack/',
          label: 'xpack',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Pages',
          items: [
            {
              label: 'Install',
              to: '/docs/install',
            },
            {
              label: 'Support',
              to: '/docs/support',
            },
            {
              label: 'Releases',
              to: '/docs/releases',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/discussions',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/xpack',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/kbzWaJerFG',
            },
            {
              label: 'X/Twitter',
              href: 'https://twitter.com/xpack_project',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Donate via PayPal',
              href: 'https://www.paypal.com/donate/?hosted_button_id=5MFRG9ZRBETQ8',
            },
            {
              label: 'GitHub riscv-none-elf-gcc-xpack',
              href: 'https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/',
            },
            {
              label: 'GitHub xpack-dev-tools',
              href: 'https://github.com/xpack-dev-tools/',
            },
            {
              label: 'GitHub xpack',
              href: 'https://github.com/xpack/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Liviu Ionescu. Built with Docusaurus v${customFields.docusaurusVersion} on ${new Date(customFields.buildTime).toDateString()}.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  customFields: customFields,
};

export default config;
