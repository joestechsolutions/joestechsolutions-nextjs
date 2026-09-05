import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.joestechsolutions.com';
  const currentDate = new Date();

  // Blog slugs derived from the actual content registry — a new post added
  // to src/content/blog + lib/blog.ts lands in the sitemap automatically.
  const blogSlugs = getAllPosts().map((p) => p.slug);

  // Industry vertical slugs
  const verticalSlugs = [
    'healthcare',
    'legal',
    'financial',
    'therapy',
    'education',
    'realestate',
    'construction',
    'creative',
    'smallbusiness',
  ];

  return [
    // Homepage - Highest Priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Private AI Setup - Flagship Product
    {
      url: `${baseUrl}/private-ai-setup`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    // Agent System - Full Multi-Agent Stack
    {
      url: `${baseUrl}/agent-system`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    // Solutions - Hub for the 6-tier ladder
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Services
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Google Maps Growth — AI-managed GBP service
    {
      url: `${baseUrl}/google-maps-growth`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Prompt Library - Lead Magnet
    {
      url: `${baseUrl}/prompt-library`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Whisper Walkie - Free Tool / Lead Gen
    {
      url: `${baseUrl}/whisper-walkie`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Contact
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Portfolio
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Portfolio - Case Studies
    {
      url: `${baseUrl}/portfolio/skate-workshop`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/renfaire-directory`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/cbarrgs`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Blog Posts
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Industry Verticals
    {
      url: `${baseUrl}/private-ai-setup/industries`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    ...verticalSlugs.map((slug) => ({
      url: `${baseUrl}/private-ai-setup/industries/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    // About
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Stack — live infrastructure proof
    {
      url: `${baseUrl}/stack`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
