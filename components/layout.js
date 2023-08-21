import React, { useContext, useRef } from 'react';
import { Button, Dropdown, Layout, Menu, Space } from 'antd';
import Link from 'next/link';
import { StateContextProvider } from './AppContext';
import StateContext from './AppContext';

const { Footer } = Layout;
const items = [
    {
        label: (
            <a rel="noopener noreferrer" href="/movies">
                Popular
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a rel="noopener noreferrer" href="/movies/now-playing">
                Now Playing
            </a>
        ),
        key: '1',
    },
    {
        label: (
            <a rel="noopener noreferrer" href="/movies/upcoming">
                Upcoming
            </a>
        ),
        key: '2',
    },
    {
        label: (
            <a rel="noopener noreferrer" href="/movies/top-rated">
                Top Rated
            </a>
        ),
        key: '3',
    },
];

const items1 = [
    {
        label: (
            <a rel="noopener noreferrer" href="/tv">
                Popular
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a rel="noopener noreferrer" href="/tv/airing-today">
                Airing Today
            </a>
        ),
        key: '1',
    },
    {
        label: (
            <a rel="noopener noreferrer" href="/tv/on-the-air">
                On TV
            </a>
        ),
        key: '2',
    },
    {
        label: (
            <a rel="noopener noreferrer" href="/tv/top-rated">
                Top Rated
            </a>
        ),
        key: '3',
    },
];

const MainLayout = ({ children }) => {
    const searchRef = useRef();
    const stateCtx = useContext(StateContext);
    
    const fetchMovies = () => {
        stateCtx.setMovieName(searchRef.current.value);
    }
    return (
        <>
            <Layout>
                <>
                    <nav className="navbar navbar-expand-lg  bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand  text-white" href="/movies">MOVIESINFO</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <Space size="large">
                                        <li className="nav-item">
                                            <Dropdown overlay={(
                                                <Menu>
                                                    {items.map(item => (
                                                        <Menu.Item key={item.key}>
                                                            <Link href={item.label.props.href} className='text-decoration-none fs-6'>{item.label.props.children}</Link>
                                                        </Menu.Item>
                                                    ))}
                                                </Menu>
                                            )}>
                                                <Link href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                    <Space direction='horizontal' className='fs-5 text-white'>Movies</Space>
                                                </Link>
                                            </Dropdown>
                                        </li>
                                        <li className="nav-item">
                                            <Dropdown overlay={(
                                                <Menu>
                                                    {items1.map(item => (
                                                        <Menu.Item key={item.key}>
                                                            <Link href={item.label.props.href} className='text-decoration-none fs-6'>{item.label.props.children}</Link>
                                                        </Menu.Item>
                                                    ))}
                                                </Menu>
                                            )}>
                                                <Link href="/" className="ant-dropdown-link fs-5" onClick={e => e.preventDefault()}>
                                                    <Space direction='horizontal' className=' text-white fs-5'>Tv Shows</Space>
                                                </Link>
                                            </Dropdown>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/person" className="ant-dropdown-link">
                                                <Space direction='horizontal' className=' text-white fs-5'>People</Space>
                                            </Link>
                                        </li>
                                    </Space>
                                </ul>
                                {/* <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={searchRef} />
                                    <Button className="btn btn-outline-success" onClick={fetchMovies}>Search</Button>
                                </form> */}
                            </div>
                        </div>
                    </nav>
                    <main className='my-2' style={{ minHeight: "80vh" }}>
                        <StateContextProvider>{children}</StateContextProvider>
                    </main>
                    <Footer className='p-0'>
                        <div className="container p-4"></div>
                        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                            <h5>  © 2023 Copyright:</h5>
                            <Link className="text-black" href="https://mdbootstrap.com/"> MovieStreamz.com</Link>
                        </div>
                    </Footer>
                </>
            </Layout>
        </>
    )
};

export default MainLayout;