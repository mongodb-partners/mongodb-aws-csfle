import React from 'react';
import {NavLink} from "react-router-dom";
import {MEDIA_HOST} from "../common/constants";
import {usePost} from "../common/hook";
import Loader from "../components/loader";
import '../../scss/components/blogsection.scss';

function BlogSection(props) {
    const [blogs, blogLoading] = usePost('findCategorizedBlogList' ,
        '/blogListCategorized',
        {
            category: props.category,
            homePageFlag: true
        });

    return (
        <>
            {blogLoading ? (
                <Loader loading={blogLoading} />
            ) : (
                <>
                    <div className="blogsectionheader">{props.category + ' Blogs'}</div>
                    <ul className="blogsectiongroup">
                        {blogs.map((item, index) => (
                            <li key={index} className="blogsectionitem">
                                <p className="blogsectiontitle">
                                    {item.header}
                                </p>
                                <p className="blogsectionpiccontrol">
                                    <NavLink to={{
                                        pathname: item.link + '/' + item.category + '/' + item.name,
                                        state: {
                                            blog: item
                                        }
                                    }}>
                                        <img src={MEDIA_HOST + '/images/mobile/' + item.titlePhoto} />
                                    </NavLink>
                                </p>
                                <p className="blogsectiontext">
                                    {item.summary}&nbsp;
                                    <NavLink to={{
                                        pathname: item.link + '/' + item.category + '/' + item.name,
                                        state: {
                                            blog: item
                                        }
                                    }}>...Read More</NavLink>
                                </p>
                            </li>
                        ))}
                    </ul>
                </>

            )}
        </>
    )
}

export default BlogSection;