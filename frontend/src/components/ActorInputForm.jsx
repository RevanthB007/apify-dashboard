import { useState } from 'react';
import { X, Plus, Trash2, Settings, Globe, Code, Download } from 'lucide-react';
import { useStore } from '../store/store.js';
const ActorInputForm = ({ isOpen, onClose, inputParams, actorName, actorId }) => {
  // Initialize form data with exact structure matching the API response
  const { runActor } = useStore();
  const [formData, setFormData] = useState(() => {
    if (!inputParams) return {};

    return {
      ...inputParams,
      // Ensure arrays are properly initialized
      startUrls: inputParams.startUrls || [{ url: '', method: 'GET' }],
      includeUrlGlobs: inputParams.includeUrlGlobs || [],
      excludeUrlGlobs: inputParams.excludeUrlGlobs || [],
      initialCookies: inputParams.initialCookies || [],
      // Ensure nested objects are properly structured
      proxyConfiguration: inputParams.proxyConfiguration || { useApifyProxy: true }
    };
  });
  const [activeTab, setActiveTab] = useState('basic');

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // const handleSubmit =async () => {
  //   console.log('=== CRAWLER CONFIGURATION ===');
  //   console.log('Actor Name:', actorName);
  //   console.log('Original Input Params:', JSON.stringify(inputParams, null, 2));
  //   console.log('Modified Form Data:', JSON.stringify(formData, null, 2));
  //   console.log('=== END CONFIGURATION ===');

  //   // Validate that the structure matches expected format
  //   const requiredFields = ['startUrls'];
  //   const missingFields = requiredFields.filter(field => !formData[field]);
  //   if (missingFields.length > 0) {
  //     console.warn('Missing required fields:', missingFields);
  //   }

  //   await runActor(actorId, formData); console.log('Actor run initiated with data:', formData);

  //   onClose();
  // };
  const handleSubmit = async () => {
    console.log('=== CRAWLER CONFIGURATION ===');
    console.log('Actor Name:', actorName);
    console.log('Original Input Params:', JSON.stringify(inputParams, null, 2));
    console.log('Modified Form Data:', JSON.stringify(formData, null, 2));
    console.log('=== END CONFIGURATION ===');

    // Validate that the structure matches expected format
    const requiredFields = ['startUrls'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      console.warn('Missing required fields:', missingFields);
    }

    // Show "task running" toast and close form immediately
    toast.info("Task running...");
    onClose();

    // Run actor in background
    try {
      await runActor(actorId, formData);
      console.log('Actor run initiated with data:', formData);
    } catch (error) {
      console.error('Error running actor:', error);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Settings', icon: Globe },
    { id: 'crawler', label: 'Crawler Settings', icon: Settings },
    { id: 'html', label: 'HTML Processing', icon: Code },
    { id: 'output', label: 'Output Settings', icon: Download }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Configure {actorName}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6 mt-4">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              {/* Start URLs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start URLs *
                </label>
                {formData.startUrls?.map((urlObj, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="url"
                      value={urlObj.url || ''}
                      onChange={(e) => handleArrayChange('startUrls', index, { ...urlObj, url: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                    <select
                      value={urlObj.method || 'GET'}
                      onChange={(e) => handleArrayChange('startUrls', index, { ...urlObj, method: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                    </select>
                    <button
                      onClick={() => removeArrayItem('startUrls', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('startUrls', { url: '', method: 'GET' })}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add URL</span>
                </button>
              </div>

              {/* Crawler Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crawler Type
                </label>
                <select
                  value={formData.crawlerType || 'playwright:adaptive'}
                  onChange={(e) => handleInputChange('crawlerType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="playwright:adaptive">Adaptive switching between browser and raw HTTP</option>
                  <option value="playwright:firefox">Firefox browser</option>
                  <option value="playwright:chrome">Chrome browser</option>
                  <option value="raw">Raw HTTP requests</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.respectRobotsTxtFile || false}
                    onChange={(e) => handleInputChange('respectRobotsTxtFile', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Respect robots.txt file</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.useSitemaps || false}
                    onChange={(e) => handleInputChange('useSitemaps', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Load URLs from Sitemaps</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.ignoreCanonicalUrl || false}
                    onChange={(e) => handleInputChange('ignoreCanonicalUrl', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Ignore canonical URLs</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.ignoreHttpsErrors || false}
                    onChange={(e) => handleInputChange('ignoreHttpsErrors', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Ignore HTTPS errors</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'crawler' && (
            <div className="space-y-6">
              {/* Include/Exclude URLs */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Include URLs (globs)
                  </label>
                  {formData.includeUrlGlobs?.map((glob, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={glob}
                        onChange={(e) => handleArrayChange('includeUrlGlobs', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="**/*.html"
                      />
                      <button
                        onClick={() => removeArrayItem('includeUrlGlobs', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('includeUrlGlobs', '')}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exclude URLs (globs)
                  </label>
                  {formData.excludeUrlGlobs?.map((glob, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={glob}
                        onChange={(e) => handleArrayChange('excludeUrlGlobs', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="**/admin/**"
                      />
                      <button
                        onClick={() => removeArrayItem('excludeUrlGlobs', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('excludeUrlGlobs', '')}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Numeric Settings */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max crawling depth
                  </label>
                  <input
                    type="number"
                    value={formData.maxCrawlDepth || 20}
                    onChange={(e) => handleInputChange('maxCrawlDepth', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max pages
                  </label>
                  <input
                    type="number"
                    value={formData.maxCrawlPages || 9999999}
                    onChange={(e) => handleInputChange('maxCrawlPages', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max concurrency
                  </label>
                  <input
                    type="number"
                    value={formData.maxConcurrency || 200}
                    onChange={(e) => handleInputChange('maxConcurrency', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Proxy Configuration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proxy Configuration
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.proxyConfiguration?.useApifyProxy || false}
                    onChange={(e) => handleInputChange('proxyConfiguration', {
                      ...formData.proxyConfiguration,
                      useApifyProxy: e.target.checked
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Use Apify Proxy</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-6">
              {/* Wait Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wait for dynamic content (seconds)
                  </label>
                  <input
                    type="number"
                    value={formData.dynamicContentWaitSecs || 10}
                    onChange={(e) => handleInputChange('dynamicContentWaitSecs', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum scroll height (pixels)
                  </label>
                  <input
                    type="number"
                    value={formData.maxScrollHeightPixels || 5000}
                    onChange={(e) => handleInputChange('maxScrollHeightPixels', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Selectors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wait for selector (optional)
                </label>
                <input
                  type="text"
                  value={formData.waitForSelector || ''}
                  onChange={(e) => handleInputChange('waitForSelector', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="#content, .main"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keep HTML elements (CSS selector)
                </label>
                <input
                  type="text"
                  value={formData.keepElementsCssSelector || ''}
                  onChange={(e) => handleInputChange('keepElementsCssSelector', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="article, .content"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remove HTML elements (CSS selector)
                </label>
                <textarea
                  value={formData.removeElementsCssSelector || ''}
                  onChange={(e) => handleInputChange('removeElementsCssSelector', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="nav, footer, script, style"
                />
              </div>

              {/* HTML Processing Options */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.removeCookieWarnings || false}
                    onChange={(e) => handleInputChange('removeCookieWarnings', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Remove cookie warnings</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.blockMedia || false}
                    onChange={(e) => handleInputChange('blockMedia', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Block loading of images and videos</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.expandIframes || false}
                    onChange={(e) => handleInputChange('expandIframes', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Expand iframe elements</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.debugMode || false}
                    onChange={(e) => handleInputChange('debugMode', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Debug mode</span>
                </label>
              </div>

              {/* HTML Transformer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML transformer
                </label>
                <select
                  value={formData.htmlTransformer || 'readableText'}
                  onChange={(e) => handleInputChange('htmlTransformer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="readableText">Mozilla Readability</option>
                  <option value="none">None</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'output' && (
            <div className="space-y-6">
              {/* Output Format Options */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.saveHtml || false}
                    onChange={(e) => handleInputChange('saveHtml', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Save HTML to dataset</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.saveHtmlAsFile || false}
                    onChange={(e) => handleInputChange('saveHtmlAsFile', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Save HTML to key-value store</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.saveMarkdown || false}
                    onChange={(e) => handleInputChange('saveMarkdown', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Save Markdown</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.saveFiles || false}
                    onChange={(e) => handleInputChange('saveFiles', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Save files</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.saveScreenshots || false}
                    onChange={(e) => handleInputChange('saveScreenshots', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Save screenshots</span>
                </label>
              </div>

              {/* Max Results */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max results
                </label>
                <input
                  type="number"
                  value={formData.maxResults || 9999999}
                  onChange={(e) => handleInputChange('maxResults', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Start Crawler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActorInputForm;