import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService, loginService, checkAuthService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null,
    });
    const [loading, setLoading] = useState(true);

    async function handleRegisterUser(event) {
        event.preventDefault();
        try {
            const data = await registerService(signUpFormData);
            console.log(data);
            toast.success("Account created successfully!");
            // Optionally reset form
            setSignUpFormData(initialSignUpFormData);
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Registration failed. Please try again later.");
        }
    }

    async function handleLoginUser(event) {
        event.preventDefault();
        try {
            const response = await loginService(signInFormData);
            if (response.data.success && response.data.data.accessToken) {
                sessionStorage.setItem("accessToken", response.data.data.accessToken);
                setAuth({
                    authenticate: true,
                    user: response.data.data.user,
                });
                toast.success("Logged in successfully");
                // Optionally reset form
                setSignInFormData(initialSignInFormData);
            } else {
                setAuth({ authenticate: false, user: null });
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login error. Please try again.");
        }
    }

    async function checkAuthUser() {
        try {
            const token = sessionStorage.getItem("accessToken");
            if (!token) {
                setAuth({ authenticate: false, user: null });
                setLoading(false);
                return;
            }
            const data = await checkAuthService(token);
            if (data.success) {
                setAuth({ authenticate: true, user: data.data.user });
            } else {
                sessionStorage.removeItem("accessToken");
                setAuth({ authenticate: false, user: null });
            }
        } catch (error) {
            console.error(error);
            sessionStorage.removeItem("accessToken");
            setAuth({ authenticate: false, user: null });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuthUser();
    }, []);

    return (
            <AuthContext.Provider
                value={{
                    signInFormData,
                    setSignInFormData,
                    signUpFormData,
                    setSignUpFormData,
                    handleRegisterUser,
                    handleLoginUser,
                    auth,
                }}
            >
                {loading ? <Skeleton /> : children}
            </AuthContext.Provider>
    );
}
