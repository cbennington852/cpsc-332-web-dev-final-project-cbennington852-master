import React from "react";

const Likes = ({ numberOfLikes, threadId }) => {

    const [likeColor, setLikeColor] = React.useState('grey');
    const [dislikeColor, setDislikeColor] = React.useState('grey');
    const [voteCountDisplay, setVoteCountDisplay] = React.useState(numberOfLikes);
    const initVoteCount = voteCountDisplay;

    const handleLikeFunction = () => {
        setLikeColor('#ff4500');
        setDislikeColor('grey');
        fetch("http://localhost:4000/api/thread/like", {
            method: "POST",
            body: JSON.stringify({
                threadId,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message);
                    setVoteCountDisplay(numberOfLikes);
                } else {
                    alert(data.message);
                    setVoteCountDisplay(data.newValue);
                }
            })
            .catch((err) => console.error(err));
    };

    const handleDislikeFunction = () => {
        setDislikeColor('#7193ff');
        setLikeColor('grey');
        fetch("http://localhost:4000/api/thread/dislike", {
            method: "POST",
            body: JSON.stringify({
                threadId,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message);
                    setVoteCountDisplay(numberOfLikes);
                } else {
                    alert(data.message);
                    setVoteCountDisplay(data.newValue);
                }
            })
            .catch((err) => console.error(err));
    };



    return (
        <div className='likes__container'>
            <button style={{color: likeColor}} className="vote-button upvote"
                    onClick={handleLikeFunction}>▲
            </button>
            <p style={{color: "#434242"}}>
                {voteCountDisplay}
            </p>
            <button style={{color: dislikeColor}} className="vote-button downvote"
                    onClick={handleDislikeFunction}>▼
            </button>
        </div>
    );


};

export default Likes;