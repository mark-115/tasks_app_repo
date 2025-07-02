
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE rolname = 'devuser') THEN
      CREATE ROLE devuser LOGIN PASSWORD 'devpass';
   END IF;
END
$$;

DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'tasks_db') THEN
      CREATE DATABASE tasks_db OWNER devuser;
   END IF;
END
$$;

\connect tasks_db;

GRANT ALL PRIVILEGES ON DATABASE tasks_db TO devuser;

DROP TABLE IF EXISTS tasks CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;

CREATE TYPE task_status AS ENUM ('pending', 'completed');

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  status task_status DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, due_date, status)
VALUES
  ('Review Mark''s app', 'Remember to give it full marks.', '2025-07-07', 'pending');