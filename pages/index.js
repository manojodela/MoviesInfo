'use client';

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Collapse, Pagination, Progress, Radio, Result, Row, Select, Slider, Spin, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { TOKEN } from "@/constants";
import axios from "axios";
import moment from "moment";
import { debounce } from "lodash";
import StateContext from "@/components/AppContext";

const { Option } = Select;
const { Panel } = Collapse;
const futureDate = moment().add(5, 'months');
const initialFilter = {
    sort_by: "popularity.desc",
    with_genres: "",
    certification: "",
    certification_country: "",
    with_original_language: "",
    watch_region: 'IN',
    "vote_count.gte": "0",
    "vote_average.gte": "0",
    "vote_average.lte": "10",
    "release_date.gte": "",
    "release_date.lte": futureDate.format('YYYY-MM-DD'),
    with_release_type: "",
    with_keywords: ""
}
const marks = {
    0: "0",
    200: '200',
    400: '400',
    600: '600',
    800: '800',
    1000: '1000',
};

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState('');
    const [keyword, setKeyword] = useState([]);
    const [filter, setFilter] = useState(initialFilter);
    const router = useRouter();
    const ctx = useContext(StateContext);

    console.log(ctx);

    const updateFilter = (key) => (value) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            [key]: value,
        }));
    };

    function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
        const [fetching, setFetching] = useState(false);
        const [options, setOptions] = useState([]);
        const fetchRef = useRef(0);
        const debounceFetcher = useMemo(() => {
            const loadOptions = (value) => {
                fetchRef.current += 1;
                const fetchId = fetchRef.current;
                setOptions([]);
                setFetching(true);
                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        // for fetch callback order
                        return;
                    }
                    setOptions(newOptions);
                    setFetching(false);
                });
            };
            return debounce(loadOptions, debounceTimeout);
        }, [fetchOptions, debounceTimeout]);
        return (
            <Select
                labelInValue
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                {...props}
                options={options}
            />
        );
    }

    const onSubmit = () => {
        fetchMovies(true);
    }

    const toggleAccordion = () => {
        setIsCollapsed(!isCollapsed);
    };

    const fetchMovies = () => {
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
            apiUrl = `https://api.themoviedb.org/3/discover/movie?page=${page}&${queryString}`;
        } else {
            apiUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`;
        }

        fetch(apiUrl, options)
            .then(response => response.json())
            .then(response => { setMovies(response.results); setTotalCount(response.total_results); })
            .catch(err => console.error(err));

    }

    function fetchGenres() {
        const options1 = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: TOKEN
            }
        };
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options1)
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

    const fetchUserKeywords = async (keyword) => {
        const options1 = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: TOKEN
            }
        };
        return await fetch(`https://api.themoviedb.org/3/search/keyword?query=${keyword}&page=1`, options1)
            .then((response) => response.json())
            .then((body) =>
                body.results.map((keyword) => ({
                    label: keyword.name,
                    value: keyword.id,
                }))
            );
    };

    useEffect(() => {
        fetchMovies();
    }, [ctx])


    useEffect(() => {
        fetchMovies();
        fetchGenres();
        fetchLanguages();

        setTimeout(() => {
            setLoading(false);
        }, 600);
    }, [page]);

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
                    <h5 className="p-3 font-family fw-bold">Popular Movies</h5>
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
                                        <Select size="middle" placeholder="Select Genres" className="bg-dark w-100 mb-1" showSearch mode="multiple"
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
                                            onChange={(e) => {
                                                updateFilter('certification')(e.target.value);
                                                updateFilter('certification_country')('IN')
                                            }}>
                                            {['U', 'UA', 'A'].map((item, i) => (
                                                <Radio.Button key={i} value={item} className="rounded-4 mx-1">
                                                    {item}
                                                </Radio.Button>
                                            ))}
                                        </Radio.Group>
                                    </div>

                                    <div>
                                        <p className="mb-1">Languages</p>
                                        <Select size="middle" placeholder="Select Language" className="bg-dark w-100 mb-1" showSearch
                                            value={filter.with_original_language} onChange={(value) => updateFilter('with_original_language')(value)}>
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

                                    <div>
                                        <p className="mb-1">Tags or Keywords</p>
                                        <DebounceSelect mode="multiple" value={keyword} placeholder="Select Keywords" fetchOptions={fetchUserKeywords} className="bg-dark w-100 mb-1"
                                            onChange={(value) => { setKeyword(value); updateFilter('with_keywords')(value && value.map(e => e.value).join("|")) }} style={{ width: '100%', }} />
                                    </div>

                                </Panel>


                            </Collapse>



                            <div className="w-75 mx-auto text-center my-3">
                                <Button type="search" size="large" className="w-100 rounded-3 border bg-dark text-white" onClick={onSubmit}>Search</Button>
                            </div>
                        </Col>
                        <Col lg={18}>
                            <Row justify={"space-between"} align={"stretch"} gutter={[20, 10]}>

                                {movies && movies.length > 0 ? movies.map((movie) => {
                                    const progressColor = Math.round(movie.vote_average * 10) >= 70 ? 'lightgreen' : 'orange';
                                    return (<Col key={movie.id} lg={6} md={6} sm={8} xs={12} className="text-center ">
                                        <div className="bg-white rounded-top-3 h-100">
                                            {movie?.poster_path ?
                                                <p className="mb-2 position-relative">
                                                    <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`} alt={`${movie.title} Poster`}
                                                        className="rounded-top-3 pointer" onClick={() => router.push(`/movies/${movie.id}`)}
                                                        style={{ width: "-webkit-fill-available", height: '100%', objectFit: 'cover' }} />
                                                    <Tooltip title="User Votes" color="red">
                                                        <Progress strokeLinecap="butt" type="circle" percent={Math.round(movie.vote_average * 10)} className="percentage" strokeColor={progressColor} />
                                                    </Tooltip>
                                                </p>
                                                :
                                                <p className="mb-2 position-relative no_image_holder" style={{ height: "80%" }}>
                                                    <Image className="position-absolute  top-50 start-50 translate-middle rounded-top-3 pointer"
                                                        src="/noImg.svg"
                                                        alt="Vercel Logo"
                                                        width={200}
                                                        height={180}
                                                        priority
                                                        onClick={() => router.push(`/movies/${movie.id}`)}
                                                    />
                                                    <Progress strokeLinecap="butt" type="circle" percent={Math.round(movie.vote_average * 10)} className="percentage" strokeColor={progressColor} />
                                                </p>}

                                            <div className="text-start ps-2 py-2">
                                                <Link href={`/movies/${movie.id}`} className="fw-bold title"> {movie.title}</Link>
                                                <p className="releaseDate">{moment(movie.release_date).format('MMM D, YYYY')}</p>
                                            </div>
                                        </div>
                                    </Col>)
                                }) : <div className="position-absolute top-25" style={{ left: "23rem" }}>
                                    <Result title="No items were found that match your query." />
                                </div>}
                            </Row>
                        </Col>
                    </Row>
                    <div className="text-end my-2 p-3" >
                        <Pagination showQuickJumper current={page} defaultCurrent={1} total={10000} onChange={onChange} pageSize={20} />
                    </div>
                </Layout>
            }
        </>
    );
}



export default Movies;



