export class RequestError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "RequestError";
    this.status = status;
  }
}

const DEFAULT_MAX_BODY_BYTES = 32_000;

function assertContentLength(request: Request, maxBytes: number) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new RequestError("The request body is too large.", 413);
  }
}

export async function readTextBody(request: Request, maxBytes = DEFAULT_MAX_BODY_BYTES) {
  assertContentLength(request, maxBytes);
  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > maxBytes) {
    throw new RequestError("The request body is too large.", 413);
  }
  return body;
}

export async function readJsonBody<T>(request: Request, maxBytes = DEFAULT_MAX_BODY_BYTES) {
  const body = await readTextBody(request, maxBytes);
  try {
    return JSON.parse(body) as T;
  } catch {
    throw new RequestError("The request body must be valid JSON.");
  }
}

export function clientIp(request: Request) {
  return request.headers.get("cf-connecting-ip")?.trim() || "unknown";
}
