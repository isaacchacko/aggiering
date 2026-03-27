/**
 * Inline script for beforeInteractive execution — must stay in sync with
 * getWebringRedirectTarget / normalizeWebsiteUrl behavior.
 */
export function buildWebringRedirectScript(siteUrls: string[]): string {
  const json = JSON.stringify(siteUrls);
  return `!function(){var SITES=${json};function norm(u){try{var x=new URL(/^https?:\\/\\//.test(u)?u:"https://"+u);var p=x.pathname.replace(/\\/+$/,"")||"/";return x.origin.toLowerCase()+p}catch(e){return""}}var raw=location.hash.slice(1);if(!raw.trim()){document.documentElement.setAttribute("data-aggiering-ready","1");return}var dec=raw;try{dec=decodeURIComponent(raw)}catch(e){}var nav=null,base="";try{var href=/^https?:\\/\\//.test(dec)?dec:"https://"+dec;var url=new URL(href);nav=url.searchParams.get("nav");base=norm(url.origin+url.pathname)}catch(e){document.documentElement.setAttribute("data-aggiering-ready","1");return}if(nav!=="prev"&&nav!=="next"){document.documentElement.setAttribute("data-aggiering-ready","1");return}var ring=SITES.map(norm),idx=ring.indexOf(base);if(idx<0){document.documentElement.setAttribute("data-aggiering-ready","1");return}var n=SITES.length,next=nav==="next"?(idx+1)%n:(idx-1+n)%n;location.replace(SITES[next])}();`;
}
