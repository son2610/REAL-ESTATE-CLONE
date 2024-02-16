import clsx from "clsx";
import { Button, InputForm, InputRadio, OTPVerifier } from "..";
import { useForm } from "react-hook-form";
import { apiRegister, apiSignIn } from "~/apis/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppStore } from "~/store/useAppStore";
import { useEffect, useState } from "react";
import { useUserStore } from "~/store/useUserStore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from "~/utils/firebaseConfig";
import { twMerge } from "tailwind-merge";

const Login = () => {
    const { setModal } = useAppStore();
    const { token, setToken, roles } = useUserStore();
    console.log("check roles here: ", roles);
    // toggleModal is: Login or NewAccount
    const [toggleModal, setToggleModal] = useState("Login");
    const [isLoading, setIsLoading] = useState(false);
    const [isShowConfirmOTP, setIsShowConfirmOTP] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        reset();
    }, [toggleModal]);

    // Xử lý việc tạo captcha nếu như nó chưa tồn tại trong biến windows
    const handleCaptchaVerify = () => {
        if (!window.recaptchaVerifier) {
            //
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-verifier",
                {
                    size: "invisible",
                    callback: () => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        // ...
                    },
                    "expired-callback": () => {
                        // Response expired. Ask user to solve reCAPTCHA again.
                        // ...
                    },
                }
            );
        }
    };

    const handleSendOTP = (phone) => {
        setIsLoading(true);
        handleCaptchaVerify();
        const verifier = window.recaptchaVerifier;
        const formatPhone = "+84" + phone.slice(1);
        signInWithPhoneNumber(auth, formatPhone, verifier)
            .then((result) => {
                // console.log(result);
                setIsLoading(false);
                toast.success("Sent OTP to your phone number");
                window.confirmOTP = result;
                setIsShowConfirmOTP(true);
            })
            .catch((error) => {
                // console.log(error);
                // window.isSentOTP = false;
                toast.error("Something went wrong!!!");
            });
    };
    const onSubmit = async (data) => {
        if (toggleModal === "NewAccount") {
            // console.log(data);
            if (data.roleCode !== "ROLE7") {
                //handle logic
                handleSendOTP(data.phone);
            }
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
    const handleRegister = async (data) => {
        console.log(data);
        const response = await apiRegister(data);
        setIsLoading(false);
        if (response.success) {
            Swal.fire({
                icon: "success",
                title: "Congrats!!!",
                text: response.mes,
                confirmButtonText: "Go sign in",
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                    setToggleModal("Login");
                    setIsShowConfirmOTP(false);
                }
            });
        } else toast.error(response.mes);
    };
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={twMerge(
                clsx(
                    "relative rounded-md bg-white p-4 px-6 py-8 flex flex-col gap-6 w-[500px] items-center justify-center",
                    isShowConfirmOTP && "w-[600px] h-[270px]"
                )
            )}
        >
            {isShowConfirmOTP && (
                <div className="absolute inset-0 bg-white rounded-md">
                    <OTPVerifier cb={handleSubmit(handleRegister)} />
                </div>
            )}
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

            <form
                className={twMerge(
                    clsx("w-full px-4", isShowConfirmOTP && "hidden")
                )}
            >
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
                        id="roleCode"
                        label="Type your account here: "
                        errors={errors}
                        validate={{
                            required: "This field is required",
                        }}
                        optionClassname="grid grid-cols-3 gap-4"
                        options={roles
                            .filter((item) => item.code !== "ROLE1")
                            .map((item) => ({
                                label: item.value,
                                value: item.code,
                            }))}
                    />
                )}
                <div id="recaptcha-verifier"></div>
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
