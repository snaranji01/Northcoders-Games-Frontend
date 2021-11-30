import { useContext, useEffect, useState } from "react"

import { getUsers } from "../../api"

import { User } from "../../types/types";

import { UserContext } from "../../contexts/User";
import { AxiosError } from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import { handleChooseUserHandler } from "./eventHandlers";

const ChooseUser = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | Error | null>(null);

    const { currentUser, setCurrentUser } = useContext(UserContext);
    
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
                    <h1>Select a user:</h1>
                    <div id="select-user-buttons">
                        {allUsers.map(user => {
                            return <button key={user.username} className="select-user-button" value={user.username} onClick={e => handleChooseUserHandler(e, allUsers, setCurrentUser)}>
                                {user.username}
                            </button>
                        })}
                    </div>
                </div>
            )
    )
}

export default ChooseUser;