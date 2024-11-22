import {Title} from "@mantine/core";

export default function AboutPage() {


    return (
        <div className={"w-[95%] m-auto space-y-2 h-max"}>
            <iframe
                // width="560" height="315"
                src="https://www.youtube.com/embed/RNPk-cx5NgE?si=ZlqC03j9PcDri5Ft"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                className={"w-full h-[70vh] rounded-md"}
            >
            </iframe>
            <Title>What is The Smart Nairobi System?</Title>
            <div className={'columns-lg text-left bg-white p-2 text-gray-700'}>
                <div className={" break-inside-avoid-column"}>
                    <Title size={'md'}>About Us</Title>
                    The *Smart Nairobi System* is a dynamic platform designed to transform how residents and visitors
                    explore Nairobi. Our goal is to provide seamless access to the best experiences the city has to
                    offer—whether it’s restaurants, hotels, recreational spots, or entertainment hubs. With real-time
                    location services and curated recommendations, we empower users to discover places that align with
                    their preferences. We blend technology with convenience, ensuring every journey through Nairobi is
                    easy, enjoyable, and memorable.
                    <br/>
                    <br/>
                </div>
                <div className={" break-inside-avoid-column"}>
                    <Title size={'md'}>Our Mission</Title>
                    <p>
                        Our mission is to create a smarter, more connected city by simplifying access to essential
                        services
                        and enhancing how people experience Nairobi. Through innovative technology, we aim to provide a
                        platform where users can make informed choices, share feedback, and foster a community of
                        discovery
                        and exploration. We are committed to offering a user-friendly system that bridges the gap
                        between
                        people and the places that define Nairobi.
                    </p>
                    <br/>
                    <br/>
                </div>
                <div className={"break-inside-avoid-column"}>
                    <Title size={'md'}>Our Vision</Title>
                    <p>
                        We envision Nairobi as a city where technology and exploration go hand in hand, helping people
                        connect
                        with what matters most. Our vision is to become the leading platform that inspires discovery,
                        promotes
                        local businesses, and makes urban navigation more efficient. By leveraging smart solutions, we
                        strive to
                        build a vibrant, accessible Nairobi where every journey is guided, enriching, and worth
                        remembering.
                    </p>
                </div>
            </div>
        </div>
    )
}

