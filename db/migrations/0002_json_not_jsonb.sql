-- jsonb does not preserve object key order (it normalizes storage internally),
-- which scrambled fields like {PropertyName, Condition, Value} on every read.
-- json stores the exact original text, so switch these columns back to it.
ALTER TABLE endpoints ALTER COLUMN default_payload TYPE json USING default_payload::json;
ALTER TABLE endpoints ALTER COLUMN schema_fields TYPE json USING schema_fields::json;
ALTER TABLE endpoints ALTER COLUMN response_schema_fields TYPE json USING response_schema_fields::json;
ALTER TABLE endpoints ALTER COLUMN presets TYPE json USING presets::json;
