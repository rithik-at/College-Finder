"use server";

import prisma from "@/lib/prisma";
import Papa from "papaparse";

export async function importCollegesCsv(csvData: string) {
  try {
    // Basic authorization check could go here if we used next-auth session in actions
    
    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length > 0) {
      return { success: false, error: "Failed to parse CSV. Check your format." };
    }

    const colleges = parsed.data as any[];
    
    // Transform data safely
    const dataToInsert = colleges.map(row => ({
      name: row.name || "Unknown College",
      slug: row.slug || `college-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: row.type || "Private",
      location: row.location || "Unknown",
      city: row.city || "Unknown",
      state: row.state || "Unknown",
      rating: parseFloat(row.rating) || 0,
      ranking: parseInt(row.ranking) || null,
      feesMin: parseInt(row.feesMin) || null,
      feesMax: parseInt(row.feesMax) || null,
      avgPackage: parseFloat(row.avgPackage) || null,
      highestPackage: parseFloat(row.highestPackage) || null,
      placementRate: parseFloat(row.placementRate) || null,
    }));

    // Use Prisma createMany for bulk import
    const result = await prisma.college.createMany({
      data: dataToInsert,
      skipDuplicates: true, // If slugs clash, skip
    });

    return { 
      success: true, 
      message: `Successfully imported ${result.count} colleges.` 
    };

  } catch (error: any) {
    console.error("CSV Import Error:", error);
    return { success: false, error: error.message || "Internal server error during import." };
  }
}
