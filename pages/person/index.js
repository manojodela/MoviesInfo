import { Col, Pagination, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios';
import { TOKEN } from "@/constants";
import MainLayout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Person() {
    const [persons, setPersons] = useState();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const router = useRouter();


    const onChange = (pageNumber) => {
        setPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/person/day',
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: TOKEN
            }
        };

        axios
            .request(options)
            .then(function (response) {
                setPersons(response.data.results)
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });

        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [page])


    return (
        <>  {loading ? (
            <div className="position-absolute top-50 start-50">
                <Spin size="large" className="">
                    <div className="content" />
                </Spin>
            </div>
        ) :
            <MainLayout>
                 <Head>
                        <title>Persons</title>
                        <meta name="description" content="Tmdb movies info" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                <h5>Popular Persons</h5>
                <Row gutter={[10,10]}>
                    {persons && persons.length > 0 ? persons.map((person) => {
                        return (<Col key={person.id} lg={4} md={6} sm={8} xs={12} className="text-center h-75">
                            <div className="bg-white rounded-top-3 mx-3">
                                {person?.poster_path ?
                                    <p className="mb-2 position-relative">
                                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${person.profile_path}`} alt={`${person.name} Poster`}
                                            className="rounded-top-3 pointer" onClick={() => router.push(`/person/${person.id}`)}
                                            style={{ width: "-webkit-fill-available", height: '100%', objectFit: 'cover' }} />
                                    </p>
                                    :
                                    <p className="mb-2 position-relative" style={{ height: "80%" }}>
                                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${person.profile_path}`} alt={`${person.name} Poster`}
                                            className="rounded-top-3 pointer" onClick={() => router.push(`/person/${person.id}`)}
                                            style={{ width: "-webkit-fill-available", height: '100%', objectFit: 'cover' }} />
                                    </p>}

                                <div className="text-start ps-2 py-2">
                                    <Link href={`/person/${person.name}`} className="fw-bold title"> {person.name}</Link>
                                    <h5 className="overview w-75" style={{ overflow: "hidden", whiteSpace: "nowrap", fontSize:"15px", color:"#c00" }}>
                                        {person?.known_for?.map(el => el.original_title).join(", ")}
                                    </h5>
                                </div>
                            </div>
                        </Col>)
                    }) : <div className="position-absolute top-25" style={{ left: "23rem" }}>

                    </div>}
                </Row>
                <div className="text-end my-2 p-3" >
                    <Pagination showQuickJumper current={page} defaultCurrent={1} total={10000} onChange={onChange} pageSize={20} />
                </div>
            </MainLayout>
        }
        </>
    )
}