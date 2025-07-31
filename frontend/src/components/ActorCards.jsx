// import React from 'react'
// import { Search, Calendar, Play, User } from "lucide-react"
// const ActorCards = (actors) => {
//     return (
//         <div className="space-y-4">
//             {actors.length > 0 ? (
//                 actors[0].items.map((item) => (
//                     <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
//                         <div className="p-6">
//                             {/* Header */}
//                             <div className="flex items-start justify-between mb-4">
//                                 <div>
//                                     <h2 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h2>
//                                     <div className="flex items-center text-gray-500 text-sm">
//                                         <User className="w-4 h-4 mr-1" />
//                                         <span>{item.username}/{item.name}</span>
//                                     </div>
//                                 </div>
//                                 <div className="flex space-x-2">
//                                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
//                                         <Play className="w-4 h-4 inline mr-1" />
//                                         Run
//                                     </button>
//                                     <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
//                                         Configure
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Stats Row */}
//                             <div className="flex flex-wrap gap-6 bg-gray-50 rounded-lg p-4 shadow-sm">
//                                 <div className="flex items-center">
//                                     <Play className="w-4 h-4 text-green-600 mr-2" />
//                                     <span className="text-sm font-medium text-gray-700 mr-2">Total Runs:</span>
//                                     <span className="text-lg font-bold text-gray-900">{item.stats[0].totalRuns}</span>
//                                 </div>

//                                 <div className="flex items-center">
//                                     <Calendar className="w-4 h-4 text-blue-600 mr-2" />
//                                     <span className="text-sm font-medium text-gray-700 mr-2">Created:</span>
//                                     <span className="text-sm text-gray-900">{new Date(item.createdAt).toLocaleDateString()}</span>
//                                 </div>

//                                 <div className="flex items-center">
//                                     <Calendar className="w-4 h-4 text-purple-600 mr-2" />
//                                     <span className="text-sm font-medium text-gray-700 mr-2">Last Run:</span>
//                                     <span className="text-sm text-gray-900">
//                                         {new Date(item.stats[0].lastRunStartedAt).toLocaleDateString()}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//                     <div className="text-gray-400 mb-4">
//                         <Search className="w-16 h-16 mx-auto" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No actors found</h3>
//                     <p className="text-gray-500">Try adjusting your search or create a new actor to get started.</p>
//                     <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
//                         Create Actor
//                     </button>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default ActorCards

import { Search, Calendar, Play, User } from "lucide-react";

const ActorCards = ({ actors }) => {
  console.log("Actors in ActorCards:", actors);
  
  // Handle the case where actors might be the full API response object
  const actorItems = actors?.items || actors || [];
  
  return (
    <div className="space-y-4">
      {actorItems && actorItems.length > 0 ? (
        actorItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {item.title || item.name}
                  </h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="w-4 h-4 mr-1" />
                    <span>{item.username}/{item.name}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Play className="w-4 h-4 inline mr-1" />
                    Run
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Configure
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex items-center">
                  <Play className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700 mr-2">Total Runs:</span>
                  <span className="text-lg font-bold text-gray-900">
                    {item.stats?.totalRuns != null ? item.stats.totalRuns.toLocaleString() : "N/A"}
                  </span>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700 mr-2">Created:</span>
                  <span className="text-sm text-gray-900">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700 mr-2">Last Modified:</span>
                  <span className="text-sm text-gray-900">
                    {item.modifiedAt ? new Date(item.modifiedAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>

                {item.stats?.lastRunStartedAt && (
                  <div className="flex items-center">
                    <Play className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700 mr-2">Last Run:</span>
                    <span className="text-sm text-gray-900">
                      {new Date(item.stats.lastRunStartedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              {item.description && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No actors found</h3>
          <p className="text-gray-500">Try adjusting your search or create a new actor to get started.</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Create Actor
          </button>
        </div>
      )}
    </div>
  );
};

export default ActorCards;