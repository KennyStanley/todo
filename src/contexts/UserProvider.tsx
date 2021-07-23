import React, {
    useContext,
    useEffect,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react'
import { IUser } from 'src/lib/interfaces'

const UserContext = React.createContext<any>(undefined)

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ me, children }: { me: IUser; children: any }) {
    const [user, setUser] = useState<IUser>(me)

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}
