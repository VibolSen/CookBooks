import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/app/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      recipeTitle,
      description,
      preparationTime,
      cookTime,
      ingredients,
      instructions,
      preparationInstructions,
      note,
      resultImages,
      bannerImage,
      ingredientsImage,
    } = req.body;

    try {
      // Insert recipe into the database
      const result = await query(
        "INSERT INTO recipes (title, description, preparation_time, cook_time, ingredients, instructions, preparation_instructions, note, result_images, banner_image, ingredients_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          recipeTitle,
          description,
          preparationTime,
          cookTime,
          ingredients,
          instructions,
          preparationInstructions,
          note,
          JSON.stringify(resultImages),
          bannerImage,
          ingredientsImage,
        ]
      );

      res.status(200).json({ success: true, message: "Recipe added successfully!" });
    } catch (error) {
      console.error("Error adding recipe:", error);
      res.status(500).json({ success: false, error: "Failed to add recipe. Please try again." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
