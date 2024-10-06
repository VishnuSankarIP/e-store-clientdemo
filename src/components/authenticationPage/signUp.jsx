import { useNavigate } from "react-router-dom";
import FacebookIcon from "../../assets/svg/facebookIcon";
import GoogleIcon from "../../assets/svg/googleIcon";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Password from "./password";


import NewLogo from "../../assets/png/LOOI-LOGO.png";

export default function SignUp() {

    const { setIsAuthenticated, save_user_and_token, projectId } = useContext(UserContext);
    const navigate = useNavigate();

    const [errorState, set_error_state] = useState("");

    const [isPasswordCorrect, setIsPasswordCorrect] = useState(undefined);
    const [reEnterPass, setReEnterPass] = useState(null);


    const [userInfo, set_user_info] = useState({
        name: "",
        email: "",
        password: "",
        appType: "ecommerce",
    });

    function handle_change(event) {
        const element = event.target;

        const { name, value } = element;

        set_user_info((old_info) => {
            return {
                ...old_info,
                [name]: value,
            };
        });
    }

    function checkPassword(event) {
        const { value } = event.target;

        setReEnterPass(value);

        if (userInfo.password === value) {
            setIsPasswordCorrect(true);
        } else {
            setIsPasswordCorrect(false);
        }
    }

    function handle_submit(event) {
        event.preventDefault();

        if (!userInfo.email || !userInfo.password || !userInfo.name) {
            set_error_state('*All fields must be filled');
            return;
        } else if (!/^[a-zA-Z]+(?:['\s-][a-zA-Z]+)*$/.test(userInfo.name)) {
            set_error_state("*Name should only contain letters and spaces.");
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userInfo.email)) {
            set_error_state("*Format of email is not correct");
            return;
        } else if (userInfo.password !== reEnterPass && reEnterPass !== "") {
            setIsPasswordCorrect(false);
        }
        sign_up(userInfo);
    }

    async function sign_up(userInfo) {
        try {

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("projectID", { projectId });

            const url = "https://academics.newtonschool.co/api/v1/user/signup";
            var payload = {
                ...userInfo,
            };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(payload),
                redirect: 'follow',
            };

            const response = await fetch(url, requestOptions);

            if (response.ok) {
                const data = await response.json();

                const { token, data: loginData } = data;
                localStorage.setItem("authToken", token);
                localStorage.setItem("userInfo", loginData);

                setIsAuthenticated(true);
                save_user_and_token(loginData, token);
                navigate("/men");
            } else {
                set_error_state("Registration failed");
            }
        } catch (error) {
            console.log("error during sign-up: ", error);
        }
    }

    return (
        <>
            <p className="font-grey font-semibold text-[16px] my-[1rem]">LOOI Clothing Store</p>

            <div className="bg-[#e6e7e8] border border-black w-full font-grey 
                text-[14px] font-bold">
                <div className="px-[1rem] py-[2rem] w-full min-[426px]:p-[2rem]">
                   
                    <div className="flex items-center justify-center my-[2rem]">
                        <img src={NewLogo} className="w-[100px] h-[100px]" alt="Logo" />
                    </div>

                    <p className="text-[20px] font-bold text-center">Create an account</p>


                    <form className="flex flex-col w-full text-[14px] font-bold mt-5" onSubmit={(event) => handle_submit(event)}>
                        <input type="text" placeholder="Full name" name="name" inputMode="text" required
                            className="w-full border-[1px] border-[#ccc] mb-[0.5rem] rounded-[4px] px-[8px] py-[6px] text-black"
                            onChange={(event) => handle_change(event)} />


                        <input type="email" placeholder="Your email address" name="email" inputMode="email" required
                            className="w-full border-[1px] border-[#ccc] mb-[0.5rem] rounded-[4px] px-[8px] py-[6px] text-black"
                            onChange={(event) => handle_change(event)} />

                        {/* enter password */}

                        <Password callbackFunction={handle_change} placeholderText={"Enter password"} />

                        {/* password conformation */}
                        <Password callbackFunction={checkPassword} placeholderText={"Confirm password"} isPasswordCorrect={isPasswordCorrect} />

                        {
                            errorState && <div className="text-[#ff0000] font-semibold">{errorState}</div>
                        }

                        <input type="submit" required
                            className="w-full my-[1.5rem] rounded-[3px] py-[7px] cursor-pointer bc-green text-white text-[16px]
                                hover:bg-black duration-500 "/>
                    </form>

                    {/* path to go to login route */}

                    <div className="flex justify-center items-center font-medium mt-[0.5rem]">
                        <p>Already a Customer?</p>

                        <p onClick={() => navigate("/authentication/login")}
                            className="ml-[5px] font-red underline underline-offset-2 underline-[#e11b23] cursor-pointer
                            hover:text-[#117a7a] hover:underline-[#117a7a]">
                            Login
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}




