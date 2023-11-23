import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import {API} from "aws-amplify";
import {usePost} from "../common/hook";
import TypeInput from "../components/typeInput";
import TextArea from "../components/textarea";
import Loader from "./loader";
import LoaderButton from "./loaderbutton";
import '../../scss/components/comment.scss';

function Comment(props) {
    const [data, loading] = usePost(
        'findArticleCommentList',
        '/articleCommentList',
        {blogName: props.blogName}
    );
    const [comments, setComments] = useState(props.data);
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        name : '',
        comment : ''
    });

    useEffect(() => {
        let commentsData = data.map((item) => {
            return {...item, blogName: item.blogName, name: item.name, comment: item.comment, date: item.date}
        })
        setComments(commentsData);
    }, [data]);

    const handleChange = (changeEvent) => {
        changeEvent.preventDefault();

        setForm({
            ...form,
            [changeEvent.target.name]: changeEvent.target.value
        });

    }

    const submitComment = async (submitEvent) => {
        submitEvent.preventDefault();
        setIsLoading(true);
        console.log(form.name, form.comment);

        let comment = {
            blogName: props.blogName,
            name: form.name,
            comment: form.comment,
            date: JSON.stringify(new Date())
        }

        const response = await API.post(
            "addArticleComment",
            "/articleComment",
            {
                response: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: comment,
            }
        );

        //comment.date = response.data.ops[0].date;
        setComments(comments => [comment, ...comments]);

        setForm({
            ...form,
            comment: ''
        });

        setIsLoading(false);
    }

    const validateForm = () => {
        const nameRegex = RegExp('^[A-Za-z0-9 ]{1,50}$');
        return form.name.length > 0 && form.name.match(nameRegex)
            && form.comment.length > 0;
    }

    return (
        loading ? (
            <Loader loading={loading} />
        ) : (
            <>
                <div className="commentcontainer">
                    <form key="CommentForm" name="CommentForm" onSubmit={submitComment}>
                        <p className="commentheader">Say something about this {props.type}</p>
                        <div className="commentfieldcontainer">
                            <TypeInput id="1"
                                       name="name"
                                       label="Name"
                                       type="text"
                                       disabled={false}
                                       required={true}
                                       maxLength={50}
                                       initialValue=""
                                       value={form.name}
                                       placeHolder="e.g. John Smith"
                                       pattern="^[A-Za-z0-9 ]{1,50}$"
                                       onChange={handleChange} />
                        </div>
                        <div className="commentfieldcontainer">
                            <TextArea id="2"
                                      name="comment"
                                      label="Message"
                                      disabled={false}
                                      required={true}
                                      initialValue=""
                                      value={form.comment}
                                      placeHolder="Type your comment"
                                      onChange={handleChange} />
                        </div>
                        <div className="commentbuttoncontainer">
                            <LoaderButton name="SubmitCommentButton"
                                          type="submit"
                                          label="Comment"
                                          isLoading={isLoading}
                                          disabled={!validateForm()} />
                        </div>
                    </form>
                </div>
                <div className="commentcontainer" style={{marginBottom: '10px'}}>
                    <div className="commentList">
                        <p className="commentheader">
                            <span className="commentbold">{comments.length}</span>{" "}
                            Comment{comments.length > 0 ? "s" : ""}
                        </p>

                        {comments.length === 0 ? (
                            <label>
                                Be the first to comment
                            </label>
                        ) : (
                            <>
                            </>
                        )}

                        {comments.map((item, index) => (
                            <div key={index} className="media mb-3">
                                <img
                                    className="mr-3 bg-light rounded"
                                    width="48"
                                    height="48"
                                    src={`https://api.adorable.io/avatars/48/${item.name.toLowerCase()}@adorable.io.png`}
                                    alt={item.name}
                                />

                                <div className="media-body p-2 shadow-sm rounded bg-light border">
                                    <small className="float-right text-muted">{item.date}</small>
                                    <h6 className="mt-0 mb-1 text-muted">{item.name}</h6>
                                    {item.comment}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    )
}

export default withRouter(Comment);