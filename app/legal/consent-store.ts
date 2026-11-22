export const consentLifetime = 180 * 24 * 60 * 60 * 1000;

export type CookieConsent = {
  version: string;
  necessary: true;
  marketing: boolean;
  updatedAt: number;
  expiresAt: number;
};

export function createConsent(marketing: boolean, version: string, now = Date.now()): CookieConsent {
  return { version, necessary: true, marketing, updatedAt: now, expiresAt: now + consentLifetime };
}

// An unknown, outdated or damaged choice never enables optional tracking.
export function parseConsent(raw: string | null, version: string, now = Date.now()): CookieConsent | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const choice = value as Partial<CookieConsent>;
    if (choice.version !== version || choice.necessary !== true || typeof choice.marketing !== 'boolean'
      || typeof choice.updatedAt !== 'number' || !Number.isFinite(choice.updatedAt)
      || typeof choice.expiresAt !== 'number' || !Number.isFinite(choice.expiresAt)
      || choice.updatedAt > now + 60_000 || choice.expiresAt <= now
      || choice.expiresAt <= choice.updatedAt || choice.expiresAt - choice.updatedAt > consentLifetime) return null;
    return choice as CookieConsent;
  } catch { return null; }
}

export function mayUseMarketing(choice: CookieConsent | null, configured: boolean) {
  return configured && choice?.marketing === true;
}
