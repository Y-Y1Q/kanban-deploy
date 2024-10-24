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

CREATE TABLE "docs" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL,
  "title" varchar(50) NOT NULL,
  "filepath" varchar(200) NOT NULL
);

CREATE TABLE "doc_jobs" (
  "doc_id" int NOT NULL,
  "job_id" int NOT NULL
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
  "job_id" int NOT NULL
);

CREATE TABLE "ai_resume" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL,
  "doc_id" int UNIQUE,
  "personal_information" varchar(200),
  "relevant_skills" varchar(200),
  "education" varchar(200),
  "experience" varchar(200),
  "projects" varchar(200)
);

CREATE TABLE "ai_interview_prep" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int NOT NULL,
  "company" varchar(50),
  "job_position" varchar(50),
  "job_description" varchar(200),
  "ai_response" varchar(200)
);

COMMENT ON COLUMN "columns"."position" IS 'the order of this column in the Kanban board';

COMMENT ON COLUMN "ai_interview_prep"."ai_response" IS 'Generated by OpenAI API';

ALTER TABLE "jobs" ADD FOREIGN KEY ("column_id") REFERENCES "columns" ("id") ON DELETE CASCADE;

ALTER TABLE "jobs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "doc_jobs" ADD FOREIGN KEY ("doc_id") REFERENCES "docs" ("id") ON DELETE CASCADE;

ALTER TABLE "doc_jobs" ADD FOREIGN KEY ("job_id") REFERENCES "jobs" ("id") ON DELETE CASCADE;

ALTER TABLE "docs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "contacts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "contact_jobs" ADD FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE CASCADE;

ALTER TABLE "contact_jobs" ADD FOREIGN KEY ("job_id") REFERENCES "jobs" ("id") ON DELETE CASCADE;

ALTER TABLE "ai_resume" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "ai_resume" ADD FOREIGN KEY ("doc_id") REFERENCES "docs" ("id") ON DELETE SET NULL;

ALTER TABLE "ai_interview_prep" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;


-- Down Migration