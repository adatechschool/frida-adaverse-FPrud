"use server";

import { db } from '@/lib/db';
import { categories } from '@/lib/schema';

export async function getCategories() {
    try {
        const allCategories = await db.select({
            id: categories.id,
            name: categories.name
        }).from(categories);

        return {
            success: true,
            data: allCategories
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);

        return {
            success: false,
            error: "Échec de la récupération des catégories. Vérifiez la connexion à la base de données."
        };
    }
}