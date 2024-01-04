import clsx from "clsx";
import { Button, InputForm, InputRadio } from "..";
import { useForm } from "react-hook-form";
import { apiRegister, apiSignIn } from "~/apis/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppStore } from "~/store/useAppStore";
import { useEffect, useState } from "react";
import { useUserStore } from "~/store/useUserStore";

const Login = () => {
    const { setModal } = useAppStore();
    const { token, setToken } = useUserStore();
    // toggleModal is: Login or NewAccount
    const [toggleModal, setToggleModal] = useState("Login");
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        reset();
    }, [toggleModal]);

    const onSubmit = async (data) => {
        if (toggleModal === "NewAccount") {
            setIsLoading(true);
            const response = await apiRegister(data);
            setIsLoading(false);
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Congrats!!!",
                    text: response.mes,
                    confirmButtonText: "Go sign in",
                }).then(({ isConfirmed }) => {
                    if (isConfirmed) setToggleModal("Login");
                });
            } else toast.error(response.mes);
        }
        if (toggleModal === "Login") {
            // handle login
            const { name, role, ...payload } = data;
            setIsLoading(true);
            const response = await apiSignIn(payload);
            setIsLoading(false);
            if (response.success) {
                //
                toast.success(response.mes);
                setToken(response.accessToken);

                setModal(false, null);
            } else toast.error(response.mes);
        }
    };
    console.log("test toke", token);
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-md bg-white p-4 px-6 py-8 flex flex-col gap-6 w-[500px] items-center justify-center"
        >
            <h1 className="text-5xl font-sevillana font-semibold tracking-wide">
                Welcome blog
            </h1>
            <div className="border-b-2 border-main-200 w-full pb-1">
                <span
                    onClick={() => setToggleModal("Login")}
                    className={clsx(
                        toggleModal === "Login" &&
                            "border-b-4 border-main-700 pb-1",
                        "cursor-pointer"
                    )}
                >
                    Sign in
                </span>
                <span
                    onClick={() => setToggleModal("NewAccount")}
                    className={clsx(
                        toggleModal === "NewAccount" &&
                            "border-b-4 border-main-700 pb-1",
                        "cursor-pointer",
                        "ml-4"
                    )}
                >
                    New Account
                </span>
            </div>
            <form className="w-full px-4">
                <InputForm
                    register={register}
                    id="phone"
                    label="Phone Number"
                    inputClassname="rounded-md"
                    placeholder="Type your phone number here"
                    validate={{
                        required: "Must be filled with a valid phone number",
                        pattern: {
                            value: /(0[3|5|7|9])+([0-9]{8})\b/,
                            message: "Phone number invalid",
                        },
                    }}
                    errors={errors}
                />
                <InputForm
                    register={register}
                    id="password"
                    label="Password"
                    inputClassname="rounded-md"
                    placeholder="Type your password number here"
                    type="password"
                    validate={{
                        required: "Must be filled with a valid password",
                    }}
                    errors={errors}
                />
                {toggleModal === "NewAccount" && (
                    <InputForm
                        register={register}
                        id="name"
                        label="Your name"
                        inputClassname="rounded-md"
                        placeholder="Type your name here"
                        validate={{
                            required: "Must be filled with a valid name",
                        }}
                        errors={errors}
                    />
                )}
                {toggleModal === "NewAccount" && (
                    <InputRadio
                        register={register}
                        id="role"
                        label="Type your account here: "
                        errors={errors}
                        validate={{
                            required: "This field is required",
                        }}
                        options={[
                            { label: "User", value: "USER" },
                            { label: "Agent", value: "AGENT" },
                        ]}
                    />
                )}
                <Button
                    className="py-2 my-6 w-full"
                    onClick={handleSubmit(onSubmit)}
                    disabaled={isLoading}
                >
                    {toggleModal === "Login" ? "Sign in" : "Register"}
                </Button>
                <span className="text-main-700 cursor-pointer hover:underline text-center mx-auto block">
                    Forgot your password
                </span>
            </form>
        </div>
    );
};

export default Login;
