"use client";

import { useState, useEffect } from "react";
import { createProject } from "@/app/actions/projects";
import { getCategories } from "../actions/categories";
import { getPromotions } from "../actions/promotions";

interface Item {
    id: number;
    name: string;
}

export const AddProjectForm = () => {

    const [promotions, setPromotions] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Item[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const promotionsResult = await getPromotions();
            if (promotionsResult.success) {
                setPromotions(promotionsResult.data as Item[]);
            }

            const categoriesResult = await getCategories();
            if (categoriesResult.success) {
                setCategories(categoriesResult.data as Item[]);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        await createProject(formData);
    };

    return (
        <form action={handleSubmit} className="flex flex-col w-100 text-center">
            
            
            <input type="text" name="title" placeholder="Nom du projet" required />

            <select name="promotionId" required>
                <option value="">-- Sélectionner une promotion --</option>
                {promotions.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select name="categoryId" required>
                <option value="">-- Sélectionner une categorie --</option>
                {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            <input type="url" name="repositoryUrl" placeholder="URL Répertoire" required />

            <input type="url" name="demoUrl" placeholder="URL Démo" required />

            <button type="submit" className="border-black border-2">Soumettre le projet</button>

        </form>
    )
}