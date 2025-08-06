
// import { Search, Calendar, Play,List, User, ChevronDown, ChevronUp, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react";
// import { useState } from "react";
// import { useStore } from "../store/store.js";
// import ActorInputForm from "./ActorInputForm.jsx";

// const ActorCards = ({ actors }) => {
//   // console.log("Actors in ActorCards:", actors);
//   const { fetchInputParams, inputParams, loading, getRunResult, result, getLatestResult } = useStore();
//   const [showForm, setShowForm] = useState(false);
//   const [selectedActor, setSelectedActor] = useState(null);
//   const [showResults, setShowResults] = useState({});
//   const [completedRuns, setCompletedRuns] = useState({});
//   const [showLatestResults, setShowLatestResults] = useState({});
  
//   // Handle the case where actors might be the full API response object
//   const actorItems = actors?.items || actors || [];
//   // console.log(result, "Result in ActorCards");
  
//   const handleClick = async(actor) => {
//     console.log("Actor ID clicked:", actor.id);
//     setSelectedActor(actor);
//     await fetchInputParams(actor.id);
//     console.log("Fetching input parameters for actor ID:", actor.id);
//     setShowForm(true);
//   }

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setSelectedActor(null);
//   }

//   const handleRunComplete = (actorId, runId) => {
//     console.log("Run completed for actor ID:", actorId);
//     setCompletedRuns(prev => ({
//       ...prev,
//       [actorId]: runId
//     }));
//   }

//   const handleViewResult = async (actorId, runId) => {
//     const resultKey = `${actorId}-${runId}`;
    
//     if (showResults[resultKey]) {
//       // Hide results
//       setShowResults(prev => ({
//         ...prev,
//         [resultKey]: false
//       }));
//     } else {
//       // Show results and fetch if not already loaded
//       setShowResults(prev => ({
//         ...prev,
//         [resultKey]: true
//       }));
      
//       if (!result || result.runId !== runId) {
//         await getRunResult(runId);
//       }
//     }
//   }

//   const handleViewLatestResult = async (actorId) => {
//     if (showLatestResults[actorId]) {
//       // Hide latest results
//       setShowLatestResults(prev => ({
//         ...prev,
//         [actorId]: false
//       }));
//     } else {
//       // Show latest results and fetch
//       setShowLatestResults(prev => ({
//         ...prev,
//         [actorId]: true
//       }));
      
//       await getLatestResult(actorId);
//     }
//   }

//   const toggleResults = (actorId, runId) => {
//     const resultKey = `${actorId}-${runId}`;
//     setShowResults(prev => ({
//       ...prev,
//       [resultKey]: !prev[resultKey]
//     }));
//   }

//   const renderResult = (actorId, runId) => {
//     const resultKey = `${actorId}-${runId}`;
//     const isExpanded = showResults[resultKey];
    
//     if (!isExpanded) return null;

//     if (loading) {
//       return (
//         <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center justify-center">
//             <Clock className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
//             <span className="text-blue-700">Loading results...</span>
//           </div>
//         </div>
//       );
//     }

//     if (!result) {
//       return (
//         <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center">
//             <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
//             <span className="text-yellow-700">No results available</span>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <h4 className="font-medium text-gray-900">Run Result</h4>
//             <span className="text-xs text-gray-500">Run ID: {runId}</span>
//           </div>
          
//           {result.status && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
//               <span className={`px-2 py-1 rounded text-xs font-medium ${
//                 result.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
//                 result.status === 'FAILED' ? 'bg-red-100 text-red-800' :
//                 result.status === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//                 {result.status}
//               </span>
//             </div>
//           )}

//           {result.startedAt && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Started:</span>
//               <span className="text-sm text-gray-600">
//                 {new Date(result.startedAt).toLocaleString()}
//               </span>
//             </div>
//           )}

//           {result.finishedAt && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Finished:</span>
//               <span className="text-sm text-gray-600">
//                 {new Date(result.finishedAt).toLocaleString()}
//               </span>
//             </div>
//           )}

//           {result.output && (
//             <div className="border-t border-gray-200 pt-3">
//               <span className="text-sm font-medium text-gray-700 block mb-2">Output:</span>
//               <div className="bg-white p-3 rounded border border-gray-200 max-h-64 overflow-y-auto ">
//                 <pre className="text-sm text-gray-800 whitespace-pre-wrap">
//                   {typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2)}
//                 </pre>
//               </div>
//             </div>
//           )}

//           {result.error && (
//             <div className="border-t border-gray-200 pt-3">
//               <span className="text-sm font-medium text-red-700 block mb-2">Error:</span>
//               <div className="bg-red-50 p-3 rounded border border-red-200">
//                 <pre className="text-sm text-red-800 whitespace-pre-wrap">
//                   {result.error}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   const renderLatestResult = (actorId) => {
//     const isExpanded = showLatestResults[actorId];
    
