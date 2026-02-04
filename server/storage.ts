import { db } from "./db";
import { foods, type Food, type InsertFood } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllFoods(): Promise<Food[]>;
  getFoodBySlug(slug: string): Promise<Food | undefined>;
  createFood(food: InsertFood): Promise<Food>;
}

export class DatabaseStorage implements IStorage {
  async getAllFoods(): Promise<Food[]> {
    return await db.select().from(foods);
  }

  async getFoodBySlug(slug: string): Promise<Food | undefined> {
    const [food] = await db.select().from(foods).where(eq(foods.slug, slug));
    return food;
  }

  async createFood(insertFood: InsertFood): Promise<Food> {
    const [food] = await db.insert(foods).values(insertFood).returning();
    return food;
  }
}

export const storage = new DatabaseStorage();
