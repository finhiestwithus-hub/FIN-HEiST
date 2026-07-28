import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use the environment variable if available, otherwise default to a generic production URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.finheistwithus.in.net';

  // Core pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Dynamically add all calculator routes
  const calculators = [
    'income-tax',
    'gst',
    'emi',
    'net-worth',
    'hra',
    'tds-rate',
    'tds-penalty',
    'gst-rate',
    'gst-price',
    'form-121',
    'challan-excel',
    'gstr3b-excel',
    'pdf-scan'
  ];

  calculators.forEach((calc) => {
    routes.push({
      url: `${baseUrl}/calculators/${calc}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return routes;
}