//     if (!isExpanded) return null;

//     console.log("Rendering latest result for actorId:", actorId, "Result:", result); // Debug log

//     if (loading) {
//       return (
//         <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center justify-center">
//             <Clock className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
//             <span className="text-blue-700">Loading latest result...</span>
//           </div>
//         </div>
//       );
//     }

//     if (!result) {
//       return (
//         <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center">
//             <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
//             <span className="text-yellow-700">No latest result available</span>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <h4 className="font-medium text-gray-900">Latest Successful Run</h4>
//             <span className="text-xs text-gray-500">Run ID: {result.id || 'N/A'}</span>
//           </div>
          
//           {/* Debug section - remove this after fixing */}
//           {/* <div className="bg-yellow-50 p-2 rounded text-xs">
//             <strong>Debug:</strong> {JSON.stringify(result, null, 2)}
//           </div> */}
          
//           {result.status && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
//               <span className={`px-2 py-1 rounded text-xs font-medium ${
//                 result.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
//                 result.status === 'FAILED' ? 'bg-red-100 text-red-800' :
//                 result.status === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//                 {result.status}
//               </span>
//             </div>
//           )}

//           {result.startedAt && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Started:</span>
//               <span className="text-sm text-gray-600">
//                 {new Date(result.startedAt).toLocaleString()}
//               </span>
//             </div>
//           )}

//           {result.finishedAt && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Finished:</span>
//               <span className="text-sm text-gray-600">
//                 {new Date(result.finishedAt).toLocaleString()}
//               </span>
//             </div>
//           )}

//           {result.output && (
//             <div className="border-t border-gray-200 pt-3">
//               <span className="text-sm font-medium text-gray-700 block mb-2">Output:</span>
//               <div className="bg-white p-3 rounded border border-gray-200 max-h-64 overflow-y-auto">
//                 <pre className="text-sm text-gray-800 whitespace-pre-wrap">
//                   {typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2)}
//                 </pre>
//               </div>
//             </div>
//           )}

//           {result.error && (
//             <div className="border-t border-gray-200 pt-3">
//               <span className="text-sm font-medium text-red-700 block mb-2">Error:</span>
//               <div className="bg-red-50 p-3 rounded border border-red-200">
//                 <pre className="text-sm text-red-800 whitespace-pre-wrap">
//                   {result.error}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <>
//       <div className="space-y-4">
//         {actorItems && actorItems.length > 0 ? (
//           actorItems.map((item) => {
//             const runId = completedRuns[item.id];
//             const resultKey = `${item.id}-${runId}`;
//             const isResultExpanded = showResults[resultKey];
//             const isLatestResultExpanded = showLatestResults[item.id];
            
//             return (
//               <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
//                 <div className="p-6">
//                   {/* Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900 mb-1">
//                         {item.title || item.name}
//                       </h2>
//                       <div className="flex items-center text-gray-500 text-sm">
//                         <User className="w-4 h-4 mr-1" />
//                         <span>{item.username}/{item.name}</span>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => handleViewLatestResult(item.id)}
//                         disabled={loading}
//                         className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
//                       >
//                         <Eye className="w-4 h-4 inline mr-1" />
//                         {loading ? 'Loading...' : 'View Latest Result'}
//                       </button>
//                       <button 
//                         onClick={() => handleClick(item)} 
//                         disabled={loading}
//                         className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
//                       >
//                         <Play className="w-4 h-4 inline mr-1" />
//                         {loading ? 'Loading...' : 'Run'}
//                       </button>
// {/*                       <button className="bg-indigo-800 hover:bg-indigo-700 disabled:bg-indigo-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
//                       disabled={loading}
//                       // onClick={}
//                       >
//                           <List className="w-4 h-4 inline mr-1" />
//                         {loading ? 'Loading...' : 'View Runs'}
                          
                      
//                       </button> */}
//                     </div>
//                   </div>

//                   {/* Stats Row */}
//                   <div className="flex flex-wrap gap-6 bg-gray-50 rounded-lg p-4 shadow-sm">
//                     <div className="flex items-center">
//                       <Play className="w-4 h-4 text-green-600 mr-2" />
//                       <span className="text-sm font-medium text-gray-700 mr-2">Total Runs:</span>
//                       <span className="text-lg font-bold text-gray-900">
//                         {item.stats?.totalRuns != null ? item.stats.totalRuns.toLocaleString() : "N/A"}
//                       </span>
//                     </div>

//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 text-blue-600 mr-2" />
//                       <span className="text-sm font-medium text-gray-700 mr-2">Created:</span>
//                       <span className="text-sm text-gray-900">
//                         {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
//                       </span>
//                     </div>

