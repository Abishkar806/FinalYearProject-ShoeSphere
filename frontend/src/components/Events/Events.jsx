import React from "react"
import { useSelector } from "react-redux"
import styles from "../../styles/styles"
import EventCard from "./EventCard"

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events)

  if (isLoading) {
    return (
      <div className="min-h-[50vh] bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3d569a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#334580] font-medium">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f0f4fa] py-12">
      <div className={`${styles.section}`}>
        {/* Header */}
        <div className="relative mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#1a2240]">Popular Events</h1>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-[#3d569a]"></div>
          <p className="text-[#334580] mt-6 max-w-2xl mx-auto">
            Don't miss out on our exclusive events and special offers. Limited time deals on premium footwear.
          </p>
        </div>

        {/* Events Grid */}
        <div className="w-full">
          {allEvents && allEvents.length > 0 ? (
            <div className="space-y-10">
              {/* Featured Event */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
                <EventCard data={allEvents[0]} />
              </div>

              
               
              
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <div className="w-20 h-20 bg-[#f0f4fa] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#3d569a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a2240] mb-2">No Events Currently Available</h3>
              <p className="text-[#334580] max-w-md mx-auto">
                We're working on bringing you exciting events and exclusive offers. Check back soon for updates!
              </p>
              <button className="mt-6 bg-[#3d569a] hover:bg-[#2d3a69] text-white py-2 px-6 rounded-md transition-colors">
                Notify Me About Events
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Events
