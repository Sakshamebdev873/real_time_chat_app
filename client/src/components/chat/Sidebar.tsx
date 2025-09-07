import React from 'react';
import { MessageSquare, Users, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import customFetch from '../../libs/customFetch';
import toast from 'react-hot-toast';
const Sidebar: React.FC = () => {
  const linkClasses = "p-3 text-gray-500 hover:bg-gray-100 rounded-xl";
  const activeLinkClasses = "p-3 bg-blue-100 text-blue-600 rounded-xl";
  const navigate = useNavigate()
  const handleClick = async () =>{
    try {
      const response = await customFetch.post('/logout')
      if(response){
        toast.success("Succesfully Logged Out.....")
      }
      localStorage.removeItem("accesstoken")
navigate('/')
    } catch (error) {
      console.log(error);
      toast.error("Failed to Logged out. Try again later....")
    }
  }
  return (
    <div className="bg-white border-r border-gray-200 flex flex-col justify-between items-center py-6">
      <div className="text-blue-600">
         {/* You can add your app's logo here */}
        <MessageSquare size={32} />
      </div>
      <nav className="flex flex-col items-center gap-6">
        <NavLink to="/chat" className={({isActive}) => isActive ? activeLinkClasses : linkClasses}>
          <MessageSquare size={24} />
        </NavLink>
        <NavLink to="/groups" className={({isActive}) => isActive ? activeLinkClasses : linkClasses}> {/* <-- Link to Groups */}
          <Users size={24} />
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? activeLinkClasses : linkClasses}>
          <Settings size={24} />
        </NavLink >
      </nav>
      <div className="flex flex-col items-center gap-4">
        <button onClick={handleClick} className="text-gray-500 hover:text-red-500">
           <LogOut size={24}/>
        </button>
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026704c"
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;