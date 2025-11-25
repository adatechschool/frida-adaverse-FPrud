'use server';

import { db } from '@/src/db';
import { categories } from '@/src/schema';

export async function getCategories() {
    console.log("Début de l'action : getCategories");
    
    try {
        const allCategories = await db.select().from(categories);

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