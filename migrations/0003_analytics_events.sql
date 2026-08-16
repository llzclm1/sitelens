CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_name TEXT NOT NULL,
  status_code INTEGER,
  analysis_mode TEXT,
  value INTEGER,
  currency TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS analytics_events_name_created_idx ON analytics_events(event_name, created_at);
CREATE INDEX IF NOT EXISTS analytics_events_created_idx ON analytics_events(created_at);
