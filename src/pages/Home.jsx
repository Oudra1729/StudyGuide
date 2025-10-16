import { BookOpen, GraduationCap, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: 'Educational Blogs',
      description: 'Access a wealth of knowledge through expert articles on study techniques, career planning, and academic success.',
      link: '/blogs',
      stats: '100+ Articles'
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
      title: 'Top Schools',
      description: 'Explore comprehensive profiles of leading universities worldwide to find the perfect match for your academic goals.',
      link: '/schools',
      stats: '50+ Universities'
    },
    {
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: 'Scholarships',
      description: 'Discover funding opportunities from around the globe to help make your education dreams a reality.',
      link: '/scholarships',
      stats: '$10M+ Available'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Student Community',
      description: 'Connect with peers, share experiences, and get support from a vibrant community of students worldwide.',
      link: '/community',
      stats: '5K+ Members'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Your Journey to Academic Excellence Starts Here
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Navigate your educational path with confidence. Access resources, connect with peers, and discover opportunities that shape your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/blogs"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Resources
              </Link>
              <Link
                to="/community"
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-600">Comprehensive resources designed for ambitious students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{feature.stats}</span>
                  <Link
                    to={feature.link}
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all"
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Academic Journey?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of students who trust SmartGuidance for their educational success</p>
            <Link
              to="/community"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