//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 text-purple-600 mr-2" />
//                       <span className="text-sm font-medium text-gray-700 mr-2">Last Modified:</span>
//                       <span className="text-sm text-gray-900">
//                         {item.modifiedAt ? new Date(item.modifiedAt).toLocaleDateString() : "N/A"}
//                       </span>
//                     </div>

//                     {item.stats?.lastRunStartedAt && (
//                       <div className="flex items-center">
//                         <Play className="w-4 h-4 text-orange-600 mr-2" />
//                         <span className="text-sm font-medium text-orange-500 mr-2">Last Run:</span>
//                         <span className="text-sm text-gray-900">
//                           {new Date(item.stats.lastRunStartedAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Latest Result Section */}
//                   {isLatestResultExpanded && (
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <button
//                         onClick={() => handleViewLatestResult(item.id)}
//                         className="flex items-center justify-between w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors mb-2"
//                       >
//                         <div className="flex items-center">
//                           <Eye className="w-5 h-5 text-purple-600 mr-2" />
//                           <span className="text-purple-800 font-medium">
//                             Latest Successful Run
//                           </span>
//                         </div>
//                         <ChevronUp className="w-5 h-5 text-purple-600" />
//                       </button>
                      
//                       {renderLatestResult(item.id)}
//                     </div>
//                   )}

//                   {/* Results Section - Shows when run is completed */}
//                   {runId && (
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <button
//                         onClick={() => handleViewResult(item.id, runId)}
//                         className="flex items-center justify-between w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
//                       >
//                         <div className="flex items-center">
//                           <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
//                           <span className="text-green-800 font-medium">
//                             Run Completed - View Result
//                           </span>
//                         </div>
//                         {isResultExpanded ? (
//                           <ChevronUp className="w-5 h-5 text-green-600" />
//                         ) : (
//                           <ChevronDown className="w-5 h-5 text-green-600" />
//                         )}
//                       </button>
                      
//                       {renderResult(item.id, runId)}
//                     </div>
//                   )}

//                   {/* Additional Info */}
//                   {item.description && (
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//             <div className="text-gray-400 mb-4">
//               <Search className="w-16 h-16 mx-auto" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No actors found</h3>
//             <p className="text-gray-500">Try adjusting your search or create a new actor to get started.</p>
// {/*             <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
//               Create Actor
//             </button> */}
//           </div>
//         )}
//       </div>

//       {/* Actor Configuration Form Modal */}
//       <ActorInputForm
//         isOpen={showForm}
//         onClose={handleCloseForm}
//         inputParams={inputParams}
//         actorName={selectedActor?.title || selectedActor?.name}
//         actorId={selectedActor?.id}
//         onRunComplete={handleRunComplete}
//       />
//     </>
//   );
// };

// export default ActorCards;


// import { Search, Calendar, Play, List, User, ChevronDown, ChevronUp, CheckCircle, Clock, AlertCircle, Eye, FileText, Globe, Hash } from "lucide-react";
// import { useState } from "react";
// import { useStore } from "../store/store.js";
// import ActorInputForm from "./ActorInputForm.jsx";

// const ActorCards = ({ actors }) => {
//   const { fetchInputParams, inputParams, loading, getRunResult, result, getLatestResult, scrapedData, clearScrapedData } = useStore();
//   const [showForm, setShowForm] = useState(false);
//   const [selectedActor, setSelectedActor] = useState(null);
//   const [showResults, setShowResults] = useState({});
//   const [completedRuns, setCompletedRuns] = useState({});
//   const [showLatestResults, setShowLatestResults] = useState({});
  
//   // Handle the case where actors might be the full API response object
//   const actorItems = actors?.items || actors || [];
  
//   const handleClick = async(actor) => {
//     console.log("Actor ID clicked:", actor.id);
//     setSelectedActor(actor);
//     await fetchInputParams(actor.id);
//     console.log("Fetching input parameters for actor ID:", actor.id);
//     setShowForm(true);
//   }

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setSelectedActor(null);
//   }

//   const handleRunComplete = (actorId, runId) => {
//     console.log("Run completed for actor ID:", actorId);
//     setCompletedRuns(prev => ({
//       ...prev,
//       [actorId]: runId
//     }));
//   }

//   const handleViewResult = async (actorId, runId) => {
//     const resultKey = `${actorId}-${runId}`;
    
//     if (showResults[resultKey]) {
//       // Hide results and clear scraped data
//       setShowResults(prev => ({
//         ...prev,
//         [resultKey]: false
//       }));
//       clearScrapedData();
//     } else {
//       // Show results and fetch if not already loaded
//       setShowResults(prev => ({
//         ...prev,
//         [resultKey]: true
//       }));
      
//       if (!result || result.runId !== runId) {
//         await getRunResult(runId);
//       }
//     }
//   }

