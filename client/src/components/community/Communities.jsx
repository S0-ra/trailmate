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
          <span className="font-semibold">John Doe</span>
        </div>
      </a>
      <nav className="space-y-2 text-sm text-gray-700">
        <a
          href="/community"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100">
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
          href="/communities"
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

// Helper Components
const StatItem = ({ count, label }) => (
  <div className="text-center">
    <span className="text-sm font-semibold">{count}</span>
    <p className="text-xs text-gray-400">{label}</p>
  </div>
);

const Event = ({ title, details, className = "" }) => (
  <div className={className}>
    <p className="text-sm">{title}</p>
    <p className="text-gray-500 text-xs">{details}</p>
  </div>
);

const CommunityProfile = () => {
  return (
    <div className="max-w-7xl border-t p-4 sm:p-6 lg:p-8 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/3 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg p-4 text-center">
            {/* Profile Icon */}
            <div className="w-28 h-28 mx-auto rounded-2xl bg-red-400" />

            {/* Profile Details */}
            <h2 className="font-semibold text-gray-900 mt-4">
              Mardi Community
            </h2>
            <p className="text-xs my-1 text-gray-400">@Mardi Trek</p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-gray-700">
              <StatItem count="10.3K" label="Post" />
              <StatItem count="2,564" label="Members" />
              <StatItem count="234" label="Media" />
              <StatItem count="21" label="Events" />
            </div>

            <hr className="mt-5" />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center mx-2 mt-6 space-y-3 sm:space-y-0 sm:space-x-3">
              <button className="px-3 py-2 bg-blue-600 text-white rounded-xl font-semibold text-xs hover:bg-blue-700">
                Join Group
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl font-semibold text-xs hover:bg-gray-200">
                Send Message
              </button>
            </div>
          </div>

          {/* Group Creator Card */}
          <div className="mt-6 bg-white rounded-lg p-4">
            <h3 className="text-sm font-medium">Group Created by</h3>
            <div className="flex items-start gap-2 mt-5">
              <div className="w-9 h-9 bg-red-400 rounded-full" />
              <div>
                <h4 className="font-semibold text-sm">Gus Fring BB</h4>
                <p className="text-xs text-gray-500">12 April at 09:28 PM</p>
              </div>
              <div>
                <button className="text-xs hover:bg-gray-300 text-gray-500 bg-gray-200 rounded-lg px-2 py-1">
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* About Group Card */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between gap-2">
              <h3 className="font-medium text-sm">About Group</h3>
              <button className="text-gray-400">•••</button>
            </div>
            <hr className="my-3" />
            <p className="text-sm text-gray-600">
              MARDI - This group is meant for trekkers to ask questions,
              network, and improve. Hashtag your posts to help others navigate
              easily.
            </p>
          </div>

          {/* Suggested Group Card */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm font-bold">Suggested Group</h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-12 h-12 bg-blue-300 rounded-full" />
              <div>
                <p className="font-bold text-sm">Tilicho Trek</p>
                <p className="text-xs text-gray-500">15,321 Total Members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Banner */}
          <div className="w-full h-40 bg-red-400 rounded" />

          {/* Members and Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Members Section */}
            <div className="bg-white p-4 rounded">
              <h3 className="font-bold text-sm">Members - 2,564</h3>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-red-400 rounded-full" />
                ))}
              </div>
              <button className="text-sm text-blue-500 mt-2">See All</button>
            </div>

            {/* Events Section */}
            <div className="bg-white p-4 rounded">
              <h3 className="font-bold text-sm">Nearest Events</h3>
              <div className="mt-2">
                <Event
                  title="Trekkers Online"
                  details="Thu 10:00 - Tokopedia Tower"
                />
                <Event
                  title="Travel Tips Conference"
                  details="Thu 10:00 - Google Inc"
                  className="mt-4"
                />
              </div>
            </div>
          </div>

          {/* Popular Posts Section */}
          <div className="bg-white p-4 rounded">
            <h3 className="font-bold text-sm">Popular Posts</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-32 h-20 bg-red-400 rounded-xl" />
                <div>
                  <h4 className="font-bold text-sm">Gus Fring BB</h4>
                  <p className="text-xs text-gray-400">12 April at 09:28 PM</p>
                  <p className="text-xs text-gray-600 mt-1">
                    As a passionate trekker, this journey was a perfect blend of
                    breathtaking landscapes and challenging trails.
                  </p>
                </div>
              </div>
            </div>
            <button className="text-sm text-blue-500 mt-4">
              See Another Post
            </button>
          </div>

          {/* Media Section */}
          <div className="bg-white p-4 rounded">
            <h3 className="font-bold text-sm">Media</h3>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full h-20 bg-red-400 rounded" />
              ))}
            </div>
            <button className="text-sm text-blue-500 mt-2">See All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Communities = function () {
  return (
    <>
      <CommunityHeader />
      <div className="container mx-auto p-0 sm:flex">
        <Sidebar />
        <CommunityProfile />
      </div>
    </>
  );
};

export default Communities;
