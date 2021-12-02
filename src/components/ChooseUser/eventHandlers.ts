import { Dispatch, SetStateAction } from "react";
import { User } from "../../types/types";

export const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, setUsernameInputText: Dispatch<SetStateAction<string>>) => {
    setUsernameInputText((e.target as HTMLInputElement).value)
}

export const handleSubmitLogin = (
    e: React.FormEvent<HTMLFormElement>, 
    allUsers: User[], 
    setCurrentUser: Dispatch<SetStateAction<User | null>>, 
    usernameInputText: string
    ) => {
    e.preventDefault();

    const [chosenUser] = allUsers.filter(existingUser => existingUser.username === usernameInputText);
    console.log(chosenUser)
    if(chosenUser === undefined) {
        setCurrentUser(null);
    }

    setCurrentUser(chosenUser);
}