//   const handleViewLatestResult = async (actorId) => {
//     if (showLatestResults[actorId]) {
//       // Hide latest results and clear scraped data
//       setShowLatestResults(prev => ({
//         ...prev,
//         [actorId]: false
//       }));
//       clearScrapedData();
//     } else {
//       // Show latest results and fetch
//       setShowLatestResults(prev => ({
//         ...prev,
//         [actorId]: true
//       }));
      
//       await getLatestResult(actorId);
//     }
//   }

//   // Component to render scraped data items
//   const renderScrapedDataItem = (item, index) => {
//     return (
//       <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
//         {/* URL */}
//         {item.url && (
//           <div className="flex items-start space-x-2">
//             <Globe className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
//             <div>
//               <span className="text-sm font-medium text-gray-700">URL:</span>
//               <a 
//                 href={item.url} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:text-blue-800 text-sm ml-2 break-all"
//               >
//                 {item.url}
//               </a>
//             </div>
//           </div>
//         )}

//         {/* Title */}
//         {item.metadata?.title && (
//           <div className="flex items-start space-x-2">
//             <FileText className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
//             <div>
//               <span className="text-sm font-medium text-gray-700">Title:</span>
//               <span className="text-sm text-gray-900 ml-2">{item.metadata.title}</span>
//             </div>
//           </div>
//         )}

//         {/* HTTP Status */}
//         {item.crawl?.httpStatusCode && (
//           <div className="flex items-center space-x-2">
//             <Hash className="w-4 h-4 text-purple-600" />
//             <span className="text-sm font-medium text-gray-700">Status:</span>
//             <span className={`px-2 py-1 rounded text-xs font-medium ${
//               item.crawl.httpStatusCode === 200 ? 'bg-green-100 text-green-800' :
//               item.crawl.httpStatusCode >= 400 ? 'bg-red-100 text-red-800' :
//               'bg-yellow-100 text-yellow-800'
//             }`}>
//               {item.crawl.httpStatusCode}
//             </span>
//           </div>
//         )}

//         {/* Description */}
//         {item.metadata?.description && (
//           <div>
//             <span className="text-sm font-medium text-gray-700 block">Description:</span>
//             <p className="text-sm text-gray-600 mt-1">{item.metadata.description}</p>
//           </div>
//         )}

//         {/* Text Content Preview */}
//         {item.text && (
//           <div>
//             <span className="text-sm font-medium text-gray-700 block">Content Preview:</span>
//             <div className="bg-gray-50 p-3 rounded border mt-1 max-h-32 overflow-y-auto">
//               <p className="text-sm text-gray-800">
//                 {item.text.length > 300 ? `${item.text.substring(0, 300)}...` : item.text}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Markdown Content (collapsible) */}
//         {item.markdown && (
//           <div>
//             <details className="mt-2">
//               <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
//                 View Markdown Content
//               </summary>
//               <div className="bg-gray-50 p-3 rounded border mt-2 max-h-40 overflow-y-auto">
//                 <pre className="text-sm text-gray-800 whitespace-pre-wrap">
//                   {item.markdown}
//                 </pre>
//               </div>
//             </details>
//           </div>
//         )}

//         {/* Crawl Info */}
//         {item.crawl?.loadedTime && (
//           <div className="text-xs text-gray-500">
//             Crawled: {new Date(item.crawl.loadedTime).toLocaleString()}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderResult = (actorId, runId) => {
//     const resultKey = `${actorId}-${runId}`;
//     const isExpanded = showResults[resultKey];
    
//     if (!isExpanded) return null;

//     if (loading) {
//       return (
//         <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center justify-center">
//             <Clock className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
//             <span className="text-blue-700">Loading results...</span>
//           </div>
//         </div>
//       );
//     }

//     if (!result) {
//       return (
//         <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center">
//             <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
//             <span className="text-yellow-700">No results available</span>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <h4 className="font-medium text-gray-900">Run Result</h4>
//             <span className="text-xs text-gray-500">Run ID: {runId}</span>
//           </div>
          
//           {result.status && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
//               <span className={`px-2 py-1 rounded text-xs font-medium ${
//                 result.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
//                 result.status === 'FAILED' ? 'bg-red-100 text-red-800' :
//                 result.status === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//                 {result.status}
//               </span>
//             </div>
//           )}

//           {result.startedAt && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Started:</span>
//               <span className="text-sm text-gray-600">
//                 {new Date(result.startedAt).toLocaleString()}
//               </span>
//             </div>
//           )}

//           {result.finishedAt && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Finished:</span>
//               <span className="text-sm text-gray-600">
//                 {new Date(result.finishedAt).toLocaleString()}
//               </span>
//             </div>
//           )}

