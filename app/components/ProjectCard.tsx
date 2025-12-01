import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface projectItem {
    id: number;
    title: string;
    promotionName: string;
    categoryName: string;
    repositoryUrl: string;
    demoUrl: string;
    creationDate: string;
}

interface ProjectCardProps {
    project: projectItem;
    slicedTitle: (str: string, max: number) => string;
}

const PLACEHOLDER_URL = "/project_picture_placeholder.png";
const THUMBNAIL_SUFFIX = "/blob/main/thumbnail.png?raw=true";


export const ProjectCard: React.FC<ProjectCardProps> = ({ project, slicedTitle }) => {
    
    const potentialThumbnailUrl = project.repositoryUrl + THUMBNAIL_SUFFIX;

    const [imageSrc, setImageSrc] = useState(potentialThumbnailUrl);

    const handleImageError = () => {
        if (imageSrc !== PLACEHOLDER_URL) {
            setImageSrc(PLACEHOLDER_URL);
        }
    };
    
    useEffect(() => {
        setImageSrc(potentialThumbnailUrl);
    }, [potentialThumbnailUrl]); 

    return (
        <div id="project" className="flex flex-col w-xs h-3xs">
            <h3>{slicedTitle(project.title, 20)}</h3>
            <Image
                src={imageSrc}
                alt={project.title}
                width={320}
                height={256}
                onError={handleImageError}
                unoptimized={true}
                className='w-xs h-3xs object-cover'
            />
            <p className="text-justify">
                Crée le {project.creationDate} par un·e élève de la promotion {project.promotionName} dans le cadre du projet {project.categoryName}
            </p>
            <p id="projectInfos" className="flex flex-col">
                <a href={project.repositoryUrl}>Consulter le répertoire</a>
                <a href={project.demoUrl}>Essayer la démo</a>
            </p>
        </div>
    );
};