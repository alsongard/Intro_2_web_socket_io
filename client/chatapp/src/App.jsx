import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/header';
import FormGameRank from './components/formGameRank';

function App() {

  
  const getCurrentTheme = ()=>{
    const newvar = window.matchMedia("(prefers-color-scheme: dark)")
    console.log(`newvar : ${newvar}`);
    return newvar;
  }
  const [darkMode, setDarkMode] = useState(getCurrentTheme);
  const bg = darkMode ? "dark" : "";
  return (

    <div className={`${bg} dark:bg-slate-800 h-[100vh]`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div className=''>
        <h1 className='text-center dark:text-white text-2xl py-[2.5px] font-bold'>React DashBoard Application</h1>
      </div>
      <FormGameRank/>
    </div>
  )
}

export default App
