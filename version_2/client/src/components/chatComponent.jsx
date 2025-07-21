import { useEffect } from "react";
import { useState } from "react"
import { io } from "socket.io-client";
export default function ChatApp()
{
    const [messagge,setMessage] = useState({msg:""});
    const [chatMessages, setChatMessages] = useState("");
    function handleChange(event)
    {
        const {name, value} = event.target;
        setMessage((prevData)=>{
            return {
                ...prevData,
                [name]:value
            }
        })
    }
    // getting messages from server
    const [newSocket, setNewSocket] = useState("");
    const [typingUser, setTypingUser] = useState("");
    const [userEntered, setUserEntered] = useState("");
    const [welcomeMsg, setWelcomeMsg] = useState("");
    const [disconnectMsg, setDisconnectMsg] = useState("");
    useEffect(()=>{
        const socket = io("http://localhost:5000");
        setNewSocket(socket);

        socket.on("onUserConnect", (data)=>{
            setWelcomeMsg(`Welcome User ${data.slice(0,5)} to MessageChat`)
        });
        socket.on("messages", (data)=>{
            // console.log(data);
            setChatMessages(data);
            // console.log('this is chatMessages');
        });
        socket.on('showUserTyping', (data)=>{
            setTypingUser(data);
            // console.log(`listening to showUserTyping: ${data}`)
        });
        socket.on("userJustEntered", ()=>{
            setUserEntered(socket.id.slice(0,5))
        });
        socket.on("userDisconnected", (data)=>{
            setDisconnectMsg(data.slice(0,5));
        })
    }, [])

    // setInterval(()=>{
    //     console.log(chatMessages)
    // },5000)
    function handleKeyDown()
    {
        //emit an event
        console.log(`User is typing : ${newSocket.id.slice(0,5)}`)
        // console.log(newSocket.id);
        newSocket.emit("userTyping",newSocket.id.slice(0,5))
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        // console.log(messagge);
        newSocket.emit("receiveMSG", messagge);
    }
    if (disconnectMsg)
    {
        setTimeout(()=>{
            setDisconnectMsg("")
        }, 5000)
    }
    return (
        <section className="w-full items-center min-h-screen ">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 rounded-lg shadow-md flex flex-row  gap-4 w-1/2 max-[790px]:flex-col mx-auto"
            >
                <input
                    type="text"
                    value={messagge.msg}
                    name="msg"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    placeholder="Enter message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="submit"
                    value="Submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition"
                />
            </form>
            <div className="bg-[rgb(182,201,197)] text-black rounded-md mt-[50px] w-1/2 mx-auto flex-col flex items-start pl-[50px] py-[25px]">
                {
                    welcomeMsg && <p className="text-center">{welcomeMsg}</p>
                }
                {
                    userEntered && <p className='text-center'>User Entered {userEntered} </p>
                }
                {/* <p className='text-center'>UserName: {newSocket.id.slice(0,5)}</p> */}
                {
                    typingUser && <p className='text-center'>User is typing {typingUser}</p>
                }
                <div className=" w-full">
                    {
                        chatMessages.length > 0 
                        
                        ?
                            (
                                chatMessages.map((dataItem, index)=>{
                                    return (
                                        <div key={index} className="mx-auto flex flex-row gap-x-[10px]  w-[500px]">
                                            <p className="text-black">{dataItem.id}:</p>
                                            <p className="text-black">{dataItem.msg}:</p>
                                        </div>
                                    )
                                })
                            ) 
                        :
                            (
                                <p className='text-center'>Loading</p>
                            )
                        
                    }
                </div>
                {
                    disconnectMsg && (<p className="text-center">User {disconnectMsg} disconnected</p>)
                }
            </div>

        </section>
    )
}