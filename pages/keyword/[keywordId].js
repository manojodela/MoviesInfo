import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from 'axios';
import { Button, Col, Progress, Result, Row, Space, Spin, Tooltip } from "antd";
import MainLayout from "@/components/layout";
import { TOKEN, PROFILE_PATH } from "@/constants";
import Link from "next/link";

export default function MovieDetails() {
    const [movieData, setMovieData] = useState();
    const [movieDetails, setMovieDetails] = useState();
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const keywordId = router.query?.keywordId?.split('-')[0];

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.themoviedb.org/3/keyword/${keywordId}/movies`,
            headers: {
                'Authorization': TOKEN
            }
        };

        axios.request(config)
            .then((response) => {
                setMovieData(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });

        setTimeout(() => {
            setLoading(false);
        }, 500)

    }, [keywordId])

    console.log(movieData);

    return (<>
        <MainLayout>
            {loading ? (
                <div className="position-absolute top-50 start-50">
                    <Spin size="large" className="">
                        <div className="content" />
                    </Spin>
                </div>
            ) : <>
                <Row justify={"center"} align={"stretch"} gutter={[10, 10]} className="w-75 mx-auto">

                    {movieData && movieData?.length > 0 ? movieData.map((movie) => {
                        return (
                            <>
                                <Col lg={4} className="p-0">
                                    <p className="mb-2 position-relative">
                                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${movie?.poster_path}`} alt={`${movie?.original_title} Poster`}
                                            className=" pointer img-flex" onClick={() => router.push(`/movies/${movie.id}`)}
                                            style={{ width: "-webkit-fill-available", height: '220px', }}
                                        />
                                    </p>
                                </Col>
                                <Col key={movie.id} lg={20} md={20} sm={8} xs={12} className="text-center p-0">
                                    <div className="bg-white rounded-0 h-100">
                                        <div className="text-start ps-2 py-2">
                                            <Link href={`/movies/${movie?.id}`} className="fw-bold title"> {movie?.original_title}</Link>
                                            <p className="releaseDate">{movie?.release_date}</p>
                                            <p className="overview w-75">{movie?.overview}</p>
                                        </div>
                                    </div>
                                </Col>
                            </>)
                    }) : <div className="position-absolute top-25" style={{ left: "23rem" }}>
                        {/* <Result
                            title="No Results Found"
                            extra={
                                <Button type="primary" key="console" onClick={() => window.location.reload()}>
                                    Go Back
                                </Button>
                            }
                        /> */}
                    </div>}
                </Row>
            </>
            }
        </MainLayout >
    </>)
}
