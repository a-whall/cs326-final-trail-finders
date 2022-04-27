-- Table: public.events

-- DROP TABLE IF EXISTS public.events;

CREATE TABLE IF NOT EXISTS public.events
(
    eid SERIAL PRIMARY KEY,
    title character varying(64) COLLATE pg_catalog."default",
    "time" character varying(64) COLLATE pg_catalog."default",
    meetup character varying(64) COLLATE pg_catalog."default",
    username character varying(64) COLLATE pg_catalog."default",
    description character varying(1920) COLLATE pg_catalog."default",
    trail character varying(64) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.events
    OWNER to qcerdhuvetdiiw;