import { Search, Calendar, Play, User } from "lucide-react"
import { useEffect, useState, useContext } from "react";
import { useStore } from "../store/store.js";
import { AuthContext } from '../context/AuthContext';
import ActorCards from "../components/ActorCards.jsx";

export default function Home() {
  const { actors, response, loading, error, fetchActors } = useStore();
  const [search, setSearch] = useState("")
  const [apiToken, setApiToken] = useState('');
  const [apiKey , setApiKey] = useState('');
  const { setAuthData } = useContext(AuthContext);

  useEffect(() => {
    fetchActors();
  }, []);

  useEffect(() => {
     const storedToken = sessionStorage.getItem("userapi");
    if (storedToken) {
      setAuthData({ apiToken: storedToken });
      setApiKey(storedToken)
      console.log(storedToken)
    }
  }, [])
  

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-[100vw] ">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apify Dashboard</h1>
          <p className="text-gray-600">Manage and monitor your web scraping actors</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search actors..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Your Actors</h3>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {response?.total || 0} total
              </span>
            </div>
          </div>
        </div>

        {/* Actor Cards */}
        <ActorCards actors={response} />
      </div>
    </div>
  )
}