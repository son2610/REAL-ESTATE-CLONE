import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { MdFileUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
// import instance from "~/axios";
import { apiUploadImages } from "~/apis/beyond";
import { CgSpinner } from "react-icons/cg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const InputFile = ({
    containerClassname,
    label,
    id,
    // register,
    // errors = {},
    validate,
    multiple,
    getImages,
    errors,
}) => {
    const {
        register,
        // formState: { errors },
        watch,
    } = useForm();
    const rawImages = watch(id);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const uploadPromise = [];
    const handleUpload = async (files) => {
        const formData = new FormData();
        // const imageLink = [];
        setIsLoading(true);
        for (let file of files) {
            formData.append("file", file);
            formData.append(
                "upload_preset",
                import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESETS
            );
            uploadPromise.push(apiUploadImages(formData));

            const response = await apiUploadImages(formData);
            // // sau khi đã có response ta set lại data chỉ cần lấy id là đường dẫn thôi
            // if (response.status === 200) {
            //     imageLink.push({
            //         path: response.data.secure_url,
            //         id: response.data.public_id,
            //     });
            // }
        }
        const response = await Promise.all(uploadPromise);
        setIsLoading(false);
        // setImages(imageLink);
        // if (response && response.length > 0) {
        //     const imagesArray = response
        //         .map((item) =>
        //             item.status === "200" ? item.data.secure_url : undefined
        //         )
        //         .filter((el) => el !== undefined);
        //     setImages(imagesArray);
        // }
        if (response && response.length > 0) {
            const tempArray = [];
            for (let rerult of response) {
                if (rerult.status === 200)
                    tempArray.push({
                        id: rerult.data.public_id,
                        path: rerult.data.secure_url,
                    });
            }
            setImages(tempArray);
        } else {
            toast.error("Something went wrong!!!");
        }
    };
    console.log("check images array:", images);
    useEffect(() => {
        if (
            rawImages &&
            rawImages instanceof FileList &&
            rawImages.length > 0
        ) {
            handleUpload(rawImages);
        }
    }, [rawImages]);
    useEffect(() => {
        getImages(images);
    }, [images]);
    return (
        <div
            className={twMerge(
                clsx("flex flex-col gap-2 w-full", containerClassname)
            )}
        >
            {label && (
                <span className="font-medium text-main-700">{label}</span>
            )}
            <input
                type="file"
                id={id}
                className="hidden"
                {...register(id, validate)}
                multiple={multiple}
            />
            <label
                className="bg-gray-100 w-full p-16 flex items-center justify-center flex-col gap-2"
                htmlFor={id}
            >
                {isLoading ? (
                    <span className="animate-spin text-main-600">
                        <CgSpinner size={25} />
                    </span>
                ) : images.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((item, index) => (
                            <div key={index} className="col-span-1 relative">
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImages((prev) =>
                                            prev.filter(
                                                (el) => el.id !== item.id
                                            )
                                        );
                                    }}
                                    className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer absolute top-1 right-1"
                                >
                                    <AiOutlineCloseCircle size={18} />
                                </span>
                                <img
                                    src={item.path}
                                    alt="picture"
                                    className="w-full object-contain"
                                    // width="300px"
                                    // height="300px"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <span className="text-5xl text-gray-300">
                            <MdFileUpload />
                        </span>
                        <small className="text-gray-300 italic">
                            Only suppoer image with extension JPEG, PNG, JPG.
                        </small>
                    </>
                )}
            </label>
            {errors[id] && (
                <small className="text-red-500">{errors[id].message}</small>
            )}
        </div>
    );
};

export default InputFile;
