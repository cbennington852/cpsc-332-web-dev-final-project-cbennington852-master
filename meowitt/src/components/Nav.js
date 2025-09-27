import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const[username, setUsername] = React.useState("");

    const signOut = () => {
        localStorage.removeItem("_id");
        // redirects to the login page
        navigate("/");
    };

    getUserData();

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
                    setUsername(data.postUsername);
                    console.log(data);
                })
                .catch((err) => console.error(err));
        };
        checkUser();
    }

    return (
        <nav className='navbar'>
            <h2>Meowit</h2>
            <div className='navbarRight'>
                <p>Signed in as {username}!</p>
                <button onClick={() => {navigate("/account");}}>View Profile</button>
                <button onClick={signOut}>Sign out</button>
            </div>
        </nav>
    );
};

export default Nav;