const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sanitize = require("mongo-sanitize");
const validator = require("validatorjs");

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
/************************************************************************************/
/*SetUp Mongoose*/
/************************************************************************************/
/*
TO DO:
    -add resgtraiton email valitation
    -add the ability to unlike and switch likes on posts.
    -
 */



mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1:27017/mydatabase";
// Wait for database to connect, logging an error if there is a problem
mongoose.connect(mongoDB).then((result) => {
    console.log('connected to Mongodb');
}).catch((err) => {
    console.error(err);
});

//scema
const Schema = mongoose.Schema;
const Schema2 = mongoose.Schema;
//schema for the users
const usersList = new Schema({
    id: Number,
    email: String,
    password: String,
    username: String,
    karma:Number
});

const postsSchema = new Schema2 ({
    id: Number,
    postTitle: String,
    postContent:String,
    postUsername: String,
    postDate: String,
    postImgSRC: String,
    userId : Number,
    postTags : String,
    likes:  {type : Array , "default" : [] },
    dislikes: {type : Array , "default" : [] },
});



// Compile model from schema
const userModel = mongoose.model("userModel", usersList);
const postList = mongoose.model("postList", postsSchema);



//helper function for
function removeItemAll(arr, value) {
    if (!arr) {
        return;
    }
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}


// generates a random string as ID
const generateID = () => Math.floor(Math.random() * 1000000);

app.post("/api/register", async (req, res) => {
    let { email, password, username } = req.body;

    //data sanitization
    email = sanitize(email);
    password = sanitize(password);
    username = sanitize(username);

    const karma = 0;
    const id = generateID();
    //ensures there is no existing user with the same credentials
    const result = await userModel.findOne({ email: email, password: password });

    // if no exisitng user
    if (!result) {
        const newUser = { id, email, password, username, karma };
        // adds the user to the database (array)
        userModel.create(newUser);
        // returns a success message
        console.log("New user Created!")
        console.log(newUser);
        return res.json({
            message: "Account created successfully!",
        });
    }
    // if there is an existing user
    res.json({
        error_message: "User already exists",
    });
});

app.post("/api/login", async (req, res) => {
    let {email, password} = req.body;

    email = sanitize(email);
    password = sanitize(password);

    // checks if the user exists
    let result = await userModel.findOne({email: email, password: password});

    // if the user doesn't exist
    if (!result) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    // Returns the id if successfully logged in
    console.log("User " + result.username + " Logged in");
    res.json({
        message: "Login successfully",
        id: result.id,
    });
});


//Creates a thread!!!
app.post("/api/create/thread", async (req, res) => {
    let { userId, postTitle, postContent, postImgSRC, postTags } = req.body;

    userId = sanitize(userId);
    postTitle = sanitize(postTitle);
    postContent = sanitize(postContent);
    postImgSRC = sanitize(postImgSRC);
    postTags = sanitize(postTags);

    if ((postTitle.length > 50) || postTitle.length > 1000) {
        res.json({
            message: "Post length too long!!!",
        });
    }


    const threadId = generateID();
    let postUsername = "Username not found";
    //find the username
    let result = await userModel.findOne({id : userId});
    postUsername = result.username;
    const postDateStamp = new Date().toLocaleString();
    //add post details to the array
    postList.create({
        id: threadId,
        postTitle: postTitle,
        postContent:postContent,
        postUsername: postUsername,
        postDate: postDateStamp,
        postImgSRC: postImgSRC,
        userId,
        postTags : postTags,
        likes: [],
        dislikes: [],
    });

    console.log("new thread created!");
    //Returns a response containing the posts
    res.json({
        message: "Thread created successfully!",
        threads: await postList.find(),
        request: req.body
    });
});

//returns all threads
app.get("/api/all/threads", async (req, res) => {
    res.json({
        threads: await postList.find(),
    });
});


//gets info about user from userID
//http://localhost:4000/api/userInfo
app.post("/api/userInfo", async (req, res) => {
    let { userId } = req.body;
    //sanitize
    userId = sanitize(userId);
    //get based on user id
    //find the username
    let result = await userModel.findOne({id : userId});

    const threads = await postList.find({userId: userId});

    if (result) {
        res.json({
            postUsername: result.username,
            userKarma: result.karma,
            threads: threads
        });
    }
    else { //problems
        res.json({
            postUsername: "Not found",
            userKarma: -1,
        });
    }
});

app.post("/api/thread/like", async (req, res) => {
    // accepts the post id and the user id
    let { threadId, userId } = req.body;

    // sanitize
    threadId = sanitize(threadId);
    userId = sanitize(userId);

    let newUserId = Number(userId);

    // gets the reacted post
    const result = await postList.findOne({ id: threadId });
    // gets the likes and dislikes property
    const threadLikes = result.likes;
    const threadDislikes = result.dislikes;

    // authenticates the reaction
    const hasLiked = threadLikes.includes(newUserId);
    const hasDisliked = threadDislikes.includes(newUserId);

    if (hasLiked) {
        return res.json({
            message: "You've already liked this post!",
        });
    }

    // If the user has disliked the post, remove the dislike
    if (hasDisliked) {
        await postList.updateOne({ id: threadId }, { $pull: { dislikes: newUserId } });
    }

    // Add the like
    await postList.updateOne({ id: threadId }, { $push: { likes: newUserId } });

    //increase user karma
    const userKarmaBeingChanged = await userModel.findOne({id : result.userId});
    console.log("userKarmaBeingChanged", userKarmaBeingChanged);
    // Increment the user's karma
    await userModel.updateOne(
        { id: userKarmaBeingChanged.id }, // Match the user by ID
        { $inc: { karma: 1 } }           // Increment the 'karma' field by 1
    );

    const result2 = await postList.findOne({ id: threadId });

    return res.json({
        message: "You've liked the post!",
        newValue: result2.likes.length - result2.dislikes.length
    });
});

app.post("/api/thread/dislike", async (req, res) => {
    // accepts the post id and the user id
    let { threadId, userId } = req.body;

    // sanitize
    threadId = sanitize(threadId);
    userId = sanitize(userId);

    let newUserId = Number(userId);

    // gets the reacted post
    const result = await postList.findOne({ id: threadId });
    // gets the likes and dislikes property
    const threadLikes = result.likes;
    const threadDislikes = result.dislikes;

    // authenticates the reaction
    const hasLiked = threadLikes.includes(newUserId);
    const hasDisliked = threadDislikes.includes(newUserId);

    if (hasDisliked) {
        return res.json({
            message: "You've already disliked this post!",
        });
    }

    // If the user has liked the post, remove the like
    if (hasLiked) {
        await postList.updateOne({ id: threadId }, { $pull: { likes: newUserId } });
    }

    // Add the dislike
    await postList.updateOne({ id: threadId }, { $push: { dislikes: newUserId } });

    //decrease user karma
    const userKarmaBeingChanged = await userModel.findOne({id : result.userId});
    console.log("userKarmaBeingChanged", userKarmaBeingChanged);
    // Increment the user's karma
    await userModel.updateOne(
        { id: userKarmaBeingChanged.id }, // Match the user by ID
        { $dec: { karma: 1 } }           // Increment the 'karma' field by 1
    );

    const result2 = await postList.findOne({ id: threadId });

    return res.json({
        message: "You've disliked the post!",
        newValue: result2.likes.length - result2.dislikes.length
    });
});

