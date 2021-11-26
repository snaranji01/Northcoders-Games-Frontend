import { useContext, useEffect, useState } from "react"

import { getUsers } from "../../api"

import { User } from "../../types/types";

import { UserContext } from "../../contexts/User";

const ChooseUser = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        getUsers().then(response => setAllUsers(response))
    }, [currentUser])

    const handleChooseUserHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const chosenUserButton = (e.target as HTMLButtonElement).value;
        const [ chosenUser ] = allUsers.filter(existingUser => existingUser.username === chosenUserButton );
        setCurrentUser(chosenUser);
    }

    return (
        <div className="select-user-page">
            <h1>Select a user:</h1>
            <div id="select-user-buttons">
                {allUsers.map(user => {
                    return <button key={user.username} className="select-user-button" value={user.username} onClick={handleChooseUserHandler}>
                        {user.username}
                    </button>
                })}
            </div>
        </div>

    )
}

export default ChooseUser;