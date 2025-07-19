import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/header';
import FormGameRank from './components/formGameRank';

function App() {

  const [darkMode, setDarkMode] = useState(true);
  useEffect(()=>{
    const newvar = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(newvar)
  },[])

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
