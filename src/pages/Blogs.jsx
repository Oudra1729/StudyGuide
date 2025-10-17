import { useEffect, useState } from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import blogsData from '../data/blogs.json';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Study Tips': 'bg-blue-100 text-blue-700',
      'Admissions': 'bg-green-100 text-green-700',
      'Career Planning': 'bg-purple-100 text-purple-700',
      'Wellness': 'bg-pink-100 text-pink-700',
      'International': 'bg-amber-100 text-amber-700',
      'Financial Aid': 'bg-teal-100 text-teal-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">Educational Blogss</h1>
          <p className="text-xl opacity-90">Expert insights and advice for your academic success</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {blog.preview}
                </p>

                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all group">
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
