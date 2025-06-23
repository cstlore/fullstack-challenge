import '../App.css'

function NavBar() {
    return (
        <div className="w-[100%] h-[64px] flex bg-[#2196F3] pl-[62px] pr-[62px]">
            <a href="/"
               className={`flex items-center justify-center h-[100%] pl-[24px] pr-[24px] ${window.location.pathname === '/' ? 'bg-[#1E88E5]' : 'bg-[#2196F3] cursor-pointer'}`}>
                <p className="font-[400] text-[14px] leading-[21px] text-white">Все котики</p>
            </a>
            <a href='../../favorite.html'
               className={`flex items-center justify-center h-[100%] pl-[24px] pr-[24px] ${window.location.pathname !== '/' ? 'bg-[#1E88E5]' : 'bg-[#2196F3] cursor-pointer'} cursor-pointer`}>
                <p className="font-[400] text-[14px] leading-[21px] text-white">Любимые котики</p>
            </a>
        </div>
    )
}

export default NavBar
