export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Parallelo Consultoría",
    description:
      "Consultoría en cumplimiento preventivo STPS, auditorías VDA y reclutamiento estratégico.",
    image: "https://www.parallelo.com.mx/Assets_Landing_Parallelo.png",
    url: "https://www.parallelo.com.mx",
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
    areaServed: "MX",
    serviceType: [
      "Cumplimiento Preventivo STPS",
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
