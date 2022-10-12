import * as React from 'react'
import { useSiteMetadata } from '../hooks/use-site-metadata'

import icon from '../images/icon-trim.png'

export const Seo = ({
  title,
  description,
  pathname,
  children,
}: SeoProps): JSX.Element => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata()

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <link rel="icon" href={icon} />
      {children}
    </>
  )
}

type SeoProps = {
  title?: string
  description?: string
  pathname?: string
  children?: JSX.Element
}
