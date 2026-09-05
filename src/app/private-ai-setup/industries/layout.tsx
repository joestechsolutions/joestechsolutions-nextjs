import { Metadata } from 'next';
import { SITE_OG_IMAGE, SECTION_OG_IMAGES } from "@/lib/og-images";

export const metadata: Metadata = {
  title: "AI for Your Industry | Private AI Setup | Joe's Tech Solutions",
  description: "9 pre-configured private AI assistants for Healthcare, Legal, Financial, Therapy, Education, Real Estate, Construction, Creative, and Small Business. Compliance-ready.",
  alternates: {
    canonical: '/private-ai-setup/industries',
  },
  openGraph: {
    images: [SECTION_OG_IMAGES.industries],
    title: "AI for Your Industry | Joe's Tech Solutions",
    description: "Private AI assistants pre-configured for 9 industries. HIPAA-ready healthcare, privilege-protected legal, and more.",
    url: 'https://www.joestechsolutions.com/private-ai-setup/industries',
  },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
