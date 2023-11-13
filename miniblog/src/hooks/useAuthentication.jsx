import { db } from "../firebase/config" 

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { useState, useEffect } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")
    
    // cleanup 
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return
        }
    }


    // Register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        }catch (error){
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            }else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado."
            }else{
                systemErrorMessage = "Ocorreu um error, tente mais tarde"
            }

            setLoading(false);
            setError(systemErrorMessage)
        }
    }

    // logout - sign out

    const logout = () => {

        checkIfIsCancelled()

        signOut(auth)
    }

    // login - sign in 
    const login = async(data) => {

        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try{

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        }catch(e){

            let systemErrorMessage;

            if (e.message.includes("user-not-found")){
                systemErrorMessage = "Usuario não encontrado"
            }else if(e.message.includes("wrong-password")){
                systemErrorMessage = "Senha incorreta"
            } else{
                systemErrorMessage = "Ocorreu um erro tente novamente mais tarde"
            }

            setError(systemErrorMessage)
            setLoading(false)

        }

    }

    useEffect(() => {
        return () => setCancelled
    },[])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }

}
