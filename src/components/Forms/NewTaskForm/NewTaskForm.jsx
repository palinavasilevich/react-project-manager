import { useState } from "react";
import { CustomInput } from "../../CustomInput";

const INITIAL_FORM_DATA = {
  title: "",
};

export const NewTaskForm = ({ onAddNewTask }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isNotValid, setIsNotValid] = useState(false);

  const handleChangeInputValue = (inputName, newValue) => {
    setIsNotValid(false);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputName]: newValue,
    }));
  };

  const handleSaveNewTask = (e) => {
    e.preventDefault();

    if (formData.title.trim() === "") {
      setIsNotValid(true);
      return;
    }

    onAddNewTask(formData);
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <form className="flex justify-between items-end gap-6">
      <CustomInput
        label="Title"
        type="text"
        inputName="title"
        isNotValid={isNotValid}
        value={formData.title}
        onChange={handleChangeInputValue}
      />

      <button
        className="w-1/2 px-4 py-2 rounded-md bg-[#E65F2B] hover:shadow-lg"
        onClick={handleSaveNewTask}
      >
        Add Task
      </button>
    </form>
  );
};
