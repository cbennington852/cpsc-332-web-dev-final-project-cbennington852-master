import React, {useEffect, useState} from "react";
import Nav from "./Nav";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate();

    const [userUsername, setUsername] = useState("");
    const [userKarma, setKarma] = useState(0);


    const [threadList, setThreadList] = useState([]);

    function getUserData() {
        const checkUser = () => {
            fetch("http://localhost:4000/api/userInfo", {
                method: "POST",
                body: JSON.stringify({
                    userId: localStorage.getItem("_id"),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setKarma(data.userKarma);
                    setUsername(data.postUsername);
                    setThreadList(data.threads);
                    console.log(data);
                })
                .catch((err) => console.error(err));
        };
        checkUser();
    }

    useEffect(() => {
        // This function will be called only once, after the component mounts
        console.log('Component mounted!');
        getUserData();
    }, []); // The empty array ensures that the effect runs only once

    // Define the badge based on karma
    const getBadge = (karma) => {
        if (karma >= 1000) {
            return "🌟"; // Superstar badge
        } else if (karma >= 500) {
            return "🔥"; // Rising star badge
        } else if (karma >= 100) {
            return "😆"; // Active user badge
        }else if (karma < 0) {
            return "😭"; // Bad user badge
        } else {
            return "🌱"; // Newbie badge
        }
    };

    //get the userID

    return (
        <div className={"userProfile"}>
            <button onClick={() => {
                navigate('/dashboard')
            }}>Back to Dashboard</button>
            <div className="user-info">
                <h2 className="user-name">User name: {userUsername}</h2>
                <p className="user-karma">Karma: {userKarma}</p>
                <p className="user-badge">Badge: {getBadge(userKarma)}</p>
            </div>

            <div>
                <h1><u>Most Recent Posts</u></h1>
                <div id="userFeed">
                    <div className='thread__container' style={{color: 'black'}}>
                        {threadList.map((threadIndex, index) => (
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
                        <button onClick={getUserData}>Refresh</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default UserProfile;

