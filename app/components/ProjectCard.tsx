import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectCardProps } from '../types';


const THUMBNAIL_SUFFIX = "/blob/main/thumbnail.png?raw=true";
const PLACEHOLDER_URL = "/project_picture_placeholder.png";


export const ProjectCard: React.FC<ProjectCardProps> = ({ project, slicedTitle }) => {
    
    const thumbnailUrl = project.repositoryUrl + THUMBNAIL_SUFFIX;

    const [imageSrc, setImageSrc] = useState(thumbnailUrl);

    const handleImageError = () => {
        if (imageSrc !== PLACEHOLDER_URL) {
            setImageSrc(PLACEHOLDER_URL);
        }
    };
    
    useEffect(() => {
        setImageSrc(thumbnailUrl);
    }, [thumbnailUrl]); 

    return (
        <div id="project" className="flex flex-col w-xs h-3xs">
            <Link href={`/${project.path}`}><h3>{slicedTitle(project.title, 20)}</h3></Link>
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
                Projet créé le {project.creationDate} par un·e élève de la promotion {project.promotionName}, dans le cadre du projet {project.categoryName}.
            </p>
            <p id="projectInfos" className="flex flex-col">
                <a href={project.repositoryUrl}>Consulter le répertoire</a>
                <a href={project.demoUrl}>Essayer la démo</a>
            </p>
        </div>
    );
};