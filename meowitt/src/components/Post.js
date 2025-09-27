import React, {useState} from "react";
import Likes from "./Likes";

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            voteCount: this.props.voteCount,
            userVote: 0, // 0: no vote, 1: upvote, -1: downvote
            upvoteColor: 'grey',
            downvoteColor: 'grey',
            postID: this.props.postID,
        };
    }

    render () {
        if (this.props.imgSRC === "") {
            return (
                <div className="card">
                    <div className="card-top">
                        <em>{this.props.datePosted}     </em>
                        <em>U/{this.props.userName}   | </em>
                    </div>
                    <div className="container">
                        <h2>
                            <b>{this.props.postTitle}</b>
                        </h2>
                        <p>
                            {this.props.postBody}
                        </p>
                    </div>
                    <div className="vote-container">
                        <Likes numberOfLikes={this.state.voteCount} threadId={this.state.postID}/>
                    </div>
                    <div>{this.props.tags}</div>
                </div>
            );
        }
        return (
            <div className="card">
                <img src={this.props.imgSRC} width={600} height={300} alt={this.props.imgSRC.toString()}/>
                <div className="card-top">
                    <em>     {this.props.datePosted}     </em>
                    <em>U/{this.props.userName} | </em>
                </div>
                <div className="container">
                    <h2>
                        <b>{this.props.postTitle}</b>
                    </h2>
                    <p>
                        {this.props.postBody}
                    </p>
                </div>
                <div className="vote-container">
                    <Likes numberOfLikes={this.state.voteCount} threadId={this.state.postID}/>
                    <div>{this.props.tags}</div>
                </div>

            </div>
        );
    }
}

/*

 */


/*
*
* */
export default Post;