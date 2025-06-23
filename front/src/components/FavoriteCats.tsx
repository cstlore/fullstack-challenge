import '../App.css'
import {Login} from "./Login.tsx";
import {useLikeContext} from "../contexts/LikesContext.tsx"
import {CatCard} from "./CatCard.tsx"

function FavoriteCats() {
    const {favoriteCats} = useLikeContext()
    Login()
    return (
        <div
            className="w-[100%] pl-[62px] pt-[48px] pb-[48px] pr-[62px] overflow-y-auto overflow-x-hidden grid gap-[48px] grid-cols-[repeat(auto-fit,225px)]">
            {favoriteCats.length > 0 && favoriteCats.map((cat_id: string) => (
                <CatCard cat_id={cat_id}/>
            ))}
        </div>
    )
}

export default FavoriteCats
