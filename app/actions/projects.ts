'use server';

import { db } from '@/src/db';
import { projects, NewProject } from '@/src/schema'
import { sql } from 'drizzle-orm'; // Ajouté pour la vérification des IDs

const generatePath = (title: string): string => {
    const titleWithoutAccents = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const cleanedPath = titleWithoutAccents
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');

    return cleanedPath;
};

export async function createProject(formData: FormData) {
    console.log("Début de l'action : createProject");

    const title = formData.get('title') as string;
    const promotionId = parseInt(formData.get('promotionId') as string);
    const categoryId = parseInt(formData.get('categoryId') as string);
    const repositoryUrl = formData.get('repositoryUrl') as string;
    const demoUrl = formData.get('demoUrl') as string;

    const generatedPath = generatePath(title);
    const creationDate = new Date().toISOString().split('T')[0];

    const projectData: NewProject = {
        title: title,
        path: generatedPath,
        promotionId: promotionId,
        categoryId: categoryId,
        repositoryUrl: repositoryUrl,
        demoUrl: demoUrl,
        creationDate: creationDate
    };

    if (!projectData.title || !projectData.path || isNaN(projectData.promotionId) || isNaN(projectData.categoryId)) {
        console.error("Erreur de validation: Données manquantes ou invalides.");
        return {
            success: false,
            error: "Données de formulaire manquantes ou invalides."
        };
    }

    try {
        const insertedProjects = await db.insert(projects).values(projectData).returning();

        console.log("Projet ajouté : ", projectData);

        return {
            success: true,
            data: insertedProjects[0],
            message: "Projet créé avec succès en mode brouillon."
        };

    } catch (error) {
        console.error('Erreur lors de l\'insertion du projet:', error);

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

export async function getProjects() {
    console.log("Début de l'action : getProjects");

    try {
        const allProjects = await db.select().from(projects);
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