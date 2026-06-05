'use client';

import Link from 'next/link';
import { GraduationCap, Play } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== '/') {
    return null;
  }

  return (
    <footer className="bg-[#f4f5f6] text-[#666666] mt-auto border-t border-gray-200 text-[13px]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-8">
          
          {/* Top Categories */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[15px]">Top Categories</h4>
            <ul className="space-y-3">
              <li><Link href="/colleges?type=IIT" className="hover:text-indigo-600 transition-colors">Top IITs</Link></li>
              <li><Link href="/colleges?type=NIT" className="hover:text-indigo-600 transition-colors">Top NITs</Link></li>
              <li><Link href="/colleges?type=IIIT" className="hover:text-indigo-600 transition-colors">Top IIITs</Link></li>
              <li><Link href="/colleges?type=Private" className="hover:text-indigo-600 transition-colors">Private Universities</Link></li>
              <li><Link href="/colleges?type=State" className="hover:text-indigo-600 transition-colors">State Universities</Link></li>
              <li><Link href="/colleges?type=Deemed" className="hover:text-indigo-600 transition-colors">Deemed Universities</Link></li>
              <li><Link href="/colleges" className="hover:text-indigo-600 transition-colors font-medium text-indigo-500">View All Colleges →</Link></li>
            </ul>
          </div>

          {/* Top Courses */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[15px]">Top Courses</h4>
            <ul className="space-y-3">
              <li><Link href="/colleges?course=BTech" className="hover:text-indigo-600 transition-colors">B.Tech / B.E</Link></li>
              <li><Link href="/colleges?course=MBA" className="hover:text-indigo-600 transition-colors">M.B.A</Link></li>
              <li><Link href="/colleges?course=MTech" className="hover:text-indigo-600 transition-colors">M.Tech</Link></li>
              <li><Link href="/colleges?course=BCA" className="hover:text-indigo-600 transition-colors">BCA</Link></li>
              <li><Link href="/colleges?course=MCA" className="hover:text-indigo-600 transition-colors">MCA</Link></li>
              <li><Link href="/colleges?course=BBA" className="hover:text-indigo-600 transition-colors">BBA</Link></li>
              <li><Link href="/colleges?course=BSc" className="hover:text-indigo-600 transition-colors">B.Sc / M.Sc</Link></li>
            </ul>
          </div>

          {/* Top Exams */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[15px]">Top Exams</h4>
            <ul className="space-y-3">
              <li><a href="https://jeemain.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">JEE Main</a></li>
              <li><a href="https://jeeadv.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">JEE Advanced</a></li>
              <li><a href="https://gate2024.iisc.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">GATE</a></li>
              <li><a href="https://iimcat.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">CAT</a></li>
              <li><a href="https://www.bitsadmission.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">BITSAT</a></li>
              <li><a href="https://neet.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">NEET</a></li>
              <li><a href="https://cuet.samarth.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">CUET UG</a></li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[15px]">Platform Features</h4>
            <ul className="space-y-3">
              <li><Link href="/predict" className="hover:text-indigo-600 transition-colors">College Predictor</Link></li>
              <li><Link href="/compare" className="hover:text-indigo-600 transition-colors">Compare Colleges</Link></li>
              <li><Link href="/analytics" className="hover:text-indigo-600 transition-colors">Placement Analytics</Link></li>
              <li><Link href="/scholarships" className="hover:text-indigo-600 transition-colors">Scholarship Finder</Link></li>
              <li><Link href="/colleges/search" className="hover:text-indigo-600 transition-colors">Advanced Search</Link></li>
            </ul>
          </div>

          {/* Resources Hub */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[15px]">Resources Hub</h4>
            <ul className="space-y-3">
              <li><Link href="/resources?tab=reviews" className="hover:text-indigo-600 transition-colors">Student Reviews</Link></li>
              <li><Link href="/resources?tab=cutoffs" className="hover:text-indigo-600 transition-colors">Cutoff Trends</Link></li>
              <li><Link href="/resources?tab=fees" className="hover:text-indigo-600 transition-colors">Fee Structures</Link></li>
              <li><Link href="/resources?tab=qa" className="hover:text-indigo-600 transition-colors">Q&A Forum</Link></li>
              <li><Link href="/resources?tab=admissions" className="hover:text-indigo-600 transition-colors">Admission Process</Link></li>
            </ul>
          </div>

          {/* Counselling & Prep */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5 text-[15px]">Counselling & Prep</h4>
            <ul className="space-y-3">
              <li><a href="https://josaa.nic.in/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">JoSAA Counselling</a></li>
              <li><a href="https://csab.nic.in/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">CSAB Special Rounds</a></li>
              <li><a href="https://byjus.com/jee/jee-main-study-material/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Exam Prep Guides</a></li>
              <li><a href="https://timesofindia.indiatimes.com/education" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Education News</a></li>
              <li><a href="https://unacademy.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Expert Webinars</a></li>
              <li><a href="https://testbook.com/jee-main" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Free Mock Tests</a></li>
            </ul>
          </div>

        </div>

        {/* Back to top button */}
        <div className="absolute right-4 top-[-20px] bg-white border border-gray-200 rounded-sm shadow-sm p-2 cursor-pointer hover:bg-gray-50 text-gray-500" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </div>


      </div>
    </footer>
  );
}
