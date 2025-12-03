"use client";

import { useState, useEffect } from "react";
import { getCategories } from "../actions/categories";
import { getProjects } from "../actions/projects";
import { getPromotions } from "../actions/promotions";
import { ProjectCard } from "./ProjectCard";
import { Header } from "./Header";
import { Modal } from "./Modal";
import { AddProjectForm } from "./AddProjectForm";
import { projectItem, categoryItem, promotionItem } from "../types";

const sortProjectsByDate = (projects: projectItem[]): projectItem[] => {
    return [...projects].sort((a, b) => {
        const dateA = new Date(a.creationDate).getTime();
        const dateB = new Date(b.creationDate).getTime();

        // Trie : b - a pour le plus récent en premier
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
                
                const sortedProjects = sortProjectsByDate(fetchedProjects);
                
                setProjects(sortedProjects);
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

    const handleOpenForm = () => setIsFormOpen(true);
    const handleCloseForm = () => setIsFormOpen(false);

    const handleProjectAdded = () => {
        handleCloseForm();
    }

    const slicedTitle = (str: string, max: number) => {
        if (str.length <= max) {
            return str;
        }
        return str.slice(0, max) + '...';
    };

    const filteredProjectsByPromotion = projects.filter((project) => {
        if (selectedPromotionId === "/") {
            return true;
        }

        const selectedIdNumber = Number(selectedPromotionId);

        if (isNaN(selectedIdNumber) || project.promotionId == null) {
            return false;
        }

        return project.promotionId === selectedIdNumber;
    });
    // ----------------------------

    return (
        <>
            <Header
                promotions={promotions}
                selectedPromotionId={selectedPromotionId}
                onPromotionChange={setSelectedPromotionId}
                onOpenForm={handleOpenForm}
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