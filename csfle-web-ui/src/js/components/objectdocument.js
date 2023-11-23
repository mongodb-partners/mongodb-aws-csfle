import React, {useState, useEffect} from 'react';
import marked  from "marked";
import ReactHtmlParser  from 'react-html-parser';
import '../../scss/pages/article.scss';
import {API} from "aws-amplify";

function ObjectDocument(props) {
    const [markDown, setMarkDown] = useState([]);

    useEffect(() => {
        loadMdPath('Technical/spring-log4j2-splunk.md');
    }, []);

    async function loadMdPath(key) {
        await API.post(
            'getArticleDocument',
            '/articleDocument',
            {
                response: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: {prefix: key.substring(0, key.lastIndexOf('/')), file: key.substring(key.lastIndexOf('/') + 1)}
            }
        )
            .then(async response => {
                return await response.data
            })
            .then(text => {
                setMarkDown(marked(text));
            });
    }

    return (
        <>
            <div className="articlemarkdown">{ReactHtmlParser(markDown)}</div>
        </>
    )
}

export default ObjectDocument;