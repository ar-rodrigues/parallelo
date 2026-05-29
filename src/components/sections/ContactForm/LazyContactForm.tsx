"use client";

import dynamic from "next/dynamic";
import { AntdProviders } from "@/components/providers/AntdProviders";

const ContactForm = dynamic(
  () =>
    import("@/components/sections/ContactForm").then((mod) => ({
      default: mod.ContactForm,
    })),
  { loading: () => null },
);

export function LazyContactForm() {
  return (
    <AntdProviders>
      <ContactForm />
    </AntdProviders>
  );
}
