import { useId } from "react";

export const CustomInput = ({
  label,
  inputName,
  value,
  isTextarea,
  isNotValid,
  onChange,
  ...props
}) => {
  const inputId = useId();

  const classes = `w-full mt-2 p-2 border-b-2 rounded-md border-stone-300 bg-stone-200/60 text-stone-600 focus:outline-none focus:border-stone-600 ${
    isNotValid ? "border-red-500" : ""
  }`;

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="text-base font-bold uppercase">
        {label}
      </label>
      <div className="relative">
        {!isTextarea ? (
          <input
            id={inputId}
            value={value}
            onChange={(e) => onChange(inputName, e.target.value)}
            className={classes}
            {...props}
          />
        ) : (
          <textarea
            id={inputId}
            value={value}
            onChange={(e) => onChange(inputName, e.target.value)}
            className={classes}
            {...props}
          />
        )}

        {isNotValid && (
          <span className="text-red-500 absolute -bottom-6 left-0">
            This field is required.
          </span>
        )}
      </div>
    </div>
  );
};
