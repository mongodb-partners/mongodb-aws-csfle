import React, {useState} from 'react';
import {API} from 'aws-amplify';
import marked  from "marked";
import ReactHtmlParser  from 'react-html-parser';
import { MEDIA_HOST} from "../common/constants";
import Logo from "../common/logo";
import '../../scss/pages/article.scss';
import {useMediaQuery} from "../common/hook";

function Markdown(props) {
    const [markDown, setMarkDown] = useState([]);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTablet = useMediaQuery('(max-width: 1200px)');
    const originalPath = '/desktop/'

    async function loadMdText(key) {
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
                if (isMobile) {
                    text = text.toString().replace(originalPath,'/mobile/');
                } else if (isTablet) {
                    text = text.toString().replace(originalPath,'/tablet/');
                }
                setMarkDown(marked(text.toString()));
            });
    }

    let content;
    if(props.section.type === 'Logo') {
        const arr = props.section.content.split(',');
        content = arr.map((item, index) => {
            return (<img key={index} className={props.section.styleClass} src={MEDIA_HOST + "/images/" + item}/>)
        });
    } else if (props.section.type === 'Markdown') {
        loadMdText(props.section.content);
        content = <div className={props.section.styleClass}>{ReactHtmlParser(markDown)}</div>;
    }

    return (
        <>
            {content}
        </>
    )
}

export default Markdown;