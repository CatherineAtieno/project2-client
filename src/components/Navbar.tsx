import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Anchor, Button, Title} from "@mantine/core";
import {AuthContext} from "../context/AuthContext.tsx";
import {BsPersonLock} from "react-icons/bs";


export default function Navbar() {
    const [scrolled70, setScrolled70] = useState(false);
    const {pathname} = useLocation();
    const show = useMemo(() => {
        // show if: page is index and scrolled70 or page not index
        return (pathname === "/" && scrolled70) || pathname !== "/"
    }, [pathname, scrolled70])

    const scrolled70px = useCallback(() => {
        if (window.scrollY > (window.innerHeight * 0.5))
            return setScrolled70(true);
        setScrolled70(false);
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", scrolled70px);
        return () => {
            window.removeEventListener("scroll", scrolled70px);
        }
    }, [scrolled70, scrolled70px])
    const {loggedIn, user, form: [_showForm, setShowForm]} = useContext(AuthContext)

    const navigate = useNavigate();
    // if (show)
        return (
            <nav className={'w-full h-max sticky top-0 z-40 bg-white border-b'}>
                <div className={'w-[95%] h-[70px] m-auto flex justify-between'}>
                    <Title onClick={() => navigate("/")}
                           className={'mt-auto text-[1.5rem] mb-auto truncate cursor-pointer bg-gradient-to-r from-green-700 to-yellow-400 bg-clip-text text-transparent'}>Magical
                        Nairobi
                    </Title>
                    <div className={"flex justify-around h-max gap-2 mb-auto mt-auto"}>
                        <Anchor href="/" className={'m-auto pl-2 pr-2'}>Home</Anchor>
                        <Anchor href={'/about'} className={'m-auto pl-2 pr-2'}>About</Anchor>
                        <Button
                            variant={"light"}
                            leftSection={<BsPersonLock />}
                            onClick={()=>setShowForm(true)}
                        >
                            {loggedIn ? user?.userName??"" : "Log in/Signup"}
                        </Button>
                    </div>
                </div>
            </nav>
        )
    // return <></>
}

