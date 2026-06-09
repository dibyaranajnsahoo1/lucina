require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Donor = require('../models/Donor');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lucina_egg_bank';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Intended Parent',
    content: 'When my husband and I decided to start a family in 2022, we were thrilled but faced many challenges. Our research led us to Lucina Egg Bank, and we were impressed by their comprehensive approach. The process was surprisingly smooth and their team was exceptional every step of the way.',
    shortContent: 'Lucina helped us build our family after years of trying. The process was smooth and their team exceptional.',
    rating: 5,
    date: 'March 2023',
    location: 'Canada',
    displayOn: ['homepage', 'both'],
    isActive: true,
    order: 1
  },
  {
    name: 'Jennifer & Tom',
    role: 'Intended Parent',
    content: 'My husband and I started trying for a baby one year after we got married. After multiple failed IUI and IVF cycles, we found Lucina. My first cycle with donor eggs was a success. Lucina Egg Bank was very accommodating and helpful. Thanks to them, our dreams of having a family have finally become a reality!',
    shortContent: 'After years of failed cycles, Lucina made our dream come true. Our daughter Isabel is our miracle.',
    rating: 5,
    date: 'June 2022',
    location: 'United States',
    displayOn: ['homepage', 'both'],
    isActive: true,
    order: 2
  },
  {
    name: 'Evelyn S.',
    role: 'Egg Donor',
    content: 'I donated two years back when I was still in college. Two of my friends had already donated, so I asked them every question I could think of before deciding to apply. The experience was everything they described — supportive, professional, and deeply rewarding.',
    shortContent: 'Donating with Lucina was one of the best decisions I ever made. So professional and supportive.',
    rating: 5,
    date: 'January 2023',
    location: 'California',
    displayOn: ['donor-page', 'both'],
    isActive: true,
    order: 1
  },
  {
    name: 'Amara A.',
    role: 'Egg Donor',
    content: 'I have donated twice with Lucina Egg Bank, and my experience both times was positive. They have a nice, welcoming, and compassionate team that prioritized my questions and safety during the donation process. I would highly recommend it to anyone considering egg donation.',
    shortContent: 'Donated twice with Lucina. Their team is compassionate, professional, and always prioritized my safety.',
    rating: 5,
    date: 'April 2023',
    location: 'Texas',
    displayOn: ['donor-page', 'both'],
    isActive: true,
    order: 2
  },
  {
    name: 'Hannah W.',
    role: 'Egg Donor',
    content: 'Lucina Egg Bank is an excellent place to donate eggs! As a first-time donor, I had a lot of questions about the process, and the team took the time to answer all of them, making me feel comfortable and confident every step of the way.',
    shortContent: 'As a first-time donor, Lucina answered all my questions and made me feel completely comfortable.',
    rating: 5,
    date: 'February 2023',
    location: 'Florida',
    displayOn: ['donor-page', 'both'],
    isActive: true,
    order: 3
  },
  {
    name: 'Charles & Emma',
    role: 'Intended Parent',
    content: 'Absolutely amazing customer service. Everything went so fast and smooth with them and now we are already waiting for our baby girl to arrive. I cannot thank them enough for making it possible for us to finally be pregnant.',
    shortContent: 'Amazing service. Everything was fast and smooth. We are now expecting our baby girl!',
    rating: 5,
    date: 'May 2022',
    location: 'United Kingdom',
    displayOn: ['homepage', 'both'],
    isActive: true,
    order: 3
  }
];

