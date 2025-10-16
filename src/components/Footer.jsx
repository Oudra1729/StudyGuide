import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-semibold text-white">SmartGuidance</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering students with the knowledge and resources they need to succeed in their academic journey.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blogs" className="hover:text-blue-500 transition-colors">Blogs</Link></li>
              <li><Link to="/schools" className="hover:text-blue-500 transition-colors">Schools</Link></li>
              <li><Link to="/scholarships" className="hover:text-blue-500 transition-colors">Scholarships</Link></li>
              <li><Link to="/community" className="hover:text-blue-500 transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Study Tips</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Application Help</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Financial Aid</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>info@smartguidance.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Education Hub, CA 94000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; 2024 SmartGuidance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
