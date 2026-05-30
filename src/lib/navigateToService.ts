export const SERVICE_TAB_IDS = ["stps", "vda", "rec"] as const;
export type ServiceTabId = (typeof SERVICE_TAB_IDS)[number];

const SERVICE_TAB_EVENT = "parallelo-service-tab";
const SERVICE_TAB_STORAGE_KEY = "parallelo-service-tab";

export function isServiceTabId(value: string): value is ServiceTabId {
  return (SERVICE_TAB_IDS as readonly string[]).includes(value);
}

export function parseServiceTabFromHash(hash: string): ServiceTabId | undefined {
  const match = hash.match(/[?&]tab=(\w+)/);
  const tab = match?.[1];
  return tab && isServiceTabId(tab) ? tab : undefined;
}

export function consumeStoredServiceTab(): ServiceTabId | undefined {
  const stored = sessionStorage.getItem(SERVICE_TAB_STORAGE_KEY);
  if (!stored) return undefined;
  sessionStorage.removeItem(SERVICE_TAB_STORAGE_KEY);
  return isServiceTabId(stored) ? stored : undefined;
}

export function navigateToService(tab: ServiceTabId) {
  sessionStorage.setItem(SERVICE_TAB_STORAGE_KEY, tab);
  window.dispatchEvent(
    new CustomEvent(SERVICE_TAB_EVENT, { detail: { tab } }),
  );

  document.getElementById("servicios")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  const base = `${window.location.pathname}${window.location.search}`;
  if (window.location.hash !== "#servicios") {
    window.history.replaceState(null, "", `${base}#servicios`);
  }
}

export function subscribeToServiceTab(
  callback: (tab: ServiceTabId) => void,
): () => void {
  const handler = (event: Event) => {
    const tab = (event as CustomEvent<{ tab: string }>).detail?.tab;
    if (tab && isServiceTabId(tab)) callback(tab);
  };
  window.addEventListener(SERVICE_TAB_EVENT, handler);
  return () => window.removeEventListener(SERVICE_TAB_EVENT, handler);
}

export function resolveServiceTab(): ServiceTabId | undefined {
  if (typeof window === "undefined") return undefined;
  return (
    parseServiceTabFromHash(window.location.hash) ??
    consumeStoredServiceTab()
  );
}
