CREATE TABLE IF NOT EXISTS endpoints (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
    path VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    group_name VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    default_payload JSONB DEFAULT '{}'::jsonb,
    schema_fields JSONB DEFAULT '{}'::jsonb,
    response_schema_fields JSONB DEFAULT '{}'::jsonb,
    presets JSONB DEFAULT '[]'::jsonb,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS test_logs (
    id UUID PRIMARY KEY,
    username VARCHAR(255),
    endpoint_path VARCHAR(255) NOT NULL,
    response_time_ms INTEGER,
    status_code INTEGER,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
