import { useRef, useState } from "react";

import { CustomInput } from "../../CustomInput";
import Modal from "../../Modal/Modal";

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
};

export const NewProjectForm = ({ onAddNewProject, onCloseModal }) => {
  const dialogRef = useRef();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChangeInputValue = (inputName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputName.toLowerCase()]: newValue,
    }));
  };

  const handleSaveNewProject = (e) => {
    e.preventDefault();

    if (
      formData.title.trim() === "" ||
      formData.description.trim() === "" ||
      formData.date.trim() === ""
    ) {
      dialogRef.current.open();
      return;
    }

    onAddNewProject(formData);
    setFormData(INITIAL_FORM_DATA);

    if (onCloseModal) {
      onCloseModal();
    }
  };

  return (
    <>
      <Modal ref={dialogRef}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <form className="w-[35rem] max-w-xl p-8 flex flex-col justify-center gap-4">
        <CustomInput
          label="Title"
          inputName="title"
          type="text"
          value={formData.title}
          onChange={handleChangeInputValue}
        />

        <CustomInput
          label="Description"
          inputName="description"
          type="text"
          isTextarea
          value={formData.description}
          onChange={handleChangeInputValue}
        />

        <CustomInput
          label="Date"
          inputName="date"
          type="date"
          value={formData.date}
          onChange={handleChangeInputValue}
        />

        <button
          className="w-full px-4 py-2 rounded-md bg-[#E65F2B] hover:shadow-lg"
          onClick={handleSaveNewProject}
        >
          Save
        </button>
      </form>
    </>
  );
};
