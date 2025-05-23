import { useRef } from "react";
import { NewProjectForm } from "../Forms/NewProjectForm";
import Modal from "../Modal/Modal";

export const Sidebar = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onAddNewProject,
}) => {
  const dialogRef = useRef();

  const handleOpenModal = () => {
    dialogRef.current.open();
  };

  const handleCloseModal = () => {
    dialogRef.current.close();
  };

  return (
    <>
      <Modal ref={dialogRef}>
        <NewProjectForm
          onCloseModal={handleCloseModal}
          onAddNewProject={onAddNewProject}
        />
      </Modal>
      <aside className="w-1/3 px-8 py-16 bg-[#060606] opacity-75 text-stone-50 md:w-72 ">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
          Your Projects
        </h2>
        <button
          className="w-full text-left px-2 py-1 rounded-md my-1 hover:bg-[#D8CBCB]/25"
          onClick={handleOpenModal}
        >
          + Add Project
        </button>

        {projects.length > 0 && (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  className={`w-full text-left px-2 py-1 rounded-md my-1 hover:text-stone-200 hover:bg-[#D8CBCB]/25 ${
                    project.id === selectedProjectId
                      ? "text-stone-200 bg-[#D8CBCB]/25"
                      : ""
                  }`}
                  disabled={project.id === selectedProjectId}
                  onClick={() => onSelectProject(project.id)}
                >
                  {project.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
};
