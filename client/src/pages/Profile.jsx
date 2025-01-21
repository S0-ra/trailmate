/* eslint-disable react/prop-types */

const TrailMateProfile = () => {
  const achievements = [
    {
      icon: '🏔️',
      text: 'Completed Annapurna Base Camp Trek (2023)'
    },
    {
      icon: '🎒',
      text: 'Reviewed 50+ trekking gears with top ratings'
    },
    {
      icon: '🌄',
      text: 'Organized community treks for over 100 trekkers'
    }
  ];

  const testimonials = [
    {
      text: "John's passion for trekking and her eye for detail are unmatched. He's always ready to help!",
      author: 'Dehan Pun'
    },
    {
      text: "His advice on trekking gear saved me time and money. Highly recommend connecting with her!",
      author: 'Sarah Thapa'
    }
  ];

  const stats = [
    { label: 'Trips', value: '15' },
    { label: 'Gear Shared', value: '32' },
    { label: 'Followers', value: '890' }
  ];

  return (
    <div className="mx-20">
      <div className="py-6">
        {/* Main Container */}
        <div className="-mx-20 bg-white rounded-lg overflow-hidden">
          {/* Banner */}
          <div className="bg-red-400 h-40 flex items-center justify-center relative">
            <h1 className="text-white text-3xl font-bold uppercase tracking-widest">
              TrailMate
            </h1>
            <div className="absolute bottom-0 transform translate-y-1/2 flex justify-center w-full">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white">
                <img
                  src="/profile.jpg"
                  alt="John's Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8 pt-16 text-gray-800">
            {/* Profile Info */}
            <div className="text-center">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-600">
                Trekking Enthusiast, Gear Expert & Aspiring Developer
              </p>
              <p className="mt-2 text-sm text-gray-500">Joined: March 2023</p>
              <div className="mt-9 flex justify-center gap-4">
                <button className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500">
                  Edit Profile
                </button>
                <button className="px-6 py-2 bg-gray-100 text-red-400 rounded-lg hover:bg-gray-200">
                  Message
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-3 gap-0">
              {stats.map((stat, index) => (
                <StatItem key={index} label={stat.label} value={stat.value} />
              ))}
            </div>

            {/* About Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <p className="text-gray-600 leading-relaxed">
                Hi, I&apos;m John, a passionate trekker and gear enthusiast from Nepal.
                Whether it&apos;s exploring serene trails or helping others gear up for
                their adventures, I find joy in all aspects of trekking.
                Currently, I&apos;m also diving into web development, working on
                exciting projects like a Trekking Equipment Management System.
                Let&apos;s connect and make every adventure unforgettable!
              </p>
            </div>

            {/* Achievements Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Achievements</h3>
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <Achievement 
                    key={index}
                    icon={achievement.icon}
                    text={achievement.text}
                  />
                ))}
              </ul>
            </div>

            {/* Gallery Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Gallery</h3>
              <div className="flex justify-center gap-60">
                {[1, 2, 3].map((num) => (
                  <img
                    key={num}
                    src="https://i.pinimg.com/736x/f2/5f/e1/f25fe1b9e9dbf4ffded1247f20028431.jpg"
                    alt={`Gallery ${num}`}
                    className="w-64 h-64  object-cover rounded-lg shadow "
                  />
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">What People Say</h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <Testimonial
                    key={index}
                    text={testimonial.text}
                    author={testimonial.author}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatItem = ({ label, value }) => (
  <div className="text-center">
    <h3 className="text-lg font-semibold mb-0">{label}</h3>
    <p className="text-red-400 text-xl font-bold mt-1">{value}</p>
  </div>
);

const Achievement = ({ icon, text }) => (
  <li className="flex items-center gap-4">
    <span className="w-8 h-8 flex items-center justify-center bg-red-400 text-white rounded-full">
      {icon}
    </span>
    <span>{text}</span>
  </li>
);

const Testimonial = ({ text, author }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow">
    <p className="text-gray-600">{text}</p>
    <p className="mt-2 text-gray-500 text-sm text-right">- {author}</p>
  </div>
);

export default TrailMateProfile;