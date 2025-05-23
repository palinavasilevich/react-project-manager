import { NewTaskForm } from "../Forms/NewTaskForm";

import { dateFormat } from "../../utils/dateFormat";
import { Tasks } from "../Tasks";

export const SelectedProject = ({
  title,
  description,
  date,
  tasks,
  onAddNewTask,
  onDeleteTask,
  onDeleteProject,
}) => {
  return (
    <section className="w-9/12 max-w-4xl p-8 relative flex flex-col justify-center gap-8 bg-[#F2EAE5]/50 rounded-md shadow-sm">
      <div>
        <h2 className="my-2 text-xl font-bold text-stone-500">
          {title.toUpperCase()}
        </h2>
        <p className="text-stone-400 mb-2">{dateFormat(date)}</p>
        <p className="mt-2">{description}</p>
      </div>
      <Tasks
        tasks={tasks}
        onAddNewTask={onAddNewTask}
        onDeleteTask={onDeleteTask}
      />
      <button
        className="py-2 px-4 absolute top-2 right-2 text-base font-semibold rounded-lg bg-stone-300 hover:shadow-lg"
        onClick={onDeleteProject}
      >
        Delete
      </button>
    </section>
  );
};
