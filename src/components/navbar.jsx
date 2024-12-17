import React from 'react'

const navbar = () => {
  return (
    <div className='bg-black flex justify-between text-white px-5 py-3 m-0'>
        
        <span className='font-extrabold cursor-pointer'>iTask</span>
        <ul className='flex gap-8'>
            <li className='hover:font-bold cursor-pointer hover:transition-all'>home
            </li>
            <li className='hover:font-bold cursor-pointer hover:transitaion-all'>tasks

            </li>
        </ul>
      
    </div>
  )
}

export default navbar
