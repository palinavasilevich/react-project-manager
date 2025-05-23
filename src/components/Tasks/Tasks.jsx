import { NewTaskForm } from "../Forms/NewTaskForm";

export const Tasks = ({ tasks, onAddNewTask, onDeleteTask }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      <div className="w-2/3">
        <NewTaskForm onAddNewTask={onAddNewTask} />
      </div>

      <div className="mt-10 pt-4">
        {!tasks?.length && (
          <p className="text-lg font-semibold">
            This project doesn't have any tasks yet.
          </p>
        )}
        {tasks?.length > 0 && (
          <ul className="p-4 mt-2 rounded-lg bg-stone-200/60">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center my-4 text-stone-700"
              >
                <p className="text-base">{task.title}</p>
                <button
                  className="font-semibold text-lg hover:text-[#E65F2B]"
                  onClick={() => onDeleteTask(task.id)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
