import './App.css'
import {Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchPlaces} from "./libs/queries.ts";
import {useEffect} from "react";
import placesStore from "./store/placesStore.ts";
import ViewAllPlacesPage from "./pages/ViewAllPlacesPage.tsx";
import ViewPlacePage from "./pages/ViewPlacePage.tsx";
import Navbar from "./components/Navbar.tsx";
import AboutPage from "./pages/AboutPage.tsx"

function App() {
    const {data, isFetched} = useQuery({
        queryKey: ['places'],
        queryFn: fetchPlaces,
        retryDelay: 3000
    })
    const {setPlaces} = placesStore()

    useEffect(() => {
        if (isFetched)
            setPlaces(data ?? [])
    }, [data, isFetched, setPlaces])

    return (
        <div className={"space-y-2"}>
            <Navbar />
            <Routes>
                <Route index={true} path="/" element={<LandingPage/>}/>
                <Route path={'/place/:kind'} element={<ViewAllPlacesPage/>}/>
                <Route path={'/place/:kind/:id'} element={<ViewPlacePage/>}/>
                <Route path={'/about'} element={<AboutPage />} />
            </Routes>
        </div>
    )
}

export default App
