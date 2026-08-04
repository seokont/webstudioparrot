CREATE TABLE IF NOT EXISTS portfolio (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  year TEXT NOT NULL,
  accent TEXT NOT NULL,
  image_key TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS portfolio_created_at_idx
ON portfolio(created_at DESC);
