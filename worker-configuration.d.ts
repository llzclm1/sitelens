/* Minimal project bindings; full Wrangler runtime types are not needed by the app. */

type D1Result<T = unknown> = {
  results: T[];
  success: boolean;
  meta: Record<string, unknown>;
};

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(columnName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface __BaseEnv_CloudflareEnv {
  DB: D1Database;
  ASSETS: Fetcher;
  WAFFO_ENVIRONMENT: "prod";
  WAFFO_RETURN_BASE_URL: "https://sitelens.win";
  NEXT_PUBLIC_SITE_URL: "https://sitelens.win";
  GA_MEASUREMENT_ID: "G-YNQ8J06W7D";
  GOOGLE_SITE_VERIFICATION: "G0fGVxpzCXqA8jnCV35SO76-hjApPFKsSOXbZCdNQVc";
}

declare namespace Cloudflare {
  interface GlobalProps {
    mainModule: typeof import("./.open-next/worker");
  }

  interface Env extends __BaseEnv_CloudflareEnv {}
}

interface CloudflareEnv extends __BaseEnv_CloudflareEnv {}

type StringifyValues<EnvType extends Record<string, unknown>> = {
  [Binding in keyof EnvType]: EnvType[Binding] extends string ? string : string;
};

declare namespace NodeJS {
interface ProcessEnv extends StringifyValues<Pick<Cloudflare.Env, "WAFFO_ENVIRONMENT" | "WAFFO_RETURN_BASE_URL" | "NEXT_PUBLIC_SITE_URL" | "GA_MEASUREMENT_ID" | "GOOGLE_SITE_VERIFICATION">> {}
}