const donors = [
  {
    donorId: 'LEB-D1001',
    firstName: 'Emma',
    age: 24,
    height: { feet: 5, inches: 6 },
    weight: 130,
    eyeColor: 'Blue',
    hairColor: 'Blonde',
    racialBackground: 'White',
    ethnicOrigin: 'Irish, English',
    education: 'College completed',
    religiousAffiliation: 'Christian',
    bio: 'I am a passionate teacher who loves working with children. I enjoy hiking, reading, and cooking. I believe in giving back and am honored to help families grow.',
    hobbies: 'Hiking, Reading, Cooking, Yoga',
    availability: 'Available',
    previousDonations: 0,
    featured: true,
    isActive: true
  },
  {
    donorId: 'LEB-D1002',
    firstName: 'Sophia',
    age: 26,
    height: { feet: 5, inches: 4 },
    weight: 125,
    eyeColor: 'Brown',
    hairColor: 'Brown',
    racialBackground: 'Hispanic or Latina',
    ethnicOrigin: 'Mexican, Spanish',
    education: 'Masters completed',
    religiousAffiliation: 'Catholic',
    bio: 'Graduate student in biomedical engineering. Athletic, family-oriented, and multilingual. Passionate about science and helping others.',
    hobbies: 'Swimming, Dance, Music, Travel',
    availability: 'Available',
    previousDonations: 1,
    featured: true,
    isActive: true
  },
  {
    donorId: 'LEB-D1003',
    firstName: 'Aisha',
    age: 23,
    height: { feet: 5, inches: 7 },
    weight: 135,
    eyeColor: 'Dark Brown',
    hairColor: 'Black',
    racialBackground: 'Black or African American',
    ethnicOrigin: 'Nigerian, American',
    education: 'College completed',
    religiousAffiliation: 'Christian',
    bio: 'Nursing student dedicated to healthcare and family values. Creative, athletic, and community-oriented. Known for my warm smile and caring nature.',
    hobbies: 'Dance, Painting, Volunteering, Sports',
    availability: 'Available',
    previousDonations: 0,
    featured: true,
    isActive: true
  },
  {
    donorId: 'LEB-D1004',
    firstName: 'Mei',
    age: 25,
    height: { feet: 5, inches: 3 },
    weight: 115,
    eyeColor: 'Dark Brown',
    hairColor: 'Black',
    racialBackground: 'Chinese',
    ethnicOrigin: 'Chinese',
    education: 'College completed',
    religiousAffiliation: 'Buddhist',
    bio: 'Software engineer with a love of mathematics and problem-solving. Musically talented and deeply family-oriented. Proud to help build families.',
    hobbies: 'Piano, Coding, Hiking, Cooking',
    availability: 'Available',
    previousDonations: 2,
    featured: true,
    isActive: true
  },
  {
    donorId: 'LEB-D1005',
    firstName: 'Priya',
    age: 27,
    height: { feet: 5, inches: 5 },
    weight: 125,
    eyeColor: 'Dark Brown',
    hairColor: 'Dark Brown',
    racialBackground: 'Other Asian',
    ethnicOrigin: 'Indian',
    education: 'Masters completed',
    religiousAffiliation: 'Hindu',
    bio: 'Medical resident passionate about women\'s health. Athletic, academically driven, and compassionate. Deeply motivated by the opportunity to help families.',
    hobbies: 'Yoga, Running, Reading, Travel',
    availability: 'Available',
    previousDonations: 1,
    featured: false,
    isActive: true
  },
  {
    donorId: 'LEB-D1006',
    firstName: 'Yuki',
    age: 24,
    height: { feet: 5, inches: 2 },
    weight: 110,
    eyeColor: 'Dark Brown',
    hairColor: 'Black',
    racialBackground: 'Japanese',
    ethnicOrigin: 'Japanese',
    education: 'College in progress',
    religiousAffiliation: 'N/A',
    bio: 'Art and design student with a creative spirit. Bilingual, artistically talented, and health-conscious. Inspired to help others through donation.',
    hobbies: 'Art, Design, Photography, Tea ceremony',
    availability: 'Available',
    previousDonations: 0,
    featured: false,
    isActive: true
  },
  {
    donorId: 'LEB-D1007',
    firstName: 'Isabella',
    age: 22,
    height: { feet: 5, inches: 8 },
    weight: 140,
    eyeColor: 'Green',
    hairColor: 'Red',
    racialBackground: 'White',
    ethnicOrigin: 'Italian, Irish',
    education: 'College enrolled',
    religiousAffiliation: 'Catholic',
    bio: 'Pre-med student with a genuine desire to help others. Athletic, cheerful, and academically accomplished. Ready to make a difference.',
    hobbies: 'Soccer, Reading, Baking, Volunteering',
    availability: 'Reserved',
    previousDonations: 0,
    featured: false,
    isActive: true
  },
  {
    donorId: 'LEB-D1008',
    firstName: 'Aaliyah',
    age: 28,
    height: { feet: 5, inches: 5 },
    weight: 130,
    eyeColor: 'Hazel',
    hairColor: 'Dark Brown',
    racialBackground: 'Black or African American',
    ethnicOrigin: 'African American, Jamaican',
    education: 'College completed',
    religiousAffiliation: 'Christian',
    bio: 'Teacher and entrepreneur with a big heart. Athletic, creative, and community-focused. Motivated to help families achieve their dreams.',
    hobbies: 'Dancing, Entrepreneurship, Community Service, Fitness',
    availability: 'Available',
    previousDonations: 1,
    featured: false,
    isActive: true
  }
];

