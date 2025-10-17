import { MetadataRoute } from 'next'

// Bu dosya, app.hespix.com/sitemap.xml adresini otomatik olarak oluşturur.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://app.hespix.com'

  // Sitede bulunan tüm ana rotalar
  const routes = [
    '/',
    '/about',
    '/contact',
    '/privacy-policy',
    '/bmi-calculator',
    '/mortgage-calculator',
    '/percentage-calculator',
    '/unit-converter',
  ];

  // Rotaları sitemap formatına dönüştür
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
