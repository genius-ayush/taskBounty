'use client'
import { useState } from 'react'
import { Moon, Sun, Bell, LogOut, Home, DollarSign, BarChart2, Award, Users, Settings, HelpCircle , ListChecks} from 'lucide-react'

function page() {

  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-screen p-4`}>
          
          <nav>
            {[
              { icon: Home, label: 'Dashboard' },
              { icon: ListChecks, label: "Upload Tasks" },
              { icon: Settings, label: 'Settings' },
              { icon: HelpCircle, label: 'Help' },
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } mb-1`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Welcome, User!</h2>
            <div className="flex items-center">
              <button onClick={toggleDarkMode} className="mr-4">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Bell className="w-5 h-5 mr-4" />
              <button className="flex items-center">
                <img src="/placeholder.svg?height=32&width=32" alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                <span>User</span>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Earnings Card */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h3 className="text-xl font-semibold mb-4">Earnings</h3>
              <p className="text-3xl font-bold mb-2">$1,234.56</p>
              <p className="text-sm text-gray-500">Total Balance</p>
              <div className="mt-4 flex space-x-2">
                <button className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                  Withdraw
                </button>
                <button className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                  Earn More
                </button>
              </div>
            </div>

            {/* Tasks Card */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h3 className="text-xl font-semibold mb-4">Active Tasks</h3>
              <p className="text-3xl font-bold mb-2">7</p>
              <p className="text-sm text-gray-500">Tasks in progress</p>
              <button className={`mt-4 px-4 py-2 rounded ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}>
                Find Tasks
              </button>
            </div>

            {/* Achievements Card */}
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h3 className="text-xl font-semibold mb-4">Achievements</h3>
              <p className="text-3xl font-bold mb-2">12</p>
              <p className="text-sm text-gray-500">Badges earned</p>
              <button className={`mt-4 px-4 py-2 rounded ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white`}>
                View All
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`mt-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              {[
                { action: 'Completed task', task: 'Website Design', reward: '$50' },
                { action: 'Started task', task: 'Logo Creation', reward: '$30' },
                { action: 'Earned badge', task: 'Quick Learner', reward: '' },
              ].map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-gray-500">{item.task}</p>
                  </div>
                  {item.reward && <span className="font-semibold">{item.reward}</span>}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}

export default page