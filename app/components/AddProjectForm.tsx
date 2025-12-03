"use client";

import { useState, useEffect } from "react";
import { createProject } from "../api/projects";
import { getCategories } from "../api/categories";
import { getPromotions } from "../api/promotions";
import { Item } from "../types";

interface AddProjectFormProps {
    onSuccess: () => void;
}

export const AddProjectForm: React.FC<AddProjectFormProps> = ({ onSuccess }) => {

    const [promotions, setPromotions] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Item[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        const result = await createProject(formData);

        if (result && result.success) {
            alert("Projet ajouté avec succès !");
            onSuccess();
        } else {
            alert(`Erreur lors de l'ajout du projet : ${result?.error || 'Inconnue'}`);
        }

        setIsSubmitting(false);
    };

    return (
        <form action={handleSubmit} className="flex flex-col gap-4 w-100">

            <input type="text" name="title" placeholder="Nom du projet" required className="border p-2" />

            <select name="promotionId" required className="border p-2">
                <option value="">-- Sélectionner une promotion --</option>
                {promotions.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select name="categoryId" required className="border p-2">
                <option value="">-- Sélectionner une categorie --</option>
                {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            <input type="url" name="repositoryUrl" placeholder="URL Répertoire" required className="border p-2" />

            <input type="url" name="demoUrl" placeholder="URL Démo" required className="border p-2" />

            <button
                type="submit"
                className={`border p-2 text-white font-bold mt-2 ${isSubmitting ? 'bg-gray-400' : 'bg-green-600'}`}
                disabled={isSubmitting} // Désactiver pendant la soumission
            >
                {isSubmitting ? 'Soumission en cours...' : 'Soumettre le projet'}
            </button>

        </form>
    )
}