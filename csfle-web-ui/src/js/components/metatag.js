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
        case 'home':
            title = 'Welcome to Octank Bank\'s Home | octankbank';
            description = 'Welcome to Octank Bank. An attempt to build a place on the web for customers of Octank to interact.';
            break;
        case 'about-us':
            title = 'The Tale of DDH story, Our mission, journey and background';
            description = 'Meet the team behind octankbank. We are on a mission to make the delivery of cross-border and local professional-services hassle-free and simple.';
            image = props.url + '/images/talofddh-devadyuti-debarati-deeptanal-home.jpg'
            break;
        case 'contact-us':
            title = 'Contact Us - Service, Support and Enquiries | octankbank';
            description = 'Contact the octankbank team for related queries. ' +
                'Email us for travel blogs, gallery, cooking, technical matters.';
            break;
        case 'gallery':
            title = 'Photo Galleries - from Vacation, Outing, Celebration and Residence | octankbank';
            description = 'Photo Galleries - from Vacation, Outing, Celebration and Residence';
            break;
        case 'album':
            title = 'Photo Album - ' + props.description + ' | octankbank';
            description = 'Photo Album - ' + props.description;
            break;
        case 'blog':
            title = 'Blog Article - ' + props.description + ' | octankbank';
            description = 'Blog Article - ' + props.description;
            break;
        case 'article':
            title = 'Blog Article - ' + props.description + ' | octankbank';
            description = 'Blog Article - ' + props.description;
            break;
        case 'request':
            title = 'Track Request Status | octankbank';
            description = 'Track status of your request. Related queries with octankbank. ' +
                'Welcome to Octank Bank. An attempt to build a place on the web for customers of Octank to interact.';
            break;
        case 'terms-conditions':
            title = 'Terms and Conditions | octankbank';
            description = 'Website Terms and Conditions - Find travel, technology and cooking blogs, galleries, guides with octankbank. ' +
                'Welcome to Octank Bank. An attempt to build a place on the web for customers of Octank to interact.';
            break;
        default:
            title = 'Welcome to Octank Bank\'s Home | octankbank';
            description = 'Welcome to Octank Bank. An attempt to build a place on the web for customers of Octank to interact.';
            image = props.url + '/images/talofddh-devadyuti-debarati-deeptanal-home.jpg';
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