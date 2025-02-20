export default function EventPage() {
    return (
      <div>
        <div data-testid="announcement-container" className="container mx-auto py-12 px-20">
          <h2 data-testid="announcement-title" className="text-3xl font-bold text-center mb-8">Announcement</h2>
  
          <div data-testid="announcement-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
  
            <div data-testid="card-1" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img data-testid="card-1-image" src="https://i.imgur.com/YOUR_VALENTINES_IMAGE_ID.png" alt="Valentine's Day" className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-md p-1">
                  <svg data-testid="card-1-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 12v4.5m0-4.5h4.5m-4.5 0L9 15M12 3.75v4.5m0-4.5h4.5m-4.5 0L18 9M12 12v4.5m0-4.5h4.5m-4.5 0L18 15M3.75 18.75v-4.5m0 4.5h4.5m-4.5 0L9 15M12 18.75v-4.5m0 4.5h4.5m-4.5 0L18 15" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 data-testid="card-1-title" className="text-lg font-semibold mb-2">Valentine's Day</h3>
                <p data-testid="card-1-subtitle" className="text-gray-600 text-sm mb-2">It is really popular in this event</p>
                <a data-testid="card-1-button" href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                  More Detail
                </a>
                <p data-testid="card-1-description" className="text-gray-700 mt-4 text-sm">A Valentine's Day Collection typically features a curated selection of gifts, decorations, or themed items created especially to celebrate the day of love, February 14th. The collection is often designed to convey romantic and heartfelt sentiments, making it popular for expressing affection to loved ones.</p>
              </div>
            </div>
  
            <div data-testid="card-2" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img data-testid="card-2-image" src="https://i.imgur.com/YOUR_BIRTHDAY_IMAGE_ID.png" alt="Birthday" className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-md p-1">
                  <svg data-testid="card-2-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 12v4.5m0-4.5h4.5m-4.5 0L9 15M12 3.75v4.5m0-4.5h4.5m-4.5 0L18 9M12 12v4.5m0-4.5h4.5m-4.5 0L18 15M3.75 18.75v-4.5m0 4.5h4.5m-4.5 0L9 15M12 18.75v-4.5m0 4.5h4.5m-4.5 0L18 15" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 data-testid="card-2-title" className="text-lg font-semibold mb-2">Birthday</h3>
                <p data-testid="card-2-subtitle" className="text-gray-600 text-sm mb-2">It is really popular in this event</p>
                <a data-testid="card-2-button" href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                  More Detail
                </a>
                <p data-testid="card-2-description" className="text-gray-700 mt-4 text-sm">A Birthday is a special annual occasion celebrating the anniversary of a person's birth. It is often marked with gatherings, gifts, and various festive traditions to honor the individual and express love and well-wishes for the coming year.</p>
              </div>
            </div>
  
            <div data-testid="card-3" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img data-testid="card-3-image" src="https://i.imgur.com/YOUR_PCHUM_BEN_IMAGE_ID.png" alt="Pchum Ben Ceremony" className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-md p-1">
                  <svg data-testid="card-3-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 12v4.5m0-4.5h4.5m-4.5 0L9 15M12 3.75v4.5m0-4.5h4.5m-4.5 0L18 9M12 12v4.5m0-4.5h4.5m-4.5 0L18 15M3.75 18.75v-4.5m0 4.5h4.5m-4.5 0L9 15M12 18.75v-4.5m0 4.5h4.5m-4.5 0L18 15" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 data-testid="card-3-title" className="text-lg font-semibold mb-2">Pchum Ben Ceremony</h3>
                <p data-testid="card-3-subtitle" className="text-gray-600 text-sm mb-2">It is really popular in this event</p>
                <a data-testid="card-3-button" href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                  More Detail
                </a>
                <p data-testid="card-3-description" className="text-gray-700 mt-4 text-sm">The Pchum Ben Ceremony is one of the most important and sacred traditional festivals in Cambodia, celebrated to honor deceased ancestors. Taking place over 15 days, it is deeply rooted in the country's Buddhist beliefs and culture, emphasizing remembrance, respect, and family unity.</p>
              </div>
            </div>
  
            <div data-testid="card-4" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img data-testid="card-4-image" src="https://i.imgur.com/YOUR_LUNAR_IMAGE_ID.png" alt="Lunar" className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-md p-1">
                  <svg data-testid="card-4-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 12v4.5m0-4.5h4.5m-4.5 0L9 15M12 3.75v4.5m0-4.5h4.5m-4.5 0L18 9M12 12v4.5m0-4.5h4.5m-4.5 0L18 15M3.75 18.75v-4.5m0 4.5h4.5m-4.5 0L9 15M12 18.75v-4.5m0 4.5h4.5m-4.5 0L18 15" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 data-testid="card-4-title" className="text-lg font-semibold mb-2">Lunar</h3>
                <p data-testid="card-4-subtitle" className="text-gray-600 text-sm mb-2">It is really popular in this event</p>
                <a data-testid="card-4-button" href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                  More Detail
                </a>
                <p data-testid="card-4-description" className="text-gray-700 mt-4 text-sm">The Lunar New Year, also known as the Chinese New Year or Spring Festival, is one of the most significant traditional celebrations in many East and Southeast Asian cultures, including China, Vietnam, Korea, and others. The festival marks the beginning of the new year according to the lunar calendar, which is based on the cycles of the moon, rather than the solar Gregorian calendar.</p>
              </div>
            </div>
  
            <div data-testid="card-5" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img data-testid="card-5-image" src="https://i.imgur.com/YOUR_VALENTINES_IMAGE_ID.png" alt="Valentine's Day" className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-md p-1">
                  <svg data-testid="card-5-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 12v4.5m0-4.5h4.5m-4.5 0L9 15M12 3.75v4.5m0-4.5h4.5m-4.5 0L18 9M12 12v4.5m0-4.5h4.5m-4.5 0L18 15M3.75 18.75v-4.5m0 4.5h4.5m-4.5 0L9 15M12 18.75v-4.5m0 4.5h4.5m-4.5 0L18 15" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 data-testid="card-5-title" className="text-lg font-semibold mb-2">Valentine's Day</h3>
                <p data-testid="card-5-subtitle" className="text-gray-600 text-sm mb-2">It is really popular in this event</p>
                <a data-testid="card-5-button" href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                  More Detail
                </a>
                <p data-testid="card-5-description" className="text-gray-700 mt-4 text-sm">A Valentine's Day Collection typically features a curated selection of gifts, decorations, or themed items created especially to celebrate the day of love, February 14th. The collection is often designed to convey romantic and heartfelt sentiments, making it popular for expressing affection to loved ones.</p>
              </div>
            </div>
  
            <div data-testid="card-6" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img data-testid="card-6-image" src="https://i.imgur.com/YOUR_BIRTHDAY_IMAGE_ID.png" alt="Birthday" className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-md p-1">
                  <svg data-testid="card-6-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 12v4.5m0-4.5h4.5m-4.5 0L9 15M12 3.75v4.5m0-4.5h4.5m-4.5 0L18 9M12 12v4.5m0-4.5h4.5m-4.5 0L18 15M3.75 18.75v-4.5m0 4.5h4.5m-4.5 0L9 15M12 18.75v-4.5m0 4.5h4.5m-4.5 0L18 15" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 data-testid="card-6-title" className="text-lg font-semibold mb-2">Birthday</h3>
                <p data-testid="card-6-subtitle" className="text-gray-600 text-sm mb-2">It is really popular in this event</p>
                <a data-testid="card-6-button" href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                  More Detail
                </a>
                <p data-testid="card-6-description" className="text-gray-700 mt-4 text-sm">A Birthday is a special annual occasion celebrating the anniversary of a person's birth. It is often marked with gatherings, gifts, and various festive traditions to honor the individual and express love and well-wishes for the coming year.</p>
              </div>
            </div>
  
            <div data-testid="card-7" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img data-testid="card-7-image" src="https://i.imgur.com/YOUR_PCHUM_BEN_IMAGE_ID.png" alt="Pchum Ben Ceremony" className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-md p-1">
                  <svg data-testid="card-7-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 12v4.5m0-4.5h4.5m-4.5 0L9 15M12 3.75v4.5m0-4.5h4.5m-4.5 0L18 9M12 12v4.5m0-4.5h4.5m-4.5 0L18 15M3.75 18.75v-4.5m0 4.5h4.5m-4.5 0L9 15M12 18.75v-4.5m0 4.5h4.5m-4.5 0L18 15" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 data-testid="card-7-title" className="text-lg font-semibold mb-2">Pchum Ben Ceremony</h3>
                <p data-testid="card-7-subtitle" className="text-gray-600 text-sm mb-2">It is really popular in this event</p>
                <a data-testid="card-7-button" href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                  More Detail
                </a>
                <p data-testid="card-7-description" className="text-gray-700 mt-4 text-sm">The Pchum Ben Ceremony is one of the most important and sacred traditional festivals in Cambodia, celebrated to honor deceased ancestors. Taking place over 15 days, it is deeply rooted in the country's Buddhist beliefs and culture, emphasizing remembrance, respect, and family unity.</p>
              </div>
            </div>
  
            <div data-testid="card-8" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img data-testid="card-8-image" src="https://i.imgur.com/YOUR_LUNAR_IMAGE_ID.png" alt="Lunar" className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-white bg-opacity-75 rounded-md p-1">
                  <svg data-testid="card-8-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 12v4.5m0-4.5h4.5m-4.5 0L9 15M12 3.75v4.5m0-4.5h4.5m-4.5 0L18 9M12 12v4.5m0-4.5h4.5m-4.5 0L18 15M3.75 18.75v-4.5m0 4.5h4.5m-4.5 0L9 15M12 18.75v-4.5m0 4.5h4.5m-4.5 0L18 15" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 data-testid="card-8-title" className="text-lg font-semibold mb-2">Lunar</h3>
                <p data-testid="card-8-subtitle" className="text-gray-600 text-sm mb-2">It is really popular in this event</p>
                <a data-testid="card-8-button" href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm">
                  More Detail
                </a>
                <p data-testid="card-8-description" className="text-gray-700 mt-4 text-sm">The Lunar New Year, also known as the Chinese New Year or Spring Festival, is one of the most significant traditional celebrations in many East and Southeast Asian cultures, including China, Vietnam, Korea, and others. The festival marks the beginning of the new year according to the lunar calendar, which is based on the cycles of the moon, rather than the solar Gregorian calendar.</p>
              </div>
            </div>
  
  
          </div>
  
          <div data-testid="pagination-container" className="flex justify-center mt-8">
            <a data-testid="pagination-previous" href="#" className="px-3 py-1 rounded-l-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Previous">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </a>
  
            <a data-testid="pagination-page-1" href="#" className="px-3 py-1 bg-gray-200 hover:bg-gray-300">1</a>
            <a data-testid="pagination-page-2" href="#" className="px-3 py-1 bg-yellow-500 text-white">2</a>
            <a data-testid="pagination-page-3" href="#" className="px-3 py-1 bg-gray-200 hover:bg-gray-300">3</a>
  
            <a data-testid="pagination-next" href="#" className="px-3 py-1 rounded-r-md bg-gray-200 hover:bg-gray-300" aria-label="Next">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
  
        </div>
      </div>
  
    );
  }