import React, {useState} from "react";

const CreatePostForm  = ({passedFunction} ) => {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postImgSRC, setImgSRC] = useState("");
    const [postTags, setPostTags] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ postTitle, postContent });
        createPost();
        setPostTitle("");
        setPostContent("");
        setImgSRC("");
        passedFunction();
    };



    const createPost = () => {
        fetch("http://localhost:4000/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                postTitle,
                postContent,
                postImgSRC,
                postTags,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
            })
            .catch((err) => console.error(err));
    };

    return (
        <form className='homeForm' onSubmit={handleSubmit}>
            <div className='home__container'>
                <label htmlFor='thread'>Title </label>
                <input
                    maxLength="50"
                    type='text'
                    name='thread'
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor='thread'>Description</label>
                <textarea id='thread' name='thread' required cols="60" rows="5" maxLength="1000" value={postContent} onChange={(e) => setPostContent(e.target.value)} />
                <div>
                    <p>Enter an Image URL! example: https://picsum.photos/200/300</p>
                    <input id="image-upload" type="text" value={postImgSRC} onChange={e => setImgSRC(e.target.value)}/>
                </div>
                <label htmlFor="tagSelection"></label>
                <select id="tagSelection" onChange={e => setPostTags(e.target.value)} value={postTags}>
                    <option>#cutePhoto</option>
                    <option>#petCareTips</option>
                    <option>#sillyPhoto</option>
                </select>
            </div>
            <button className='homeBtn'>Post</button>
        </form>
    );
}

export default CreatePostForm;
