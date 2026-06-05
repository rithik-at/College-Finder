import prisma from '@/lib/prisma';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureCards } from '@/components/home/FeatureCards';

export const dynamic = 'force-dynamic'; // Ensure we get live stats from DB

export default async function Home() {
  // Fetch stats from PostgreSQL database safely
  let totalColleges = 0;
  let totalReviews = 0;
  let totalPredictions = 0;

  try {
    const [colleges, reviews, predictions] = await Promise.all([
      prisma.college.count(),
      prisma.review.count(),
      prisma.predictorHistory.count(),
    ]);
    totalColleges = colleges;
    totalReviews = reviews;
    totalPredictions = predictions;
  } catch (error) {
    console.error("Database connection failed, using fallback stats:", error);
    // Fallbacks if DB is not connected
    totalColleges = 50;
    totalReviews = 5000;
    totalPredictions = 10000;
  }

  return (
    <div className="flex flex-col w-full flex-1 bg-white">
      <HeroSection 
        totalColleges={totalColleges}
        totalReviews={totalReviews}
        totalPredictions={totalPredictions}
      />
      {/* Empty gap after hero section (half size) */}
      <div className="h-12 sm:h-16 w-full bg-white relative z-30"></div>
      
      <div className="w-full relative z-20">
        <FeatureCards />
      </div>
      {/* Empty gap before footer properly separates the gray backgrounds */}
      <div className="h-24 sm:h-32 w-full bg-white relative z-30"></div>
    </div>
  );
}
