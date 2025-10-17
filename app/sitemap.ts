import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://app.hespix.com'

  // Projedeki tüm statik sayfaların listesi
  const staticPages = [
    '/',
    '/about',
    '/contact',
    '/privacy-policy',
    '/bmi-calculator',
    '/mortgage-calculator',
    '/percentage-calculator',
    '/unit-converter',
  ];

  const sitemapEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: path === '/' ? 1.0 : 0.8,
  }));

  return sitemapEntries;
}
```eof
