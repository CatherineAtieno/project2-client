import nairobi from '../assets/nairobi.jpg'
import {Button, Title} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import placeStore from "../store/placesStore.ts";
import {showLabel} from "../libs/methods.ts";
import ListPlace from "../components/ListPlace.tsx";
import HomeSearch from "../components/HomeSearch.tsx";
import {useNavigate} from "react-router-dom";

export default function LandingPage() {
    const {places} = placeStore();
    const navigate = useNavigate()

    return (
        <div>
            <div className={'w-full h-[70vh] dark-fade'}>
                <img className={'w-full h-full object-center object-cover'} src={nairobi} alt={""}/>
                <HomeSearch/>
            </div>
            <div className={'w-full h-max bg-gray-900 text-white'}>
                <Title>Top picks this week</Title>
                {[...places.entries()].map(([kind, items], index) =>
                    <div className={'w-[95%] grid gap-2 m-auto'} key={kind ?? index}>
                        <Title>{showLabel(kind??"")}</Title>
                        <Carousel align={'start'} slideSize={"25%"}>
                            {[...items.values()].map(place =>
                                <Carousel.Slide key={place.id}>
                                    <ListPlace place={place}/>
                                </Carousel.Slide>
                            )}
                        </Carousel>
                        <Button
                            className={'w-max m-auto'}
                            radius={'lg'}
                            variant={'light'}
                            onClick={() => navigate(`/place/${kind}`)}
                        >
                            View all {kind}s
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

