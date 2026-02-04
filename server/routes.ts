import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // API Routes
  app.get(api.foods.list.path, async (req, res) => {
    const foods = await storage.getAllFoods();
    res.json(foods);
  });

  app.get(api.foods.getBySlug.path, async (req, res) => {
    const food = await storage.getFoodBySlug(req.params.slug);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(food);
  });

  // Seed Data Function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingFoods = await storage.getAllFoods();
  if (existingFoods.length > 0) return;

  const foodsData = [
    {
      slug: "honey",
      name: "Honey",
      arabicName: "Asl (عسل)",
      imageUrl: "/images/honey.jpg",
      description: "Honey is described as a source of healing in the Quran and is known for its immense health benefits.",
      quranReference: "And your Lord inspired to the bee... There emerges from their bellies a drink, varying in colors, in which there is healing for people. (Surah An-Nahl 16:68-69)",
      hadithReference: "The Prophet (ﷺ) said: 'Healing is in three things: a gulp of honey, cupping, and branding with fire (cauterizing).' (Sahih Bukhari)",
      healthBenefits: [
        "Rich in antioxidants",
        "Better wound healing",
        "Soothes sore throats",
        "Boosts immunity",
        "Improves digestion",
        "Natural energy booster"
      ],
      nutritionalInfo: {
        "Calories": "304 kcal",
        "Carbohydrates": "82g",
        "Sugar": "82g",
        "Protein": "0.3g",
        "Fat": "0g"
      }
    },
    {
      slug: "dates",
      name: "Dates",
      arabicName: "Tamr (تمر)",
      imageUrl: "/images/dates.jpg",
      description: "Dates are a blessed fruit often eaten to break fasts, known for their sweetness and nutritional value.",
      quranReference: "And shake toward you the trunk of the palm tree; it will drop upon you fresh, ripe dates. (Surah Maryam 19:25)",
      hadithReference: "The Prophet (ﷺ) said: 'He who eats seven Ajwa dates every morning, will not be affected by poison or magic on the day he eats them.' (Sahih Bukhari)",
      healthBenefits: [
        "High in fiber",
        "Promotes brain health",
        "Natural sweetener",
        "Bone health support",
        "Energy booster",
        "Helps in labor"
      ],
      nutritionalInfo: {
        "Calories": "277 kcal",
        "Fiber": "7g",
        "Potassium": "696mg",
        "Magnesium": "54mg",
        "Protein": "1.8g"
      }
    },
    {
      slug: "olive-oil",
      name: "Olive Oil",
      arabicName: "Zayt (زيت)",
      imageUrl: "/images/olive_oil.jpg",
      description: "Olive oil comes from a blessed tree and is a staple in Islamic medicine and diet.",
      quranReference: "Lit from a blessed tree - an olive, neither of the east nor of the west, whose oil would almost glow even if untouched by fire. (Surah An-Nur 24:35)",
      hadithReference: "The Prophet (ﷺ) said: 'Eat olive oil and use it on your hair and skin, for it comes from a blessed tree.' (Tirmidhi)",
      healthBenefits: [
        "Heart health",
        "Anti-inflammatory",
        "Rich in Vitamin E",
        "Brain protection",
        "Weight management",
        "Skin health"
      ],
      nutritionalInfo: {
        "Calories": "884 kcal",
        "Total Fat": "100g",
        "Vitamin E": "14mg",
        "Vitamin K": "60µg",
        "Cholesterol": "0mg"
      }
    },
    {
      slug: "black-seed",
      name: "Black Seed",
      arabicName: "Habbat as-Sawda (حبة البركة)",
      imageUrl: "/images/black_seed.jpg",
      description: "Also known as Nigella Sativa, it is highly revered for its medicinal properties.",
      quranReference: "Not explicitly mentioned by name in Quran, but referred to in Hadith strongly.",
      hadithReference: "The Prophet (ﷺ) said: 'Use this Black Seed, for in it is a cure for every disease except death.' (Sahih Bukhari)",
      healthBenefits: [
        "Boosts immune system",
        "Lowers cholesterol",
        "Anti-bacterial",
        "Liver protection",
        "Regulates blood sugar",
        "Skin conditions"
      ],
      nutritionalInfo: {
        "Iron": "High",
        "Calcium": "High",
        "Potassium": "High",
        "Fiber": "High",
        "Protein": "High"
      }
    },
    {
      slug: "milk",
      name: "Milk",
      arabicName: "Laban (لبن)",
      imageUrl: "/images/milk.jpg",
      description: "Pure milk is a complete food and a drink of Paradise.",
      quranReference: "And indeed, for you in grazing livestock is a lesson. We give you drink from what is in their bellies... pure milk, pleasant to those who drink. (Surah An-Nahl 16:66)",
      hadithReference: "The Prophet (ﷺ) said: 'Drink milk, for it wipes away heat from the heart just as the finger wipes away sweat from the brow.' (Sunan Ibn Majah)",
      healthBenefits: [
        "Bone health (Calcium)",
        "Muscle growth (Protein)",
        "Heart health",
        "Dental health",
        "Hydration",
        "Vitamin D source"
      ],
      nutritionalInfo: {
        "Calories": "42 kcal",
        "Protein": "3.4g",
        "Calcium": "125mg",
        "Vitamin B12": "0.4µg",
        "Fat": "1g"
      }
    },
    {
      slug: "figs",
      name: "Figs",
      arabicName: "Tin (تين)",
      imageUrl: "/images/figs.jpg",
      description: "Figs are among the fruits of Paradise and sworn by in the Quran.",
      quranReference: "By the fig and the olive. (Surah At-Tin 95:1)",
      hadithReference: "The Prophet (ﷺ) said: 'If I were to say a fruit was sent down from Paradise, I would say it is this.' (Abu Darda)",
      healthBenefits: [
        "Digestive health",
        "Heart health",
        "Regulates blood sugar",
        "Bone density",
        "Skin health",
        "Weight management"
      ],
      nutritionalInfo: {
        "Calories": "74 kcal",
        "Fiber": "2.9g",
        "Vitamin K": "4.7µg",
        "Potassium": "232mg",
        "Sugar": "16g"
      }
    },
    {
      slug: "pomegranate",
      name: "Pomegranate",
      arabicName: "Rumman (رمان)",
      imageUrl: "/images/pomegranate.jpg",
      description: "A fruit mentioned multiple times in the Quran as one of the favors of God.",
      quranReference: "In both of them are fruit and palm trees and pomegranates. (Surah Ar-Rahman 55:68)",
      hadithReference: "Ali (RA) said: 'Eat pomegranate with its pulp, for it tans the stomach (cleanses it).' (Musnad Ahmad)",
      healthBenefits: [
        "Rich in antioxidants",
        "Vitamin C boost",
        "Cancer prevention properties",
        "Alzheimer's protection",
        "Digestion aid",
        "Anti-inflammatory"
      ],
      nutritionalInfo: {
        "Calories": "83 kcal",
        "Fiber": "4g",
        "Vitamin C": "10.2mg",
        "Vitamin K": "16.4µg",
        "Potassium": "236mg"
      }
    },
    {
      slug: "grapes",
      name: "Grapes",
      arabicName: "Inab (عنب)",
      imageUrl: "/images/grapes.jpg",
      description: "Grapes are mentioned as a blessing and provision for mankind.",
      quranReference: "And We produce therein gardens of palm trees and grapes... (Surah Ya-Sin 36:34)",
      hadithReference: "The Prophet (ﷺ) was known to enjoy fresh grapes and raisins.",
      healthBenefits: [
        "Heart health",
        "Eye health",
        "Immune system",
        "Healthy skin",
        "Brain function",
        "Knee pain relief"
      ],
      nutritionalInfo: {
        "Calories": "69 kcal",
        "Vitamin C": "3.2mg",
        "Vitamin K": "14.6µg",
        "Sugar": "15g",
        "Water": "81%"
      }
    },
    {
      slug: "barley",
      name: "Barley",
      arabicName: "Sha'ir (شعير)",
      imageUrl: "/images/barley.jpg",
      description: "Barley was a staple food of the Prophet (ﷺ) and is the main ingredient in Talbina.",
      quranReference: "Mentioned indirectly as grain/produce in various verses.",
      hadithReference: "The Prophet (ﷺ) said: 'Talbina (barley broth) gives rest to the heart of the patient and makes it active and relieves some of his sorrow and grief.' (Sahih Bukhari)",
      healthBenefits: [
        "High fiber content",
        "Lowers cholesterol",
        "Digestive health",
        "Control blood sugar",
        "Weight loss",
        "Gallstone prevention"
      ],
      nutritionalInfo: {
        "Calories": "354 kcal",
        "Fiber": "17g",
        "Protein": "12g",
        "Iron": "3.6mg",
        "Magnesium": "133mg"
      }
    }
  ];

  for (const food of foodsData) {
    await storage.createFood(food);
  }
}
