import {useParams} from "react-router-dom";
import LeftPanel from "../components/LeftPanel.tsx";
import useFilters from "../hooks/useFilters.ts";
import {useMemo} from "react";
import placeStore from "../store/placesStore.ts";
import ListPlace from "../components/ListPlace.tsx";


export default function ViewAllPlacesPage() {
    const {kind} = useParams()
    const {filters, setFilters} = useFilters()
    const {places} = placeStore()

    const thesePlaces: Map<string | undefined, BusinessObjFrmDb> = useMemo(() => {
        const found = places.get(kind)
        return found ? found : new Map()
    }, [kind, places])

    const list: Map<string | undefined, BusinessObjFrmDb> | undefined = useMemo(() => {
        const output: Map<string, BusinessObjFrmDb> = new Map()
        if (filters.serviceApply) {
            filters.services.forEach((wanted, service) => {
                thesePlaces.forEach((place) => {
                    if (wanted)
                        if (place.services.find(val => val.name.toLowerCase().includes(service.toLowerCase()))) {
                            output.set(place.id, place)
                        }
                })
            })
        }
        if (filters.countyApply) {
            filters.county.forEach((wanted, county) => {
                if (wanted)
                    output.forEach(place => {
                        if (place.address.county.toLowerCase() !== county.toLowerCase())
                            output.delete(place.id)
                    })
            })
        }
        const x = output.size < 1 ? output : places.get(kind ?? "")
        console.log("Places: ", x)
        return output.size < 1 ? thesePlaces : x
    }, [filters.county, filters.countyApply, filters.serviceApply, filters.services, kind, places, thesePlaces])

    return (
        <div className={'w-full h-[calc(98vh-70px)] p-2 flex '}>
            <LeftPanel useFilters={[filters, setFilters]}/>
            <div className={'flex-1 grid grid-cols-4 p-2'}>
                {list
                    ? [...list.values()]
                        .map((place =>
                                <ListPlace
                                    place={place}
                                    key={place.id}
                                />
                        ))
                    : <div>No place found</div>
                }
            </div>
        </div>
    )
}

