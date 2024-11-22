import {Button, Rating, Text, Textarea, Title} from "@mantine/core";
import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext.tsx";
import {useMutation} from "@tanstack/react-query";
import {submitReview} from "../libs/queries.ts";
import {notifications} from "@mantine/notifications";
import {showError} from "../libs/methods.ts";


interface props {
    businessId: string;
}

export default function WriteReview({businessId}: props) {
    const {loggedIn} = useContext(AuthContext)
    const [review, setReview] = useState({
        stars: 0,
        review: "",
        place: businessId
    });

    const {mutate, isPending} = useMutation({
        mutationKey: ['review'],
        mutationFn: submitReview,
        onSuccess: res => {

            notifications.show({title: "Success", color: "green", message: res.message})
        },
        onError: err => {
            notifications.show({...showError(err)})
        }
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loggedIn)
            return notifications.show({...showError("Please log in or signup")})
        if (review.stars < 1)
            return notifications.show({...showError("Please add a star rating!")})
        mutate(review)
    }

    return (
        <form onSubmit={submit} className={"w-1/2 h-max grid gap-2 bg-white p-2"}>
            <Title size={'22px'}>Write review</Title>
            <span className={"text-left border p-2"}>
                <Text>Rate*</Text>
                <Rating
                    size={'xl'}
                    value={review.stars}
                    onChange={value => setReview(prev => ({...prev, stars: value}))}
                />
            </span>
            <Textarea
                label={'Review'}
                value={review.review}
                onChange={({target: {value}}) => setReview(prev => ({...prev, review: value}))}
                placeholder={'Write your review'}
                classNames={{input: "w-full h-[100px]", label: "text-left w-full"}}
            />
            <Button
                loading={isPending}
                type={'submit'}
            >
                Submit
            </Button>
        </form>
    )
}