//           {/* Display Scraped Data */}
//           {scrapedData && Array.isArray(scrapedData) && scrapedData.length > 0 && (
//             <div className="border-t border-gray-200 pt-3">
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-sm font-medium text-gray-700">
//                   Scraped Data ({scrapedData.length} items):
//                 </span>
//               </div>
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {scrapedData.map((item, index) => renderScrapedDataItem(item, index))}
//               </div>
//             </div>
//           )}

//           {result.error && (
//             <div className="border-t border-gray-200 pt-3">
//               <span className="text-sm font-medium text-red-700 block mb-2">Error:</span>
//               <div className="bg-red-50 p-3 rounded border border-red-200">
//                 <pre className="text-sm text-red-800 whitespace-pre-wrap">
//                   {result.error}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   const renderLatestResult = (actorId) => {
//     const isExpanded = showLatestResults[actorId];
    
//     if (!isExpanded) return null;

//     if (loading) {
//       return (
//         <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center justify-center">
//             <Clock className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
//             <span className="text-blue-700">Loading latest result...</span>
//           </div>
//         </div>
//       );
//     }

//     if (!result) {
//       return (
//         <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center">
//             <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
//             <span className="text-yellow-700">No latest result available</span>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <h4 className="font-medium text-gray-900">Latest Successful Run</h4>
//             <span className="text-xs text-gray-500">Run ID: {result.id || 'N/A'}</span>
//           </div>
          
//           {result.status && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
//               <span className={`px-2 py-1 rounded text-xs font-medium ${
//                 result.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
//                 result.status === 'FAILED' ? 'bg-red-100 text-red-800' :
//                 result.status === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//                 {result.status}
//               </span>
//             </div>
//           )}

//           {result.startedAt && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Started:</span>
//               <span className="text-sm text-gray-600">
//                 {new Date(result.startedAt).toLocaleString()}
//               </span>
//             </div>
//           )}

//           {result.finishedAt && (
//             <div className="flex items-center">
//               <span className="text-sm font-medium text-gray-700 mr-2">Finished:</span>
//               <span className="text-sm text-gray-600">
//                 {new Date(result.finishedAt).toLocaleString()}
//               </span>
//             </div>
//           )}

//           {/* Display Scraped Data for Latest Result */}
//           {scrapedData && Array.isArray(scrapedData) && scrapedData.length > 0 && (
//             <div className="border-t border-gray-200 pt-3">
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-sm font-medium text-gray-700">
//                   Latest Scraped Data ({scrapedData.length} items):
//                 </span>
//               </div>
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {scrapedData.map((item, index) => renderScrapedDataItem(item, index))}
//               </div>
//             </div>
//           )}

//           {result.error && (
//             <div className="border-t border-gray-200 pt-3">
//               <span className="text-sm font-medium text-red-700 block mb-2">Error:</span>
//               <div className="bg-red-50 p-3 rounded border border-red-200">
//                 <pre className="text-sm text-red-800 whitespace-pre-wrap">
//                   {result.error}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <>
//       <div className="space-y-4">
//         {actorItems && actorItems.length > 0 ? (
//           actorItems.map((item) => {
//             const runId = completedRuns[item.id];
//             const resultKey = `${item.id}-${runId}`;
//             const isResultExpanded = showResults[resultKey];
//             const isLatestResultExpanded = showLatestResults[item.id];
            
//             return (
//               <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
//                 <div className="p-6">
//                   {/* Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900 mb-1">
//                         {item.title || item.name}
//                       </h2>
//                       <div className="flex items-center text-gray-500 text-sm">
//                         <User className="w-4 h-4 mr-1" />
//                         <span>{item.username}/{item.name}</span>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => handleViewLatestResult(item.id)}
//                         disabled={loading}
//                         className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
//                       >
//                         <Eye className="w-4 h-4 inline mr-1" />
//                         {loading ? 'Loading...' : 'View Latest Result'}
//                       </button>
//                       <button 
//                         onClick={() => handleClick(item)} 
//                         disabled={loading}
//                         className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
//                       >
//                         <Play className="w-4 h-4 inline mr-1" />
//                         {loading ? 'Loading...' : 'Run'}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Stats Row */}
//                   <div className="flex flex-wrap gap-6 bg-gray-50 rounded-lg p-4 shadow-sm">
//                     <div className="flex items-center">
//                       <Play className="w-4 h-4 text-green-600 mr-2" />
//                       <span className="text-sm font-medium text-gray-700 mr-2">Total Runs:</span>
//                       <span className="text-lg font-bold text-gray-900">
//                         {item.stats?.totalRuns != null ? item.stats.totalRuns.toLocaleString() : "N/A"}
//                       </span>
//                     </div>

//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 text-blue-600 mr-2" />
//                       <span className="text-sm font-medium text-gray-700 mr-2">Created:</span>
//                       <span className="text-sm text-gray-900">
//                         {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
//                       </span>
//                     </div>

