export function JsonLd() {
  const services = [
    "Cumplimiento Preventivo STPS",
    "Certificaciones VDA",
    "Reclutamiento",
  ] as const;

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Parallelo Consultoría",
    description:
      "Consultoría en cumplimiento preventivo STPS, certificaciones VDA y reclutamiento estratégico.",
    image: "https://www.paralleloconsultoria.com/Assets_Landing_Parallelo.png",
    url: "https://www.paralleloconsultoria.com",
    telephone: ["+522225340548", "+522222580786"],
    email: "contacto@paralleloconsultoria.com",
    sameAs: [
      "https://www.facebook.com/ParalleloConsultoria/",
      "https://www.linkedin.com/in/parallelo-consultoria/",
      "https://www.instagram.com/parallelo.consultoria/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Puebla",
      addressRegion: "Puebla",
      addressCountry: "MX",
    },
    areaServed: {
      "@type": "Country",
      name: "MX",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Parallelo Consultoría",
      itemListElement: services.map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          areaServed: {
            "@type": "Country",
            name: "MX",
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
