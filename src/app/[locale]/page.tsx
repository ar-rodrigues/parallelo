import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { About } from "@/components/sections/About";
import { Impact } from "@/components/sections/Impact";
import { Services } from "@/components/sections/Services";
import { MidPageCta } from "@/components/sections/MidPageCta";
import { Coverage } from "@/components/sections/Coverage";
import { Team } from "@/components/sections/Team";
import { BrandEmployer } from "@/components/sections/BrandEmployer";
import { FinalCta } from "@/components/sections/FinalCta";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Impact />
        <Services />
        <MidPageCta />
        <Coverage />
        <Team />
        <BrandEmployer />
        <FinalCta />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
