import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { storage } from "./utils/storage";

import { Sidebar } from "./components/Sidebar";
import { NewProjectForm } from "./components/Forms/NewProjectForm";
import { SelectedProject } from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    projects: storage.getItem("projects") ?? [],
    selectedProjectId: storage.getItem("selectedProjectId") ?? null,
  });

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const handleAddNewProject = (newProjectData) => {
    setProjectsState((prevProjectsState) => {
      const newProjects = [
        ...prevProjectsState.projects,
        { id: uuidv4(), ...newProjectData },
      ];

      const newProjectsState = { ...prevProjectsState, projects: newProjects };

      storage.setItem("projects", newProjects);

      return newProjectsState;
    });
  };

  const handleSelectProject = (projectId) => {
    setProjectsState((prevProjectsState) => {
      storage.setItem("selectedProjectId", projectId);

      return {
        ...prevProjectsState,
        selectedProjectId: projectId,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectsState((prevProjectsState) => {
      const newProjects = prevProjectsState.projects.filter(
        (project) => project.id !== prevProjectsState.selectedProjectId
      );

      storage.setItem("projects", newProjects);
      storage.removeItem("selectedProjectId");

      return {
        ...prevProjectsState,
        projects: newProjects,
        selectedProjectId: null,
      };
    });
  };

  const handleAddNewTask = (newTaskData) => {
    setProjectsState((prevProjectsState) => {
      const projectTasks = selectedProject.tasks ?? [];

      const newSelectedProject = {
        ...selectedProject,
        tasks: [...projectTasks, { id: uuidv4(), ...newTaskData }],
      };

      const newProjects = [
        ...prevProjectsState.projects.filter(
          (project) => project.id !== newSelectedProject.id
        ),
        newSelectedProject,
      ];

      storage.setItem("projects", newProjects);

      return { ...prevProjectsState, projects: newProjects };
    });
  };

  const handleDeleteTask = (taskId) => {
    setProjectsState((prevProjectsState) => {
      const newSelectedProject = {
        ...selectedProject,
        tasks: selectedProject.tasks.filter((task) => task.id !== taskId),
      };

      const newProjects = [
        ...prevProjectsState.projects.filter(
          (project) => project.id !== newSelectedProject.id
        ),
        newSelectedProject,
      ];

      storage.setItem("projects", newProjects);

      return { ...prevProjectsState, projects: newProjects };
    });
  };

  return (
    <div className="h-screen flex">
      <Sidebar
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
        onSelectProject={handleSelectProject}
        onAddNewProject={handleAddNewProject}
      />
      <main className="w-full flex justify-center items-center">
        {!projectsState.selectedProjectId && (
          <div className="bg-[#F2EAE5]/50 rounded-md shadow-sm">
            <NewProjectForm onAddNewProject={handleAddNewProject} />
          </div>
        )}

        {projectsState.selectedProjectId && selectedProject && (
          <SelectedProject
            {...selectedProject}
            onAddNewTask={handleAddNewTask}
            onDeleteTask={handleDeleteTask}
            onDeleteProject={handleDeleteProject}
          />
        )}
      </main>
    </div>
  );
}

export default App;
