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
        <div id="project" className="flex flex-col w-[360px] h-3xs p-2 bg-linear-to-tr from-[#F5EBE0] to-[#fffff]">
            <Link href={`/${project.path}`}><h3>{slicedTitle(project.title, 30)}</h3>
                <Image
                    src={imageSrc}
                    alt={project.title}
                    width={360}
                    height={240}
                    onError={handleImageError}
                    unoptimized={true}
                    className="w-[360px] h-60 object-cover rounded-[5px]"
                />
            </Link>
            <p className="text-justify">
                Projet créé le {project.creationDate} par un·e élève de la promotion {project.promotionName}, dans le cadre du projet {project.categoryName}.
            </p>
            <p id="projectInfos" className="flex flex-col">
                <a href={project.repositoryUrl} target='_blank'>Consulter le répertoire</a>
                <a href={project.demoUrl} target='_blank'>Essayer la démo</a>
            </p>
        </div>
    );
};