'use server';

import { db } from '@/src/db';
import { promotions } from '@/src/schema';

export async function getPromotions() {
    console.log("Début de l'action : getPromotions");
    
    try {
        const allPromotions = await db.select().from(promotions);

        return {
            success: true,
            data: allPromotions
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des promotions :", error);
        
        return {
            success: false,
            error: "Échec de la récupération des promotions. Vérifiez la connexion à la base de données."
        };
    }
}