const blogs = [
  {
    title: 'Understanding the Egg Donation Process: A Complete Guide',
    slug: 'understanding-egg-donation-process-complete-guide',
    excerpt: 'Egg donation is a generous act that helps many people build their families. Learn everything you need to know about the process, from application to retrieval.',
    content: `
<h2>What is Egg Donation?</h2>
<p>Egg donation is a process where a woman (the egg donor) donates her eggs to another person or couple (the intended parents) who are unable to conceive using their own eggs. This process has helped millions of families worldwide achieve their dream of parenthood.</p>

<h2>Who Benefits from Egg Donation?</h2>
<p>Egg donation can help:</p>
<ul>
  <li>Women who have premature ovarian failure or diminished ovarian reserve</li>
  <li>Women who have undergone cancer treatment that affected their fertility</li>
  <li>LGBTQ+ couples and individuals who want to start a family</li>
  <li>Couples with genetic conditions they don't want to pass on</li>
  <li>Women who have experienced multiple IVF failures</li>
</ul>

<h2>The Donation Process Step by Step</h2>
<h3>Step 1: Application</h3>
<p>The process begins with a simple online application. At Lucina Egg Bank, our initial application takes just 2 minutes to complete. We'll immediately notify you of your pre-qualification status.</p>

<h3>Step 2: Medical Screening</h3>
<p>Once pre-qualified, you'll undergo comprehensive medical and psychological screenings. These tests ensure your health and safety throughout the donation process and verify your eligibility.</p>

<h3>Step 3: Ovarian Stimulation</h3>
<p>You'll take hormone medications to stimulate your ovaries to produce multiple eggs. Our medical team will monitor you closely throughout this phase, which typically lasts 10-12 days.</p>

<h3>Step 4: Egg Retrieval</h3>
<p>The retrieval procedure takes just 15-20 minutes under light sedation. It's a minimally invasive procedure performed vaginally using ultrasound guidance.</p>

<h3>Step 5: Recovery and Compensation</h3>
<p>Most donors recover within 1-2 days. You'll receive your compensation directly on-site following the retrieval procedure.</p>

<h2>Compensation and Benefits</h2>
<p>Egg donors at Lucina Egg Bank can earn $8,000 to $15,000 per donation cycle. Highly qualified donors may earn up to $50,000 per cycle. Additionally:</p>
<ul>
  <li>100% of medical expenses are covered</li>
  <li>All travel costs to our San Diego clinic are fully paid</li>
  <li>There are no hidden fees or out-of-pocket expenses</li>
  <li>You can earn $1,000 for each friend you refer who successfully donates</li>
</ul>

<h2>Safety and Health Considerations</h2>
<p>Your health is our top priority. All procedures are FDA-regulated and performed by our experienced medical team. Egg donation does not deplete your egg supply or affect your future fertility. The eggs donated are those your body would naturally discard during your cycle.</p>

<h2>Is Egg Donation Right for You?</h2>
<p>You may be a good candidate if you:</p>
<ul>
  <li>Are between 19 and 31 years old</li>
  <li>Maintain a healthy lifestyle</li>
  <li>Have no major hereditary health conditions</li>
  <li>Are committed to completing the process</li>
</ul>

<p>Ready to make a difference? Apply today and start your egg donation journey with Lucina Egg Bank.</p>
    `,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
    category: 'Egg Donation',
    author: 'Lucina Medical Team',
    tags: ['egg donation', 'IVF', 'fertility', 'donors', 'process'],
    isPublished: true,
    publishedAt: new Date('2024-01-15'),
    readTime: 8
  },
  {
    title: 'Navigating Fertility Challenges: A Guide for Intended Parents',
    slug: 'navigating-fertility-challenges-guide-intended-parents',
    excerpt: 'Facing fertility challenges can be overwhelming. This comprehensive guide helps intended parents understand their options, including egg donation with Lucina Egg Bank.',
    content: `
<h2>Understanding Fertility Challenges</h2>
<p>Fertility challenges affect millions of people worldwide. If you've been trying to conceive without success, you're not alone. Approximately 1 in 6 couples experiences infertility, and many go on to build their families through various assisted reproductive technologies.</p>

<h2>Common Causes of Female Infertility</h2>
<p>Several factors can affect a woman's ability to conceive using her own eggs:</p>
<ul>
  <li><strong>Advanced Maternal Age:</strong> Egg quality and quantity naturally decline with age, particularly after 35.</li>
  <li><strong>Premature Ovarian Failure (POF):</strong> When the ovaries stop functioning normally before age 40.</li>
  <li><strong>Diminished Ovarian Reserve (DOR):</strong> Fewer eggs available than expected for a woman's age.</li>
  <li><strong>Genetic Conditions:</strong> Some hereditary conditions may make egg donation preferable.</li>
  <li><strong>Cancer Treatment:</strong> Chemotherapy and radiation can damage ovarian tissue.</li>
</ul>

<h2>When to Consider Egg Donation</h2>
<p>Your reproductive endocrinologist may recommend egg donation if:</p>
<ul>
  <li>Multiple IVF cycles have failed</li>
  <li>Your egg quality is poor</li>
  <li>You've been diagnosed with premature menopause</li>
  <li>You carry a genetic condition you don't want to pass on</li>
  <li>You're a single father or gay male couple</li>
</ul>

<h2>The Emotional Journey</h2>
<p>Coming to terms with the decision to use donor eggs can be emotionally challenging. Many people initially feel resistant, worried that the child won't truly be "theirs." However, research consistently shows that intended parents form deep, loving bonds with children born through egg donation.</p>

<p>As one Lucina parent shared: "The most amazing part is my daughter. She couldn't have been more 'mine' if she were conceived with my own egg. All doubts disappeared immediately she was born."</p>

<h2>Choosing the Right Egg Bank</h2>
<p>When selecting an egg bank, consider:</p>
<ul>
  <li><strong>Donor Pool:</strong> Look for a large, diverse selection of thoroughly screened donors.</li>
  <li><strong>Success Rates:</strong> Ask about frozen egg survival rates and clinical pregnancy rates.</li>
  <li><strong>Transparency:</strong> Ensure pricing is clear with no hidden fees.</li>
  <li><strong>Support:</strong> A good egg bank provides emotional and practical support throughout the process.</li>
  <li><strong>Technology:</strong> Innovative matching tools can help you find the right donor.</li>
</ul>

<h2>The Lucina Advantage</h2>
<p>Lucina Egg Bank offers:</p>
<ul>
  <li>3,500+ diverse, screened donors available immediately</li>
  <li>92.2% frozen egg survival rate (2022)</li>
  <li>61.5% clinical pregnancy success rate (2022)</li>
  <li>ReflEggction® AI for donor matching</li>
  <li>Blastocyst, PGT-A, and Live Birth Guarantee Programs</li>
  <li>Zero upfront costs — browse freely and pay only when ready</li>
</ul>

<h2>Financial Considerations</h2>
<p>Egg donation IVF cycles can represent a significant investment. Lucina offers flexible financing options, including 0% interest plans and meaningful discounts to make parenthood accessible for more families. Our transparent pricing ensures no surprises along the way.</p>

<h2>Taking the Next Step</h2>
<p>If you're ready to explore egg donation, we invite you to create a free account and browse our donor gallery. Our compassionate team is here to answer your questions and guide you through every step of this profound journey.</p>
    `,
    image: 'https://images.unsplash.com/photo-1519627305757-9f7b9dfe1524?w=800',
    category: 'Intended Parents',
    author: 'Dr. David Harari',
    tags: ['fertility', 'intended parents', 'IVF', 'egg donation', 'family building'],
    isPublished: true,
    publishedAt: new Date('2024-02-20'),
    readTime: 10
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Create admin
    const adminExists = await Admin.findOne({ email: 'admin@lucinaeggbank.com' });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        email: 'admin@lucinaeggbank.com',
        password: 'Admin@123',
        role: 'superadmin'
      });
      console.log('✅ Admin created: admin@lucinaeggbank.com / Admin@123');
    } else {
      console.log('ℹ️ Admin already exists');
    }

    // Seed testimonials
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonials);
    console.log(`✅ ${testimonials.length} testimonials seeded`);

    // Seed donors
    await Donor.deleteMany({});
    await Donor.insertMany(donors);
    console.log(`✅ ${donors.length} donors seeded`);

    // Seed blogs
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
    console.log(`✅ ${blogs.length} blogs seeded`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('Admin Login: admin@lucinaeggbank.com / Admin@123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
