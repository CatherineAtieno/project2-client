import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css"
// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthContextProvider} from "./context/AuthContext.tsx";
import {Notifications} from "@mantine/notifications";
import SignupLogin from "./components/SignupLogin.tsx";

const query = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider>
            <Notifications position={"top-right"}/>
            <QueryClientProvider client={query}>
                <BrowserRouter>
                    <AuthContextProvider>
                        <SignupLogin/>
                        <App/>
                    </AuthContextProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </MantineProvider>
    </StrictMode>,
)
