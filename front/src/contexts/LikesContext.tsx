import React, {createContext, useState, ReactNode, Dispatch, SetStateAction, useContext} from "react";

export interface LikesContextType {
    favoriteCats: string[];
    setFavoriteCats: Dispatch<SetStateAction<string[]>>;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

interface LikesContextProviderProps {
    children: ReactNode;
}

const LikesContextProvider: React.FC<LikesContextProviderProps> = ({children}) => {
    const [favoriteCats, setFavoriteCats] = useState<string[]>([]);

    return (
        <LikesContext.Provider value={{favoriteCats, setFavoriteCats}}>
            {children}
        </LikesContext.Provider>
    );
};

function useLikeContext(): LikesContextType {
    const ctx = useContext(LikesContext);
    if (!ctx) {
        throw new Error("useLikes must be used within LikesContextProvider");
    }
    return ctx;
}

export {useLikeContext, LikesContextProvider};
