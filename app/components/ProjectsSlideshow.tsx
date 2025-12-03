"use client";

import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";
import { getProjects } from "../api/projects";
import { getPromotions } from "../api/promotions";
import { ProjectCard } from "./ProjectCard";
import { Header } from "./Header";
import { Modal } from "./Modal";
import { AddProjectForm } from "./AddProjectForm";
import { projectItem, categoryItem, promotionItem } from "../types";

const sortProjectsByDate = (projects: projectItem[]): projectItem[] => {
    // Crée une copie du tableau pour éviter la mutation de l'état original
    return [...projects].sort((a, b) => {
        // Convertit les chaînes de date (YYYY-MM-DD) en objets Date pour la comparaison
        const dateA = new Date(a.creationDate).getTime();
        const dateB = new Date(b.creationDate).getTime();

        // Trie DESC : b - a pour le plus récent en premier
        return dateB - dateA;
    });
};

export const ProjectsSlideshow = () => {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPromotionId, setSelectedPromotionId] = useState<string>("/");

    const [projects, setProjects] = useState<projectItem[]>([]);
    const [categories, setCategories] = useState<categoryItem[]>([]);
    const [promotions, setPromotions] = useState<promotionItem[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const projectsResult = await getProjects();
            
            if (projectsResult.success) {
                const fetchedProjects = projectsResult.data as projectItem[];
                
                // ⭐ ÉTAPE CLÉ : Trier les projets avant de les enregistrer dans l'état
                const sortedProjects = sortProjectsByDate(fetchedProjects);
                
                setProjects(sortedProjects); // Enregistre la liste triée
            }

            const categoriesResult = await getCategories();
            if (categoriesResult.success) {
                setCategories(categoriesResult.data as categoryItem[]);
            }

            const promotionsResult = await getPromotions();
            if (promotionsResult.success) {
                setPromotions(promotionsResult.data as promotionItem[]);
            }
        };
        loadData();
    }, []);

    // --- Fonctions pour gérer la modale ---
    const handleOpenForm = () => setIsFormOpen(true);
    const handleCloseForm = () => setIsFormOpen(false);

    // Après soumission réussie du formulaire, on veut fermer la modale
    const handleProjectAdded = () => {
        handleCloseForm();
        // Optionnel : recharger les données des projets ici pour mettre à jour la liste
        // loadData(); 
    }

    const slicedTitle = (str: string, max: number) => {
        if (str.length <= max) {
            return str;
        }
        return str.slice(0, max) + '...';
    };

    // --- LOGIQUE DE FILTRAGE ---
    const filteredProjectsByPromotion = projects.filter((project) => {
        if (selectedPromotionId === "/") {
            return true; // Afficher tous les projets
        }

        // Conversion de la valeur sélectionnée (string) en nombre pour la comparaison
        const selectedIdNumber = Number(selectedPromotionId);

        // Vérification de sécurité et comparaison
        if (isNaN(selectedIdNumber) || project.promotionId == null) {
            return false;
        }

        return project.promotionId === selectedIdNumber;
    });
    // ----------------------------

    return (
        <>
            {/* Remplacement de l'ancienne div "buttons" par le composant Header */}
            <Header
                promotions={promotions}
                selectedPromotionId={selectedPromotionId}
                onPromotionChange={setSelectedPromotionId}
                onOpenForm={handleOpenForm} // ⭐ PASSAGE DE LA FONCTION D'OUVERTURE
            />

            <div id="projectsSlideshow" className="flex flex-col">
                {categories.map((category) => {
                    // Le filtrage par catégorie utilise la liste déjà filtrée par promotion
                    const filteredProjects = filteredProjectsByPromotion.filter(
                        (project) => project.categoryName === category.name
                    );

                    if (filteredProjects.length === 0) {
                        return null;
                    }
                    return (
                        <div key={category.id} className="flex flex-col p-5">
                            <h2 id="categoryTitle">{category.name}</h2>
                            <div id="projectsContainer" className="flex flex-row flex-wrap gap-5 mt-2">
                                {filteredProjects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        slicedTitle={slicedTitle}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
                <br />
            </div>

            <Modal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                title="Soumettre un nouveau projet"
            >
                <AddProjectForm onSuccess={handleProjectAdded} />
            </Modal>

        </>
    );
}