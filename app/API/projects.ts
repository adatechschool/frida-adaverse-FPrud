"use server";

import { db } from '@/lib/db';
import { projects, NewProject, categories, promotions } from '@/lib/schema'
import { eq } from 'drizzle-orm';
import { projectItem } from "../types";

// crée un chemin à partir du titre + id
const generatePath = (title: string, id?: number): string => {
    const titleWithoutAccents = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const cleanedPath = titleWithoutAccents
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');

    if (id) {
        return `${cleanedPath}_${id}`;
    }

    return cleanedPath;
};

// assemble la saisie du formulaire dans un objet et l'envoit grace à Drizzle, puis récupère son id et modifie le chemin "path" avec title_id
export async function createProject(formData: FormData) {

    const title = formData.get('title') as string;
    const promotionId = parseInt(formData.get('promotionId') as string);
    const categoryId = parseInt(formData.get('categoryId') as string);
    const repositoryUrl = formData.get('repositoryUrl') as string;
    const demoUrl = formData.get('demoUrl') as string;
    const tempPath = generatePath(title);
    const creationDate = new Date().toISOString().split('T')[0];

    const projectData: NewProject = {
        title: title,
        path: tempPath,
        promotionId: promotionId,
        categoryId: categoryId,
        repositoryUrl: repositoryUrl,
        demoUrl: demoUrl,
        creationDate: creationDate
    };

    if (!projectData.title || isNaN(projectData.promotionId) || isNaN(projectData.categoryId)) {
        console.error("Erreur de validation: Données manquantes ou invalides.");
        return {
            success: false,
            error: "Données de formulaire manquantes ou invalides."
        };
    }

    try {
        const insertedProjects = await db.insert(projects).values(projectData).returning();

        if (insertedProjects.length === 0) {
            throw new Error("Échec de l'insertion initiale du projet.");
        }

        const newProject = insertedProjects[0];
        const projectId = newProject.id;

        const finalPath = generatePath(newProject.title, projectId);

        const updatedProjects = await db.update(projects)
            .set({ path: finalPath })
            .where(eq(projects.id, projectId))
            .returning();

        const finalProject = updatedProjects[0];

        console.log("Projet ajouté et chemin mis à jour : ", finalProject);

        return {
            success: true,
            data: finalProject,
            message: "Projet créé avec succès avec un chemin unique."
        };

    } catch (error) {
        console.error('Erreur lors de l\'insertion ou de la mise à jour du projet:', error);

        if (error instanceof Error && error.message.includes('foreign key constraint')) {
            return {
                success: false,
                error: "Erreur de clé étrangère : L'ID de Promotion ou de Catégorie sélectionné n'existe pas."
            };
        }

        return {
            success: false,
            error: "Échec de l'insertion du projet. Erreur inconnue."
        };
    }
}

// récupère tous les projets
export async function getProjects() {
    console.log("Début de l'action : getProjects");

    try {
        const allProjects = await db.select({
            id: projects.id,
            title: projects.title,
            path: projects.path,
            promotionId: projects.promotionId,
            promotionName: promotions.name,
            categoryName: categories.name,
            repositoryUrl: projects.repositoryUrl,
            demoUrl: projects.demoUrl,
            creationDate: projects.creationDate
        })
            .from(projects)
            .leftJoin(categories, eq(projects.categoryId, categories.id))
            .leftJoin(promotions, eq(projects.promotionId, promotions.id));

        return {
            success: true,
            data: allProjects
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
        return {
            success: false,
            error: "Échec de la récupération des projets. Vérifiez la connexion à la base de données."
        };
    }
}

// récupère un seul projet par son chemin "path"
export async function getProjectByPath(path: string): Promise<{ success: boolean, data?: projectItem | null, error?: string }> {
    console.log(`Début de l'action : getProjectByPath pour le chemin ${path}`);

    try {
        const projectDetails = await db.select({
            id: projects.id,
            title: projects.title,
            path: projects.path,
            promotionName: promotions.name,
            promotionId: projects.promotionId,
            categoryName: categories.name,
            categoryId: projects.categoryId,
            repositoryUrl: projects.repositoryUrl,
            demoUrl: projects.demoUrl,
            creationDate: projects.creationDate,
        })
            .from(projects)
            .leftJoin(categories, eq(projects.categoryId, categories.id))
            .leftJoin(promotions, eq(projects.promotionId, promotions.id))
            .where(eq(projects.path, path))
            .limit(1);

        if (projectDetails.length === 0) {
            return { success: true, data: null };
        }

        return {
            success: true,
            data: projectDetails[0] as projectItem
        };

    } catch (error) {
        console.error("Erreur lors de la récupération du projet par chemin :", error);
        return {
            success: false,
            error: "Échec de la récupération du projet. Erreur DB/réseau."
        };
    }
}