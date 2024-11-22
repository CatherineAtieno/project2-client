import {Text, TextInput} from "@mantine/core";
import {BsSearch} from "react-icons/bs";
import React, {useMemo, useState} from "react";
import {showLabel} from "../libs/methods.ts";
import placesStore from "../store/placesStore.ts";
import {useNavigate} from "react-router-dom";


export default function HomeSearch() {
    const {places} = placesStore()
    const [term, setTerm] = useState("");
    const results: BusinessObjFrmDb[] = useMemo(() => {
        return [...places.entries()].flatMap(val => ([...val[1].values()])).filter(place => JSON.stringify(place).toLowerCase().includes(term.toString().toLowerCase()))
    }, [places, term])

    const navigate = useNavigate();
    const getServiceString = (services: ServiceObj[]) => {
        return <Text>
            {services.map((serv, i) => <React.Fragment
                key={i}>{serv.name}{(services.length - 1) !== i ? "," : ""}</React.Fragment>)}
        </Text>
    }

    return (
        <div className={'max-w-lg m-auto z-20 grid gap-2 mt-[-25vh]'}>
            <TextInput
                radius={'xl'}
                size={'xl'}
                variant={'unstyled'}
                placeholder={"What are you looking for today?"}
                leftSection={<BsSearch className={'stroke-white text-white'}/>}
                color={'red'}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                classNames={{
                    input: "border-b border-b-white placeholder:text-white rounded-b-none text-white",
                    section: "!stroke-blue-500"
                }}
            />
            {term.length >= 3 &&
                <div className={'w-full grid gap-2 cursor-pointer hover:bg-blue-100 active:bg-blue-300 p-2 bg-white rounded-md'}>
                    {results.length < 1
                        ? <Text>No results</Text>
                        : results.map((place, i) =>
                            <div onClick={()=>navigate(`/place/${place.kind}/${place.id}`)} className={'grid grid-flow-col'} key={i}>
                                <Text className={'truncate'}>{showLabel(place.name)}</Text>
                                <Text className={'truncate'}>{showLabel(place.address.town)}</Text>
                                <Text className={'truncate'}>{showLabel(place.kind)}</Text>
                                {getServiceString(place.services)}
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

