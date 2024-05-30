import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const SideNavbar = ({workspaces, boards}) => {

    const nav = useNavigate();
   

  return (
    <div className="w-1/6 border-r-[1px] border-gray-500 flex flex-col p-3 sticky h-full">
				<ul>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<i className="fa-solid fa-house text-sm mr-5"></i>
						<p className="text-sm f-body">Home</p>
					</li>
				</ul>
				<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
				<p className="text-[10px] m-1">Workspaces</p>
				<ul>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<p className="text-sm f-body">Workspace name</p>
					</li>
					
					{workspaces.map((e, i)=>{
								return <li key={`li-ws-${i}`} className="flex ite ms-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
											<p className="text-sm f-body">{e.title}</p>
										</li>
							})}
				</ul>
				<div id="divider" className="w-full h-[1px] bg-gray-500 mx-auto my-2"></div>
				<p className="text-[10px] m-1">Boards</p>
				<ul>
					<li className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3">
						<p className="text-sm f-body">Board 1</p>
					</li>
					{boards.map((e, i)=>{
								return <li key={`li-bc-${i}`}  id={e.id}
                                            onClick={()=>nav(`/board/${id}`)}
                                            className="flex items-center hover:bg-gray-800 rounded-lg cursor-pointer p-3"
                                            >
											    <p className="text-sm f-body">{e.name}</p>
										</li>	
							})}

				</ul>
    </div>
  )
}

export default SideNavbar