import ReactDOM from 'react-dom/client'
import AllCats from "./components/AllCats.tsx"
import './index.css'
import NavBar from "./components/NavBar.tsx"
import {LikesContextProvider} from "./contexts/LikesContext.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div className="w-[100%] h-[100%]">
        <LikesContextProvider>
            <NavBar/>
            <AllCats/>
        </LikesContextProvider>
    </div>
)
