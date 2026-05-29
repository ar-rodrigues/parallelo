"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Checkbox from "antd/es/checkbox";
import Button from "antd/es/button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { PrivacyLinkButton } from "@/components/ui/PrivacyModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  isHoneypotTriggered,
  isValidEmail,
  isValidMessage,
  isValidPhone,
  sanitizePhoneInput,
} from "@/lib/contactValidation";
import styles from "./ContactForm.module.css";

const EMPLEADOS_KEYS = ["0", "1", "2", "3", "4"] as const;
const SERVICIO_KEYS = ["stps", "vda", "rec", "all"] as const;

const SERVICIO_MAP: Record<string, string> = {
  stps: "stps",
  vda: "vda",
  rec: "rec",
  all: "all",
};

interface FormState {
  nombre: string;
  empresa: string;
  cargo: string;
  telefono: string;
  email: string;
  empleados: string;
  servicio: string;
  mensaje: string;
  privacy: boolean;
  website: string;
}

const INITIAL: FormState = {
  nombre: "",
  empresa: "",
  cargo: "",
  telefono: "",
  email: "",
  empleados: "",
  servicio: "stps",
  mensaje: "",
  privacy: false,
  website: "",
};

function getInitialFormState(): FormState {
  if (typeof window === "undefined") return INITIAL;
  const match = window.location.hash.match(/[?&]servicio=(\w+)/);
  const param = match?.[1];
  if (param && SERVICIO_MAP[param]) {
    return { ...INITIAL, servicio: SERVICIO_MAP[param] };
  }
  return INITIAL;
}

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const [form, setForm] = useState<FormState>(getInitialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set =
    (field: keyof FormState) =>
    (value: string | boolean) => {
      setForm((f) => ({ ...f, [field]: value }));
      setErrors((e) => ({ ...e, [field]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.nombre.trim()) next.nombre = t("required");
    if (!form.empresa.trim()) next.empresa = t("required");
    if (!form.telefono.trim()) next.telefono = t("required");
    else if (!isValidPhone(form.telefono)) next.telefono = t("invalidPhone");
    if (!form.email.trim()) next.email = t("required");
    else if (!isValidEmail(form.email)) next.email = t("invalidEmail");
    if (!isValidMessage(form.mensaje)) next.mensaje = t("required");
    if (!form.privacy) next.privacy = t("required");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isHoneypotTriggered(form.website)) {
      setStatus("success");
      return;
    }

    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          servicio: t(`servicioOptions.${form.servicio as (typeof SERVICIO_KEYS)[number]}`),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Section id="contacto" variant="alt">
        <div className={styles.success}>
          <Icon name="circle-check" className={styles.successIcon} />
          <p>{t("success")}</p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="contacto" variant="alt">
      <SectionHeading
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
        variant="default"
        className={styles.heading}
      />
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">{t("honeypotLabel")}</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set("website")(e.target.value)}
          />
        </div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="nombre">{t("fields.nombre")}</label>
            <Input
              id="nombre"
              size="large"
              value={form.nombre}
              onChange={(e) => set("nombre")(e.target.value)}
              placeholder={t("placeholders.nombre")}
              status={errors.nombre ? "error" : undefined}
            />
            {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="empresa">{t("fields.empresa")}</label>
            <Input
              id="empresa"
              size="large"
              value={form.empresa}
              onChange={(e) => set("empresa")(e.target.value)}
              placeholder={t("placeholders.empresa")}
              status={errors.empresa ? "error" : undefined}
            />
            {errors.empresa && <span className={styles.error}>{errors.empresa}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="cargo">{t("fields.cargo")}</label>
            <Input
              id="cargo"
              size="large"
              value={form.cargo}
              onChange={(e) => set("cargo")(e.target.value)}
              placeholder={t("placeholders.cargo")}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="telefono">{t("fields.telefono")}</label>
            <Input
              id="telefono"
              type="tel"
              inputMode="tel"
              size="large"
              value={form.telefono}
              onChange={(e) => set("telefono")(sanitizePhoneInput(e.target.value))}
              placeholder={t("placeholders.telefono")}
              status={errors.telefono ? "error" : undefined}
            />
            {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="email">{t("fields.email")}</label>
            <Input
              id="email"
              type="email"
              size="large"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              placeholder={t("placeholders.email")}
              status={errors.email ? "error" : undefined}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="empleados">{t("fields.empleados")}</label>
            <Select
              id="empleados"
              size="large"
              className={styles.select}
              value={form.empleados || undefined}
              onChange={(v) => set("empleados")(v)}
              placeholder={t("empleadosOptions.0")}
              options={EMPLEADOS_KEYS.filter((k) => k !== "0").map((k) => ({
                value: t(`empleadosOptions.${k}`),
                label: t(`empleadosOptions.${k}`),
              }))}
            />
          </div>
          <div className={`${styles.field} ${styles.full}`}>
            <label htmlFor="servicio">{t("fields.servicio")}</label>
            <Select
              id="servicio"
              size="large"
              className={styles.select}
              value={form.servicio}
              onChange={(v) => set("servicio")(v)}
              options={SERVICIO_KEYS.map((k) => ({
                value: k,
                label: t(`servicioOptions.${k}`),
              }))}
            />
          </div>
          <div className={`${styles.field} ${styles.full}`}>
            <label htmlFor="mensaje">{t("fields.mensaje")}</label>
            <Input.TextArea
              id="mensaje"
              rows={4}
              value={form.mensaje}
              onChange={(e) => set("mensaje")(e.target.value)}
              placeholder={t("placeholders.mensaje")}
              status={errors.mensaje ? "error" : undefined}
            />
            {errors.mensaje && <span className={styles.error}>{errors.mensaje}</span>}
          </div>
        </div>
        <div className={styles.submitRow}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={status === "loading"}
            className={styles.submit}
          >
            {status === "loading" ? t("submitting") : t("submit")}
          </Button>
          <p className={styles.micro}>{t("micro")}</p>
        </div>
        <div className={styles.privacy}>
          <Checkbox
            checked={form.privacy}
            onChange={(e) => set("privacy")(e.target.checked)}
          >
            {t.rich("privacy", {
              link: (chunks) => <PrivacyLinkButton>{chunks}</PrivacyLinkButton>,
            })}
          </Checkbox>
          {errors.privacy && <span className={styles.error}>{errors.privacy}</span>}
        </div>
        {status === "error" && (
          <p className={styles.submitError} role="alert">
            {t("error")}
          </p>
        )}
      </form>
    </Section>
  );
}
