# Adaverse

Adaverse une plateforme de partage pour les différents projets des étudiants d'Ada Tech School. L'objectif est de rassembler chaque projet de chaque promo de l'école, et les rendre accessibles depuis une galerie. L'enjeu est de concevoir la base de donnée, ses communications avec le serveur, et la mise en page de la plateforme.

## Journal de réalisation

### 24/11/2025
- Lecture et analyse du projet
- Mise en place du repertoire
- Création du fichier readme.md
- Installation de l'environnement Next.js
- Installation de l'ORM Drizzle
- Initiation communication de la bdd serverless sur Neon
- Conception du wireframe (voir /conception/wireframe.excalidraw)
- Conception théorique de la bdd
- Initiation du CRUD avec Drizzle

### 25/11/2025
- Création des tables categories et promotions, directement en PgSQL sur Neon (scripts indiqués dans /src)
- Création des routes GET et POST dans /app/actions
- Création du formulaire AddProjectForm.tsx pour soumettre un nouveau projet
- Ajout des menus déroulants promotionId et categoryId, qui utilisent GET pour générer les options
- Créer les sections dynamiques (l'admin pourra ajouter de nouvelles catégories)

### 26/11/2025
- Création de la page d'accueil
- Création du ProjectsSlideshow pour afficher les miniatures des projets

## 27/11/2025
- Refacto des fonctions GET
- Mise en page de ProjectSlideshow : map des catégories et map des projets
- Filtre des projets qui n'apparaissent que dans la bonne catégorie
- Apparition conditionnelle des catégories, si elles ne sont pas vides

## 28/11/2025
- Création d'une image placeholder
- Récupération d'un fichier image nommé '/blob/main/thumbnail.png?raw=true', ajouté à l'url du repo githhub

## 01/12/2025
- Création de la page de détails
- Création des chemins dynamiques en front

## 02/12/2025
- Filtre des projets affichés par promotion (menu déroulant)
- Transformation du formulaire en pop-up

## 03/12/2025
- Affichage des projet dans l'ordre anti-chronologique (plus récent en premier)
- Application du style avec Tailwind

## Liste des tâches restantes :