import { FaMoon } from "react-icons/fa";
export default function Header(props)
{
    const {darkMode, setDarkMode} = props;
    const handleBg = ()=>{
        console.log("I am Clicked")
        setDarkMode((prevValue)=>{console.log(prevValue); return !prevValue})
    }
    return (
        <header className="dark:bg-slate-700 py-[7.5px] pr-[15px] bg-white flex flex-row justify-end gap-x-[50px] items-center">
            <ul className="flex flex-row w-[500px] justify-between">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <FaMoon onClick={handleBg}/>
        </header>
    )
}
