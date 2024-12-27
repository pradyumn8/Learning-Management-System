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

    const [ loading, setLoading] = useState(true)

    async function handleRegisterUser(event) {
        event.preventDefault();
        const data = await registerService(signUpFormData);

        console.log(data)
    }
    
    async function handleLoginUser(event) {
        event.preventDefault();
        const response = await loginService(signInFormData);
        console.log(response, "Response from loginService");
    
        if (response.data.success && response.data.data.accessToken) {
            // Storing the token in sessionStorage correctly
            sessionStorage.setItem("accessToken", response.data.data.accessToken);
    
            // Update authentication context
            setAuth({
                authenticate: true,
                user: response.data.data.user,
            });
            setLoading(false)
            // console.log("Token set in sessionStorage:", response.data.data.accessToken);
        } else {
            setAuth({
                authenticate: false,
                user: null,
            });
            // console.error("Login failed:", response.data.message);
            setLoading(false)

        }
    }

     // check auth user


     async function checkAuthUser() {
        try {
          const data = await checkAuthService();
          if (data.success) {
            setAuth({
              authenticate: true,
              user: data.data.user,
            });
          } else {
            setAuth({
              authenticate: false,
              user: null,
            });
          }
        } catch (error) {
          console.log(error);
          if (!error?.response?.data?.success) {
          setAuth({
              authenticate: false,
              user: null,
            });
          }
        }
      }
    

    useEffect(()=>{
      checkAuthUser();
  },[])

  console.log(auth);
  

    return <AuthContext.Provider value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
    }}>{
        // loading ? <Skeleton/> : children
        children
    }</AuthContext.Provider>
}