import {
    pgTable,
    serial,
    text,
    integer,
    date,
} from 'drizzle-orm/pg-core';

// --- Table 'promotions' ---
export const promotions = pgTable('promotions', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    beginning: date('beginning').notNull(),
});

// --- Table 'categories' ---
export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

// --- Table 'projects' ---
export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    path: text('path').notNull(),
    promotionId: integer('promotion_id').references(() => promotions.id).notNull(),
    categoryId: integer('category_id').references(() => categories.id).notNull(),
    repositoryUrl: text('repository_url'),
    demoUrl: text('demo_url'),
    creationDate: date('creation_date').notNull(),
    publicationDate: date('publication_date'),
});

export type NewProject = typeof projects.$inferInsert;