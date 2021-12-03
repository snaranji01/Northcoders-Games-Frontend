import { Dispatch, SetStateAction } from "react";
import { User } from "../../types/types";

export const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, setUsernameInputText: Dispatch<SetStateAction<string>>) => {
    setUsernameInputText((e.target as HTMLInputElement).value)
}

export const handleSubmitLogin = (
    e: React.FormEvent<HTMLFormElement>,
    allUsers: User[],
    setCurrentUser: Dispatch<SetStateAction<User | null>>,
    usernameInputText: string,
    usernameInputValidationMethod: string,
    setUsernameInputValidationMessage: Dispatch<SetStateAction<string>>
) => {
    e.preventDefault();

    const [chosenUser] = allUsers.filter(existingUser => existingUser.username === usernameInputText);

    if (chosenUser === undefined) {
        setUsernameInputValidationMessage('No user with that username was found. Please try again.')
    } else {
        setCurrentUser(chosenUser);
        setUsernameInputValidationMessage('');
    }
}