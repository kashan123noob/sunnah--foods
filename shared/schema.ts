import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // e.g., 'honey', 'dates'
  name: text("name").notNull(),
  arabicName: text("arabic_name"),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  quranReference: text("quran_reference"),
  hadithReference: text("hadith_reference"),
  // Storing as JSON arrays for flexibility
  healthBenefits: jsonb("health_benefits").$type<string[]>().notNull(),
  nutritionalInfo: jsonb("nutritional_info").$type<Record<string, string>>().notNull(),
});

export const insertFoodSchema = createInsertSchema(foods).omit({ id: true });

export type Food = typeof foods.$inferSelect;
export type InsertFood = z.infer<typeof insertFoodSchema>;
