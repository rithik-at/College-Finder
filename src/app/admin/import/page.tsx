"use client";

import { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { importCollegesCsv } from "./actions";

export default function AdminImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const text = await file.text();
      const res = await importCollegesCsv(text);
      setResult(res);
      if (res.success) setFile(null);
    } catch (err) {
      setResult({ success: false, error: "Failed to read file." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Bulk import college data into the database using a CSV file.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
            Upload Colleges CSV
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {file ? (
              <div className="text-center">
                <FileSpreadsheet className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">CSV files only</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <a href="data:text/csv;charset=utf-8,name,slug,type,location,city,state,rating,ranking,feesMin,feesMax,avgPackage,highestPackage,placementRate%0ADemo%20IIT,demo-iit,IIT,India,Delhi,Delhi,4.8,1,100000,200000,15.5,45.0,98.5" download="template.csv" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Download Template CSV
            </a>
            
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Importing...
                </>
              ) : (
                "Import Data"
              )}
            </button>
          </div>

          {result && (
            <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              )}
              <div>
                <h3 className="text-sm font-bold">{result.success ? 'Import Successful' : 'Import Failed'}</h3>
                <p className="text-sm mt-1 opacity-90">{result.message || result.error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
