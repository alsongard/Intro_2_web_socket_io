import { io } from "socket.io-client";
import { useState, useEffect } from "react";
export default function FormGameRank()
{
    
    const [formGameRank, setFormGameRank] = useState({
        playerName: "",
        score: ""
    });
    
    const [gameData, setGameData] = useState([]);
    const [newsocket, setNewSocket] = useState();
    useEffect(()=>{
        const socket = io("http://localhost:3000/");
        console.log(socket)
        setNewSocket(socket);
        socket.on('connect', ()=>{
            console.log('Successfully connected!')
        });
        // seems listeners should only be set one

        socket.on('gameData', (data)=>{
            console.log('Gettng gameData')
            console.log(data);
            setGameData(data)
        });
        // seems listeners should only be set one
        return ()=>{
            socket.disconnect()
        }
    }, [])

    
 
    
    function handleChange(event)
    {
        const {name, value} = event.target;
        setFormGameRank((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(event)
    {
        event.preventDefault()
        console.log('forn rank ')
        console.log(formGameRank);
        newsocket.emit('new_player_score', formGameRank);
    }
    if (gameData.length > 1)
    {
        console.log("greater than 1");
    }
    return (
        <div className=" w-[1200px] mx-auto mt-8">
            <form onSubmit={handleSubmit} className="flex w-1/2  mx-auto flex-col gap-4 dark:bg-slate-900  bg-white shadow-md rounded-lg p-6">
                <input
                    type="text"
                    className="px-4 py-2 border placeholder:text-black dark:placeholder:text-white border-gray-300 rounded focus:outline-none  dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Player Name.."
                    onChange={handleChange}
                    name="playerName"
                    value={formGameRank.playerName}
                />
                <input
                    type="number"
                    placeholder="score.."
                    className="px-4 py-2 border border-gray-300 placeholder:text-black dark:placeholder:text-white rounded focus:outline-none dark:text-white focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                    name="score"
                    value={formGameRank.score}
                />
                <input
                    type="submit"
                    value="Publish Score"
                    className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 cursor-pointer transition-colors"
                />
            </form>
            <div className='bg-slate-300 w-1/2 mx-auto rounded-md py-[15px] px-[10px] flex flex-col gap-y-2.5 '>
                {   gameData.length > 1 &&
                    gameData.map((dataItem,index)=>{
                        return (
                            <div key={index} className="flex flex-col justify-between bg-slate-700 rounded-md p-[5px]">
                                <p>Player Name: {dataItem.playerName}</p>
                                <p>Player Score: {dataItem.score}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}