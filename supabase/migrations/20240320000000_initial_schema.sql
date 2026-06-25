-- Create Endpoints table for Dynamic Documentation CMS

CREATE TABLE public.endpoints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
    path VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    parameters JSONB DEFAULT '[]'::jsonb,
    default_payload JSONB DEFAULT '{}'::jsonb,
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

-- Allow read access to all for endpoints
CREATE POLICY "Enable read access for all users" ON public.endpoints FOR SELECT USING (true);

-- Allow insert access to authenticated users for test logs
CREATE POLICY "Enable insert for authenticated users only" ON public.test_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users only" ON public.test_logs FOR SELECT TO authenticated USING (true);
