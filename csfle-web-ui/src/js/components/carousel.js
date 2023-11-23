import React from 'react';
import {API} from 'aws-amplify';
import { MEDIA_HOST} from "../common/constants";
import {useMediaQuery} from "../common/hook";
import ImageGallery  from 'react-image-gallery';
import '../../scss/components/carousel.scss';

function Carousel(props) {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTablet = useMediaQuery('(max-width: 800px)');
    const isDesktop = useMediaQuery('(max-width: 1200px)');
    let originalPath = 'desktop'
    if(isMobile) {
        originalPath = 'mobile';
    } else if (isTablet) {
        originalPath = 'tablet';
    } else if (isDesktop) {
        originalPath = 'desktop';
    }

    let images = {};
    images = props.pictures.map((item, index) => {
        return {
            ...images,
            sequence: item.sequence,
            thumbnail: MEDIA_HOST + '/images/thumbnail/' + item.path + '/' + item.name + '.jpg',
            original: MEDIA_HOST + '/images/' + originalPath + '/' + item.path + '/' + item.name + '.jpg',
            originalTitle: item.description,
            albumName: item.albumName,
            name: item.name,
            description: item.description,
            viewCount: item.viewCount
        };
    });

    const handleThumbnailClick = async (clickEvent, index) => {
        await API.put(
            'updatePhotoViewCount',
            '/photoViewCount',
            {
                response: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: {
                    albumName: images[index].albumName,
                    name: images[index].name
                }
            }
        )
        //props.onClick && props.onClick(clickEvent, obj);
    }

    const handleSlideMove = async (index) => {
        await API.put(
            'updatePhotoViewCount',
            '/photoViewCount',
            {
                response: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: {
                    albumName: images[index].albumName,
                    name: images[index].name
                }
            }
        )
    }

    return (
        <ImageGallery  items={images}
                       startIndex={props.startIndex}
                       onThumbnailClick={handleThumbnailClick}
                       onSlide={handleSlideMove}
        />
    )
}

export default Carousel;