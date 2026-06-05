import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  console.log('Seeding database with PostgreSQL realistic data...');

  await prisma.college.deleteMany(); // Clear existing
  await prisma.admissionCutoff.deleteMany();
  await prisma.course.deleteMany();
  await prisma.review.deleteMany();

  const collegesData = [
    {
      name: "IIT Madras - Indian Institute of Technology",
      slug: "iit-madras",
      type: "IIT",
      established: 1959,
      location: "Chennai, Tamil Nadu",
      city: "Chennai",
      state: "Tamil Nadu",
      rating: 4.8,
      ranking: 1,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png",
      description: "Indian Institute of Technology Madras is a public technical university located in Chennai, Tamil Nadu, India. It is recognized as an Institute of National Importance.",
      feesMin: 850000,
      feesMax: 1000000,
      avgPackage: 21.48,
      highestPackage: 198.0,
      placementRate: 92.5,
      topRecruiters: ["Microsoft", "Google", "Amazon", "Goldman Sachs"],
      acceptedExams: ["JEE Advanced", "GATE", "JAM"],
    },
    {
      name: "IIT Bombay - Indian Institute of Technology",
      slug: "iit-bombay",
      type: "IIT",
      established: 1958,
      location: "Mumbai, Maharashtra",
      city: "Mumbai",
      state: "Maharashtra",
      rating: 4.9,
      ranking: 3,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png",
      description: "IIT Bombay is recognized worldwide as a leader in the field of engineering education and research.",
      feesMin: 900000,
      feesMax: 1200000,
      avgPackage: 23.5,
      highestPackage: 367.0,
      placementRate: 95.0,
      topRecruiters: ["Apple", "Google", "Optiver", "Rubrik"],
      acceptedExams: ["JEE Advanced", "GATE", "CEED"],
    },
    {
      name: "IIT Delhi - Indian Institute of Technology",
      slug: "iit-delhi",
      type: "IIT",
      established: 1961,
      location: "New Delhi, Delhi",
      city: "New Delhi",
      state: "Delhi",
      rating: 4.7,
      ranking: 2,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/1200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png",
      description: "IIT Delhi is one of the 23 IITs created to be Centres of Excellence for training, research and development in science, engineering and technology in India.",
      feesMin: 850000,
      feesMax: 1100000,
      avgPackage: 20.0,
      highestPackage: 200.0,
      placementRate: 91.0,
      topRecruiters: ["Microsoft", "Bain & Co", "McKinsey", "Jane Street"],
      acceptedExams: ["JEE Advanced", "GATE", "CAT"],
    },
    {
      name: "IIT Kanpur - Indian Institute of Technology",
      slug: "iit-kanpur",
      type: "IIT",
      established: 1959,
      location: "Kanpur, Uttar Pradesh",
      city: "Kanpur",
      state: "Uttar Pradesh",
      rating: 4.7,
      ranking: 4,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/IIT_Kanpur_Logo.svg/1200px-IIT_Kanpur_Logo.svg.png",
      description: "Established in 1959, IIT Kanpur was one of the first Indian Institutes of Technology to be established.",
      feesMin: 800000,
      feesMax: 1000000,
      avgPackage: 19.5,
      highestPackage: 190.0,
      placementRate: 90.0,
      topRecruiters: ["Tower Research", "Gleaned", "Google", "Microsoft"],
      acceptedExams: ["JEE Advanced", "GATE"],
    },
    {
      name: "IIT Kharagpur - Indian Institute of Technology",
      slug: "iit-kharagpur",
      type: "IIT",
      established: 1951,
      location: "Kharagpur, West Bengal",
      city: "Kharagpur",
      state: "West Bengal",
      rating: 4.6,
      ranking: 6,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/1200px-IIT_Kharagpur_Logo.svg.png",
      description: "IIT Kharagpur is the first IIT to be established and is recognized as an Institute of National Importance.",
      feesMin: 850000,
      feesMax: 1050000,
      avgPackage: 18.0,
      highestPackage: 240.0,
      placementRate: 88.0,
      topRecruiters: ["Barclays", "Google", "JP Morgan", "Amazon"],
      acceptedExams: ["JEE Advanced", "GATE"],
    },
    {
      name: "NIT Trichy - National Institute of Technology",
      slug: "nit-trichy",
      type: "NIT",
      established: 1964,
      location: "Tiruchirappalli, Tamil Nadu",
      city: "Tiruchirappalli",
      state: "Tamil Nadu",
      rating: 4.5,
      ranking: 9,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/National_Institute_of_Technology_Tiruchirappalli_Logo.png/220px-National_Institute_of_Technology_Tiruchirappalli_Logo.png",
      description: "NIT Trichy is a public technical and research university near the city of Tiruchirappalli in Tamil Nadu, India.",
      feesMin: 600000,
      feesMax: 700000,
      avgPackage: 12.5,
      highestPackage: 52.0,
      placementRate: 85.0,
      topRecruiters: ["Amazon", "Oracle", "Cisco", "Morgan Stanley"],
      acceptedExams: ["JEE Main", "GATE"],
    },
    {
      name: "NIT Surathkal - National Institute of Technology Karnataka",
      slug: "nit-surathkal",
      type: "NIT",
      established: 1960,
      location: "Mangalore, Karnataka",
      city: "Mangalore",
      state: "Karnataka",
      rating: 4.4,
      ranking: 12,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/National_Institute_of_Technology%2C_Karnataka_Logo.png/220px-National_Institute_of_Technology%2C_Karnataka_Logo.png",
      description: "NITK Surathkal is a public technical university at Surathkal, Mangalore.",
      feesMin: 600000,
      feesMax: 700000,
      avgPackage: 13.0,
      highestPackage: 54.0,
      placementRate: 86.0,
      topRecruiters: ["Microsoft", "Adobe", "Qualcomm", "Texas Instruments"],
      acceptedExams: ["JEE Main", "GATE"],
    },
    {
      name: "BITS Pilani",
      slug: "bits-pilani",
      type: "Private",
      established: 1964,
      location: "Pilani, Rajasthan",
      city: "Pilani",
      state: "Rajasthan",
      rating: 4.7,
      ranking: 20,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png",
      description: "Birla Institute of Technology & Science, Pilani is a private deemed university in Pilani, India.",
      feesMin: 2200000,
      feesMax: 2600000,
      avgPackage: 19.0,
      highestPackage: 60.0,
      placementRate: 90.0,
      topRecruiters: ["Uber", "Nutanix", "Google", "Amazon"],
      acceptedExams: ["BITSAT"],
    },
    {
      name: "VIT Vellore - Vellore Institute of Technology",
      slug: "vit-vellore",
      type: "Private",
      established: 1984,
      location: "Vellore, Tamil Nadu",
      city: "Vellore",
      state: "Tamil Nadu",
      rating: 4.2,
      ranking: 11,
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1200px-Vellore_Institute_of_Technology_seal_2017.svg.png",
      description: "VIT is a private deemed university located in Vellore, India.",
      feesMin: 1200000,
      feesMax: 2000000,
      avgPackage: 9.0,
      highestPackage: 102.0,
      placementRate: 80.0,
      topRecruiters: ["TCS", "Cognizant", "Wipro", "Intel"],
      acceptedExams: ["VITEEE", "JEE Main"],
    },
    {
      name: "SRM Institute of Science and Technology",
      slug: "srm-institute",
      type: "Private",
      established: 1985,
      location: "Chennai, Tamil Nadu",
      city: "Chennai",
      state: "Tamil Nadu",
      rating: 4.0,
      ranking: 18,
      logo: "https://upload.wikimedia.org/wikipedia/en/f/f5/SRM_University_logo.png",
      description: "SRM Institute of Science and Technology, is a private deemed university located in Kattankulathur, Tamil Nadu.",
      feesMin: 1000000,
      feesMax: 1800000,
      avgPackage: 7.5,
      highestPackage: 50.0,
      placementRate: 75.0,
      topRecruiters: ["Cognizant", "Infosys", "TCS", "Wipro"],
      acceptedExams: ["SRMJEEE", "JEE Main"],
    }
  ];

  // Generate 300 additional dummy colleges
  for (let i = 11; i <= 310; i++) {
    const states = ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Telangana", "Gujarat", "Uttar Pradesh"];
    const state = states[i % states.length];
    const types = ["Private", "State University", "NIT", "IIIT"];
    const type = types[i % types.length];
    const city = `${state} City ${i % 5}`;
    
    collegesData.push({
      name: `${type} Institute of Technology and Science ${i}`,
      slug: `institute-technology-science-${i}`,
      type: type,
      established: 1950 + (i % 70),
      location: `${city}, ${state}`,
      city: city,
      state: state,
      rating: 3.5 + (i % 15) / 10, // Ratings from 3.5 to 4.9
      ranking: 20 + i,
      logo: `https://ui-avatars.com/api/?name=${type}+Institute&background=random&color=fff&size=200`,
      description: `A premier ${type} institution located in ${state}, providing quality education in engineering and technology.`,
      feesMin: 400000 + (i * 10000),
      feesMax: 600000 + (i * 15000),
      avgPackage: 5.0 + (i % 10),
      highestPackage: 20.0 + (i % 30),
      placementRate: 70 + (i % 25),
      topRecruiters: ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant"],
      acceptedExams: ["JEE Main", "State CET"],
    });
  }

  let idx = 0;
  for (const college of collegesData) {
    idx++;
    
    // Base courses for all colleges
    const courseList = [
      { name: "B.Tech Computer Science", duration: "4 Years", level: "UG", fees: college.feesMin ?? 500000, seats: 120 },
      { name: "B.Tech Electronics", duration: "4 Years", level: "UG", fees: college.feesMin ?? 500000, seats: 100 },
    ];

    // Distribute other courses so each has at least 30-100 colleges
    if (idx % 2 === 0) courseList.push({ name: "M.B.A Finance", duration: "2 Years", level: "PG", fees: (college.feesMin ?? 500000) * 0.8, seats: 60 });
    if (idx % 3 === 0) courseList.push({ name: "M.Tech Data Science", duration: "2 Years", level: "PG", fees: (college.feesMin ?? 500000) * 0.9, seats: 40 });
    if (idx % 4 === 0) courseList.push({ name: "BCA", duration: "3 Years", level: "UG", fees: (college.feesMin ?? 500000) * 0.5, seats: 100 });
    if (idx % 5 === 0) courseList.push({ name: "MCA", duration: "2 Years", level: "PG", fees: (college.feesMin ?? 500000) * 0.6, seats: 60 });
    if (idx % 6 === 0) courseList.push({ name: "BBA", duration: "3 Years", level: "UG", fees: (college.feesMin ?? 500000) * 0.6, seats: 80 });
    if (idx % 7 === 0) courseList.push({ name: "B.Sc Computer Science", duration: "3 Years", level: "UG", fees: (college.feesMin ?? 500000) * 0.4, seats: 100 });

    const createdCollege = await prisma.college.create({
      data: {
        ...college,
        courses: {
          create: courseList,
        },
        reviews: {
          create: [
            { rating: 4.5, title: "Great Experience", content: "Excellent faculty and campus.", author: "Rahul" },
            { rating: 4.0, title: "Good Placements", content: "Top companies visit the campus.", author: "Priya" },
          ],
        },
      },
    });

    // Add dummy cutoffs
    let closingRank = 1000;
    if (college.type === "IIT") closingRank = 1500;
    if (college.type === "NIT") closingRank = 8000;
    if (college.type === "Private") closingRank = 20000;

    await prisma.admissionCutoff.createMany({
      data: [
        { collegeId: createdCollege.id, exam: college.acceptedExams[0], category: "General", course: "B.Tech CSE", year: 2023, closingRank: closingRank },
        { collegeId: createdCollege.id, exam: college.acceptedExams[0], category: "OBC", course: "B.Tech CSE", year: 2023, closingRank: closingRank * 2 },
        { collegeId: createdCollege.id, exam: college.acceptedExams[0], category: "SC", course: "B.Tech CSE", year: 2023, closingRank: closingRank * 4 },
      ]
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
