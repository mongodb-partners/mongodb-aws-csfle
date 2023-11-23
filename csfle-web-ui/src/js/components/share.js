import React from 'react';
import {MEDIA_HOST} from "../common/constants";
import {
    EmailShareButton,
    FacebookShareButton,
    PinterestShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import {
    FacebookShareCount,
    PinterestShareCount,
    TumblrShareCount
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    PinterestIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";
import '../../scss/components/share.scss';

function Share(props) {
    return (
        <>
            <div className="socialnetwork">
                <EmailShareButton
                    url={props.url}
                    subject={props.subject}
                    body={props.body}
                    className="socialnetworksharebutton">
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
            <div className="socialnetwork">
                <FacebookShareButton
                    url={props.url}
                    quote={props.subject}
                    hashtag={props.name}
                    className="socialnetworksharebutton">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <div>
                    <FacebookShareCount url={props.url} className="socialnetworksharecount">
                        {count => count}
                    </FacebookShareCount>
                </div>
            </div>
            <div className="socialnetwork">
                <PinterestShareButton
                    url={props.url}
                    media={`${MEDIA_HOST}/images/mobile/${props.image}`}
                    description={props.subject}
                    className="socialnetworksharebutton">
                    <PinterestIcon size={32} round />
                </PinterestShareButton>
                <div>
                    <PinterestShareCount url={props.url} className="socialnetworksharecount" />
                </div>
            </div>
            <div className="socialnetwork">
                <TumblrShareButton
                    url={props.url}
                    title={props.subject}
                    className="socialnetworksharebutton">
                    <TumblrIcon size={32} round />
                </TumblrShareButton>
                <div>
                    <TumblrShareCount url={props.url} className="socialnetworksharecount" />
                </div>
            </div>
            <div className="socialnetwork">
                <TwitterShareButton
                    url={props.url}
                    title={props.subject}
                    hashtags={[props.name]}
                    className="socialnetworksharebutton">
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </div>
            <div className="socialnetwork">
                <WhatsappShareButton
                    url={props.url}
                    title={props.subject}
                    className="socialnetworksharebutton">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
        </>
    )
}

export default Share;