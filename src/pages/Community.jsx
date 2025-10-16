import { useEffect, useState } from 'react';
import { MessageCircle, ThumbsUp, User, Clock } from 'lucide-react';
import communityData from '../data/community.json';

export default function Community() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(communityData);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Academic Advice': 'bg-blue-100 text-blue-700',
      'Study Groups': 'bg-green-100 text-green-700',
      'Resources': 'bg-purple-100 text-purple-700',
      'Social': 'bg-pink-100 text-pink-700',
      'Career': 'bg-amber-100 text-amber-700',
      'Grad School': 'bg-teal-100 text-teal-700',
      'Jobs': 'bg-orange-100 text-orange-700',
      'Wellness': 'bg-rose-100 text-rose-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Student Community</h1>
          <p className="text-xl opacity-90">Connect, share, and learn together with students worldwide</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button className="w-full px-6 py-4 bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-purple-400 hover:text-purple-600 transition-colors">
            Start a New Discussion
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {post.avatar}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{post.username}</span>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(post.timestamp)}</span>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.topic}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.message}
                  </p>

                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors group">
                      <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{post.replies} replies</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors group">
                      <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{post.likes} likes</span>
                    </button>
                    <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors ml-auto">
                      Join Discussion
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
