-- Up Migration

-- for session persistance using connect-pg-simple
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");


-- EzJobs database tables
CREATE TABLE "users" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "username" varchar(50) UNIQUE NOT NULL,
  "email" varchar(50) UNIQUE NOT NULL,
  "password" varchar(200) NOT NULL
);

CREATE TABLE "jobs" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL,
  "column_id" int NOT NULL,
  "card_pos" INT NOT NULL DEFAULT 0,
  "current_status" varchar(20) NOT NULL,
  "company" varchar(50) NOT NULL,
  "position" varchar(50) NOT NULL,
  "salary" varchar(50),
  "type" varchar(20),
  "location" varchar(50),
  "link" varchar(50),
  "description" varchar(200),
  "user_note" varchar(200),
  "date_applied" date,
  "date_scheduled" timestamp
);

CREATE TABLE "columns" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(20) NOT NULL,
  "color" varchar(20) NOT NULL,
  "position" int NOT NULL
);

CREATE TABLE "column_cards" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL,
  "job_id" int NOT NULL,
  "column_id" int NOT NULL,
  "position" varchar(20) NOT NULL,
  UNIQUE ("user_id", "column_id", "position")
);

CREATE TABLE "job_stats" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int UNIQUE NOT NULL,
  "interested" int DEFAULT 0,
  "pending" int DEFAULT 0,
  "in_progress" int DEFAULT 0,
  "offer" int DEFAULT 0,
  "declined" int DEFAULT 0,
  "ghosted" int DEFAULT 0,
  "follow_up" int DEFAULT 0,
  "applied" int DEFAULT 0,
  "interview" int DEFAULT 0,
  "total" int DEFAULT 0
);

CREATE TABLE "contacts" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL,
  "user_note" varchar(200),
  "name" varchar(50) NOT NULL,
  "position" varchar(50),
  "company" varchar(50),
  "email" varchar(50),
  "phone_num" varchar(50)
);

CREATE TABLE "contact_jobs" (
  "contact_id" int NOT NULL,
  "job_id" int NOT NULL,
  UNIQUE ("contact_id", "job_id")
);

CREATE TABLE "ai_resume" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL UNIQUE,
  "user_token" varchar(50) UNIQUE,
  "fullname" varchar(50) NOT NULL,
  "phone_num" text,
  "email" text,
  "linkedin" text,
  "website" text,
  "location" text,
  "relevant_skills" text,
  "education" text,
  "experience" text,
  "projects" text,
  "ai_skills" text,
  "ai_edu" text,
  "ai_exp" text,
  "ai_proj" text
);

CREATE TABLE "ai_interview_prep" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL,
  "company" varchar(50),
  "job_position" varchar(50),
  "job_description" varchar(200),
  "ai_response" varchar(200)
);

CREATE INDEX "idx_jobs_user_id" ON "jobs" ("user_id");

CREATE INDEX "idx_jobs_column_id" ON "jobs" ("column_id");

CREATE INDEX "idx_contacts_user_id" ON "contacts" ("user_id");

CREATE INDEX "idx_ai_interview_user_id" ON "ai_interview_prep" ("user_id");

COMMENT ON COLUMN "columns"."position" IS 'the order of this column in the Kanban board';

COMMENT ON COLUMN "column_cards"."position" IS 'position of cards in the column, lexorank';

COMMENT ON COLUMN "job_stats"."interested" IS 'columns.id=1';

COMMENT ON COLUMN "job_stats"."pending" IS 'columns.id=2';

COMMENT ON COLUMN "job_stats"."in_progress" IS 'columns.id=3';

COMMENT ON COLUMN "job_stats"."offer" IS 'columns.id=4';

COMMENT ON COLUMN "job_stats"."declined" IS 'columns.id=5';

COMMENT ON COLUMN "job_stats"."ghosted" IS 'columns.id=6';

COMMENT ON COLUMN "job_stats"."follow_up" IS 'columns.id=7';

COMMENT ON COLUMN "ai_interview_prep"."ai_response" IS 'Generated by OpenAI API';

ALTER TABLE "jobs" ADD FOREIGN KEY ("column_id") REFERENCES "columns" ("id") ON DELETE CASCADE;

ALTER TABLE "jobs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "column_cards" ADD FOREIGN KEY ("column_id") REFERENCES "columns" ("id") ON DELETE CASCADE;

ALTER TABLE "column_cards" ADD FOREIGN KEY ("job_id") REFERENCES "jobs" ("id") ON DELETE CASCADE;

ALTER TABLE "column_cards" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "job_stats" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "contacts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "contact_jobs" ADD FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE CASCADE;

ALTER TABLE "contact_jobs" ADD FOREIGN KEY ("job_id") REFERENCES "jobs" ("id") ON DELETE CASCADE;

ALTER TABLE "ai_resume" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "ai_interview_prep" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

-- Trigger to update job_stats table after new user is created
CREATE OR REPLACE FUNCTION insert_job_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO job_stats (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER job_stats_after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION insert_job_stats();

-- Trigger to update job_stats table after job data is updated
CREATE OR REPLACE FUNCTION update_job_stats()
RETURNS TRIGGER AS $$
DECLARE
    interested_count INT;
    pending_count INT;
    in_progress_count INT;
    offer_count INT;
    declined_count INT;
    ghosted_count INT;
    follow_up_count INT;
    interview_count INT;
    total_count INT;
BEGIN
    -- Count records for each column_id and assign all values at once
    SELECT
        COUNT(jobs.id) FILTER (WHERE column_id = 1),
        COUNT(jobs.id) FILTER (WHERE column_id = 2),
        COUNT(jobs.id) FILTER (WHERE column_id = 3),
        COUNT(jobs.id) FILTER (WHERE column_id = 4),
        COUNT(jobs.id) FILTER (WHERE column_id = 5),
        COUNT(jobs.id) FILTER (WHERE column_id = 6),
        COUNT(jobs.id) FILTER (WHERE column_id = 7)
    INTO
        interested_count, pending_count, in_progress_count, offer_count,
        declined_count, ghosted_count, follow_up_count
    FROM jobs
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);

    -- Calculate total and applied counts
    total_count := interested_count + pending_count + in_progress_count + offer_count + declined_count + ghosted_count + follow_up_count;
    interview_count := in_progress_count + offer_count + follow_up_count;
    
    -- Update the job_stats table
    UPDATE job_stats
    SET
        interested = interested_count,
        pending = pending_count,
        in_progress = in_progress_count,
        offer = offer_count,
        declined = declined_count,
        ghosted = ghosted_count,
        follow_up = follow_up_count,
        total = total_count,
        interview = interview_count,
        applied = total_count - interested_count
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER after_job_insert_update_delete
AFTER INSERT OR UPDATE OR DELETE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_job_stats();

-- Down Migration