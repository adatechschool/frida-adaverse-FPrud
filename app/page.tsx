import Link from "next/link";
import { AddProjectForm } from "./components/AddProjectForm";
import { ProjectsSlideshow } from "./components/ProjectsSlideshow";

export default async function Home() {

  return (
    <main>
      <div id="homeTitle" className="pl-5 pr-5 text-center">
        <h1>AdaProjects</h1>
        <h3>Les projets des élèves d'Ada Tech School</h3>
      </div>

      <ProjectsSlideshow />

      <AddProjectForm />

    </main>
  );
}