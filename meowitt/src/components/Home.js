import React, {useEffect, useState} from "react";
import Nav from "./Nav";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [thread, setThread] = useState("");
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState(""); // Search query state

    const [threadList, setThreadList] = useState([]);

    //for button
    const [buttonColor, setButtonColor] = useState("blue");
    const [buttonText, setButtonText] = useState("Create Post");

    // Filter posts based on the search query
    const filteredThreads = threadList.filter((threadIndex) =>
        threadIndex.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function refreshPosts() {
        const checkUser = () => {
            if (!localStorage.getItem("_id")) {
                navigate("/");
            } else {
                fetch("http://localhost:4000/api/all/threads")
                    .then((res) => res.json())
                    .then((data) => setThreadList(data.threads))
                    .catch((err) => console.error(err));
            }
        };
        checkUser();
    }

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("_id")) {
                navigate("/");
            } else {
                fetch("http://localhost:4000/api/all/threads")
                    .then((res) => res.json())
                    .then((data) => setThreadList(data.threads))
                    .catch((err) => console.error(err));
            }
        };
        checkUser();
    }, [navigate]);

    const handleSubmit = (e) => {
        refreshPosts();
        e.preventDefault();
        console.log({ thread });
        setThread("");
    };

    //used for show form action
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("_id")) {
                navigate("/");
            } else {
                console.log("Authenticated");
            }
        };
        checkUser();
    }, [navigate]);

    const createFormButtonClicked = () =>  {
        if (showForm === true) {
            setShowForm(false);
            setButtonColor("blue");
            setButtonText("Create Post!");
        }
        else
        {
            setShowForm(true);
            setButtonColor("red");
            setButtonText("Cancel Create Post");
            refreshPosts();
        }
    }

    return (
        <>
            <Nav/>
            <main className='home'>
                <div className={"welcomeMessage"}>
                    <h3>Welcome to Meowit!</h3>
                    <p>
                        Welcome to Meowit! the anonymous posting platform all about
                        cats!. Photos of cats are allowed, and discussion of petcare
                        is encouaged.{" "}
                    </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {!showForm && (
                        <input
                            type="text"
                            className={"input-search"}
                            placeholder="Search posts by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                margin: "auto",
                                width: "250px",
                                height: "40px",
                                borderRadius: "20px",
                                backgroundColor: "#e0f7fa",
                                border: "1px solid #b2ebf2",
                                paddingLeft: "15px",
                                fontSize: "16px",
                                color: "#333",
                                transition: "width 0.4s ease-in-out, background-color 0.3s",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                            onFocus={(e) => {
                                e.target.style.width = "350px";
                                e.target.style.backgroundColor = "#b2ebf2";
                            }}
                            onBlur={(e) => {
                                e.target.style.width = "250px";
                                e.target.style.backgroundColor = "#e0f7fa";
                            }}
                        />
                    )}

                    <button id="createPostButton" title="Show Form" onClick={createFormButtonClicked} style={
                        {backgroundColor: buttonColor}
                    }>
                        <h2 className='homeTitle'>{buttonText}</h2>
                    </button>
                    {showForm && <CreatePostForm passedFunction={createFormButtonClicked} handleSubmit={handleSubmit}/>}
                </div>
                <div id="userFeed">
                    <div className='thread__container'>
                        {filteredThreads.map((threadIndex, index) => (
                            <Post
                                key={index}
                                postTitle={threadIndex.postTitle}
                                postBody={threadIndex.postContent}
                                userName={threadIndex.postUsername}
                                datePosted={threadIndex.postDate}
                                voteCount={threadIndex.likes.length - threadIndex.dislikes.length}
                                imgSRC={threadIndex.postImgSRC}
                                postID={threadIndex.id}
                                tags={threadIndex.postTags}
                            />
                        ))}
                    </div>
                </div>
                <button onClick={refreshPosts}>Refresh</button>
            </main>
        </>
    );
};

export default Home;