import { getCloudflareContext } from "@opennextjs/cloudflare";

const MAX_SCREENSHOT_BYTES = 6_000_000;

function toBase64(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)));
  }
  return btoa(binary);
}

export async function captureWebsiteScreenshot(url: string) {
  try {
    const context = await getCloudflareContext({ async: true });
    const browser = context.env.BROWSER;
    if (!browser) return undefined;

    const response = await browser.quickAction("screenshot", {
      url,
      viewport: { width: 1440, height: 1200, deviceScaleFactor: 1 },
      screenshotOptions: { type: "jpeg", quality: 72 },
      gotoOptions: { waitUntil: "domcontentloaded", timeout: 12_000 },
    });

    if (!response.ok) return undefined;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength === 0 || bytes.byteLength > MAX_SCREENSHOT_BYTES) return undefined;

    return `data:image/jpeg;base64,${toBase64(bytes)}`;
  } catch {
    return undefined;
  }
}
