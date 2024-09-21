import { useState, useContext, createContext } from 'react';

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    const showLoading = () => { setLoading(true) };
    const hideLoading = () => { setLoading(false) };


    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    return useContext(LoadingContext);
}