//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 text-purple-600 mr-2" />
//                       <span className="text-sm font-medium text-gray-700 mr-2">Last Modified:</span>
//                       <span className="text-sm text-gray-900">
//                         {item.modifiedAt ? new Date(item.modifiedAt).toLocaleDateString() : "N/A"}
//                       </span>
//                     </div>

//                     {item.stats?.lastRunStartedAt && (
//                       <div className="flex items-center">
//                         <Play className="w-4 h-4 text-orange-600 mr-2" />
//                         <span className="text-sm font-medium text-orange-500 mr-2">Last Run:</span>
//                         <span className="text-sm text-gray-900">
//                           {new Date(item.stats.lastRunStartedAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Latest Result Section */}
//                   {isLatestResultExpanded && (
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <button
//                         onClick={() => handleViewLatestResult(item.id)}
//                         className="flex items-center justify-between w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors mb-2"
//                       >
//                         <div className="flex items-center">
//                           <Eye className="w-5 h-5 text-purple-600 mr-2" />
//                           <span className="text-purple-800 font-medium">
//                             Latest Successful Run
//                           </span>
//                         </div>
//                         <ChevronUp className="w-5 h-5 text-purple-600" />
//                       </button>
                      
//                       {renderLatestResult(item.id)}
//                     </div>
//                   )}

//                   {/* Results Section - Shows when run is completed */}
//                   {runId && (
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <button
//                         onClick={() => handleViewResult(item.id, runId)}
//                         className="flex items-center justify-between w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
//                       >
//                         <div className="flex items-center">
//                           <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
//                           <span className="text-green-800 font-medium">
//                             Run Completed - View Result
//                           </span>
//                         </div>
//                         {isResultExpanded ? (
//                           <ChevronUp className="w-5 h-5 text-green-600" />
//                         ) : (
//                           <ChevronDown className="w-5 h-5 text-green-600" />
//                         )}
//                       </button>
                      
//                       {renderResult(item.id, runId)}
//                     </div>
//                   )}

//                   {/* Additional Info */}
//                   {item.description && (
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//             <div className="text-gray-400 mb-4">
//               <Search className="w-16 h-16 mx-auto" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No actors found</h3>
//             <p className="text-gray-500">Try adjusting your search or create a new actor to get started.</p>
//           </div>
//         )}
//       </div>

//       {/* Actor Configuration Form Modal */}
//       <ActorInputForm
//         isOpen={showForm}
//         onClose={handleCloseForm}
//         inputParams={inputParams}
//         actorName={selectedActor?.title || selectedActor?.name}
//         actorId={selectedActor?.id}
//         onRunComplete={handleRunComplete}
//       />
//     </>
//   );
// };

// export default ActorCards;

import { Search, Calendar, Play, List, User, ChevronDown, ChevronUp, CheckCircle, Clock, AlertCircle, Eye, FileText, Globe, Hash } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store/store.js";
import ActorInputForm from "./ActorInputForm.jsx";

