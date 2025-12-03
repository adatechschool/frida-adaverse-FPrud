"use server";

import { getProjectByPath } from "../actions/projects";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {

  const projectSlug = decodeURIComponent(params.slug);

  const projectResult = await getProjectByPath(projectSlug);

  if (!projectResult.success || !projectResult.data) {
    return (
      <div className="p-10 text-center">
        <h1>Projet non trouvé</h1>
        <p>Aucun projet ne correspond au chemin : {projectSlug} 😔</p>
      </div>
    );
  }

  const project = projectResult.data;

  return (
    <main className="container mx-auto p-10">
      <h1 className="mb-4">{project.title}</h1>
      <p className="text-xl mb-6">Fait par un.e élève de la promotion {project.promotionName}</p>

      <div className="space-y-4">
        <p>
          Catégorie : {project.categoryName}
        </p>
        <p>
          Répertoire : <a href={project.repositoryUrl} target="_blank" className="text-blue-500 hover:underline">{project.repositoryUrl}</a>
        </p>
        <p>
          Démo : <a href={project.demoUrl} target="_blank" className="text-blue-500 hover:underline">{project.demoUrl}</a>
        </p>
      </div>
    </main>
  );
}