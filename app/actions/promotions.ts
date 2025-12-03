"use server";

import { db } from '@/lib/db';
import { promotions } from '@/lib/schema';

export async function getPromotions() {
    try {
        const allPromotions = await db.select({
            id: promotions.id,
            name: promotions.name,
            beginning: promotions.beginning
        }).from(promotions);

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