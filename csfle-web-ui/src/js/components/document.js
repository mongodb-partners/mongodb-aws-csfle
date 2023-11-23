import React from "react";
import ReactHtmlParser from "react-html-parser";
import {useMediaQuery} from "../common/hook";
import {MEDIA_HOST} from "../common/constants";
import {NavLink} from "react-router-dom";
import '../../scss/pages/article.scss';

function Document(props) {
    const isThumbnail = useMediaQuery('(max-width: 600px)');
    const isMobile = useMediaQuery('(max-width: 800px)');
    const isTablet = useMediaQuery('(max-width: 1200px)');
    let originalPath = 'desktop'
    if(isThumbnail) {
        originalPath = 'thumbnail';
    } else if (isMobile) {
        originalPath = 'mobile';
    } else if (isTablet) {
        originalPath = 'tablet';
    }
    let content;
    if(props.section.type === 'Image') {
        content =
            <div className={props.section.styleClass}>
                <img src={MEDIA_HOST + '/images/' + originalPath + '/' + props.section.content} />
            </div>
    } else if (props.section.type === 'Text') {
        let tempMessage = props.section.content;
        let startMessage;
        let link;
        let linkText;
        let linkMessage;
        let endMessage;
        let linkStart = tempMessage.indexOf("<a")
        let linkEnd = tempMessage.indexOf("</a>");
        if(linkStart > -1) {
            if (linkStart > 0) {
                startMessage = tempMessage.substring(0, linkStart);
            }
            if(linkEnd + 5 < tempMessage.length) {
                endMessage = tempMessage.substring(linkEnd + 4, tempMessage.length)
            }
            link = tempMessage.substring(tempMessage.indexOf("href=\"") + 6, tempMessage.indexOf("\">"));
            linkText = tempMessage.substring(tempMessage.indexOf("\">") + 2, linkEnd);
            linkMessage =
                <NavLink to={link}>{linkText}</NavLink>
            content =
                <div className="article">
                    <p className={props.section.styleClass}>
                        <label>
                            {ReactHtmlParser(startMessage)}
                            {linkMessage}
                            {ReactHtmlParser(endMessage)}
                        </label>
                    </p>
                </div>
        } else {
            content =
                <div className="article">
                    <p className={props.section.styleClass}>
                        <label>
                            {ReactHtmlParser(tempMessage)}
                        </label>
                    </p>
                </div>
        }
    }

    return (
        <>
            {content}
        </>
    )
}

export default Document;