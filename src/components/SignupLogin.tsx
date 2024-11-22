import {ActionIcon, Button, Select, TextInput, Title} from "@mantine/core";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {MdCancel} from "react-icons/md";
import {useMutation} from "@tanstack/react-query";
import {loginQuery, signupQuery} from "../libs/queries.ts";
import {notifications} from "@mantine/notifications";
import {showError} from "../libs/methods.ts";


export default function SignupLogin() {
    const [isSignup, setIsSignup] = useState(true);
    const {form: [show, setShow], setContextData} = useContext(AuthContext)


    const {mutate, isPending} = useMutation({
        mutationKey: ['authorization'],
        mutationFn: isSignup ? signupQuery : loginQuery,
        onSuccess: (res) => {
            notifications.show({title: "Success!", message: res.data.message})
            setContextData(prev => ({...prev, loggedIn: true, user: {...res.data.user}}))
            setShow(false)
        },
        onError: err => {
            notifications.show(showError(err))
        }
    })


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const data: { [key: string]: string } = {};
        [...form.entries()].forEach(([key, value]) => {
            data[key] = value.toString()
        })
        mutate(data)
    }

    if (!show)
        return <></>
    return (
        <form
            onSubmit={handleSubmit}
            className={"w-full h-full bg-opacity-80 flex bg-black p-2 text-left fixed z-40 m-auto left-0 right-0 top-0 bottom-0"}>
            <div className={"min-w-[300px] grid gap-2 m-auto bg-white p-4 rounded-md"}>
                <div className={" flex justify-between z-40"}>
                    <Title>{isSignup ? "Sign up" : "Login"}</Title>
                    <ActionIcon
                        onClick={() => setShow(!show)}
                        variant={'outline'} color={'red'} className={'mt-auto mb-auto'}>
                        <MdCancel/>
                    </ActionIcon>
                </div>
                <div className={"w-full grid gap-2 md:grid-cols-2"}>
                    {isSignup ? <>
                        <TextInput
                            name={"firstName"}
                            label={"First Name"}
                            placeholder={"First Name"}
                        />
                        <TextInput
                            name={"lastName"}
                            label={"Last Name"}
                            placeholder={"Last Name"}
                        />
                        <Select
                            name={'role'}
                            label={'Your role'}
                            data={['tourist', 'resident', 'business']}
                        />
                    </> : null}
                    <TextInput
                        placeholder={"Email"}
                        name={"email"}
                        label={"Your email"}
                    />
                    <TextInput
                        placeholder={"Password"}
                        name={"password"}
                        label={"Password"}
                    />
                    {isSignup &&
                        <TextInput
                            placeholder={"Confirm"}
                            name={"confirm"}
                            label={"Confirm password"}
                        />}
                </div>
                <Button
                    type={'submit'}
                    loading={isPending}
                    disabled={isPending}
                >
                    {isSignup ? "Sign up" : "Login"}
                </Button>
                <Button
                    disabled={isPending}
                    type={'button'}
                    onClick={() => setIsSignup(!isSignup)}
                    variant={'transparent'}
                >
                    {isSignup ? "Login " : "Sign up " }instead?
                </Button>
            </div>
        </form>
    )
}

