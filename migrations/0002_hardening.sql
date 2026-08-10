CREATE TABLE IF NOT EXISTS rate_limit_counters (
  scope TEXT NOT NULL,
  key TEXT NOT NULL,
  bucket INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (scope, key, bucket)
);

CREATE INDEX IF NOT EXISTS rate_limit_counters_bucket_idx ON rate_limit_counters(bucket);

CREATE TABLE IF NOT EXISTS deep_reports (
  id TEXT PRIMARY KEY,
  payment_intent_id TEXT NOT NULL UNIQUE,
  report_id TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS deep_reports_report_id_idx ON deep_reports(report_id);
