import { useEffect, useState } from "react";
import { useUserId } from "../context/UserContext";
import axios from "axios";
/* eslint-disable react/prop-types */

const CommunityHeader = function () {
  return (
    <header className="bg-white">
      <div className="container mx-auto p-4 flex items-center">
        <a href="/" className="text-3xl font-bold text-red-500">
          TrailMate
        </a>

        <div className="flex ml-16 border border-gray-300 rounded-xl overflow-hidden sm:flex">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 w-full outline-none text-sm text-gray-600"
          />
          <i className="fa-solid fa-magnifying-glass p-3 text-gray-500"></i>
        </div>

        <div className="ml-auto flex space-x-5">
          <a href="#">
            <i className="fa-solid fa-user-plus text-gray-600 text-lg"></i>
          </a>
          <a href="#">
            <i className="fa-solid fa-comment-dots text-gray-600 text-lg"></i>
          </a>
          <a href="#">
            <i className="fa-solid fa-bell text-gray-600 text-lg"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

const Sidebar = function ({ name }) {
  return (
    <aside className="w-full sm:w-1/4 bg-white p-4 mb-4 sm:mb-0 sm:mr-4 justify-self-start">
      <a href="/profile">
        <div className="flex border border-gray-200 bg-gray-50 rounded-lg py-2 px-3 md:p-2 items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-red-400 rounded-full"></div>
          <span className="font-semibold">{name}</span>
        </div>
      </a>
      <nav className="space-y-2 text-sm text-gray-700">
        <a
          href="/community/feed"
          className="flex items-center bg-gray-200 p-2 rounded-lg hover:bg-gray-100">
          <i className="fa-solid fa-house mr-2"></i>
          <span>Feed</span>
        </a>

        <a
          href="/community/events"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100">
          <i className="fa-solid fa-calendar-days mr-2"></i>
          <span>Event</span>
        </a>

        <a
          href="/"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100">
          <i className="fa-solid fa-store mr-2"></i>
          <span>Marketplace</span>
        </a>
        <a
          href="/community"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100">
          <i className="fa-solid fa-users-line mr-2"></i>
          <span>Communities</span>
        </a>
      </nav>

      <div className="mt-12">
        <h2 className="text-sm font-semibold mb-5 text-gray-500">
          Pages You Like
        </h2>
        <div className="space-y-4 text-xs font-medium">
          <div className="flex items-center justify-between rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-sm">Zam Vlogs</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              120
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-sm">Sisan Baniya</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              10
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-sm">Ghumante</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              18
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-sm">Dhorpatan</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              21
            </span>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-semibold mb-5 text-gray-500 mt-12">
        Your Pages
      </h3>
      <div className="space-y-3">
        <div className="flex justify-start text-sm space-x-3">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>
          <span>Zam Vlogs</span>
          <span className="text-xs text-gray-400 pl-6 rounded-full">
            11 min
          </span>
        </div>
        <div className="flex justify-start text-sm space-x-3">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>

          <span>Sisan Baniya</span>
          <span className="pl-6">
            <i
              className="fa-solid fa-circle fa-xs"
              style={{ color: "#40b800" }}></i>
          </span>
        </div>
        <div className="flex justify-start text-sm space-x-3">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>

          <span>Ghumante</span>
          <span className="pl-9">
            <i
              className="fa-solid fa-circle fa-xs"
              style={{ color: "#40b800" }}></i>
          </span>
        </div>
        <div className="flex justify-start text-sm space-x-3">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>

          <span>Dhorpatan</span>
          <span className="pl-9">
            <i
              className="fa-solid fa-circle fa-xs"
              style={{ color: "#40b800" }}></i>
          </span>
        </div>
      </div>
    </aside>
  );
};

const EventItem = ({ time, title, description, fee, image }) => (
  <div className="border-red-400 pl-4">
    <p className="text-xl font-bold">{time}</p>
    <p>{title}</p>
    {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
    {fee && (
      <a
        href="#"
        className="block mt-2 py-1 px-2 bg-red-400 text-white text-sm font-medium rounded">
        Fee: {fee}
      </a>
    )}
    {image && (
      <div className="mt-4 h-40 bg-gray-300 rounded-md flex object-cover items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    )}
  </div>
);

const EventSchedule = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <section className="mt-10 space-y-10">
        <h1 className="text-6xl text-red-400 font-bold mb-5">
          Upcoming Events
        </h1>

        {/* 4th September */}
        <div>
          <h2 className="text-2xl font-semibold text-red-400 mb-4">
            4 September
          </h2>
          <div className="border-t border-gray-300 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <EventItem
              time="10:00"
              title="Welcome & Registration"
              description="Receive trekking kits and maps."
              fee="$50-100"
            />
            <EventItem
              time="13:30"
              title="Himalayan Trail Overview"
              image="../../src/assets/trails.jpg"
            />
            <EventItem
              time="16:00"
              title="Safety Briefing & Tips"
              description="Learn essential trekking safety measures."
              fee="Free"
            />
          </div>
        </div>

        {/* 5th September */}
        <div>
          <h2 className="text-2xl font-semibold text-red-400 mb-4">
            5 September
          </h2>
          <div className="border-t border-gray-300 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <EventItem
              time="12:00"
              title="Guided Hike to Poon Hill"
              image="../../src/assets/poonhill.jpeg"
            />
            <EventItem
              time="14:30"
              title="Photography Workshop"
              description="Capture stunning Himalayan landscapes."
              fee="Free"
            />
            <EventItem
              time="16:00"
              title="Cultural Presentation"
              description="Learn about Nepali culture and traditions."
              fee="Free"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const CommunityEventPage = function () {
  const { userId } = useUserId();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/users/name/${userId}`)
        .then((response) => {
          setName(response.data.name);
        })
        .catch((err) => {
          console.log("Error occurred", err);
        });
    }
  }, [userId]);
  return (
    <>
      <CommunityHeader />
      <div className="container mx-auto p-0 sm:flex ">
        <Sidebar name={name} />
        <EventSchedule />
      </div>
    </>
  );
};

export default CommunityEventPage;
