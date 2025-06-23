import ReactDOM from 'react-dom/client'
import './index.css'
import FavoriteCats from "./components/FavoriteCats.tsx"
import NavBar from "./components/NavBar.tsx"
import {LikesContextProvider} from "./contexts/LikesContext.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="w-[100%] h-[100%]">
        <LikesContextProvider>
            <NavBar/>
            <FavoriteCats/>
        </LikesContextProvider>
    </div>
)
