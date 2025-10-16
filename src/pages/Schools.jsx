import { useEffect, useState } from 'react';
import { MapPin, GraduationCap, Mail, TrendingUp } from 'lucide-react';
import schoolsData from '../data/schools.json';

export default function Schools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    setSchools(schoolsData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Top Universities Worldwide</h1>
          <p className="text-xl opacity-90">Discover leading institutions and find your perfect academic match</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{school.name}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{school.city}, {school.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm">{school.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-blue-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-2xl font-bold">{school.acceptance}</span>
                  </div>
                  <span className="text-xs text-gray-500">Acceptance Rate</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Popular Programs</h3>
                <div className="flex flex-wrap gap-2">
                  {school.programs.map((program, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{school.contact}</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
