CREATE TABLE  public.users (
  "_id" serial NOT NULL,
  "email" varchar(60) NOT NULL UNIQUE,
  "password" varchar(20) NOT NULL,
  "display_name" varchar(30) NOT NULL,
  "last_login" varchar NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  public.interests (
  "_id" serial NOT NULL,
  "name" varchar(60) NOT NULL UNIQUE,
  CONSTRAINT "interests_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  public.languages (
  "_id" serial NOT NULL,
  "name" varchar(60) NOT NULL UNIQUE,
  CONSTRAINT "languages_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  public.user_relationships (
  "_id" serial NOT NULL,
  "user_id_sent" integer NOT NULL,
  "user_id_rec" integer NOT NULL,
  "status" integer NOT NULL,
  CONSTRAINT "user_relationships_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  public.user_teach_languages (
  "_id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "language_id" integer NOT NULL,
  CONSTRAINT "user_teach_languages_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  public.user_learn_languages (
  "_id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "language_id" integer NOT NULL,
  CONSTRAINT "user_learn_languages_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE  public.user_interests (
  "_id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "interest_id" integer NOT NULL,
  CONSTRAINT "user_interests_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);


ALTER TABLE public.user_relationships ADD CONSTRAINT "user_fk0" FOREIGN KEY ("user_id_sent") REFERENCES public.users("_id");
ALTER TABLE public.user_relationships ADD CONSTRAINT "user_fk1" FOREIGN KEY ("user_id_rec") REFERENCES public.users("_id");

ALTER TABLE public.user_interests ADD CONSTRAINT "user_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.user_interests ADD CONSTRAINT "interests_fk0" FOREIGN KEY ("interest_id") REFERENCES public.interests("_id");

ALTER TABLE public.user_teach_languages ADD CONSTRAINT "user_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.user_teach_languages ADD CONSTRAINT "languages_fk0" FOREIGN KEY ("language_id") REFERENCES public.languages("_id");

ALTER TABLE public.user_learn_languages ADD CONSTRAINT "user_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.user_learn_languages ADD CONSTRAINT "languages_fk0" FOREIGN KEY ("language_id") REFERENCES public.languages("_id");


INSERT INTO public.languages VALUES (1, 'Spanish');
INSERT INTO public.languages VALUES (2, 'Mandarin');
INSERT INTO public.languages VALUES (3, 'Korean');
INSERT INTO public.languages VALUES (4, 'Japanese');
INSERT INTO public.languages VALUES (5, 'French');
INSERT INTO public.languages VALUES (6, 'German');
INSERT INTO public.languages VALUES (7, 'Russian');
INSERT INTO public.languages VALUES (8, 'Greek');
INSERT INTO public.languages VALUES (9, 'Norwegian');
INSERT INTO public.languages VALUES (10, 'Hebrew');
INSERT INTO public.languages VALUES (11, 'Arabic');


INSERT INTO public.interests VALUES (1, 'Dogs');
INSERT INTO public.interests VALUES (2, 'Flutes');
INSERT INTO public.interests VALUES (3, 'SASS');
INSERT INTO public.interests VALUES (4, 'Bouldering');
INSERT INTO public.interests VALUES (5, 'Making memes on discord');
INSERT INTO public.interests VALUES (6, 'Running 6 miles a day');
INSERT INTO public.interests VALUES (7, 'Cooking');
INSERT INTO public.interests VALUES (8, 'Reading Comics');
INSERT INTO public.interests VALUES (9, 'BEEF');
INSERT INTO public.interests VALUES (10, 'Laughing during your Codesmith presentation');
INSERT INTO public.interests VALUES (11, 'Piano');
INSERT INTO public.interests VALUES (12, 'Coffee');
INSERT INTO public.interests VALUES (13, 'Hiking');
INSERT INTO public.interests VALUES (14, 'Stephens cats tail');
INSERT INTO public.interests VALUES (15, 'Pokemon APIs');
INSERT INTO public.interests VALUES (16, 'Photography');
INSERT INTO public.interests VALUES (17, 'Saving Ethans Marriage');
INSERT INTO public.interests VALUES (18, 'Ryans fishbowl shoes');