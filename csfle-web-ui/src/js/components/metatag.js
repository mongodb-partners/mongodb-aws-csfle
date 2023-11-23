import React from "react";
import MetaTags from 'react-meta-tags';

function MetaTag(props) {
    let indexMeta;
    if(!props.index || props.page === 'error') {
        indexMeta = <meta name="robots" content="noindex" />
    }
    let title;
    let description;
    let image = props.url + '/images/talofddh-devadyuti-debarati-deeptanal-home.jpg';
    switch(props.page) {
        default:
            title = 'Welcome to CSFLE Service | csfle';
            description = 'Welcome to CSFLE Service. A Place to test your Client Side Field Level Encryption.';
            image = props.url + '/images/csfle.jpg';
            break;
    }
    return (
        <>
            {props.page === 'error' ? (
                <MetaTags>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    {indexMeta}
                </MetaTags>
            ) : (
                <MetaTags>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    {indexMeta}

                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:image" content={image} />

                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={image} />
                    <meta property="og:image:secure_url" content={image} />
                    <meta property="og:image:alt" content={title} />
                </MetaTags>
            )}

        </>
    )
}

export default MetaTag;