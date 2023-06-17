import axios from 'axios'
import { useState, useEffect } from 'react'

const useFetch = (url) => {

    const [data, setData] = useState({})
    const [dataLoading, setDataLoading] = useState(false)
    const [dataError, setDataError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setDataLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
                setDataLoading(false)

            } catch (error) {
                setDataError(error)
            }
        }
        fetchData()
    }, [url])

    const reFetch = async () => {
        setDataLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setDataError(err);
        }
        setDataLoading(false);
    };


    console.log("useFetch", data);

    return { data, dataLoading, dataError, reFetch };

}

export default useFetch