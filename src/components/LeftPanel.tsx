import {Button, Checkbox, Fieldset, Group, TextInput, Title} from "@mantine/core";
import {useParams} from "react-router-dom";
import PlacesStore from "../store/placesStore.ts";
import React, {useMemo} from "react";


interface props {
    useFilters: [filters: FiltersObj, setFilters: React.Dispatch<React.SetStateAction<FiltersObj>>]
}

export default function LeftPanel({useFilters}: props) {
    const {kind} = useParams()
    const {places} = PlacesStore();
    const [filters, setFilters] = useFilters

    const thisPlace = useMemo(() => {
        return places.get(kind ?? "")
    }, [kind, places])

    const services: string[] = useMemo(() => {
        if (thisPlace) {
            return [...thisPlace.values()].flatMap(place => [...new Set(place.services.map(p => p.name))])
        } else {
            return []
        }
    }, [thisPlace])
    const counties: string[] = useMemo(() => {
        if (thisPlace)
            return [...thisPlace.values()].map(place => place.address.county)
        else return []
    }, [thisPlace])

    const isChecked = (service: string, field: string) => {
        const which = filters[field]
        if (which instanceof Map)
            return !!which.get(service)
        return false
    }
    const apply = (field: string, applyIt: boolean) => {
        if (!applyIt) {
            const group = field.includes('county') ? 'county' : 'services'
            setFilters(prev => ({...prev, [field]: applyIt, [group]: new Map()}))
        } else setFilters(prev => ({...prev, [field]: applyIt}))
    }

    return (
        <div
            className={'w-[250px] h-full overflow-y-auto bg-white p-2 grid gap-2 auto-rows-max rounded-md border '}>
            <Title size={22} className={'text-gray-800 '}>Filters</Title>
            <div className={'w-full h-[2px] bg-gray-200'}/>
            <TextInput
                radius={'xl'}
                variant={'filled'}
                placeholder={`Find ${kind}`}
            />
            <Fieldset legend={'Services'} className={'w-full h-full grid gap-2 auto-rows-max'}>
                <Group className={'w-full max-h-[150px] overflow-y-scroll grid auto-rows-max'}>
                    {services.map((service, i) =>
                        <Checkbox
                            onChange={({target: {checked}}) => setFilters(prev => ({
                                ...prev,
                                services: new Map(prev.services).set(service, checked)
                            }))}
                            checked={isChecked(service, 'services')} label={service} key={i}
                        />
                    )}
                </Group>
                <Button
                    onClick={() => apply('serviceApply', !filters.serviceApply)}
                    size={'xs'}
                    variant={filters.serviceApply ? 'outline' : 'light'}
                >
                    {filters.serviceApply ? "Clear" : "Apply"}
                </Button>
            </Fieldset>
            <Fieldset legend={'Counties'} className={'w-full h-full grid gap-2 auto-rows-max'}>
                <Group className={'w-full max-h-[150px] overflow-y-scroll grid auto-rows-max'}>
                    {counties.map((county, i) =>
                        <Checkbox
                            onChange={({target: {checked}}) => setFilters(prev => ({
                                ...prev,
                                county: new Map(prev.county).set(county, checked)
                            }))}
                            checked={isChecked(county, 'county')} label={county} key={i}
                        />
                    )}
                </Group>
                <Button
                    onClick={() => apply('countyApply', !filters.countyApply)}
                    size={'xs'}
                    variant={filters.countyApply ? 'outline' : 'light'}
                >
                    {filters.countyApply ? "Clear" : "Apply"}
                </Button>
            </Fieldset>

        </div>
    )
}

