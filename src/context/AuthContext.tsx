import * as React from "react";
import {createContext, SetStateAction} from "react";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "../libs/api.ts";


export const AuthContext = createContext<{
    user?: {
        userName: string;
        id: string;
    };
    loggedIn?: boolean;
    form: [boolean, React.Dispatch<SetStateAction<boolean>>];
    setContextData: React.Dispatch<React.SetStateAction<AuthContextObj>>;
}>({
    loggedIn: false,
    user: undefined,
    setContextData: () => {
    },
    form: [false, () => {
    }],
})

export const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const [contextData, setContextData] = React.useState<AuthContextObj>({
        loggedIn: false,
        user: undefined,
    })

    useQuery({
        queryKey: ['authorization'],
        queryFn: (): Promise<AxiosResponse> => new Promise((_r, reject) => {
            try {
                axios.get(`${BASE_URL}/api/auth/allowed`, {withCredentials: true})
                    .then(res => {
                        setContextData(prev => ({...prev, loggedIn: res.status == 200}))
                    })
                    .catch(err => {
                        // navigate("/auth")
                        reject(err)
                    })
            } catch (_err) {
                // console.log("Err: ", err)
                console.log("error")
            }
        }),
        retry: true,
        retryOnMount: true,
        refetchOnWindowFocus: true,
        notifyOnChangeProps: ['status'],
        // retryDelay: 1
        staleTime: 21600000, // 6 hours
    })
    const [showForm, setShowForm] = React.useState(false);

    return (
        <AuthContext.Provider value={{
            ...contextData,
            setContextData: setContextData,
            form: [showForm, setShowForm],
        }}>
            {children}
        </AuthContext.Provider>
    )
}

