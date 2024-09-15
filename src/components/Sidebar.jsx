import React, { useContext, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { FaMessage, FaPlus, FaQuestion } from "react-icons/fa6"
import { MdHistory } from "react-icons/md"
import { IoSettings } from "react-icons/io5"
import { Context } from "../context/Context"

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)

    await onSent(prompt)
  }

  return (
    <div className="min-h-screen inline-flex flex-col justify-between bg-zinc-900 bg-opacity-50 py-[25px] px-[15px]">
      <div>
        <IoMenu
          onClick={() => setExtended(!extended)}
          className="text-2xl block cursor-pointer text-[#6ce9ff]"
        />

        <div
          onClick={() => newChat()}
          className="mt-[10px] inline-flex items-center gap-[10px] py-[10px] px-[15px] text-[14px] text-[#6ce9ff] cursor-pointer hover:text-white rounded-full"
        >
          <FaPlus className="text-2xl" />

          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="flex flex-col animate-fadeIn duration-1000">
            <p className="mt-7 mb-5">Recent</p>

            {prevPrompt?.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-[#6ce9ff] cursor-pointer hover:text-white"
                >
                  <FaMessage className="text-2xl text-black" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center p-2 gap-2 rounded-[5px] text-[#6ce9ff] cursor-pointer hover:text-white">
          <FaQuestion className="text-2xl" />
          {extended && <p>Help</p>}
        </div>

        <div className="flex items-center p-2 gap-2 rounded-[5px] text-[#6ce9ff] cursor-pointer hover:text-white">
          <MdHistory className="text-2xl" />
          {extended && <p>Activity</p>}
        </div>

        <div className="flex items-center p-2 gap-2 rounded-[5px] text-[#6ce9ff] cursor-pointer hover:text-white">
          <IoSettings className="text-2xl" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar