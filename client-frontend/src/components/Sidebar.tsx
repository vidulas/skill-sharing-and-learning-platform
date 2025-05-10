import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, PlusCircleIcon, ListIcon, SettingsIcon } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({
  isOpen
}) => {
  return <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0`}>
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-600">Quiz Admin</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={({
              isActive
            }) => `flex items-center p-2 text-base font-normal rounded-lg ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900 hover:bg-gray-100'}`} end>
                <HomeIcon className="w-6 h-6" />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create" className={({
              isActive
            }) => `flex items-center p-2 text-base font-normal rounded-lg ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900 hover:bg-gray-100'}`}>
                <PlusCircleIcon className="w-6 h-6" />
                <span className="ml-3">Create Question</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/questions" className={({
              isActive
            }) => `flex items-center p-2 text-base font-normal rounded-lg ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900 hover:bg-gray-100'}`}>
                <ListIcon className="w-6 h-6" />
                <span className="ml-3">View Questions</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={({
              isActive
            }) => `flex items-center p-2 text-base font-normal rounded-lg ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-900 hover:bg-gray-100'}`}>
                <SettingsIcon className="w-6 h-6" />
                <span className="ml-3">Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs font-medium text-gray-500">
                admin@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>;
};
export default Sidebar;