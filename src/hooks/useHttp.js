import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async(url, config) => {
    const response = await fetch(url, config);
    const data = await response.json();

    if(!response.ok) {
        throw new Error ( data.message || 'Something went wrong, failed to send request');
    }

    return data;
};

const useHttp = (url, config, initialData) => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialData);

    const clearData = () => {
        setData(initialData);
    }

    const sendRequest = useCallback(async (data)=>  {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body:data});
            setData(resData);
        } catch (error) {
            console.log('in here oe error', {error});
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if((config && config.method === 'GET' || !config.method) || !config) {
            sendRequest();
        }

    }, [sendRequest, config]);

    return {
        sendRequest,
        data,
        error,
        isLoading,
        clearData
    }
}

export default useHttp;
