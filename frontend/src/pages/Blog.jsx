import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getBlogs } from '../utils/api';

const STATIC_BLOGS = [
  { _id:'1', title:'Understanding the Egg Donation Process: A Complete Guide', slug:'understanding-egg-donation-process-complete-guide', excerpt:'Egg donation is a generous act that helps many people build their families. Learn everything about the process, from application to retrieval.', image:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800', category:'Egg Donation', author:'Lucina Medical Team', readTime:8, publishedAt:'2024-01-15T00:00:00Z' },
  { _id:'2', title:'Navigating Fertility Challenges: A Guide for Intended Parents', slug:'navigating-fertility-challenges-guide-intended-parents', excerpt:'Facing fertility challenges can be overwhelming. This comprehensive guide helps intended parents understand their options, including egg donation.', image:'https://images.unsplash.com/photo-1519627305757-9f7b9dfe1524?w=800', category:'Intended Parents', author:'Dr. David Harari', readTime:10, publishedAt:'2024-02-20T00:00:00Z' },
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
      <section className="page-hero">
        <div className="container">
          <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-white/50 block mb-2.5">Resources</span>
          <h1 className="text-white mb-4">Our <span className="text-[#F093B4]">Blog</span></h1>
          <p>Expert insights, success stories, and guides on egg donation, fertility, and family building.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          {/* Category filters */}
          <div className="flex gap-2 flex-wrap mb-10">
            {CATEGORIES.map(cat=>(
              <button key={cat} onClick={()=>{setCategory(cat);setLoading(true);}}
                className="px-[18px] py-2 rounded-full border-[1.5px] text-[13px] font-medium cursor-pointer transition-all duration-200"
                style={{
                  borderColor: category===cat ? '#7B3FA0' : '#D4B8E8',
                  background:  category===cat ? '#7B3FA0' : 'white',
                  color:       category===cat ? 'white'   : '#4A4A5A',
                }}>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-[60px]"><div className="spinner mx-auto"/></div>
          ) : blogs.length===0 ? (
            <div className="text-center py-[60px] text-[#6B7280]">
              <div className="text-[48px] mb-4">📰</div>
              <h3>No posts found</h3>
            </div>
          ) : (
            <>
              {/* Featured */}
              {blogs[0]&&(
                <Link to={`/blog/${blogs[0].slug}`}
                  className="grid rounded-[24px] overflow-hidden shadow-[0_8px_40px_rgba(107,45,139,0.12)] border border-[#EDD8F5] mb-12 no-underline text-inherit transition-all duration-200 hover:shadow-[0_12px_56px_rgba(107,45,139,0.18)] featured-blog-grid"
                  style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="h-[400px] overflow-hidden">
                    {blogs[0].image
                      ? <img src={blogs[0].image} alt={blogs[0].title} className="w-full h-full object-cover"/>
                      : <div className="bg-[#F3EEF8] w-full h-full flex items-center justify-center text-[80px]">📝</div>}
                  </div>
                  <div className="p-11 px-10 flex flex-col justify-center bg-white">
                    <span className="inline-block bg-[#F3EEF8] text-[#7B3FA0] px-3 py-1 rounded-full text-[11px] font-bold mb-4 w-fit">{blogs[0].category}</span>
                    <h2 className="font-serif text-[clamp(20px,2.5vw,28px)] text-[#1A1A2E] mb-3 leading-[1.3]">{blogs[0].title}</h2>
                    <p className="text-[#6B7280] text-[14px] leading-[1.7] mb-5">{blogs[0].excerpt}</p>
                    <div className="flex gap-4 text-[13px] text-[#9B5EC0] mb-5 flex-wrap">
                      <span className="flex items-center gap-1"><Calendar size={13}/>{new Date(blogs[0].publishedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
                      <span className="flex items-center gap-1"><Clock size={13}/>{blogs[0].readTime} min read</span>
                    </div>
                    <span className="btn btn-pink inline-flex items-center gap-2 w-fit">Read Article <ArrowRight size={15}/></span>
                  </div>
                </Link>
              )}
              {blogs.length>1&&(
                <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                  {blogs.slice(1).map(blog=><BlogCard key={blog._id||blog.slug} blog={blog}/>)}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-[#F8F0F8] text-center">
        <div className="container max-w-[600px]">
          <span className="section-tag">Stay Updated</span>
          <h2 className="section-title">Get Fertility Insights <span className="text-[#E8619A]">in Your Inbox</span></h2>
          <p className="text-[#6B7280] mb-7">Subscribe for the latest articles, success stories, and expert advice on egg donation and fertility.</p>
          <Link to="/contact-us" className="btn btn-pink btn-lg">Contact Us to Subscribe</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .featured-blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

export default Blog;
