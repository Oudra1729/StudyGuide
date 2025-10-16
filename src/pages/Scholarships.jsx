import { useEffect, useState } from 'react';
import { MapPin, GraduationCap, DollarSign, Calendar, ExternalLink } from 'lucide-react';
import scholarshipsData from '../data/scholarships.json';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    setScholarships(scholarshipsData);
  }, []);

  const getLevelColor = (level) => {
    const colors = {
      'Graduate': 'bg-blue-100 text-blue-700',
      'Masters': 'bg-green-100 text-green-700',
      'PhD': 'bg-purple-100 text-purple-700',
      'Postdoc': 'bg-amber-100 text-amber-700',
      'Undergraduate': 'bg-pink-100 text-pink-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  const isDeadlineSoon = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysUntil <= 60;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Scholarship Opportunities</h1>
          <p className="text-xl opacity-90">Fund your education with scholarships from around the world</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getLevelColor(scholarship.level)}`}>
                    {scholarship.level}
                  </span>
                  {isDeadlineSoon(scholarship.deadline) && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">
                      Deadline Soon
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {scholarship.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {scholarship.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{scholarship.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors">
                  Apply Now <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
