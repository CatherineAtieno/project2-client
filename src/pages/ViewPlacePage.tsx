import placeStore from "../store/placesStore.ts";
import {useMemo} from "react";
import {useParams} from "react-router-dom";
import {Anchor, Image, List, Rating, Table, Text, Title} from "@mantine/core";
import {showLabel} from "../libs/methods.ts";
import {GiBusStop} from "react-icons/gi";
import {BiCar} from "react-icons/bi";
import {Carousel} from "@mantine/carousel";
import WriteReview from "../components/WriteReview.tsx";


export default function ViewPlacePage() {
    const {places} = placeStore()
    const params = useParams()

    const thisPlace = useMemo(() => {
        return places.get(params?.kind)?.get(params?.id)
    }, [params, places])

    const transport = thisPlace?.transport?.map((trans, i) => <Table.Tr key={i}>
        {/*<Table.Td>*/}
        <Table.Td>{showLabel(trans.type)}</Table.Td>
        <Table.Td>{showLabel(trans.stage)}</Table.Td>
        {/*</Table.Td>*/}
    </Table.Tr>) ?? []

    const services = thisPlace?.services.map((service, i) => <List.Item key={i}>
        <Text>{showLabel(service.name)}</Text>
        {service.price ? `(Ksh. ${service.price.toLocaleString()})` : ""}
    </List.Item>) ?? []

    const carouselSlides = thisPlace?.reviews?.filter(r => r.review).map(review =>
        <Carousel.Slide className={'!w-max'} key={review.id}>
            <div className={"w-[250px] h-max bg-white p-2 text-left rounded-md grid gap-2"}>
                <span className={"flex justify-between"}>
                    <Title className={'truncate'} size={18}>{review.user.firstName}</Title>
                    <Rating readOnly value={review.stars}/>
                </span>
                <hr/>
                <Text>{review.review}</Text>
            </div>
        </Carousel.Slide>
    ) ?? []

    if (thisPlace)
        return (
            <div className={"w-[95%] min-h-[calc(98vh-70px)] grid gap-2 m-auto"}>
                <div className={'w-full h-full text-left gap-4 m-auto grid md:grid-cols-2'}>
                    <div className={'w-full columns-2 space-y-2 gap-2 '}>
                        {thisPlace.images.map(img =>
                            <Image className={'w-full h-max'} src={img.img} key={img.id} alt={''}/>
                        )}
                    </div>
                    <div className={'w-full h-max grid gap-2 bg-white p-2'}>
                        <div className={'w-full border-b '}>
                            <span>
                                <Title>{showLabel(thisPlace.name)}</Title>
                                <Rating readOnly fractions={2} defaultValue={thisPlace.rating??0} />
                            </span>
                            <Text>{showLabel(thisPlace.kind)}</Text>
                        </div>
                        <div>
                            <Title size={'20px'}>Address</Title>
                            <div className={' p-2 border rounded-md grid grid-cols-4 '}>
                                {Object.keys(thisPlace.address).map(key => {
                                        const value = thisPlace.address[key];
                                        return <div key={key} className={'grid'}>
                                            {value?.includes('maps') ?
                                                <Anchor className={'!truncate'}>{value}</Anchor> :
                                                <Text className={'truncate'}>{value ? value : "Not specified"}</Text>
                                            }
                                            <Text className={'text-xs'}>{showLabel(key)}</Text>
                                        </div>
                                    }
                                )}
                            </div>
                        </div>
                        <div>
                            <Title size={'20px'}>Services offered</Title>
                            <List withPadding type={'unordered'}>
                                {...services}
                            </List>
                        </div>
                        <div>
                            <Title size={'20px'}>Transport options</Title>
                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Type <BiCar/></Table.Th>
                                        <Table.Th>Stage <GiBusStop/></Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {...transport}
                                </Table.Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <div className={"w-full grid gap-2"}>
                    <Title>Reviews</Title>
                    {(thisPlace.reviews?.length ?? 0) > 0
                        ? <Carousel
                            slideSize="20%"
                            slideGap={'md'}
                            align={"start"}
                            withControls={false}
                            withIndicators={true}
                            classNames={{indicator: "bg-blue-500"}}
                            className={"w-full h-max"}
                        >
                            {...carouselSlides}
                        </Carousel>
                        : <div className={"w-full h-[20vh] flex"}>
                            <Text className={"m-auto bg-orange-100 text-orange-800 p-5 rounded"}>No reviews yet</Text>
                        </div>
                    }
                    <WriteReview businessId={thisPlace.id}/>
                </div>
            </div>
        )
    else {
        return (
            <div className={'w-full min-h-[calc(100vh-60px)] flex'}>
                <Text className={'w-max max-w-lg bg-white p-2 rounded-md border m-auto'}>
                    Oops, we cannot find this place, please go back and refresh the page. The link may be broken. Please
                    visit the home page and try searching
                </Text>
            </div>
        )
    }
}

