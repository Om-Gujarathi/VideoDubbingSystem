import React from 'react'
import dubWizLogo from '../assests/dubWizLogo.png'

const Navbar = () => {
  return (
    <div>
    <nav className=" bg-violet-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
        <img src={dubWizLogo}/>
        </div>

        {/* Navigation Links */}
        <ul className="flex  justify-end space-x-6">
          <li><a href="#" className="text-white">Home</a></li>
          <li><a href="#" className="text-white">My Projects</a></li>
        </ul>

        {/* Auth Buttons */}
        <div className="space-x-3 mr-8">
          <button className=" text-white px-4 py-2 rounded">Login</button>
          <button className="bg-white text-blue-900 px-4 py-2 m rounded">Signup</button>
        </div>
      </div>
    </nav>
      
    </div>
  )
}

export default Navbar;
