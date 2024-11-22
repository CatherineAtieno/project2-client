import {create} from "zustand";



interface PlacesStoreObj {
    places: Map<string|undefined, Map<string|undefined, BusinessObjFrmDb>>;
    setPlaces: (places: BusinessObjFrmDb[]) => void;
}

const placeStore = create<PlacesStoreObj>((set, get) => ({
    places: new Map(),
    setPlaces: (places: BusinessObjFrmDb[]) => {
        const hold = new Map(get().places)
        for (const place of places) {
            hold.set(place?.kind, new Map(hold.get(place.kind)).set(place.id, place))
        }
        set(prev => ({...prev, places: hold}))
    }
}));

export default placeStore;

