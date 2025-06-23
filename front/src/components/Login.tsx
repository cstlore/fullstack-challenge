import {v4 as uuidv4} from "uuid";
import {Dispatch, SetStateAction, useEffect} from "react"
import {useLikeContext} from "../contexts/LikesContext.tsx"
import {Like} from "../interfaces/LikeInterface.tsx";

async function login(token: string, setFavoriteCats: Dispatch<SetStateAction<string[]>>) {
    const res = await fetch('/api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({login: token, password: token})
    })
    const authToken = res.headers.get('X-Auth-Token')
    if (authToken) {
        localStorage.setItem('authToken', authToken)
        const res = await fetch('/api/likes', {
            headers: {'Authorization': `Bearer ${authToken}`}
        })
        const nonConvertedCats = (await res.json()).data
        setFavoriteCats(nonConvertedCats.map((cat: Like) => (cat.cat_id)))
    }
}

async function init(setFavoriteCats: Dispatch<SetStateAction<string[]>>) {
    let token = localStorage.getItem('userToken');
    if (!token) {
        token = uuidv4();
        localStorage.setItem('userToken', token);
    }
    await login(token, setFavoriteCats)
}

export function Login() {
    const {setFavoriteCats} = useLikeContext()
    useEffect(() => {
        init(setFavoriteCats)
    }, [])
}