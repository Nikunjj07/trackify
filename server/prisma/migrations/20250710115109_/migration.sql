-- AlterTable
CREATE SEQUENCE streak_id_seq;
ALTER TABLE "Streak" ALTER COLUMN "id" SET DEFAULT nextval('streak_id_seq');
ALTER SEQUENCE streak_id_seq OWNED BY "Streak"."id";
