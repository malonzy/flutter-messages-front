import {useEffect, useState} from "react";
import {apiUrl} from "../helpers";

export default function Home(){
    const [sender,setSender] = useState('')
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState([])

    function getMessages(){
        fetch(`${apiUrl}/message/get`)
            .then(res => res.json())
            .then(data => {
                setMessages(data)
            })
    }

    function sendMessage(e){
        e.preventDefault()
        fetch(`${apiUrl}/message/send`,{
            method:'POST',
            body:JSON.stringify({
                sender:sender,
                message:message
            }),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        })
            .then(res => res.json())
            .then(() => {
                getMessages()
                setMessage('')
            })
    }

    useEffect(()=>{
        getMessages()
    },[])

  return (
      <div className="w-1/2 mx-auto my-5">
          <form onSubmit={sendMessage}>
              <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Your Name" className="border border-blue-400 rounded py-2 px-4" onChange={(e)=>{setSender(e.target.value)}} value={sender} autoFocus={true}/>
                  <textarea placeholder="Your Message" className="border border-blue-400 rounded py-2 px-4" value={message} defaultValue={message} onChange={(e)=>{setMessage(e.target.value)}}/>
                  <button className="bg-green-400 py-3 rounded text-white">Send</button>
              </div>
          </form>
          <hr className="border-blue-100 my-5"/>
          <div className="text-center">
              <button onClick={getMessages}>Refresh</button>
          </div>
          <div>
              {messages.length > 0 &&
                  <>
                      {messages.map(message => (
                          <div key={message.id} className="w-8/12 bg-blue-200 text-black px-4 pb-2 m-2 float-right rounded-3xl">
                              <div>
                                  <small className="text-gray-600">{message.sender}</small>
                              </div>
                              {message.message}
                          </div>
                      ))}
                  </>
              }
              {messages.length === 0 &&
                <div className="text-center text-gray-400">
                    <h2 className="text-2xl">No Messages</h2>
                    <p>Messages shall be displayed here when available</p>
                </div>
              }
          </div>
      </div>
)
}