import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const TextArea = ({
    style = "form-textarea",
    containerClassname,
    label,
    id,
    type = "text",
    register,
    errors = {},
    inputClassname,
    validate,
    placeholder,
}) => {
    return (
        <div
            className={twMerge(
                clsx("flex flex-col gap-2 w-full", containerClassname)
            )}
        >
            {label && (
                <label className="font-medium text-main-700" htmlFor={id}>
                    {label}
                </label>
            )}
            <textarea
                type={type}
                id={id}
                className={twMerge(
                    clsx(style, "placeholder:text-sm", inputClassname)
                )}
                {...register(id, validate)}
                placeholder={placeholder}
                rows={5}
            ></textarea>
            {errors[id] && (
                <small className="text-red-500">{errors[id].message}</small>
            )}
        </div>
    );
};

export default TextArea;
