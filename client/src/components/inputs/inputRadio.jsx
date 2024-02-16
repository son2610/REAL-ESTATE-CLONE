import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const InputRadio = ({
    style = "form-radio",
    containerClassname,
    optionClassname,
    id,
    register,
    errors = {},
    validate,
    inputClassname,
    options,
    label,
}) => {
    return (
        <div
            className={twMerge(
                clsx(
                    "flex flex-col gap-2 w-full items-start mt-4",
                    containerClassname
                )
            )}
        >
            {label && (
                <label className="font-medium text-main-700" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className={twMerge(clsx(optionClassname))}>
                {options.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name={id}
                            id={item.value}
                            value={item.value}
                            className={twMerge(
                                clsx(
                                    style,
                                    "placeholder:text-sm",
                                    inputClassname
                                )
                            )}
                            {...register(id, validate)}
                        />
                        <label
                            className="font-medium text-main-700 cursor-pointer"
                            htmlFor={item.value}
                        >
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>

            {errors[id] && (
                <small className="text-red-500">{errors[id].message}</small>
            )}
        </div>
    );
};

export default InputRadio;
