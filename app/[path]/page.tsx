import { getProjectByPath } from "@/app/api/projects";
import { notFound } from "next/navigation";
import { ProjectCardProps } from "@/app/types"; // Assurez-vous d'ajuster le chemin d'importation

// Définissez les props attendues par cette page (les paramètres dynamiques)
interface ProjectPageProps {
  params: {
    path: string; // Correspond au nom du dossier dynamique [path]
  };
}

// Fonction utilitaire (à déplacer dans un fichier utils si elle est réutilisée)
const slicedTitle = (str: string, max: number) => {
    if (str.length <= max) {
        return str;
    }
    return str.slice(0, max) + '...';
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  // 1. Récupérer le chemin depuis les paramètres de l'URL
  const projectPath = params.path;
  
  // 2. Récupérer les données du projet via l'action serveur
  const result = await getProjectByPath(projectPath);

  // 3. Gérer l'erreur ou l'absence de projet
  if (!result.success) {
    console.error(result.error);
    // Next.js offre notFound() pour afficher une page 404
    notFound(); 
  }

  const project = result.data;
  
  // 4. Afficher les détails du projet
  return (
    <main className="flex flex-col items-center p-10">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-gray-600 mb-8">
            Projet créé le **{project.creationDate}** par un·e élève de la promotion **{project.promotionName}**, dans le cadre du projet **{project.categoryName}**.
        </p>

        {/* Optionnel : Réutiliser votre ProjectCard ou afficher les détails différemment */}
        <div className="flex flex-col gap-4">
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                🔗 Consulter le répertoire GitHub
            </a>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
                ▶️ Essayer la démo du projet
            </a>
        </div>
        
        {/* Vous pouvez ajouter ici plus de détails comme la description, etc. */}

        {/* Vous pouvez potentiellement utiliser la ProjectCard pour l'affichage, mais cela pourrait être redondant
        <ProjectCard
            key={project.id}
            project={project}
            slicedTitle={slicedTitle}
        /> */}

      </div>
    </main>
  );
}