const ActorCards = ({ actors }) => {
  const { fetchInputParams, inputParams, loading, runActor, getRunResult, result, getLatestResult, scrapedData, clearScrapedData } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedActor, setSelectedActor] = useState(null);
  const [showResults, setShowResults] = useState({});
  const [runResults, setRunResults] = useState({}); // Store results per actor
  const [showLatestResults, setShowLatestResults] = useState({});
  
  // Handle the case where actors might be the full API response object
  const actorItems = actors?.items || actors || [];
  
  const handleClick = async(actor) => {
    console.log("Actor ID clicked:", actor.id);
    setSelectedActor(actor);
    await fetchInputParams(actor.id);
    console.log("Fetching input parameters for actor ID:", actor.id);
    setShowForm(true);
  }

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedActor(null);
  }

  // Handle when actor run completes from the form
  const handleRunComplete = (actorId, runData) => {
    console.log("Run completed for actor ID:", actorId, "with data:", runData);
    
    // Store the complete run result (includes scraped data)
    setRunResults(prev => ({
      ...prev,
      [actorId]: runData
    }));
    
    // Show the results section
    setShowResults(prev => ({
      ...prev,
      [actorId]: true
    }));
  }

  const handleViewResult = async (actorId) => {
    if (showResults[actorId]) {
      // Hide results and clear scraped data
      setShowResults(prev => ({
        ...prev,
        [actorId]: false
      }));
      // clearScrapedData();
    } else {
      // Show results - data should already be stored in runResults
      setShowResults(prev => ({
        ...prev,
        [actorId]: true
      }));
    }
  }

  const handleViewLatestResult = async (actorId) => {
    if (showLatestResults[actorId]) {
      // Hide latest results
      setShowLatestResults(prev => ({
        ...prev,
        [actorId]: false
      }));
    } else {
      // Show latest results and fetch metadata only
      setShowLatestResults(prev => ({
        ...prev,
        [actorId]: true
      }));
      
      // Don't call getLatestResult as it clears scrapedData
      // Instead, just show whatever scraped data is already in the store
      console.log("Showing latest result with existing scraped data:", scrapedData);
    }
  }

  // Component to render scraped data items
  const renderScrapedDataItem = (item, index) => {
    return (
      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
        {/* URL */}
        {item.url && (
          <div className="flex items-start space-x-2">
            <Globe className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-700">URL:</span>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm ml-2 break-all"
              >
                {item.url}
              </a>
            </div>
          </div>
        )}

        {/* Title */}
        {item.metadata?.title && (
          <div className="flex items-start space-x-2">
            <FileText className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-700">Title:</span>
              <span className="text-sm text-gray-900 ml-2">{item.metadata.title}</span>
            </div>
          </div>
        )}

        {/* HTTP Status */}
        {item.crawl?.httpStatusCode && (
          <div className="flex items-center space-x-2">
            <Hash className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              item.crawl.httpStatusCode === 200 ? 'bg-green-100 text-green-800' :
              item.crawl.httpStatusCode >= 400 ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {item.crawl.httpStatusCode}
            </span>
          </div>
        )}

        {/* Description */}
        {item.metadata?.description && (
          <div>
            <span className="text-sm font-medium text-gray-700 block">Description:</span>
            <p className="text-sm text-gray-600 mt-1">{item.metadata.description}</p>
          </div>
        )}

        {/* Text Content - Enhanced Display */}
        {item.text && (
          <div>
            <span className="text-sm font-medium text-gray-700 block">Extracted Text:</span>
            <div className="bg-gray-50 p-4 rounded border mt-1">
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                {item.text}
              </p>
            </div>
          </div>
        )}

        {/* Markdown Content (collapsible) */}
        {item.markdown && (
          <div>
            <details className="mt-2">
              <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                View Markdown Content ({item.markdown.length} characters)
              </summary>
              <div className="bg-gray-50 p-3 rounded border mt-2 max-h-40 overflow-y-auto">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {item.markdown}
                </pre>
              </div>
            </details>
          </div>
        )}

        {/* Additional Metadata */}
        {item.metadata?.author && (
          <div className="flex items-start space-x-2">
            <User className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-700">Author:</span>
              <span className="text-sm text-gray-900 ml-2">{item.metadata.author}</span>
            </div>
          </div>
        )}

        {/* Keywords */}
        {item.metadata?.keywords && (
          <div>
            <span className="text-sm font-medium text-gray-700 block">Keywords:</span>
            <p className="text-sm text-gray-600 mt-1">{item.metadata.keywords}</p>
          </div>
        )}

        {/* Language Code */}
        {item.metadata?.languageCode && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Language:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
              {item.metadata.languageCode}
            </span>
          </div>
        )}

        {/* Canonical URL (if different from main URL) */}
        {item.metadata?.canonicalUrl && item.metadata.canonicalUrl !== item.url && (
          <div className="flex items-start space-x-2">
            <Globe className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-700">Canonical URL:</span>
              <a 
                href={item.metadata.canonicalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm ml-2 break-all"
              >
                {item.metadata.canonicalUrl}
              </a>
            </div>
          </div>
        )}

        {/* Screenshot URL */}
        {item.screenshotUrl && (
          <div>
            <span className="text-sm font-medium text-gray-700 block mb-2">Screenshot:</span>
            <img 
              src={item.screenshotUrl} 
              alt="Page screenshot" 
              className="max-w-full h-auto rounded border"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}

        {/* Crawl Info */}
        <div className="border-t border-gray-200 pt-2 mt-3">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            {item.crawl?.loadedTime && (
              <div>
                <span className="font-medium">Crawled:</span> {new Date(item.crawl.loadedTime).toLocaleString()}
              </div>
            )}
            {item.crawl?.depth !== undefined && (
              <div>
                <span className="font-medium">Depth:</span> {item.crawl.depth}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = (actorId) => {
    const isExpanded = showResults[actorId];
    
    if (!isExpanded) return null;

    const runData = runResults[actorId];

    if (!runData) {
      return (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-yellow-700">No run results available</span>
          </div>
        </div>
      );
    }

    const { runInfo, data: scrapedData, status, dataCount } = runData;

    return (
      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Latest Run Result</h4>
            <span className="text-xs text-gray-500">Run ID: {runInfo?.id || 'N/A'}</span>
          </div>
          
          {status && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
                status === 'FAILED' ? 'bg-red-100 text-red-800' :
                status === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {status}
              </span>
            </div>
          )}

          {runInfo?.startedAt && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Started:</span>
              <span className="text-sm text-gray-600">
                {new Date(runInfo.startedAt).toLocaleString()}
              </span>
            </div>
          )}

          {runInfo?.finishedAt && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Finished:</span>
              <span className="text-sm text-gray-600">
                {new Date(runInfo.finishedAt).toLocaleString()}
              </span>
            </div>
          )}

          {/* Display Scraped Data */}
          {scrapedData && Array.isArray(scrapedData) && scrapedData.length > 0 ? (
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Scraped Data ({scrapedData.length} items):
                </span>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {scrapedData.map((item, index) => renderScrapedDataItem(item, index))}
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-yellow-700">No scraped data found</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const renderLatestResult = (actorId) => {
    const isExpanded = showLatestResults[actorId];
    
    if (!isExpanded) return null;

    // Check if we have scraped data available from the store
    const hasScrapedData = scrapedData && Array.isArray(scrapedData) && scrapedData.length > 0;
    
    // Also check if we have scraped data from recent runs stored locally
    const runData = runResults[actorId];
    const hasRunResultData = runData?.data && Array.isArray(runData.data) && runData.data.length > 0;

    return (
      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Latest Available Data</h4>
            <span className="text-xs text-gray-500">
              {runData?.runInfo?.id ? `Run ID: ${runData.runInfo.id}` : 'From Store'}
            </span>
          </div>
          
          {runData?.status && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                runData.status === 'SUCCEEDED' ? 'bg-green-100 text-green-800' :
                runData.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                runData.status === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {runData.status}
              </span>
            </div>
          )}

          {runData?.runInfo?.startedAt && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Started:</span>
              <span className="text-sm text-gray-600">
                {new Date(runData.runInfo.startedAt).toLocaleString()}
              </span>
            </div>
          )}

          {runData?.runInfo?.finishedAt && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Finished:</span>
              <span className="text-sm text-gray-600">
                {new Date(runData.runInfo.finishedAt).toLocaleString()}
              </span>
            </div>
          )}

          {/* Display Scraped Data - prioritize recent run data, fallback to store data */}
          {hasRunResultData ? (
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Scraped Data ({runData.data.length} items):
                </span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  From Recent Run
                </span>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {runData.data.map((item, index) => renderScrapedDataItem(item, index))}
              </div>
            </div>
          ) : hasScrapedData ? (
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Scraped Data ({scrapedData.length} items):
                </span>
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  From Store
                </span>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {scrapedData.map((item, index) => renderScrapedDataItem(item, index))}
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-yellow-700">
                  No scraped data available. Run the actor to get fresh data.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-4">
        {actorItems && actorItems.length > 0 ? (
          actorItems.map((item) => {
            const hasRunResult = runResults[item.id];
            const isResultExpanded = showResults[item.id];
            const isLatestResultExpanded = showLatestResults[item.id];
            
            return (
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
                      <button 
                        onClick={() => handleViewLatestResult(item.id)}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        {loading ? 'Loading...' : 'View Latest Result'}
                      </button>
                      <button 
                        onClick={() => handleClick(item)} 
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                      >
                        <Play className="w-4 h-4 inline mr-1" />
                        {loading ? 'Loading...' : 'Run'}
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
                        <span className="text-sm font-medium text-orange-500 mr-2">Last Run:</span>
                        <span className="text-sm text-gray-900">
                          {new Date(item.stats.lastRunStartedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Latest Result Section */}
                  {isLatestResultExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleViewLatestResult(item.id)}
                        className="flex items-center justify-between w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors mb-2"
                      >
                        <div className="flex items-center">
                          <Eye className="w-5 h-5 text-purple-600 mr-2" />
                          <span className="text-purple-800 font-medium">
                            Latest Successful Run (Metadata Only)
                          </span>
                        </div>
                        <ChevronUp className="w-5 h-5 text-purple-600" />
                      </button>
                      
                      {renderLatestResult(item.id)}
                    </div>
                  )}

                  {/* Results Section - Shows when run is completed */}
                  {hasRunResult && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleViewResult(item.id)}
                        className="flex items-center justify-between w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
                      >
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-green-800 font-medium">
                            Latest Run Completed - View Result & Data
                          </span>
                        </div>
                        {isResultExpanded ? (
                          <ChevronUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-green-600" />
                        )}
                      </button>
                      
                      {renderResult(item.id)}
                    </div>
                  )}

                  {/* Additional Info */}
                  {item.description && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No actors found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new actor to get started.</p>
          </div>
        )}
      </div>

      {/* Actor Configuration Form Modal */}
      <ActorInputForm
        isOpen={showForm}
        onClose={handleCloseForm}
        inputParams={inputParams}
        actorName={selectedActor?.title || selectedActor?.name}
        actorId={selectedActor?.id}
        onRunComplete={handleRunComplete}
      />
    </>
  );
};

export default ActorCards;