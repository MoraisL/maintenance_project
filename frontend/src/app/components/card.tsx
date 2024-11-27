import React from "react";
import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";


interface CardInterface {
    color? :string;
    quantity? :string;
    text? :string;
    icon? :React.ReactNode;

}

export function Card({color, quantity, text, icon}: CardInterface){
    return (
        <>
         <div className={`${color} p-6 flex gap-2 rounded-xl`}>
                <div className="flex-1 flex flex-col">
                  <strong className="text-3xl font-bold text-white">{quantity}</strong>
                  <span className="text-sm text-white">{text}</span>
                </div>
                {icon}
         </div>
        </>
    )
}

// ou

// const links = [
//     {color: grid grid-cols-4 gap-4 p-6
//     quantity: 200,
//     text: <MdDashboard />, 
//     icon: 
//     }, 