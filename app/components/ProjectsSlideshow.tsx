"use client";

import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";
import { getProjects } from "../api/projects";
import { ProjectCard } from "./ProjectCard";

interface projectItem {
    id: number;
    title: string;
    promotionName: string;
    categoryName: string;
    repositoryUrl: string;
    demoUrl: string;
    creationDate: string;
}

interface categoryItem {
    id: number;
    name: string;
}

const PLACEHOLDER_URL = "/project_picture_placeholder.png";

const THUMBNAIL_SUFFIX = "/blob/main/thumbnail.png?raw=true";



export const ProjectsSlideshow = () => {

    const [projects, setProjects] = useState<projectItem[]>([]);
    const [categories, setCategories] = useState<categoryItem[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const projectsResult = await getProjects();
            if (projectsResult.success) {
                setProjects(projectsResult.data as projectItem[]);
            }

            const categoriesResult = await getCategories();
            if (categoriesResult.success) {
                setCategories(categoriesResult.data as categoryItem[]);
            }
        };
        loadData();
    }, []);

    const slicedTitle = (str: string, max: number) => {
        if (str.length <= max) {
            return str;
        }
        return str.slice(0, max) + '...';
    };

    return (

        <div id="projectsSlideshow" className="flex flex-col">
            {categories.map((category) => {
                const filteredProjects = projects.filter(
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

    );
}