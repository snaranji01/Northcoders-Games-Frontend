import { Dispatch, SetStateAction } from "react";
import { User } from "../../types/types";

export const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, setUsernameInputText: Dispatch<SetStateAction<string>>) => {
    setUsernameInputText((e.target as HTMLInputElement).value)
}

    allUsers: User[],
    setCurrentUser: Dispatch<SetStateAction<User>>
    ) => {
    const chosenUserButton = (e.target as HTMLButtonElement).value;
    const [chosenUser] = allUsers.filter(existingUser => existingUser.username === chosenUserButton);
    setCurrentUser(chosenUser);
}