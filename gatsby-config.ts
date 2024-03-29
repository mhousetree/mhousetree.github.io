import type { GatsbyConfig } from 'gatsby'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Mhousetree's Portfolio`,
    description: `This is Mhousetree's portfolio website.`,
    twitterUsername: `@mhousetree`,
    image: `/icon.png`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-0XFSFCNJSH',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GATSBY_HYGRAPH_ENDPOINT,
        queryConcurrency: 1,
      },
    },
  ],

  flags: {
    PARALLEL_QUERY_RUNNING: true,
  },
}

export default config
