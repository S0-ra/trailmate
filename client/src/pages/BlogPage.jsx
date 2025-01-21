import NewsletterBar from './../components/common/NewsletterBar';
import HeaderCommon from './../components/common/HeaderCommon';
import { Footer } from "antd/es/layout/layout";



const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      image: "/blog1.jpg",
      date: "May 31, 2019",
      title: "Top 10 Trekking Must-Haves",
      description: "Essential gear to make your adventure seamless and stress-free."
    },
    {
      id: 2,
      image: "/blog2.jpeg",
      date: "May 31, 2019",
      title: "Beginner's Trekking Guide",
      description: "Everything you need to know to hit the trails with confidence."
    },
    {
      id: 3,
      image: "/blog3.jpg",
      date: "May 31, 2019",
      title: "Epic Global Trekking Spots",
      description: "Discover the world's most breathtaking trails and landscapes."
    },
    {
      id: 4,
      image: "/blog4.jpeg",
      date: "May 31, 2019",
      title: "Trail Tales: Lessons from Trekkers",
      description: "Inspiring stories and practical tips from seasoned adventurers."
    },
    {
      id: 5,
      image: "/blog5.jpg",
      date: "May 31, 2019",
      title: "Eco-Friendly Trekking Gear",
      description: "Sustainable options for the environmentally conscious adventurer."
    },
    {
      id: 6,
      image: "/blog6.png",
      date: "May 31, 2019",
      title: "Trekking as a Lifestyle",
      description: "Why more people are embracing the trail as a way of life."
    }
  ];

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-red-400 mb-12">
        FROM OUR BLOGS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <a
            key={blog.id}
            href="#"
            className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-red-400 font-semibold text-sm">{blog.date}</p>
              <h3 className="text-lg font-bold text-gray-800 mt-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{blog.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};


const BlogPage=function(){
    return(
        <>
        <HeaderCommon/>
        <BlogSection/>
        <NewsletterBar/>
        <Footer/>
        </>
    )
}

export default BlogPage;