CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"path" text NOT NULL,
	"promotion_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"repository_url" text NOT NULL,
	"demo_url" text NOT NULL,
	"creation_date" date NOT NULL,
	"publication_date" date
);
--> statement-breakpoint
CREATE TABLE "promotions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"starting_year" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;