export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Parallelo Consultoría",
    description:
      "Consultoría en cumplimiento laboral STPS, auditorías VDA y reclutamiento estratégico.",
    url: "https://www.parallelo.com.mx",
    telephone: ["+522225340548", "+522222580786"],
    email: "contacto@parallelo.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Puebla",
      addressRegion: "Puebla",
      addressCountry: "MX",
    },
    areaServed: "MX",
    serviceType: [
      "Cumplimiento Laboral STPS",
      "Auditorías VDA",
      "Reclutamiento",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
