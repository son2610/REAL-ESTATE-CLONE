import { Button, InputFile, InputForm, TextArea, Title } from "~/components";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import apiCreateNewPropertyType from "~/apis/propertyType";
import { toast } from "react-toastify";

const CreatePropertyType = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        setError,
        clearErrors,
    } = useForm();
    const handleCreateNewPropertyType = async (data) => {
        console.log("check data res", data);
        if (!data.images || data.images.length === 0) {
            setError("images", {
                message: "This field cannot be empty",
                type: "required",
            });
        } else {
            // clearErrors("images");
            const { images, ...payload } = data;
            const response = await apiCreateNewPropertyType({
                ...payload,
                images: images[0],
            });
            if (response.success) {
                toast.success(response.mes);
                reset();
                getImages([]);
            } else toast.error(response.mes);
        }
    };

    const getImages = (images) => {
        if (images && images.length > 0) clearErrors("images");
        setValue(
            "images",
            images.map((item) => item.path)
        );
    };
    return (
        <div>
            <Title title="Create New Property Type">
                <Button onClick={handleSubmit(handleCreateNewPropertyType)}>
                    <FaPlus />
                    <span>Create</span>
                </Button>
            </Title>
            <form className="p-4 flex flex-col gap-4">
                <InputForm
                    id="name"
                    errors={errors}
                    register={register}
                    validate={{ required: "This field cannot empty!!!" }}
                    label="Property Type Name"
                />
                {/* <InputText
                    id="description"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    label="Description"
                    validate={{ required: "This field cannot empty!!!" }}
                /> */}
                <TextArea
                    id="description"
                    errors={errors}
                    register={register}
                    validate={{ required: "This field cannot empty!!!" }}
                    label="Description"
                />
                <InputFile
                    id="images"
                    errors={errors}
                    register={register}
                    validate={{ required: "This field cannot empty!!!" }}
                    label="Images"
                    // multiple={true}
                    getImages={getImages}
                />
            </form>
        </div>
    );
};

export default CreatePropertyType;
