import Link from "next/link";
import { AddProjectForm } from "./components/AddProjectForm";
import { ProjectsSlideshow } from "./components/ProjectsSlideshow";

export default async function Home() {

  return (
    <main>

      <ProjectsSlideshow />

      <AddProjectForm />

    </main>
  );
}