import React from "react";
import "./post.css";
const Post = (props) => {
    return (
        <div className="container">
            <div className="post">
                <div className="post_header">
                    <img src={props.avatar} alt="" />
                    <h3>{props.username}</h3>
                </div>
                <div className="post_body">
                    <img src={props.image} alt="" />
                    <p>
                        <strong>{props.username}</strong> {props.caption}
                    </p>
                </div>
                <div className="post_input">
                    <input type="text" placeholder="Add a comment"/>
                    <p>Post</p>
                </div>
            </div>
        </div>
    );
};
export default Post;
