CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS upgrades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  report_id TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_intents (
  id TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'failed')),
  created_at TEXT NOT NULL,
  provider_session_id TEXT,
  provider_order_id TEXT,
  provider_event_id TEXT,
  paid_at TEXT,
  failure_reason TEXT
);

CREATE INDEX IF NOT EXISTS payment_intents_report_id_idx ON payment_intents(report_id);
