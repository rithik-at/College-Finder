"use client";

import { motion } from "framer-motion";
import { GraduationCap, Scale, Sparkles, ArrowRight, TrendingUp, Award, PieChart } from "lucide-react";
import Link from "next/link";
import React from "react";

const topCollegesLogos = [
  "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/1200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/IIT_Kanpur_Logo.svg/1200px-IIT_Kanpur_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/1200px-IIT_Kharagpur_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Indian_Institute_of_Technology_Roorkee_logo.png/220px-Indian_Institute_of_Technology_Roorkee_logo.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/IIT_Guwahati_Logo.svg/1200px-IIT_Guwahati_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/National_Institute_of_Technology_Tiruchirappalli_Logo.png/220px-National_Institute_of_Technology_Tiruchirappalli_Logo.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1200px-Vellore_Institute_of_Technology_seal_2017.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/f/f5/SRM_University_logo.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Jadavpur_University_logo.svg/1200px-Jadavpur_University_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Thapar_Institute_of_Engineering_and_Technology_logo.svg/1200px-Thapar_Institute_of_Engineering_and_Technology_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Amrita_Vishwa_Vidyapeetham_logo.svg/1200px-Amrita_Vishwa_Vidyapeetham_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/University_of_Delhi.svg/1200px-University_of_Delhi.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Indian_Institute_of_Science_logo.svg/1200px-Indian_Institute_of_Science_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/IIIT_Hyderabad_Logo.svg/1200px-IIIT_Hyderabad_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/NIT_Warangal_logo.png/220px-NIT_Warangal_logo.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/National_Institute_of_Technology%2C_Karnataka_Logo.png/220px-National_Institute_of_Technology%2C_Karnataka_Logo.png"
];

const scholarshipImages = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
];

export function FeatureCards() {
  const features = [
    {
      title: "Admission Predictor",
      description: "Enter your exam rank and category to predict your chances of admission with data-driven probability scores.",
      icon: <Sparkles className="w-7 h-7 text-amber-500" />,
      link: "/predict",
      color: "bg-amber-50",
      borderColor: "group-hover:border-amber-200",
      buttonGradient: "from-amber-500 to-orange-500 shadow-amber-500/20",
      image: "/images/features/predictor.png"
    },
    {
      title: "Compare colleges",
      description: "Confused between choices? Compare up to 3 colleges simultaneously based on fees, placements, and national rankings.",
      icon: <Scale className="w-7 h-7 text-emerald-500" />,
      link: "/compare",
      color: "bg-emerald-50",
      borderColor: "group-hover:border-emerald-200",
      buttonGradient: "from-emerald-500 to-teal-500 shadow-emerald-500/20",
      image: "/images/features/compare_new.png"
    },
    {
      title: "Discover Top Colleges",
      description: "Search and explore from over 300+ premium institutes across India. Access detailed information on courses, fees, and campus life.",
      icon: <GraduationCap className="w-7 h-7 text-indigo-500" />,
      link: "/colleges",
      color: "bg-indigo-50",
      borderColor: "group-hover:border-indigo-200",
      buttonGradient: "from-indigo-500 to-blue-600 shadow-indigo-500/20",
      image: "/images/features/indian_colleges.png"
    },
    {
      title: "Placement Insights",
      description: "Deep dive into real placement statistics. View average packages, highest offers, and top recruiters dynamically.",
      icon: <TrendingUp className="w-7 h-7 text-rose-500" />,
      link: "/placements",
      color: "bg-rose-50",
      borderColor: "group-hover:border-rose-200",
      buttonGradient: "from-rose-500 to-pink-600 shadow-rose-500/20",
      image: "/images/features/placements.png"
    },
    {
      title: "Scholarship Finder",
      description: "Discover financial aid and scholarships. Find options specifically tailored to your category, merit, and financial background.",
      icon: <Award className="w-7 h-7 text-yellow-600" />,
      link: "/scholarships",
      color: "bg-yellow-50",
      borderColor: "group-hover:border-yellow-300",
      buttonGradient: "from-yellow-500 to-amber-600 shadow-yellow-500/20",
      image: "/images/features/scholarship_wordcloud.png"
    },
    {
      title: "College Analysis",
      description: "Access our detailed analytics dashboard comparing infrastructure, faculty, and student life with comprehensive data visualization.",
      icon: <PieChart className="w-7 h-7 text-cyan-500" />,
      link: "/analytics",
      color: "bg-cyan-50",
      borderColor: "group-hover:border-cyan-200",
      buttonGradient: "from-cyan-500 to-blue-500 shadow-cyan-500/20",
      image: "",
      textImage: {
        text: "Fees\nVs\nPlacements",
        bgColor: "bg-[#EAE6D1]",
        textColor: "text-[#DC2A31]"
      }
    },
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32 w-full relative z-20 bg-gray-50 flex justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">

        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24 w-full max-w-6xl my-20 sm:my-32">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`group relative bg-white border border-gray-100 rounded-none overflow-hidden shadow-sm hover:shadow-2xl ${feature.borderColor} transition-all duration-500 flex flex-col-reverse md:flex-row-reverse items-stretch w-full h-auto md:h-[340px] lg:h-[360px]`}
            >
              {/* Right Side: Content (Now on right) */}
              <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-none ${feature.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 animate-float`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed flex-grow">
                  {feature.description}
                </p>
                <Link
                  href={feature.link}
                  className="group/btn inline-flex items-center justify-center text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] px-10 py-3.5 sm:px-12 sm:py-4 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 mt-auto w-full xl:w-max whitespace-nowrap"
                >
                  Explore feature <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 ml-3 flex-shrink-0 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>

              {/* Left Side: Image or Text Graphic (Now on left) */}
              <div className={`flex-1 relative flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-full ${feature.textImage ? feature.textImage.bgColor : 'bg-gray-50'}`}>
                {feature.textImage ? (
                  <div className="group-hover:scale-105 transition-transform duration-700 ease-out text-center px-4 flex flex-col gap-4 sm:gap-6">
                    {feature.textImage.text.split('\n').map((line, idx) => (
                      <div key={idx} className={`font-black text-6xl sm:text-7xl md:text-[80px] ${feature.textImage.textColor} uppercase tracking-[0.1em] leading-none`} style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
                        {line}
                      </div>
                    ))}
                  </div>
                ) : (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
