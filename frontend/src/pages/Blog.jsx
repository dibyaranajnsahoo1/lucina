import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../utils/api';
import PurpleArrowIcon  from '../../asset/arrow2.png';

const STATIC_BLOGS = [
  { _id:'1', title:'Understanding the Egg Donation Process: A Complete Guide', slug:'understanding-egg-donation-process-complete-guide', excerpt:'Egg donation is a generous act that helps many people build their families. Learn everything about the process, from application to retrieval.', image:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800', category:'Egg Donation', author:'Lucina Medical Team', readTime:8, publishedAt:'2024-01-15T00:00:00Z' },
  { _id:'2', title:'Navigating Fertility Challenges: A Guide for Intended Parents', slug:'navigating-fertility-challenges-guide-intended-parents', excerpt:'Facing fertility challenges can be overwhelming. This comprehensive guide helps intended parents understand their options, including egg donation.', image:'https://lucinaeggbank.com/wp-content/uploads/2026/04/lucina-egg-bank-egg-donation-requirements-10.webp', category:'Intended Parents', author:'Dr. David Harari', readTime:10, publishedAt:'2024-02-20T00:00:00Z' },
];

const CATEGORIES = ['All','Egg Donation','Intended Parents','Fertility','Success Stories','Health','News'];

const BlogCard = ({ blog }) => (
  <article className="bg-white rounded-[20px] overflow-hidden border border-[#EDD8F5] shadow-[0_2px_12px_rgba(107,45,139,0.06)] transition-all duration-200 hover:shadow-[0_8px_32px_rgba(107,45,139,0.14)] hover:-translate-y-[3px]">
    <div className="h-[220px] overflow-hidden relative">
      {blog.image
        ? <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-[400ms] hover:scale-[1.05]"/>
        : <div className="bg-[#F3EEF8] w-full h-full flex items-center justify-center text-[48px]">📝</div>}
      <div className="absolute top-3 left-3">
        <span className="bg-[rgba(107,45,139,0.85)] text-white px-3 py-[4px] rounded-full text-[11px] font-bold backdrop-blur-sm">{blog.category}</span>
      </div>
    </div>
    <div className="p-5 px-[22px]">
      <div className="flex gap-3.5 mb-2.5 flex-wrap">
        <span className="flex items-center gap-1 text-[12px] text-[#9B5EC0]"><Calendar size={12}/>{new Date(blog.publishedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
        <span className="flex items-center gap-1 text-[12px] text-[#9B5EC0]"><Clock size={12}/>{blog.readTime} min read</span>
      </div>
      <h3 className="font-serif text-[20px] text-[#1A1A2E] mb-2.5 leading-[1.3]">{blog.title}</h3>
      <p className="text-[13px] text-[#6B7280] leading-[1.65] mb-4">{blog.excerpt}</p>
      <div className="flex justify-between items-center border-t border-[#F3EEF8] pt-3.5 gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-[13px] text-[#4A4A5A]">
          <div className="w-7 h-7 bg-[#7B3FA0] rounded-full flex items-center justify-center text-white text-[12px] font-bold">{blog.author?.charAt(0)}</div>
          <span>{blog.author}</span>
        </div>
        <Link to={`/blog/${blog.slug}`} className="btn btn-pink btn-sm gap-[5px]">Read More <ArrowRight size={13}/></Link>
      </div>
    </div>
  </article>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    const fetch = async () => {
      try {
        const params = category!=='All'?{category}:{};
        const res = await getBlogs(params);
        setBlogs(res.data?.length?res.data:STATIC_BLOGS);
      } catch { setBlogs(STATIC_BLOGS); }
      finally { setLoading(false); }
    };
    fetch();
  }, [category]);
  

  return (
    <>
      <section
        className="h-[260px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://lucinaeggbank.com/wp-content/uploads/2024/08/lgbtq-banner-1.webp')",
        }}
      >
        <div className="container mx-auto px-6">

          <h1 className="font-serif font-bold text-[70px] text-[#8C67AF]">
            Blog
          </h1>

          <p className="font-montserrat max-w-[520px] text-[#333] leading-[1.6]">
           You can read all about finding the perfect egg donor and how becoming a donor can make a lasting difference in growing families. Explore helpful guides, inspiring stories, and expert advice to support you on your journey—whether you're building your family or considering egg donation.
          </p>

        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">

          {/* Search + Filter */}
          <div className="flex flex-col lg:flex-row gap-5 justify-between mb-12">

            <div className="relative w-full lg:max-w-[820px]">

                <input
                  type="text"
                  placeholder="Explore our latest posts here..."
                  className="
                    w-full
                    h-[52px]
                    border
                    border-[#9D77BB]
                    rounded-full
                    px-6
                    pr-[80px]
                    outline-none
                  "
                />

                <button
                  className="
                    absolute
                    right-0
                    top-0
                    h-[52px]
                    w-[70px]
                    bg-[#8C67AF]
                    rounded-r-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  <img
                    src={PurpleArrowIcon}
                    alt=""
                    className="w-5 h-5 brightness-0 invert"
                  />
                </button>

              </div>

            <div className="flex items-center gap-3">

              <span className="text-[14px] font-semibold text-[#222]">
                Filter by:
              </span>

              <select
                className="
                  h-[28px]
                  border
                  border-[#BBA6CE]
                  text-[12px]
                  px-2
                  bg-white
                  outline-none
                  cursor-pointer
                "
              >
                <option>Newest</option>
                <option>Oldest</option>
              </select>

            </div>

          </div>

          <div className="grid lg:grid-cols-[250px_1fr] gap-8">

            {/* Sidebar */}
            <div className="bg-white border rounded-md p-8 h-fit">

              <ul className="space-y-5">

                <li className="text-[#EB7EB2] font-medium">
                  All Articles →
                </li>

                <li>Intended Parents</li>
                <li>Egg Donor</li>
                <li>LGBTQ+ Community</li>
                <li>Frozen Eggs</li>

              </ul>

            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="
                    border
                    border-[#9D77BB]
                    rounded-md
                    overflow-hidden
                    group
                    bg-white
                  "
                >

                  <div className="h-[180px] overflow-hidden">
                    <img
                      src={blog.image}
                      alt=""
                      className="
                        w-full
                        h-full
                        object-cover
                        transition
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>

                  <div className="p-4">

                    <div className="text-[12px] text-gray-500 mb-2">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </div>

                    <h3 className="font-semibold text-[18px] leading-[1.4] mb-3">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>

                  </div>

                  <div
                    className="
                      h-[44px]
                      bg-[#F4EEF7]
                      flex
                      justify-end
                      items-center
                      px-4
                    "
                  >
                    <img
                      src={PurpleArrowIcon}
                      alt=""
                      className="w-4 h-4"
                    />
                  </div>

                </Link>
              ))}

            </div>

          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-14">

            <button className="text-[#8C67AF] font-semibold">
              « Previous
            </button>

            {[1,2,3,4].map((page) => (
              <button
                key={page}
                className={`
                  w-9 h-9
                  rounded-full
                  border
                  text-[14px]
                  transition-all
                  ${
                    page === currentPage
                      ? "bg-[#8C67AF] text-white border-[#8C67AF]"
                      : "border-[#D8C7E5] text-[#8C67AF]"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <span className="text-[#8C67AF]">...</span>

            <button className="w-9 h-9 rounded-full border border-[#D8C7E5] text-[#8C67AF]">
              20
            </button>

            <button className="text-[#8C67AF] font-semibold">
              Next »
            </button>

          </div>

        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-10 ">
        <div
          className="
            max-w-[1900px]
            mx-auto
            bg-[#5B4371]
            min-h-[620px]
            flex
            items-center
            rounded-tl-[260px]
            rounded-br-[260px]
          "
        >
          <div className="w-full px-8 lg:px-24">

            <div className="grid lg:grid-cols-[1.2fr_1fr_1fr] items-center gap-16">

              {/* LEFT */}
              <div >

                <div className="flex items-center gap-4 mb-10">
                  <div className="w-[60px] h-[2px] bg-white" />

                  <span className="text-white text-[18px]">
                    Get Started
                  </span>
                </div>
                <div className="flex">

                  
                  <img
                    src="https://lucinaeggbank.com/wp-content/uploads/2021/03/symbol-in-tytle.svg"
                    alt=""
                    className="w-[52px] self-start"
                  />
                
                <div>

                <div className="flex items-start gap-4 mb-6">


                  <h2 className="font-serif text-white text-[55px] leading-[1.05]">
                    Begin Your Journey
                    <br />
                    With Lucina
                  </h2>

                </div>

                <p className="text-white text-[18px] leading-[1.6] max-w-[420px]">
                  Our caring team at Lucina strives to make your
                  journey seamless - whether you are a donor
                  recipient or want to become an egg donor.
                </p>
                </div>
                </div>

              </div>

              {/* CENTER */}
              <div>

                <div className="w-[110px] h-[110px] rounded-full border border-white/40 relative mb-8">
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="absolute top-4 left-4"
                  >
                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
                  </svg>
                </div>
                <h3 className="font-serif text-white text-[48px] leading-[1.05] mb-10">
                  Become an Egg
                  <br />
                  Donor
                </h3>

                <Link
                  to="/become-an-egg-donor"
                  className="
                    inline-flex
                    items-center
                    gap-4
                    bg-white
                    text-[#8C67AF]
                    px-8
                    h-[56px]
                    rounded-full
                    font-semibold
                  "
                >
                  Apply

                  <img
                    src={PurpleArrowIcon}
                    alt=""
                    className="w-5"
                  />
                </Link>

              </div>

              {/* RIGHT */}
              <div className="relative">

              <div className="w-[110px] h-[110px] border border-white/40 rounded-full relative mb-8">
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <path d="M16 11c1.66 0 3-1.79 3-4s-1.34-4-3-4-3 1.79-3 4 1.34 4 3 4zm-8 0c1.66 0 3-1.79 3-4S9.66 3 8 3 5 4.79 5 7s1.34 4 3 4zm0 2c-2.67 0-8 1.34-8 4v2h10v-2c0-1.18.46-2.25 1.22-3.09C10.12 13.34 8.92 13 8 13zm8 0c-.92 0-2.12.34-3.22.91A4.98 4.98 0 0114 17v2h10v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

                <h3 className="font-serif text-white text-[48px] leading-[1.05] mb-10">
                  Intended
                  <br />
                  Parents
                </h3>

                <Link
                  to="/find-an-egg-donor"
                  className="
                    inline-flex
                    items-center
                    gap-4
                    bg-white
                    text-[#8C67AF]
                    px-8
                    h-[56px]
                    rounded-full
                    font-semibold
                  "
                >
                  Find a Donor

                  <img
                    src={PurpleArrowIcon}
                    alt=""
                    className="w-5"
                  />
                </Link>

              </div>

            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .featured-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

export default Blog;
