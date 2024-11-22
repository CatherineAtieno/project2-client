import * as React from "react";
import {Carousel} from "@mantine/carousel";
import {Image, Text, Title} from "@mantine/core";
import {showLabel} from "../libs/methods.ts";
import {useNavigate} from "react-router-dom";


interface props extends React.HTMLAttributes<HTMLDivElement> {
    place: BusinessObjFrmDb
}

export default function ListPlace({place, ...rest}: props) {
    const navigate = useNavigate()
    return (
        <div {...rest}
             className={`max-w-[250px] h-max cursor-pointer text-black bg-white rounded-md overflow-hidden ${rest.className}`}
        >
            <Carousel withControls={false} withIndicators className={'w-full h-full '}>
                {place.images.map(img =>
                    <Carousel.Slide key={img.id} className={'w-full h-full'}>
                        <Image src={img.img} alt={""} className={'w-full h-[40vh] object-cover'}/>
                    </Carousel.Slide>
                )}
            </Carousel>
            <div className={'w-full h-max p-2 '}
                 onClick={() => navigate(`/place/${place.kind}/${place.id}`)}
            >
                <Title size={18}>{showLabel(place.name)}</Title>
                <Text className={'truncate'}>
                    {place.services.map((service, i) => <React.Fragment
                        key={i}>{service.name}{i !== (place.services.length - 1) ? "," : ""}</React.Fragment>)}
                </Text>
            </div>
        </div>
    )
}

