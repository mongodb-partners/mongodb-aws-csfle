import React from 'react';
import {NavLink} from "react-router-dom";
import {MEDIA_HOST} from "../common/constants";
import '../../scss/components/blogsection.scss';

function TechnicalBlog(props) {
    return (
        <>
            <div className="blogsectionheader">Travel Blogs</div>
            <ul className="blogsectiongroup">
                {props.data.map((item, index) => (
                    <li key={index} className="blogsectionitem">
                        <p className="blogsectiontitle">
                            {item.header}
                        </p>
                        <p className="blogsectionpiccontrol">
                            <img src={MEDIA_HOST + '/images/mobile/' + item.titlePhoto} />
                        </p>
                        <p className="blogsectiontext">
                            {item.summary}&nbsp;
                            <NavLink to={{
                                pathname: item.link,
                                state: {
                                    blog: item
                                }
                            }}>...Read More</NavLink>
                        </p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TechnicalBlog;