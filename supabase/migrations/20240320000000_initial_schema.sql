-- Create Endpoints table for Dynamic Documentation CMS
CREATE TABLE public.endpoints (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
    path VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    group_name VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    default_payload JSON DEFAULT '{}'::json,
    schema_fields JSON DEFAULT '{}'::json,
    response_schema_fields JSON DEFAULT '{}'::json,
    presets JSON DEFAULT '[]'::json,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Test Logs table
CREATE TABLE public.test_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(255),
    endpoint_path VARCHAR(255) NOT NULL,
    response_time_ms INTEGER,
    status_code INTEGER,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_logs ENABLE ROW LEVEL SECURITY;

-- Allow access for endpoints
CREATE POLICY "Enable read access for all users" ON public.endpoints FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.endpoints FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.endpoints FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.endpoints FOR DELETE USING (true);

-- Allow access for test logs
CREATE POLICY "Enable insert access for all users on test logs" ON public.test_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for all users on test logs" ON public.test_logs FOR SELECT USING (true);
