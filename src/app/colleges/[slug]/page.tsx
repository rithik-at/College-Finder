'use client';

import { useState, useEffect, use } from 'react';
import { CollegeDetail } from '@/lib/types';
import { formatCurrency, formatLPA, getTypeColor, getRatingColor, cn } from '@/lib/utils';
import Link from 'next/link';
import { CollegeQA } from '@/components/college/CollegeQA';
import { MapPin, Globe, ExternalLink, GraduationCap, CheckCircle2, TrendingUp, Users, Building, Building2, BookOpen, Briefcase, Star } from 'lucide-react';

const TABS = ['Overview', 'Courses', 'Placements', 'Reviews'];

export default function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${slug}`);
        if (!res.ok) throw new Error('College not found');
        const data = await res.json();
        setCollege(data);
      } catch {
        setError('College not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col">
        <div className="bg-[#1e3a5f] pt-12 pb-32 px-4 sm:px-6 h-[400px]">
          <div className="max-w-6xl mx-auto flex items-start gap-8">
            <div className="w-32 h-32 rounded-2xl bg-white/10 animate-pulse" />
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-white/10 rounded w-2/3 animate-pulse" />
              <div className="h-6 bg-white/10 rounded w-1/3 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl max-w-md">
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">College Not Found</h2>
          <p className="text-gray-500 mb-6">The institution you are looking for doesn't exist or has been removed.</p>
          <Link href="/colleges" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
            Browse All Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Hero Section */}
      <div className="bg-[#1e3a5f] pt-12 pb-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[120px] opacity-20 -mr-40 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Logo */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-2 shadow-2xl flex items-center justify-center flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <span className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] bg-clip-text text-transparent">
              {college.name.charAt(0)}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className={cn('text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white border backdrop-blur-md shadow-sm',
                college.type === 'Private' ? 'bg-purple-500/30 border-purple-400/40' :
                  college.type === 'Government' ? 'bg-emerald-500/30 border-emerald-400/40' :
                    'bg-blue-500/30 border-blue-400/40'
              )}>
                {college.type}
              </span>
              {college.ranking && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/90 border border-amber-400 text-white shadow-sm flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> Rank #{college.ranking}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              {college.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-sm text-blue-100/90 font-medium">
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10 shadow-sm">
                <MapPin className="w-4 h-4 opacity-70" />
                {college.location}
              </span>
              {college.established && (
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10 shadow-sm">
                  <Building className="w-4 h-4 opacity-70" />
                  Est. {college.established}
                </span>
              )}
              {college.website && (
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10 shadow-sm hover:bg-white/20 hover:text-white transition-all cursor-pointer">
                  <Globe className="w-4 h-4 opacity-70" />
                  Website <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                </a>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/10 shadow-sm">
                <span className={cn('text-sm font-bold px-3 py-1.5 rounded-lg text-white shadow-sm flex items-center',
                  college.rating >= 4.5 ? 'bg-emerald-500' :
                    college.rating >= 4.0 ? 'bg-blue-500' :
                      'bg-amber-500'
                )}>
                  <Star className="w-4 h-4 mr-1 fill-current" /> {college.rating.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-white px-4 flex items-center">
                  <Users className="w-4 h-4 mr-1.5 opacity-70" />
                  {college._count.reviews} Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Stats Container */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 -mt-16 relative z-20 mb-8">
        <div className="bg-white rounded-none shadow-xl border border-gray-100 p-2 sm:p-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50/80 hover:bg-gray-50 rounded-none p-5 sm:p-6 transition-all border border-transparent hover:border-gray-200 group">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Annual Fees</p>
              <p className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {college.feesMin ? formatCurrency(college.feesMin) : 'N/A'}
                {college.feesMax && college.feesMin !== college.feesMax ? <span className="text-sm text-gray-500 font-bold ml-1">- {formatCurrency(college.feesMax)}</span> : ''}
              </p>
            </div>
            <div className="bg-emerald-50/50 hover:bg-emerald-50 rounded-none p-5 sm:p-6 transition-all border border-transparent hover:border-emerald-200 group">
              <p className="text-xs font-bold text-emerald-600/70 uppercase tracking-wider mb-2">Avg Package</p>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 group-hover:text-emerald-800 transition-colors">{college.avgPackage ? formatLPA(college.avgPackage) : 'N/A'}</p>
            </div>
            <div className="bg-blue-50/50 hover:bg-blue-50 rounded-none p-5 sm:p-6 transition-all border border-transparent hover:border-blue-200 group">
              <p className="text-xs font-bold text-blue-600/70 uppercase tracking-wider mb-2">Highest Package</p>
              <p className="text-xl sm:text-2xl font-extrabold text-blue-700 group-hover:text-blue-800 transition-colors">{college.highestPackage ? formatLPA(college.highestPackage) : 'N/A'}</p>
            </div>
            <div className="bg-amber-50/50 hover:bg-amber-50 rounded-none p-5 sm:p-6 transition-all border border-transparent hover:border-amber-200 group">
              <p className="text-xs font-bold text-amber-600/70 uppercase tracking-wider mb-2">Placement Rate</p>
              <p className="text-xl sm:text-2xl font-extrabold text-amber-700 group-hover:text-amber-800 transition-colors">{college.placementRate ? `${college.placementRate}%` : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tabs */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-start gap-5 sm:gap-8">
            {TABS.map((tab) => {
              const Icon = tab === 'Overview' ? Building2 : tab === 'Courses' ? BookOpen : tab === 'Placements' ? Briefcase : Star;
              
              const isActive = activeTab === tab;
              let tabClasses = '';
              let iconClasses = '';

              if (isActive) {
                if (tab === 'Overview') tabClasses = 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-transparent shadow-md shadow-indigo-200/50 scale-105';
                if (tab === 'Courses') tabClasses = 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-transparent shadow-md shadow-purple-200/50 scale-105';
                if (tab === 'Placements') tabClasses = 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-transparent shadow-md shadow-emerald-200/50 scale-105';
                if (tab === 'Reviews') tabClasses = 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-transparent shadow-md shadow-amber-200/50 scale-105';
                iconClasses = 'opacity-100 text-white';
              } else {
                if (tab === 'Overview') { tabClasses = 'bg-indigo-50/70 text-gray-700 border-indigo-100 hover:bg-indigo-100 hover:border-indigo-300 hover:text-indigo-800 hover:scale-105 hover:shadow-sm'; iconClasses = 'text-indigo-500'; }
                if (tab === 'Courses') { tabClasses = 'bg-purple-50/70 text-gray-700 border-purple-100 hover:bg-purple-100 hover:border-purple-300 hover:text-purple-800 hover:scale-105 hover:shadow-sm'; iconClasses = 'text-purple-500'; }
                if (tab === 'Placements') { tabClasses = 'bg-emerald-50/70 text-gray-700 border-emerald-100 hover:bg-emerald-100 hover:border-emerald-300 hover:text-emerald-800 hover:scale-105 hover:shadow-sm'; iconClasses = 'text-emerald-500'; }
                if (tab === 'Reviews') { tabClasses = 'bg-amber-50/70 text-gray-700 border-amber-100 hover:bg-amber-100 hover:border-amber-300 hover:text-amber-800 hover:scale-105 hover:shadow-sm'; iconClasses = 'text-amber-500'; }
              }

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-6 py-3 text-base font-extrabold rounded-full whitespace-nowrap transition-all duration-300 flex items-center border group',
                    tabClasses
                  )}
                >
                  <Icon className={cn("w-5 h-5 mr-2.5 transition-colors", iconClasses)} />
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 w-full">
            {activeTab === 'Overview' && <OverviewTab college={college} />}
            {activeTab === 'Courses' && <CoursesTab college={college} />}
            {activeTab === 'Placements' && <PlacementsTab college={college} />}
            {activeTab === 'Reviews' && <ReviewsTab college={college} />}

            <div className="mt-12 border-t border-gray-200 pt-12">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <CollegeQA collegeId={college.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ college }: { college: CollegeDetail }) {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Description */}
      {college.description && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-500" />
            About {college.name}
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">{college.description}</p>
        </div>
      )}

      {/* Key Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex items-start gap-5 group hover:border-indigo-100 hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <Building className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Institution Type</p>
            <p className="text-base font-bold text-gray-900">{college.type} University</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex items-start gap-5 group hover:border-emerald-100 hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Established</p>
            <p className="text-base font-bold text-gray-900">{college.established || 'N/A'}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex items-start gap-5 group hover:border-purple-100 hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Courses Offered</p>
            <p className="text-base font-bold text-gray-900">{college.courses.length} Programs</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex items-start gap-5 group hover:border-amber-100 hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Accepted Exams</p>
            <p className="text-base font-bold text-gray-900">{college.acceptedExams.join(', ') || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Cutoff Snapshot */}
      {college.cutoffs.length > 0 && (
        <div className="bg-white rounded-none border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Latest Admission Cutoffs</h2>
            <p className="text-sm text-gray-500 mt-1">Based on previous year closing ranks</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Exam</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Closing Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {college.cutoffs.slice(0, 10).map((cutoff) => (
                  <tr key={cutoff.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-4 px-6 font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{cutoff.exam}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{cutoff.course}</td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold">{cutoff.category}</span>
                    </td>
                    <td className="py-4 px-6 text-right font-extrabold text-indigo-600">{cutoff.closingRank.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function CoursesTab({ college }: { college: CollegeDetail }) {
  const ugCourses = college.courses.filter((c) => c.level === 'UG');
  const pgCourses = college.courses.filter((c) => c.level === 'PG');

  const CourseSection = ({ title, courses }: { title: string; courses: typeof college.courses }) => (
    <div className="bg-white rounded-none border border-gray-100 shadow-sm overflow-hidden mb-8 last:mb-0">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-indigo-600 border border-indigo-100 shadow-sm">{courses.length} Programs</span>
      </div>
      {courses.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No courses available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Course Name</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Fees/Year</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Seats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-4 px-6 font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{course.name}</td>
                  <td className="py-4 px-6 text-gray-600 font-medium">{course.duration}</td>
                  <td className="py-4 px-6 text-right font-extrabold text-emerald-600">{formatCurrency(course.fees)}</td>
                  <td className="py-4 px-6 text-right text-gray-500 font-medium">{course.seats || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {ugCourses.length > 0 && <CourseSection title="Undergraduate Programs" courses={ugCourses} />}
      {pgCourses.length > 0 && <CourseSection title="Postgraduate Programs" courses={pgCourses} />}
      {college.courses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-none border border-gray-100 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-none flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <p className="text-gray-500 font-medium">No course information available</p>
        </div>
      )}
    </div>
  );
}

function PlacementsTab({ college }: { college: CollegeDetail }) {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Placement Stats */}
      <div className="bg-white rounded-none border border-gray-100 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-500" />
          Placement Statistics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-none bg-emerald-50/80 border border-emerald-100 transition-transform hover:-translate-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{college.avgPackage ? formatLPA(college.avgPackage) : 'N/A'}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600/80 mt-2">Average Package</p>
          </div>
          <div className="text-center p-6 rounded-none bg-blue-50/80 border border-blue-100 transition-transform hover:-translate-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">{college.highestPackage ? formatLPA(college.highestPackage) : 'N/A'}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600/80 mt-2">Highest Package</p>
          </div>
          <div className="text-center p-6 rounded-none bg-purple-50/80 border border-purple-100 transition-transform hover:-translate-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-700">{college.medianPackage ? formatLPA(college.medianPackage) : 'N/A'}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600/80 mt-2">Median Package</p>
          </div>
          <div className="text-center p-6 rounded-none bg-amber-50/80 border border-amber-100 transition-transform hover:-translate-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-700">{college.placementRate ? `${college.placementRate}%` : 'N/A'}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600/80 mt-2">Placement Rate</p>
          </div>
        </div>
      </div>

      {/* Placement bar visualization */}
      {college.avgPackage && college.highestPackage && (
        <div className="bg-white rounded-none border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Package Distribution</h2>
          <div className="space-y-6">
            {[
              { label: 'Highest Package', value: college.highestPackage, color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
              { label: 'Average Package', value: college.avgPackage, color: 'bg-gradient-to-r from-emerald-400 to-emerald-500' },
              { label: 'Median Package', value: college.medianPackage || 0, color: 'bg-gradient-to-r from-purple-400 to-purple-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-bold text-gray-700">{item.label}</span>
                  <span className="font-extrabold text-gray-900">{item.value ? formatLPA(item.value) : 'N/A'}</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className={cn('h-full rounded-full transition-all duration-1000 ease-out relative', item.color)}
                    style={{ width: `${college.highestPackage ? (item.value / college.highestPackage) * 100 : 0}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Recruiters */}
      {college.topRecruiters.length > 0 && (
        <div className="bg-white rounded-none border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top Recruiters</h2>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {college.topRecruiters.map((recruiter) => (
              <span key={recruiter} className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-none text-sm text-gray-700 font-bold hover:bg-white hover:shadow-md hover:border-indigo-200 transition-all cursor-default">
                {recruiter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewsTab({ college }: { college: CollegeDetail }) {
  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: college.reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);
  const avgRating = college.reviews.length > 0
    ? college.reviews.reduce((sum, r) => sum + r.rating, 0) / college.reviews.length
    : 0;

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Rating Summary */}
      <div className="bg-white rounded-none border border-gray-100 shadow-sm p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          Rating Summary
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
          {/* Overall rating */}
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <p className="text-6xl font-extrabold text-gray-900 tracking-tighter">{avgRating.toFixed(1)}</p>
            <div className="flex items-center gap-1 mt-3 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={cn('w-6 h-6', star <= Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200')} />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-500 mt-2 bg-gray-100 px-3 py-1 rounded-full">{college.reviews.length} total reviews</p>
          </div>

          {/* Distribution bars */}
          <div className="flex-1 w-full space-y-3">
            {distribution.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-700 w-4">{star}</span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-500 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {college.reviews.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 px-2">Student Reviews</h3>
          {college.reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-none border border-gray-100 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.author}</h4>
                    <p className="text-xs font-bold text-gray-400 mt-0.5">{review.title}</p>
                  </div>
                </div>
                <span className={cn('text-xs font-bold px-2.5 py-1 rounded-lg flex items-center shadow-sm', getRatingColor(review.rating))}>
                  <Star className="w-3 h-3 mr-1 fill-current" /> {review.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-[15px] text-gray-600 leading-relaxed bg-gray-50/50 p-4 rounded-none">{review.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-none border border-gray-100 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-none flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8" />
          </div>
          <p className="text-gray-500 font-medium">No reviews yet</p>
        </div>
      )}
    </div>
  );
}
