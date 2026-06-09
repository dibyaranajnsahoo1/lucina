import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { getBlog } from '../utils/api';

const STATIC = {
  'understanding-egg-donation-process-complete-guide': {
    title:'Understanding the Egg Donation Process: A Complete Guide',
    image:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200',
    category:'Egg Donation', author:'Lucina Medical Team', readTime:8,
    publishedAt:'2024-01-15T00:00:00Z',
    content:`<h2>What is Egg Donation?</h2><p>Egg donation is a process where a woman (the egg donor) donates her eggs to another person or couple (the intended parents) who are unable to conceive using their own eggs. This process has helped millions of families worldwide achieve their dream of parenthood.</p><h2>Who Benefits from Egg Donation?</h2><ul><li>Women who have premature ovarian failure or diminished ovarian reserve</li><li>Women who have undergone cancer treatment that affected their fertility</li><li>LGBTQ+ couples and individuals who want to start a family</li><li>Couples with genetic conditions they don't want to pass on</li><li>Women who have experienced multiple IVF failures</li></ul><h2>The Donation Process Step by Step</h2><h3>Step 1: Application</h3><p>The process begins with a simple online application. At Lucina Egg Bank, our initial application takes just 2 minutes to complete. We'll immediately notify you of your pre-qualification status.</p><h3>Step 2: Medical Screening</h3><p>Once pre-qualified, you'll undergo comprehensive medical and psychological screenings, ensuring your health and safety throughout the donation process.</p><h3>Step 3: Ovarian Stimulation</h3><p>You'll take hormone medications to stimulate your ovaries to produce multiple eggs. Our medical team will monitor you closely throughout this phase, which typically lasts 10–12 days.</p><h3>Step 4: Egg Retrieval</h3><p>The retrieval procedure takes just 15–20 minutes under light sedation. It's minimally invasive and performed using ultrasound guidance.</p><h3>Step 5: Recovery and Compensation</h3><p>Most donors recover within 1–2 days. You'll receive your compensation directly on-site following the retrieval procedure.</p><h2>Compensation and Benefits</h2><p>Egg donors at Lucina Egg Bank can earn $8,000 to $15,000 per donation cycle. Highly qualified donors may earn up to $50,000 per cycle. Additionally, 100% of medical expenses and travel costs are covered — no hidden fees.</p><h2>Safety and Health Considerations</h2><p>Your health is our top priority. All procedures are FDA-regulated and performed by our experienced medical team. Egg donation does not deplete your egg supply or affect your future fertility.</p>`
  },
  'navigating-fertility-challenges-guide-intended-parents': {
    title:'Navigating Fertility Challenges: A Guide for Intended Parents',
    image:'https://images.unsplash.com/photo-1519627305757-9f7b9dfe1524?w=1200',
    category:'Intended Parents', author:'Dr. David Harari', readTime:10,
    publishedAt:'2024-02-20T00:00:00Z',
    content:`<h2>Understanding Fertility Challenges</h2><p>Fertility challenges affect millions of people worldwide. If you've been trying to conceive without success, you're not alone. Approximately 1 in 6 couples experiences infertility, and many go on to build their families through assisted reproductive technologies.</p><h2>Common Causes of Female Infertility</h2><ul><li><strong>Advanced Maternal Age:</strong> Egg quality and quantity naturally decline with age, particularly after 35.</li><li><strong>Premature Ovarian Failure (POF):</strong> When the ovaries stop functioning normally before age 40.</li><li><strong>Diminished Ovarian Reserve (DOR):</strong> Fewer eggs available than expected for a woman's age.</li><li><strong>Genetic Conditions:</strong> Some hereditary conditions may make egg donation preferable.</li><li><strong>Cancer Treatment:</strong> Chemotherapy and radiation can damage ovarian tissue.</li></ul><h2>When to Consider Egg Donation</h2><p>Your reproductive endocrinologist may recommend egg donation if multiple IVF cycles have failed, your egg quality is poor, you've been diagnosed with premature menopause, or you carry a genetic condition you don't want to pass on.</p><h2>The Emotional Journey</h2><p>Coming to terms with using donor eggs can be emotionally challenging. However, research consistently shows that intended parents form deep, loving bonds with children born through egg donation. As one Lucina parent shared: "My daughter couldn't have been more 'mine' if she were conceived with my own egg. All doubts disappeared the moment she was born."</p><h2>Choosing the Right Egg Bank</h2><p>When selecting an egg bank, look for a large diverse donor pool, high success rates, transparent pricing, ongoing support, and innovative matching tools. Lucina Egg Bank offers all of these — plus a 92.2% frozen egg survival rate and 61.5% clinical pregnancy success rate.</p><h2>Taking the Next Step</h2><p>If you're ready to explore egg donation, create a free account and browse our donor gallery. Our compassionate team is here to answer your questions every step of the way.</p>`
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getBlog(slug);
        setBlog(res.data);
      } catch {
        if (STATIC[slug]) setBlog({ ...STATIC[slug], slug });
        else setNotFound(true);
      } finally { setLoading(false); }
    };
    fetch();
  }, [slug]);

  if (loading) return (
    <div className="text-center py-[120px]">
      <div className="spinner mx-auto"/>
    </div>
  );

  if (notFound) return (
    <div className="text-center py-[120px] px-6">
      <div className="text-[72px] mb-5">📄</div>
      <h2 className="mb-3">Article Not Found</h2>
      <p className="text-[#6B7280] mb-6">This article doesn't exist or has been moved.</p>
      <Link to="/blog" className="btn btn-pink">Back to Blog</Link>
    </div>
  );

  return (
    <>
      {/* Blog Hero */}
      <section
        className="py-[90px] pb-[60px] bg-cover bg-center"
        style={{
          backgroundImage: blog.image
            ? `linear-gradient(to bottom,rgba(45,19,83,0.65) 0%,rgba(45,19,83,0.85) 100%),url(${blog.image})`
            : '#2D1353',
        }}
      >
        <div className="container">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-white/65 text-[14px] mb-7 transition-colors duration-200 no-underline hover:text-white"
          >
            <ArrowLeft size={15}/> Back to Blog
          </Link>
          <div className="mb-4">
            <span className="bg-[rgba(232,97,154,0.3)] text-[#F093B4] px-3.5 py-1 rounded-full text-[12px] font-bold border border-[rgba(232,97,154,0.4)]">
              {blog.category}
            </span>
          </div>
          <h1 className="text-white max-w-[820px] text-[clamp(26px,4vw,46px)] mb-6 leading-[1.15]">
            {blog.title}
          </h1>
          <div className="flex gap-6 flex-wrap">
            {[
              { icon:<User size={14}/>,     text: blog.author },
              { icon:<Calendar size={14}/>, text: new Date(blog.publishedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}) },
              { icon:<Clock size={14}/>,    text: `${blog.readTime} min read` },
            ].map((m,i)=>(
              <span key={i} className="flex items-center gap-1.5 text-[14px] text-white/70">
                {m.icon}{m.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-14 items-start blog-content-grid" style={{ gridTemplateColumns:'1fr 300px' }}>
            {/* Article */}
            <article className="blog-article" dangerouslySetInnerHTML={{__html: blog.content}}/>

            {/* Sidebar */}
            <aside>
              {/* CTA Card */}
              <div className="bg-[#FBF3FB] rounded-[20px] p-7 px-6 border border-[#EDD8F5] mb-6">
                <h4 className="font-serif text-[20px] mb-3 text-[#1A1A2E]">Ready to Begin?</h4>
                <p className="text-[13px] text-[#6B7280] leading-[1.6] mb-[18px]">Whether you're looking to find a donor or become one, Lucina is here to help.</p>
                <Link to="/find-an-egg-donor"   className="btn btn-pink btn-sm w-full justify-center mb-2">Find a Donor</Link>
                <Link to="/become-an-egg-donor" className="btn btn-outline-purple btn-sm w-full justify-center">Become an Egg Donor</Link>
              </div>

              {/* Quick Facts */}
              <div className="bg-white rounded-[20px] p-6 border border-[#EDD8F5] mb-6">
                <h4 className="font-serif text-[18px] mb-4 text-[#1A1A2E] pb-3 border-b-2 border-[#F3EEF8]">Quick Facts</h4>
                {[
                  { label:'Egg Survival Rate', value:'92.2%' },
                  { label:'Pregnancy Rate',    value:'61.5%' },
                  { label:'Available Donors',  value:'3,500+' },
                  { label:'Years of Excellence',value:'30+' },
                ].map(s=>(
                  <div key={s.label} className="flex justify-between text-[13px] border-b border-[#F3EEF8] pb-2.5 mb-2.5">
                    <span className="text-[#6B7280]">{s.label}</span>
                    <span className="font-bold text-[#7B3FA0]">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Recent Articles */}
              <div className="bg-white rounded-[20px] p-6 border border-[#EDD8F5]">
                <h4 className="font-serif text-[18px] mb-4 text-[#1A1A2E] pb-3 border-b-2 border-[#F3EEF8]">Recent Articles</h4>
                {Object.entries(STATIC).map(([s,b])=>(
                  <Link
                    key={s}
                    to={`/blog/${s}`}
                    className="block mb-3 text-[13px] text-[#4A4A5A] leading-relaxed transition-colors duration-200 no-underline hover:text-[#7B3FA0]"
                  >
                    → {b.title}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .blog-article { font-size:16px; line-height:1.8; color:#4A4A5A; }
        .blog-article h2 { font-family:'Cormorant Garamond',serif; font-size:28px; color:#1A1A2E; margin:36px 0 14px; padding-bottom:8px; border-bottom:2px solid #F3EEF8; }
        .blog-article h3 { font-family:'Cormorant Garamond',serif; font-size:22px; color:#1A1A2E; margin:26px 0 10px; }
        .blog-article p  { margin-bottom:18px; }
        .blog-article ul, .blog-article ol { margin:14px 0 22px 24px; display:flex; flex-direction:column; gap:8px; }
        .blog-article ul { list-style:disc; }
        .blog-article ol { list-style:decimal; }
        .blog-article li { line-height:1.65; }
        .blog-article strong { color:#1A1A2E; font-weight:600; }
        @media(max-width:1024px) { .blog-content-grid { grid-template-columns:1fr!important; } }
      `}</style>
    </>
  );
};

export default BlogPost;
