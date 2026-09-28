-- SiteLens production funnel summary. Run with Wrangler against D1.
SELECT
  traffic_class,
  event_name,
  COUNT(*) AS event_count,
  MIN(created_at) AS first_seen,
  MAX(created_at) AS last_seen
FROM analytics_events
WHERE created_at >= datetime('now', '-30 days')
GROUP BY traffic_class, event_name
ORDER BY event_count DESC, traffic_class, event_name;

-- Only new API events classified as not-test and not-bot candidates.
SELECT
  event_name,
  COUNT(*) AS event_count,
  MIN(created_at) AS first_seen,
  MAX(created_at) AS last_seen
FROM analytics_events
WHERE traffic_class = 'human_candidate'
  AND created_at >= datetime('now', '-30 days')
GROUP BY event_name
ORDER BY event_count DESC, event_name;

-- Failure distribution for analysis and checkout.
SELECT traffic_class, event_name, status_code, COUNT(*) AS event_count
FROM analytics_events
WHERE event_name IN ('analyze_failed', 'checkout_failed')
  AND created_at >= datetime('now', '-30 days')
GROUP BY traffic_class, event_name, status_code
ORDER BY traffic_class, event_name, event_count DESC;
