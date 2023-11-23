import { useState, useEffect, useRef } from "react";
import {getSessionCookie, setSessionCookie, getSessionStorage, setSessionStorage} from "./session";
import {AWS_CONFIG} from "./constants";
import {API} from "aws-amplify";

API.configure();

export const useIndex = (hostname, protocol) => {
    let index = true;
    if((protocol === 'http:' && hostname === 'localhost') || (protocol === 'https:' && hostname === 'dev.taleofddh.com')) {
        index = false;
    }

    return index;
}

export const useFetch = (url, key) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let json;
        let obj;
        if(key === 'geolocation') {
            obj = getSessionCookie(key)
        } else {
            obj = getSessionStorage(key);
        }
        if(Object.keys(obj).length === 0 && obj.constructor === Object) {
            const response = await fetch(url);
            json = await response.json();
            if(key) {
                if(key === 'geolocation') {
                    setSessionCookie(key, json)
                } else {
                    setSessionStorage(key, json);
                }
            }
        } else {
            json = obj;
        }
        console.log(json);
        setData(json);
        setLoading(false);
    }

    return [data, loading];
}

export const useGet = (api, path, key) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let json;
        let obj = getSessionStorage(key);

        const init = {
            response: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

        if(Object.keys(obj).length === 0 && obj.constructor === Object) {
            await API.get(api, path, init)
                .then(async response => {
                    json = await response.data;
                    if(key) {
                        setSessionStorage(key, json);
                    }
                })
                .catch(error => {
                    console.log(error);
                    json = error;
                });
        } else {
            json = obj;
        }
        console.log(json);
        setData(json);
        setLoading(false);
    }

    return [data, loading];
}

export const usePost = (api, path, data) => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postData();
    }, []);

    async function postData() {
        console.log(data);

        const init = {
            response: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        }

        await API.post(api, path, init)
            .then(async response => {
                console.log(response.data);
                setResult(await response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setResult(error);
                setLoading(false);
            });
    }

    return [result, loading];
}

export const usePut = (api, path, data) => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        putData();
    }, []);

    async function putData() {
        console.log(data);

        const init = {
            response: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        }

        await API.put(api, path, init)
            .then(response => {
                console.log(response.data);
                setLoading(false);
                setResult(response.data);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setResult(error);
            });
    }

    return [result, loading];
}

export const useFormFields = (initialState) => {
    const [fields, setFields] = useState(initialState);

    return [
        fields,
        function(event) {
            setFields({
                ...fields,
                [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
            });
        }
    ];
}

export const useMediaQuery = (query) => {
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        let userAgent = window.navigator.userAgent;
        let msIe = userAgent.indexOf("MSIE ");
        const handler = (e) => setMatches(e.matches);
        if(msIe) {
            mediaMatch.addListener(handler)
        } else {
            mediaMatch.addEventListener('change', handler);
        }
        return () => {
            if(msIe) {
                mediaMatch.removeListener(handler)
            } else {
                mediaMatch.removeEventListener('change', handler);
            }
        }
    });

    return matches;
};

export const useHover = () => {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);

                return () => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }
        },
        [ref.current] // Recall only if ref changes
    );

    return [ref, value];
}
