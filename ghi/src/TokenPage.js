import React, { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import "./Nav.css"

function TokenPage() {
    const { token } = useAuthContext();
    const [username, setUsername] = useState("")

const fetchData = async () => {
    try {
    const url = "http://localhost:8000/token";
    const response = await fetch(url, {
        credentials: "include",
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsername(data.account.username)
    } else {
        console.log("Error fetching data");
    }
  } catch (error) {}
};
    useEffect(() => {
        fetchData();
    }, []);

    return (
  username ? <h1 className="token-item">Hello, {username}</h1> : <h1 className="token-item">Please log in to see this page</h1>
    )
}

export default TokenPage;
