ALTER TABLE analytics_events ADD COLUMN traffic_class TEXT NOT NULL DEFAULT 'unknown';

CREATE INDEX IF NOT EXISTS analytics_events_traffic_created_idx ON analytics_events(traffic_class, created_at);
