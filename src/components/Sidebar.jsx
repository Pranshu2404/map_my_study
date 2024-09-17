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
    <div>
      <IoMenu
          onClick={() => setExtended(!extended)}
          className="text-2xl left-6 top-6 absolute z-50 block cursor-pointer text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
        />
    <div
      className={`min-h-screen inline-flex flex-col justify-between py-[25px] px-[20px] z-50 transition-all duration-300 w-[20%] max-md:w-[50%] ${
        extended ? 'absolute  shadow-xl shadow-slate-700 bg-black' : 'absolute hidden'
      }`}
    >
      <div>
        <IoMenu
          onClick={() => setExtended(!extended)}
          className="text-2xl block cursor-pointer text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
        />

        <div
          onClick={() => newChat()}
          className="mt-[10px] inline-flex items-center gap-[10px] py-[10px] px-[15px] text-[14px] text-indigo-400 cursor-pointer hover:bg-indigo-700 hover:text-white rounded-full transition-all duration-200"
        >
          {extended && <><FaPlus className="text-2xl" /><p>New Chat</p></>}
        </div>

        {extended && (
          <div className="flex flex-col animate-fadeIn duration-1000">
            <p className="mt-7 mb-5 text-gray-400">Recent</p>

            {prevPrompt?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-indigo-400 cursor-pointer hover:bg-indigo-700 hover:text-white transition-all duration-200"
                >
                  <FaMessage className="text-2xl text-indigo-300" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center p-2 gap-2 rounded-[5px] text-indigo-400 cursor-pointer hover:bg-indigo-700 hover:text-white transition-all duration-200">
          
          {extended && <><FaQuestion className="text-2xl" /><p>Help</p></>}
        </div>

        <div className="flex items-center p-2 gap-2 rounded-[5px] text-indigo-400 cursor-pointer hover:bg-indigo-700 hover:text-white transition-all duration-200">
          {extended && <><MdHistory className="text-2xl" /><p>Activity</p></>}
        </div>

        <div className="flex items-center p-2 gap-2 rounded-[5px] text-indigo-400 cursor-pointer hover:bg-indigo-700 hover:text-white transition-all duration-200">
          {extended && <><IoSettings className="text-2xl" /><p>Settings</p></>}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Sidebar