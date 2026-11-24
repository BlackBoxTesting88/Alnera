// Include a deployment subpath in NEXT_PUBLIC_SITE_URL when the site uses one.
const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blackboxtesting88.github.io/Alnera/';
export const siteUrl = new URL(publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`);

export function absoluteUrl(path = '') {
  return new URL(path.replace(/^\/+/, ''), siteUrl).toString();
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
