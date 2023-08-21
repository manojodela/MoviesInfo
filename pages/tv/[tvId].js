import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from 'axios';
import { Button, Col, Progress, Row, Space, Spin, Tooltip } from "antd";
import MainLayout from "@/components/layout";
import { TOKEN, PROFILE_PATH } from "@/constants";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BookOutlined, FacebookFilled, GooglePlusCircleFilled, HeartOutlined, InstagramFilled, StarOutlined, TwitterCircleFilled, UnorderedListOutlined } from '@ant-design/icons';
import Link from "next/link";
import Head from "next/head";

export default function MovieDetails() {
    const [tvData, setTvData] = useState();
    const [cast, setCast] = useState();
    const [credits, setCredits] = useState();
    const [keywords, setKeywords] = useState();
    const [recommendations, setRecommendations] = useState();
    const [isFilled, setIsFilled] = useState(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const filteredCast = cast?.cast.filter(cast => cast.profile_path);
    const progressColor = Math.round(tvData?.vote_average * 10) >= 70 ? 'lightgreen' : 'orange';

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    const settings = {
        arrows: true,
        speed: 500,
        infinite: true,
        slidesToShow: filteredCast && Object.entries(filteredCast).length >= 6 ? 6 : 4,
        slidesToScroll: filteredCast && Object.entries(filteredCast).length >= 6 ? 6 : 4,
    };

    const writers = credits?.crew
        .filter(person => person.job.toLowerCase() === 'writer')
        .map(writer => writer.name);

    const characters = credits?.crew
        .filter(person => person.job.toLowerCase() === 'characters')
        .map(characters => characters.name);

    const directors = credits?.crew
        .filter(person => person.job.toLowerCase() === 'director')
        .map(director => director.name);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.themoviedb.org/3/tv/${router.query.tvId}`,
            headers: {
                'Authorization': TOKEN
            }
        };

        axios.request(config).then((response) => {
            setTvData(response.data)
        }).catch((error) => {
            console.log(error);
        });


        const options1 = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${router.query.tvId}/aggregate_credits?language=en-US`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: TOKEN
            }
        };

        axios.request(options1).then(function (response) {
            setCast(response.data);
        }).catch(function (error) {
            console.error(error);
        });


        const options2 = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${router.query.tvId}/credits`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: TOKEN
            }
        };

        axios.request(options2).then(function (response) {
            setCredits(response.data);
        }).catch(function (error) {
            console.error(error);
        });


        let options4 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.themoviedb.org/3/tv/${router.query.tvId}/keywords`,
            headers: {
                'Authorization': TOKEN
            }
        };

        axios.request(options4)
            .then((response) => {
                setKeywords(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });



        let options5 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.themoviedb.org/3/tv/${router.query.tvId}/recommendations?language=en-US&page=1`,
            headers: {
                'Authorization': TOKEN
            }
        };

        axios.request(options5)
            .then((response) => {
                setRecommendations(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });


        setTimeout(() => {
            setLoading(false);
        }, 500)

    }, [router.query.tvId])


    return (<div className="px-3">
        <MainLayout>
            {loading ? (
                <div className="position-absolute top-50 start-50">
                    <Spin size="large" className="">
                        <div className="content" />
                    </Spin>
                </div>
            ) : <>
                <section className="py-3">
                    <Head>
                        <title>TV Show</title>
                        <meta name="description" content="Tmdb movies info" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <div className="card dashboard">
                        <Row justify={"space-around"} align={"middle"} className="pad-y" gutter={[10, 10]}
                            style={{ background: "linear-gradient(to bottom right, rgba(220.5, 220.5, 220.5, 1), rgba(220.5, 220.5, 220.5, 0.84))" }}>
                            <Col lg={6}>
                                <img src={PROFILE_PATH + tvData?.poster_path} className="img-fluid" />
                            </Col>
                            <Col lg={16}>
                                <div>
                                    <h4>{tvData?.name} ({tvData?.first_air_date && tvData.first_air_date.split("-")[0]})</h4>
                                    <ul className="list-style-none font-family">
                                        <li>{tvData?.first_air_date} (IN)</li>
                                        <li>{tvData?.genres.map((item) => item?.name).join(', ')}</li>
                                        <li>{Math.floor(tvData?.episode_run_time / 60) + 'h' + ':' + tvData?.episode_run_time % 60}m</li>
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <Space direction="horizontal" size={"large"}>
                                        <Progress strokeLinecap="butt" type="circle" percent={Math.round(tvData?.vote_average * 10)}
                                            className="circle" size={"small"} strokeColor={progressColor} />
                                        <Tooltip placement="bottom" title="add to list" >
                                            <div className="dots"><UnorderedListOutlined className="fs-4" /></div>
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="add to list" >
                                            <div className="dots" >  <HeartOutlined className={`fs-4`} /> </div>
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="add to list" >
                                            <div className="dots"><BookOutlined className="fs-4" /></div>
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="add to list" >
                                            <div className="dots"><StarOutlined className="fs-4" /></div>
                                        </Tooltip>
                                    </Space>
                                </div>
                                <p className="title">{tvData?.tagline}</p>
                                {tvData?.genres && tvData?.genres.map((genre) => (
                                    <Button type="default" className="mx-1 my-2">{genre.name}</Button>
                                ))}
                                <h5 className="mt-2">OverView</h5>
                                <p className="overview w-75 fs-6">{tvData?.overview}</p>
                                <Row justify={"space-evenly"} className="w-75">
                                    {directors && directors[0] && <p className="text-center p-2 font-family">
                                        <span className="fs-6 fw-bold">{directors && directors[0]}<br /></span>
                                        Director
                                    </p>}
                                    {writers && writers[0] && <p className="text-center p-2 font-family">
                                        <span className="fs-6 fw-bold">{writers && writers[0]} <br /> </span>
                                        characters
                                    </p>}
                                    {characters && characters[0] && <p className="text-center p-2 font-family">
                                        <span className="fs-6 fw-bold">{characters && characters[0]}<br /></span>
                                        Writer
                                    </p>}
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </section>

                <Row>
                    <Col lg={18}>
                        <section className="p-3">
                            <h5 className="ps-1 font-family fw-bold">Top Billed Cast</h5>
                            <div className="slider">
                                <Slider {...settings}>
                                    {filteredCast?.map((cast, index) => {
                                        return (
                                            <div key={index} className="rounded-3 p-2" >
                                                <img src={PROFILE_PATH + cast?.profile_path} alt={`Image ${index}`} className="img-fluid rounded-top-4 pointer"
                                                    onClick={() => router.push(`/person/${encodeURIComponent(cast?.id)}-${encodeURIComponent(cast?.original_name)}`)} />
                                                <div className="card rounded-top-0 p-1">
                                                    <Link href={`/person/${encodeURIComponent(cast?.id)}-${encodeURIComponent(cast?.original_name)}`} className="card-title fw-bold mb-1">{cast?.original_name}</Link>
                                                    <p className="card-text">{cast?.character}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Slider>
                            </div>

                            <div className="">
                                <h5 className="fw-bold">Keywords</h5>
                                {keywords?.length ? keywords?.map((keyword) => (
                                    <Button type="default rounded-3 m-1 bg-dark text-white" key={keyword.id}
                                        onClick={() => { router.push(`/keyword/${keyword.id}-${keyword.name}-tv`) }}>
                                        {keyword.name}
                                    </Button>
                                )) : <p className="fs-5">No keywords have been added.</p>}
                            </div>
                        </section>
                    </Col>
                    <Col lg={6}>
                        <section className="p-3">
                            <p>
                                <Space direction="horizontal" size={"large"}>

                                    <Tooltip placement="bottom" title="Visit Facebook" >
                                        <div className="dots"><FacebookFilled className="fs-4" /></div>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title="Visit Twitter" >
                                        <div className="dots" >  <TwitterCircleFilled className={`fs-4`} /> </div>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title="Visit Instagram" >
                                        <div className="dots"><InstagramFilled className="fs-4" /></div>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title="Visit Google" >
                                        <div className="dots"><GooglePlusCircleFilled className="fs-4" /></div>
                                    </Tooltip>
                                </Space>
                            </p>

                            <div>
                                <Space direction="vertical">
                                    <div>
                                        <h5 className="fs-5 fw-2 mb-1">Status</h5>
                                        <p className="fs-6 font-family">{tvData?.status}</p>
                                    </div>
                                    <div>
                                        <h5 className="fs-5 fw-2 mb-1">Type</h5>
                                        <p className="fs-6 font-family">{tvData?.genres.map((item) => item?.name).join(', ')}</p>
                                    </div>
                                    <div>
                                        <h5 className="fs-5 fw-2 mb-1">Original Language</h5>
                                        <p className="fs-6 font-family">{tvData?.spoken_languages?.map(e => e.name).join(', ')}</p>
                                    </div>
                                </Space>
                            </div>

                        </section>
                    </Col>
                </Row>

                <h5 className="ps-3 fw-bold">Recommendations</h5>
                <Row className="ps-3">
                    <Col lg={17}>
                        <Row style={{ flexFlow: "nowrap", overflowX: "scroll" }}>
                            {recommendations && recommendations.length > 0 ? recommendations?.map((tv, index) => {
                                if (!tv?.poster_path) return false;
                                return (
                                    <>
                                        <Col lg={4}>
                                            <div key={index} className="rounded-3 p-2" >
                                                <img src={PROFILE_PATH + tv?.poster_path} alt={`Image ${index}`} className="img-fluid rounded-top-4 pointer" style={{ height: "50%" }}
                                                    onClick={() => router.push(`/movies/${encodeURIComponent(tv?.id)}-${encodeURIComponent(tv?.original_name)}`)} />
                                                <div className="card rounded-top-0 p-1">
                                                    <Link href={`/movies/${encodeURIComponent(tv?.id)}-${encodeURIComponent(tv?.original_name)}`} className="card-title fw-bold mb-1">{tv?.original_name}</Link>
                                                    <Progress strokeLinecap="butt" type="line" percent={Math.round(tv.vote_average * 10)} size={"small"} strokeColor={progressColor} />
                                                </div>
                                            </div>
                                        </Col>

                                    </>
                                )
                            }) :
                                <p className="fs-7 fw-bold">{`We don't have enough data to suggest any movies based on ${tvData?.name}. You can help by rating movies you've seen.`}</p>
                            }
                        </Row>
                    </Col>
                    <Col lg={4}>
                    </Col>
                </Row>
            </>
            }



        </MainLayout >
    </div>)
}
