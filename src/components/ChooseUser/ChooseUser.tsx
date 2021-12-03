import { useContext, useEffect, useState } from "react"

import { getUsers } from "../../api"

import { User } from "../../types/types";

import { UserContext } from "../../contexts/User";
import { AxiosError } from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import { handleSubmitLogin, handleTextChange } from "./eventHandlers";

import './ChooseUser.css';

const ChooseUser = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | Error | null>(null);

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [usernameInputText, setUsernameInputText] = useState<string>('');

    const [usernameInputValidationMessage, setUsernameInputValidationMessage] = useState<string>('');

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
                    <h1 id="user-login-header">User Login</h1>
                    <div id="available-users">
                        <p id="describe-available-users">Available users: </p>
                        {allUsers.map(user => {
                            return <p key={user.username} className="available-user">
                                {user.username}
                            </p>
                        })}
                    </div>
                    <form id="enter-username" onSubmit={
                        e => handleSubmitLogin(
                            e,
                            allUsers,
                            setCurrentUser,
                            usernameInputText,
                            usernameInputValidationMessage,
                            setUsernameInputValidationMessage
                        )
                    }
                    >
                        <p>Please enter the name of the user you wish to login as:</p>
                        <label htmlFor="type-desired-user">Username: </label>
                        <input
                            type="text"
                            name="type-desired-user"
                            id="type-desired-user"
                            value={usernameInputText}
                            onChange={e => handleTextChange(e, setUsernameInputText)} />
                        <button type="submit">Sign-In</button>
                        <p className="input-validation-message">{usernameInputValidationMessage}</p>
                    </form>
                </div>
            )
    )
}

export default ChooseUser;