import { useEffect, useState } from "react";
import { Button, Col, Collapse, Menu, Pagination, Progress, Radio, Result, Row, Select, Slider, Spin, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { TOKEN } from "@/constants";
import axios from "axios";
import moment from "moment/moment";

const { Option } = Select;
const { Panel } = Collapse;

const initialFilter = {
    sort_by: "popularity.desc",
    with_genres: "",
    certification: "",
    with_original_language: "",
    "vote_count.gte": "0",
    "vote_average.gte": "0",
    "vote_average.lte": "10"
}

const items = [
    {
        key: '1',
        label: 'Popularity Descending',
        value: 'popularity.desc'
    },
    {
        key: '2',
        label: 'Popularity Ascending',
        value: 'popularity.asc'
    },
    {
        key: '3',
        label: 'Rating Descending',
        value: 'vote_average.desc'
    },
    {
        key: '4',
        label: 'Rating Ascending',
        value: 'vote_average.asc'
    },
    {
        key: '5',
        label: 'Release Date Descending',
        value: "primary_release_date.desc"
    },
    {
        key: '6',
        label: 'Release Date Ascending',
        value: "primary_release_date.asc"
    },
    {
        key: '7',
        label: 'Title (A-Z)',
        value: "title.asc"
    },
    {
        key: '8',
        label: 'Title (Z-A)',
        value: "title.desc"
    },
];

const marks = {
    0: "0",
    200: '200',
    400: '400',
    600: '600',
    800: '800',
    1000: '1000',
};

export default function AiringToday() {
    const [tvShows, setTvShows] = useState([]);
    const [genres, setGenres] = useState('');
    const [languages, setLanguages] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState('');
    const router = useRouter();
    const [filter, setFilter] = useState(initialFilter)

    const updateFilter = (key) => (value) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            [key]: value,
        }));
    };

    const onSubmit = () => {
        fetchAiringToday(true);
    }

    const toggleAccordion = () => {
        setIsCollapsed(!isCollapsed);
    };

    const fetchAiringToday = () => {
        var apiUrl;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: TOKEN
            }
        };
        const urlSearchParams = new URLSearchParams(filter);
        const queryString = urlSearchParams.toString();
        if (JSON.stringify(initialFilter) != JSON.stringify(filter)) {
            apiUrl = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}&${queryString}`;
        } else {
            apiUrl = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}&popularity.desc`;
        }

        fetch(apiUrl, options)
            .then(response => response.json())
            .then(response => { setTvShows(response.results); setTotalCount(response.total_results); })
            .catch(err => console.error(err));

    }

    const fetchGenres = () => {
        const options1 = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: TOKEN
            }
        };
        fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options1)
            .then(response => response.json())
            .then(response => { setGenres(response); })
            .catch(err => console.error(err));
    }

    const fetchLanguages = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.themoviedb.org/3/configuration/languages',
            headers: {
                'Authorization': TOKEN
            }
        };

        axios.request(config)
            .then((response) => {
                setLanguages(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
        fetchAiringToday();
        fetchGenres();
        fetchLanguages();

        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [page]);



    const onChange = (pageNumber) => {
        setPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth', 
          });
    };
    return (
        <>
            {loading ? (
                <div className="position-absolute top-50 start-50">
                    <Spin size="large" className="">
                        <div className="content" />
                    </Spin>
                </div>
            ) :
                <Layout>
                    <h5 className="p-3 font-family fw-bold">Upcoming Movies</h5>
                    <Row gutter={[10, 10]} justify={"space-around"} align={"stretch"}>
                        <Col lg={5}>
                            <Collapse bordered={true} accordion expandIconPosition="right" className=" mx-auto bg-light" defaultActiveKey={"1"}>
                                <Panel header={<button className="accordion-button fw-bold font-family" type="button"
                                    onClick={toggleAccordion} aria-expanded={!isCollapsed}>Filter</button>} key="1">
                                    <div className={`accordion-body ${isCollapsed ? 'collapsed' : ''}`}>
                                        <p className="mb-1">Sort</p>
                                        <Select size="middle" placeholder="Select" className="bg-dark w-100 mb-1" showSearch defaultValue="Popularity Descending"
                                            onChange={(value) => updateFilter('sort_by')(value)}>
                                            {items.map((item, i) => (
                                                <Option key={i} value={item.value}>
                                                    {item.label}
                                                </Option>
                                            ))}
                                        </Select>

                                        <p className="mb-1">Genres</p>
                                        <Select size="middle" placeholder="Select" className="bg-dark w-100 mb-1" showSearch
                                            value={filter.with_genres} onChange={(value) => updateFilter('with_genres')(value)} >
                                            {genres?.genres?.map((item) => (
                                                <Option key={item.id} value={item.id} defaultValue="1">
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div>
                                        <p className="mb-1">Certifications</p>
                                        <Radio.Group buttonStyle="solid" value={filter.certification}
                                            onChange={(e) => updateFilter('certification')(e.target.value)}>
                                            {['U', 'UA', 'A'].map((item, i) => (
                                                <Radio.Button key={i} value={item} className="rounded-4 mx-1">
                                                    {item}
                                                </Radio.Button>
                                            ))}
                                        </Radio.Group>
                                    </div>

                                    <div>
                                        <p className="mb-1">Languages</p>
                                        <Select size="middle" placeholder="Select" className="bg-dark w-100 mb-1" showSearch
                                            value={filter.language} onChange={(value) => updateFilter('language')(value)}>
                                            {languages && languages.map((item) => (
                                                <Option key={item.iso_639_1} value={item.iso_639_1}>
                                                    {item.english_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <p className="mb-1"> User Score</p>
                                        <Slider range max={10} tooltip={true} step='1' marks={{ 0: "0", 5: "5", 10: "10" }} defaultValue={[0, 10]}
                                            onChange={(value) => { updateFilter('vote_average.gte')(value[0]); updateFilter('vote_average.lte')(value[1]) }} />
                                    </div>

                                    <div>
                                        <p className="mb-1">Minimum User Votes</p>
                                        <Slider range max={1000} tooltip={true} step='100' marks={marks} value={filter.userVotes}
                                            onChange={(value) => updateFilter('vote_count.gte')(value[1])} />
                                    </div>

                                </Panel>
                            </Collapse>

                            <div className="w-75 mx-auto text-center my-3">
                                <Button type="search" size="large" className="w-100 rounded-3 border bg-dark text-white" onClick={onSubmit}>Search</Button>
                            </div>
                        </Col>
                        <Col lg={18}>
                            <Row justify={"space-between"} align={"stretch"} gutter={[20, 10]}>

                                {tvShows && tvShows.length > 0 ? tvShows.map((tv) => {
                                    const progressColor = Math.round(tv.vote_average * 10) >= 70 ? 'lightgreen' : 'orange';
                                    return (<Col key={tv.id} lg={6} md={6} sm={8} xs={12} className="text-center ">
                                        <div className="bg-white rounded-top-3 h-100">
                                            {tv?.poster_path ?
                                                <p className="mb-2 position-relative">
                                                    <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${tv.poster_path}`} alt={`${tv.original_name} Poster`}
                                                        className="rounded-top-3 pointer" onClick={() => router.push(`/tv/${tv.id}`)}
                                                        style={{ width: "-webkit-fill-available", height: '100%', objectFit: 'cover' }} />
                                                    <Tooltip title="User Votes" color="red">
                                                        <Progress strokeLinecap="butt" type="circle" percent={Math.round(tv.vote_average * 10)} className="percentage" strokeColor={progressColor} />
                                                    </Tooltip>
                                                </p>
                                                :
                                                <p className="mb-2 position-relative" style={{ height: "80%" }}>
                                                    <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${tv.poster_path}`} alt={`${tv.original_name} Poster`}
                                                        className="rounded-top-3 pointer" onClick={() => router.push(`/tv/${tv.id}`)}
                                                        style={{ width: "-webkit-fill-available", height: '100%', objectFit: 'cover' }} />
                                                    <Progress strokeLinecap="butt" type="circle" percent={Math.round(tv.vote_average * 10)} className="percentage" strokeColor={progressColor} />
                                                </p>}

                                            <div className="text-start ps-2 py-2">
                                                <Link href={`/tv/${tv.id}`} className="fw-bold title"> {tv.original_name}</Link>
                                                <p className="releaseDate">{moment(tv.first_air_date).format('MMM D, YYYY')}</p>
                                            </div>
                                        </div>
                                    </Col>)
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
                        </Col>
                    </Row>
                    <div className="text-end my-2 p-3" >
                        <Pagination showQuickJumper current={page} defaultCurrent={1} total={totalCount} onChange={onChange} pageSize={20} />
                    </div>
                </Layout>
            }
        </>
    );
}
