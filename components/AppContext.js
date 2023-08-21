import React, { useEffect, useState } from "react";

const StateContext = React.createContext({
    searchName: '',
    setMovieName() { }
});

export const StateContextProvider = (props) => {
    const [searchName, setSearchName] = useState('');

    const setSearchMovieName = (movieName) => {
        console.log(movieName);
        setSearchName(movieName);
    }

   useEffect(()=>{
    setSearchMovieName();
    
   }, [searchName])

    const contextValue = {
        searchName: searchName,
        setMovieName: setSearchMovieName
    };

    return <StateContext.Provider value={contextValue}>{props.children}</StateContext.Provider>
}

export default StateContext;