import Script from "next/script";

/**
 * Loads Cloudflare Web Analytics when `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` is set.
 * Token: Cloudflare dashboard → Web analytics → your site → Manage site → JS snippet.
 */
export function CloudflareWebAnalytics() {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;
  if (!token) return null;

  return (
    <Script
      id="cf-web-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
