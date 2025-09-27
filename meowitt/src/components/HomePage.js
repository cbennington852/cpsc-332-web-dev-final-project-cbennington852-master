import logo from '../logo.svg';
import '../App.css';
import React from "react";
import {render} from "@testing-library/react";


function HomePage() {

    return (
        <div className="App">
            <link href="../../public/style.css" rel="stylesheet" />
            <div className="App">
                <div className="banner">
                    <h1 className="banner-title">Meowit</h1>
                    <p className="banner-subtitle">Cats Cats. cats. cats....</p>
                </div>
                <div>
                    <div className="topnav">
                        <h4>Tags: </h4>
                        <button>Cat Photos!</button>
                        <button>Petcare Tips!</button>
                        <button>Silly photos</button>
                        <input type="text" placeholder="Search.." />
                    </div>
                    <table>
                        <colgroup>
                            <col style={{ width: "66%" }} />
                            <col style={{ width: "34%" }} />
                        </colgroup>
                        <tbody>
                        <tr>
                            <td>
                                <div id="userFeed">
                                    <Post
                                        postTitle={"wiggle"}
                                        postBody={"Tester"}
                                        userName={"U/BAlls"}
                                        datePosted={"wiggle"}
                                        voteCount={655}
                                        imgSRC={"./cat.jpg"}
                                    />
                                    <Post
                                        postTitle={"wiggle"}
                                        postBody={"aewrgaesdgrfa egfraergaerga dsrfgasdgfasdgasdgsad\ndbdsfbdfb\awefwefwefn"}
                                        userName={"U/BAlls"}
                                        datePosted={"wiggle"}
                                        voteCount={655}
                                        imgSRC={"./cat.jpg"}
                                    />
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <footer id="feet">
      <span>
        <button id="createPostButton" onClick="createPost()">
          <h4>Create a Post!!</h4>
          <img
              style={{borderRadius: 15}}
              src="./postIcon.png"
              alt="Create post"
              width={100}
          />
        </button>
      </span>
                    <form id="createPostForm" className="messageForm">
        <span
            onClick="cancelCreatePost()"
            className="close"
            title="Close Modal"
        >
          ×
        </span>
                        <span className="messageDraft">
          <label htmlFor="post-input"/>
          <textarea id="post-input" cols={200} rows={2} defaultValue={""}/>
          <input id="file-upload" type="file" accept="image/png, image/jpeg"/>
          <label htmlFor="tagSelection"></label>
          <select id="tagSelection">
            <option>#cutePhoto</option>
            <option>#petCareTips</option>
            <option>#sillyPhoto</option>
          </select>
          <button>Send</button>
        </span>
                    </form>
                </footer>
            </div>
        </div>
    );
}

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voteCount: this.props.voteCount,
            userVote: 0 // 0: no vote, 1: upvote, -1: downvote
        };
    }

    handleUpvote = () => {
        if (this.state.userVote === 1) {
            // User is un-upvoting
            this.setState({ voteCount: this.state.voteCount - 1, userVote: 0 });
        } else if (this.state.userVote === -1) {
            // User is changing from downvote to upvote
            this.setState({ voteCount: this.state.voteCount + 2, userVote: 1 });
        } else {
            // User is upvoting for the first time
            this.setState({ voteCount: this.state.voteCount + 1, userVote: 1 });
        }
    }

    handleDownvote = () => {
        if (this.state.userVote === -1) {
            // User is un-downvoting
            this.setState({ voteCount: this.state.voteCount + 1, userVote: 0 });
        } else if (this.state.userVote === 1) {
            // User is changing from upvote to downvote
            this.setState({ voteCount: this.state.voteCount - 2, userVote: -1 });
        } else {
            // User is downvoting for the first time
            this.setState({ voteCount: this.state.voteCount - 1, userVote: -1 });
        }
    }

    render () {
        return (
            <div className="card">
                <img src={this.props.imgSRC} alt="cat" style={{width: "100%"}}/>
                <div className="card-top">
                    <em>{this.props.userName}</em>
                    <em>{this.props.datePosted}</em>
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
                  <span>
                    {this.state.voteCount}
                  </span>
                    <button className="vote-button upvote" onClick={this.handleUpvote} >▲</button>
                    <button className="vote-button downvote" onClick={this.handleDownvote}>▼</button>
                </div>
                <div>{this.props.tags}</div>
            </div>
        );
    }
}


class userSignUp extends React.Component {
    constructor(props) {
        super();
        this.state = {

        }
    }

    render () {
        return (
            <div>
                <div>
                    <h3>Welcome to Meowit!</h3>
                    <p>
                        Welcome to Meowit! the anonymous posting platform all about
                        cats!. Photos of cats are allowed, and discussion of petcare
                        is encouaged.{" "}
                    </p>
                </div>
                <div className="welcome">
                    <h2>New to Meowit?</h2>
                    <button
                        className="signUpBtn"
                        id="signUpBtn"
                        onClick="document.getElementById('id01').style.display='block'"
                        style={{width: "auto"}}
                    >
                        Sign Up
                    </button>
                    <div id="id01" className="modal">
                  <span
                      onClick="document.getElementById('id01').style.display='none'"
                      className="close"
                      title="Close Modal"
                  >
                    ×
                  </span>
                        <form className="modal-content" action="/action_page.php">
                            <div className="container">
                                <h1>Sign Up</h1>
                                <p>Please fill in this form to create an account.</p>
                                <hr/>
                                <label htmlFor="email">
                                    <b>Email</b>
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Enter Email"
                                    name="email"
                                    required=""
                                />
                                <label htmlFor="psw">
                                    <b>Password</b>
                                </label>
                                <input
                                    id="psw"
                                    type="password"
                                    placeholder="Enter Password"
                                    name="psw"
                                    required=""
                                />
                                <label htmlFor="psw-repeat">
                                    <b>Repeat Password</b>
                                </label>
                                <input
                                    id="psw-repeat"
                                    type="password"
                                    placeholder="Repeat Password"
                                    name="psw-repeat"
                                    required=""
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        defaultChecked="checked"
                                        name="remember"
                                        style={{marginBottom: 15}}
                                    />{" "}
                                    Remember me
                                </label>
                                <p>
                                    By creating an account you agree to our{" "}
                                    <a
                                        href="../../public/privacyStatment.html"
                                        style={{color: "dodgerblue"}}
                                    >
                                        Terms &amp; Privacy
                                    </a>
                                    .
                                </p>
                                <div className="clearfix">
                                    <button
                                        type="button"
                                        onClick="document.getElementById('id01').style.display='none'"
                                        className="cancelbtn"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="signUpBtn" id="signUp">
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}






export default HomePage;
