import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService, loginService, checkAuthService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null,
    });

    const [loading, setLoading] = useState(true)

    async function handleRegisterUser(event) {
        event.preventDefault();

        try {
            const data = await registerService(signUpFormData);
            console.log(data);
            alert("Account has been created successfully!");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred. Please try again later.");
        }
    }

    async function handleLoginUser(event) {
        event.preventDefault();
        const response = await loginService(signInFormData);
        // console.log(response, "Response from loginService");

        if (response.data.success && response.data.data.accessToken) {
            // Storing the token in sessionStorage correctly
            sessionStorage.setItem("accessToken", response.data.data.accessToken);

            // Update authentication context
            setAuth({
                authenticate: true,
                user: response.data.data.user,
            });
            // console.log("Token set in sessionStorage:", response.data.data.accessToken);
        } else {
            setAuth({
                authenticate: false,
                user: null,
            });
            // console.error("Login failed:", response.data.message);
        }
    }


    // check auth user

    async function checkAuthUser() {
        try {
            const token = sessionStorage.getItem("accessToken");

            if (!token) {
                setAuth({
                    authenticate: false,
                    user: null,
                });
                setLoading(false);
                return;
            }

            const data = await checkAuthService(token); // Pass the token to the service
            if (data.success) {
                setAuth({
                    authenticate: true,
                    user: data.data.user,
                });
            } else {
                sessionStorage.removeItem("accessToken"); // Clear invalid token
                setAuth({
                    authenticate: false,
                    user: null,
                });
            }
        } catch (error) {
            console.error(error);
            sessionStorage.removeItem("accessToken"); // Clear token on error
            setAuth({
                authenticate: false,
                user: null,
            });
        } finally {
            setLoading(false); // Ensure loading state ends
        }
    }


    useEffect(() => {
        checkAuthUser();
    }, [])

    console.log(auth, "checkauth");


    return <AuthContext.Provider value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        // resetCredentials
    }}>{
            loading ? <Skeleton /> : children
        }</AuthContext.Provider>
}

