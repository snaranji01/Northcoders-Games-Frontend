import { useContext, useEffect, useState } from "react"

import { getUsers } from "../../api"

import { User } from "../../types/types";

import { UserContext } from "../../contexts/User";
import { AxiosError } from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import { handleSubmitLogin, handleTextChange } from "./eventHandlers";

const ChooseUser = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | Error | null>(null);

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [usernameInputText, setUsernameInputText] = useState<string>('');

    useEffect(() => {
        setIsLoading(true);
        getUsers()
            .then(response => {
                setAllUsers(response)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
            })
    }, [currentUser])

    if (error) return <ErrorPage error={error} />
    return (
        isLoading ? <p>Loading...</p>
            : (
                <div className="select-user-page">
                    <h1>User Login</h1>
                    <p>Available users: </p>
                    <div id="available users">
                        {allUsers.map(user => {
                            return <p key={user.username} className="available-user">
                                {user.username}
                            </p>
                        })}
                    </div>
                    <p>Please enter the name of the user you wish to login as:</p>
                    <form onSubmit={e => handleSubmitLogin(e, allUsers, setCurrentUser, usernameInputText)}>
                        <label htmlFor="type-desired-user">Username: </label>
                        <input
                            type="text"
                            name="type-desired-user"
                            id="type-desired-user"
                            value={usernameInputText}
                            onChange={e => handleTextChange(e, setUsernameInputText)} />
                        <button type="submit">Sign-In</button>
                    </form>
                </div>
            )
    )
}

export default ChooseUser;