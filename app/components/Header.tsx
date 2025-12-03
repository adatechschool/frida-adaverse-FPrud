"use client";

import React from "react";
import { promotionItem } from "../types";
import Link from "next/link";

interface HeaderProps {
    promotions: promotionItem[];
    selectedPromotionId: string;
    onPromotionChange: (id: string) => void;
    onOpenForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    promotions,
    selectedPromotionId,
    onPromotionChange,
    onOpenForm,
}) => {

    const handlePromotionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onPromotionChange(event.target.value);
    };

    return (

        <header id="homeTitle" className="flex flex-col flex-wrap justify-around items-center p-5 text-center">
            <div id="Titles" className="mb-5">
                <Link href="/"><h1>AdaProjects</h1></Link>
                <h3>Les projets des élèves d'Ada Tech School</h3>
            </div>

            
                <div id="buttons" className="flex gap-4">
                    <select
                        className="border-black border-2 p-2"
                        value={selectedPromotionId}
                        onChange={handlePromotionChange}
                    >
                        <option value="/">Toutes les promotions</option>
                        {promotions.map((promotion) => (
                            <option
                                key={promotion.id}
                                // Toujours s'assurer que la valeur est une chaîne de caractères
                                value={promotion.id.toString()}
                            >
                                {promotion.name}
                            </option>
                        ))}
                    </select>
                    <button 
                    className="border-black border-2 p-2"
                    onClick={onOpenForm}
                >
                    Soumettre un projet
                </button>
                </div>
        </header>
    );
};