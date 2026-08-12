const favicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="#d6ff3f"/>
  <text x="32" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#101510">S</text>
</svg>`;

export function GET() {
  return new Response(favicon, {
    headers: {
      "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
      "content-type": "image/svg+xml",
    },
  });
}
