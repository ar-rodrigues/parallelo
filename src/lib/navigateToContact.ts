const CONTACT_SERVICIO_EVENT = "parallelo-contact-servicio";
const CONTACT_SERVICIO_STORAGE_KEY = "parallelo-contact-servicio";

export function parseServicioFromHash(hash: string): string | undefined {
  const match = hash.match(/[?&]servicio=(\w+)/);
  return match?.[1];
}

export function consumeStoredContactServicio(): string | undefined {
  const stored = sessionStorage.getItem(CONTACT_SERVICIO_STORAGE_KEY);
  if (!stored) return undefined;
  sessionStorage.removeItem(CONTACT_SERVICIO_STORAGE_KEY);
  return stored;
}

export function navigateToContact(servicio?: string) {
  if (servicio) {
    sessionStorage.setItem(CONTACT_SERVICIO_STORAGE_KEY, servicio);
    window.dispatchEvent(
      new CustomEvent(CONTACT_SERVICIO_EVENT, { detail: { servicio } }),
    );
  }

  document.getElementById("contacto")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  const base = `${window.location.pathname}${window.location.search}`;
  if (window.location.hash !== "#contacto") {
    window.history.replaceState(null, "", `${base}#contacto`);
  }
}

export function subscribeToContactServicio(
  callback: (servicio: string) => void,
): () => void {
  const handler = (event: Event) => {
    const servicio = (event as CustomEvent<{ servicio: string }>).detail
      ?.servicio;
    if (servicio) callback(servicio);
  };
  window.addEventListener(CONTACT_SERVICIO_EVENT, handler);
  return () => window.removeEventListener(CONTACT_SERVICIO_EVENT, handler);
}
