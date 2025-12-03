export interface projectItem {
    id: number;
    title: string;
    path: string;
    promotionName: string;
    promotionId: number;
    categoryName: string;
    categoryId: number;
    repositoryUrl: string;
    demoUrl: string;
    creationDate: string;
}

export interface ProjectCardProps {
    project: projectItem;
    slicedTitle: (str: string, max: number) => string;
}

export interface categoryItem {
    id: number;
    name: string;
}

export interface promotionItem {
    id: number;
    name: string;
    beginning: string
}

export interface Item {
    id: number;
    name: string;
}