import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  nombre: string;
  empresa: string;
  cargo?: string;
  telefono: string;
  email: string;
  empleados?: string;
  servicio?: string;
  mensaje?: string;
  website?: string;
}

const SERVICIO_LABELS: Record<string, string> = {
  stps: "Cumplimiento Laboral STPS",
  vda: "Auditorías VDA",
  rec: "Reclutamiento",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const { nombre, empresa, telefono, email } = body;
    if (!nombre?.trim() || !empresa?.trim() || !telefono?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Campos obligatorios incompletos" },
        { status: 400 },
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_EMAIL ?? "contacto@paralleloconsultoria.com";

    if (!host || !user || !pass) {
      console.error("SMTP no configurado");
      return NextResponse.json(
        { error: "Servicio de correo no configurado" },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const servicioLabel = body.servicio
      ? SERVICIO_LABELS[body.servicio] ?? body.servicio
      : "No especificado";

    const text = [
      "Nueva solicitud de contacto — Parallelo",
      "",
      `Nombre: ${nombre}`,
      `Empresa: ${empresa}`,
      `Cargo: ${body.cargo || "—"}`,
      `Teléfono: ${telefono}`,
      `Correo: ${email}`,
      `Empleados: ${body.empleados || "—"}`,
      `Servicio: ${servicioLabel}`,
      "",
      "Mensaje:",
      body.mensaje || "—",
    ].join("\n");

    await transporter.sendMail({
      from: `"Parallelo Web" <${user}>`,
      to,
      replyTo: email,
      subject: `[Parallelo] Contacto — ${empresa}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error enviando contacto:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 },
    );
  }
}
