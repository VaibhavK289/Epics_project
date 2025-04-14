-- Database: process_database

-- DROP DATABASE IF EXISTS process_database;

-- PostgreSQL database dump modified for Windows/pgAdmin compatibility
-- Removed stdin COPY format and replaced with INSERT statements

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';
SET default_table_access_method = heap;

-- Create the table structure
CREATE TABLE public.process_data (
    type_h integer,
    type_l integer,
    type_m integer,
    tool_wear real,
    rotation_speed real,
    torque real,
    air_temp real,
    process_temp real,
    temp_diff real,
    power real,
    prediction_label integer,
    prediction_score real,
    id integer NOT NULL
);

ALTER TABLE public.process_data OWNER TO postgres;

-- Create the sequence
CREATE SEQUENCE public.process_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.process_data_id_seq OWNER TO postgres;
ALTER SEQUENCE public.process_data_id_seq OWNED BY public.process_data.id;
ALTER TABLE ONLY public.process_data ALTER COLUMN id SET DEFAULT nextval('public.process_data_id_seq'::regclass);

-- Insert data using INSERT statements instead of COPY
INSERT INTO public.process_data (type_h, type_l, type_m, tool_wear, rotation_speed, torque, air_temp, process_temp, temp_diff, power, prediction_label, prediction_score, id) VALUES
(0, 1, 0, 286, 2583, 53, 302, 310, 8, 14336.018, 1, 0.9989, 1),
(0, 1, 0, 211, 2797, 32, 297, 317, 20, 9372.829, 0, 0.0009, 2),
(0, 1, 0, 188, 2930, 72, 302, 305, 3, 22091.66, 1, 1, 3),
(0, 1, 0, 57, 1616, 55, 297, 317, 20, 9307.484, 0, 0.0002, 4),
(0, 1, 0, 201, 1779, 61, 298, 309, 11, 11364.073, 1, 0.7424, 5),
(0, 1, 0, 35, 2324, 26, 310, 326, 16, 6327.581, 0, 0.0001, 6),
(0, 1, 0, 152, 2958, 55, 307, 316, 9, 17036.842, 1, 0.9994, 7),
(0, 1, 0, 218, 1939, 25, 304, 305, 1, 5076.2856, 1, 0.9005, 8),
(0, 1, 0, 183, 1953, 68, 291, 303, 12, 13907.19, 1, 0.9309, 9),
(0, 1, 0, 225, 1691, 60, 301, 319, 18, 10624.857, 0, 0.0138, 10),
(0, 1, 0, 57, 1880, 73, 300, 311, 11, 14371.728, 1, 0.9226, 11),
(0, 1, 0, 220, 1905, 6, 307, 317, 10, 1196.9458, 0, 0.0004, 12),
(0, 1, 0, 192, 2625, 56, 294, 297, 3, 15393.791, 1, 1, 13),
(0, 1, 0, 49, 1487, 65, 294, 309, 15, 10121.68, 0, 0.0119, 14),
(0, 1, 0, 158, 1547, 21, 295, 297, 2, 3402.0278, 0, 0.3359, 15),
(0, 1, 0, 97, 1241, 21, 293, 300, 7, 2729.099, 0, 0.0045, 16),
(0, 1, 0, 31, 1219, 41, 290, 291, 1, 5233.784, 1, 0.6191, 17),
(0, 1, 0, 237, 1440, 41, 294, 309, 15, 6182.649, 0, 0.0019, 18),
(0, 1, 0, 155, 2296, 7, 305, 305, 0, 1683.0544, 0, 0.2779, 19),
(0, 1, 0, 64, 1898, 63, 302, 304, 2, 12521.749, 1, 0.9991, 20),
(0, 1, 0, 128, 1755, 56, 295, 297, 2, 10291.849, 1, 0.9962, 21),
(0, 1, 0, 7, 2281, 8, 309, 322, 13, 1910.9244, 0, 0, 22),
(0, 1, 0, 235, 1782, 39, 299, 305, 6, 7277.8076, 1, 0.7291, 23),
(0, 1, 0, 117, 1143, 62, 308, 325, 17, 7421.064, 0, 0.0005, 24),
(0, 1, 0, 10, 2355, 59, 296, 296, 0, 14550.274, 1, 0.9999, 25),
(0, 1, 0, 220, 2350, 27, 299, 305, 6, 6644.463, 1, 0.5594, 26),
(0, 1, 0, 199, 1520, 43, 295, 302, 7, 6844.4775, 0, 0.3832, 27),
(0, 1, 0, 91, 2443, 10, 298, 307, 9, 2558.3015, 0, 0.0009, 28),
(0, 1, 0, 233, 2790, 31, 309, 311, 2, 9057.204, 1, 0.9957, 30),
(0, 1, 0, 17, 1230, 27, 293, 293, 0, 3477.7402, 0, 0.348, 29);

-- Set sequence value
SELECT pg_catalog.setval('public.process_data_id_seq', 30, true);

-- Add primary key constraint
ALTER TABLE ONLY public.process_data
    ADD CONSTRAINT process_data_pkey PRIMARY KEY (id);
