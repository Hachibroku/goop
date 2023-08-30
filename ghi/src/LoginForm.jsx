import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <form onSubmit = {handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    name="username"
                    type="text"
                    onChange={(e) => ()}
                    />
            </div>
            <div>
                <label>Username</label>
                <input
                    name="password"
                    type="password"
                    onChange={(e) => ()}
                    />
            </div>
            <div>
                <input type="submit" value
            </div>
        </form>
    )
}
