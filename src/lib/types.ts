export interface CollegeListItem {
  id: number;
  name: string;
  slug: string;
  type: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  ranking: number | null;
  logo: string | null;
  feesMin: number | null;
  feesMax: number | null;
  avgPackage: number | null;
  placementRate: number | null;
  acceptedExams: string[];
}

export interface CollegeDetail {
  id: number;
  name: string;
  slug: string;
  type: string;
  established: number | null;
  location: string;
  city: string;
  state: string;
  rating: number;
  ranking: number | null;
  logo: string | null;
  image: string | null;
  description: string | null;
  website: string | null;
  feesMin: number | null;
  feesMax: number | null;
  avgPackage: number | null;
  highestPackage: number | null;
  medianPackage: number | null;
  placementRate: number | null;
  topRecruiters: string[];
  acceptedExams: string[];
  courses: CourseItem[];
  reviews: ReviewItem[];
  cutoffs: CutoffItem[];
  _count: {
    reviews: number;
  };
}

export interface CourseItem {
  id: number;
  name: string;
  duration: string;
  level: string;
  fees: number;
  seats: number | null;
}

export interface ReviewItem {
  id: number;
  rating: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CutoffItem {
  id: number;
  exam: string;
  year: number;
  category: string;
  course: string;
  closingRank: number;
  openingRank: number | null;
}

export interface CollegeSearchParams {
  q?: string;
  type?: string;
  state?: string;
  feesMin?: string;
  feesMax?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

export interface PredictorInput {
  exam: string;
  rank: number;
  category: string;
}

export interface PredictorResult {
  college: CollegeListItem;
  matchedCutoffs: CutoffItem[];
  confidence: 'Safe' | 'Moderate' | 'Reach';
}

export interface CompareCollege extends CollegeDetail {}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
