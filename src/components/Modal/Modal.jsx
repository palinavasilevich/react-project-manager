import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialogRef = useRef();

  const handleCloseModal = () => dialogRef.current.close();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },

      close() {
        handleCloseModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      className="p-4 backdrop:bg-stone-900/90 bg-[#F2EAE5] rounded-md shadow-md relative"
    >
      {children}
      <button
        onClick={handleCloseModal}
        className="w-8 h-8 absolute top-2 right-2 text-base font-semibold bg-[#E65F2B] rounded-full  hover:shadow-lg"
      >
        X
      </button>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
