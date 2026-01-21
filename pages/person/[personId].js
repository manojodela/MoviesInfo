import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from 'axios';
import { Button, Col, Progress, Result, Row, Space, Spin, Timeline, Tooltip } from "antd";
import MainLayout from "@/components/layout";
import { TOKEN, PROFILE_PATH } from "@/constants";
import Link from "next/link";
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from "@ant-design/icons";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function PersonDetails() {
    const [personData, setPersonData] = useState([]);
    const [personDetails, setPersonDetails] = useState([]);
    const [recommendations, setRecommendations] = useState();
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const personId = router.query?.personId?.split('-')[0];
    const personName = router.query?.personId?.split('-')[1];

    const settings = {
        arrows: true,
        speed: 500,
        slidesToShow: Object.entries(personDetails).length >= 5 ? 5 : personDetails.length == 4 ? 4 : Object.entries(personDetails).length == 3 ? 3 : Object.entries(personDetails).length == 2 ? 2 : 1,
        slidesToScroll: Object.entries(personDetails).length >= 5 ? 5 : personDetails.length == 4 ? 4 : Object.entries(personDetails).length == 3 ? 3 : Object.entries(personDetails).length == 2 ? 2 : 1,
        responsive: [
            {
                breakpoint: 1200, // Medium devices (tablets, 768px and up)
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                },
            },
            {
                breakpoint: 992, // Medium devices (tablets, 768px and up)
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                },
            },
            {
                breakpoint: 768, // Small devices (phones, 576px and up)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                },
            },
            {
                breakpoint: 500, // Small devices (phones, 576px and up)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                },
            },
        ],
    };

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.themoviedb.org/3/person/${personId}`,
            headers: {
                'Authorization': TOKEN
            }
        };

        axios.request(config)
            .then((response) => {
                setPersonData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


        let options = {
            method: 'get',
            maxBodyLength: Infinity,
            // url: `https://api.themoviedb.org/3/search/person?query=${personName}&language=en-US&page=1`,
            url: `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`,

            headers: {
                'Authorization': TOKEN
            }
        };

        axios.request(options)
            .then((response) => {
                setPersonDetails(response?.data?.cast)
            })
            .catch((error) => {
                console.log(error);
            });

        let options1 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.themoviedb.org/3/movie/${personId}/recommendations?language=en-US&page=1`,
            headers: {
                'Authorization': TOKEN
            }
        };

        axios.request(options1)
            .then((response) => {
                console.log(response);
                setRecommendations(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });



        setTimeout(() => {
            setLoading(false);
        }, 800)

    }, [personId])




    const sortedItems = personDetails?.slice().sort((a, b) => {
        if (a.release_date > b.release_date) return -1;
        if (a.release_date < b.release_date) return 1;
        return 0;
    });

    return (<>
        <MainLayout>
            {loading ? (
                <div className="position-absolute top-50 start-50">
                    <Spin size="large" className="">
                        <div className="content" />
                    </Spin>
                </div>
            ) : <>
                <Row justify={"center"} align={"stretch"} gutter={[20, 10]} className=" mx-auto">

                    {personData && (
                        <>
                            <Col lg={6} className="p-2">
                                <p className="mb-2 position-relative ">
                                    <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${personData?.profile_path}`} alt={`${personData?.name} Poster`}
                                        className="rounded-3 img-flex " style={{ height: "85%", width: "100%" }}
                                    />
                                </p>
                                <div className="mx-start w-75 my-3">
                                    <Space direction="horizontal" size={"large"}>
                                        <Tooltip placement="bottom" title="Visit Facebook" >
                                            <div className=""><FacebookFilled className="fs-2" /></div>
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="Visit Twitter" >
                                            <div className="" >  <TwitterCircleFilled className='fs-2' /> </div>
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="Visit Instagram" >
                                            <div className=""><InstagramFilled className="fs-2" /></div>
                                        </Tooltip>
                                    </Space>
                                </div>
                                <div className="my-2">
                                    <h5 className="text-decoration-underline">Personal Info</h5>
                                    <div>
                                        <h6 className="mb-1">Known For</h6>
                                        <p>{personData?.known_for_department}</p>
                                    </div>
                                    <div>
                                        <h6 className="mb-1">Gender</h6>
                                        <p>{personData?.gender == '1' ? 'Female' : 'Male'}</p>
                                    </div>
                                    <div>
                                        <h6 className="mb-1">Birthday</h6>
                                        <p>{personData?.birthday}</p>
                                    </div>
                                    <div>
                                        <h6 className="mb-1">Place of Birth</h6>
                                        <p>{personData?.place_of_birth}</p>
                                    </div>
                                    <div>
                                        <h6 className="mb-1">Also Known For</h6>
                                        <p>{personData?.also_known_as?.map(e => e).join(", ")}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col key={personData.id} lg={15} md={20} sm={8} xs={12} className="text-center p-0">
                                <div className="bg-white rounded-0 mb-3 p-2">
                                    <div className="text-start ps-2 py-2">

                                        <h5 className="title fw-bold fs-3">{personData?.name}</h5>
                                        <p className="fs-6 mb-1 fw-bold">Biography</p>
                                        <p className="overview w-75 fs-6 font-family">{personData?.biography}</p>
                                    </div>
                                </div>
                                <h5 className="fw-bold text-start">Known For</h5>
                                <Slider {...settings}>
                                    {personDetails && personDetails?.map((person, i) => {
                                        if (!person.poster_path) {
                                            return null; // Skip this record
                                        }
                                        return (
                                            <div key={i} className="rounded-3 p-2 width" style={{ height: "100%"}} >
                                                <img src={PROFILE_PATH + person?.poster_path} alt={`Image ${i}`} className="img-fluid rounded-top-4 pointer"
                                                    onClick={() => router.push(`/movies/${person.id}`)} />
                                                <div className="card rounded-top-0 p-1" style={{ height: "120px",  }}>
                                                    <Link href={`/movies/${person.id}`} className=" mb-1 "><h6 className="fs-6">{person?.title} </h6></Link>
                                                    <p className="card-text">{person?.release_date}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Slider>
                                <h5 className="pt-2 fs-5 text-start">Acting</h5>
                                <Row>
                                    <Col lg={24}>
                                        <div className="card">
                                            <div className="me-auto my-3 ">
                                                <Timeline mode="left" >
                                                    {sortedItems.map((item, index) => (
                                                        <Timeline.Item key={index} label={item?.release_date.split("-")[0]} color="green">
                                                            <h5 className="mb-0"> {item?.title}</h5>
                                                            {item?.character && <p className="ps-3 fs-6">as {item?.character}</p>}
                                                        </Timeline.Item>
                                                    ))}
                                                </Timeline>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </>)
                    }
                </Row>

            </>
            }
        </MainLayout >
    </>)
}
