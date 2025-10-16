import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function BlogDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [newBlog, setNewBlog] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load blogs from localStorage or your data source
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      // If no blogs in localStorage, initialize with blogs from data file
      import('../../data/blogs.json').then((data) => {
        setBlogs(data.default);
        localStorage.setItem('blogs', JSON.stringify(data.default));
      });
    }
  }, []);

  const saveBlog = (blog) => {
    const updatedBlogs = editingBlog
      ? blogs.map((b) => (b.id === blog.id ? blog : b))
      : [...blogs, { ...blog, id: Date.now() }];

    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setEditingBlog(null);
    setNewBlog(null);
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  const BlogForm = ({ blog, onSave, onCancel }) => {
    const [formData, setFormData] = useState(blog || {
      title: '',
      category: 'Study Tips',
      author: user?.name || '',
      date: new Date().toISOString().split('T')[0],
      preview: ''
    });

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Study Tips</option>
            <option>Admissions</option>
            <option>Career Planning</option>
            <option>Wellness</option>
            <option>International</option>
            <option>Financial Aid</option>
          </select>

          <input
            type="text"
            placeholder="Author Name"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <textarea
            placeholder="Blog Preview"
            value={formData.preview}
            onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => onCancel()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Blog
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Blog Management</h1>
          <p className="text-xl opacity-90">Create and manage educational blog content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!newBlog && !editingBlog && (
          <button
            onClick={() => setNewBlog({})}
            className="mb-8 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Plus className="w-4 h-4" /> Add New Blog
          </button>
        )}

        {newBlog && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
            <BlogForm
              blog={newBlog}
              onSave={saveBlog}
              onCancel={() => setNewBlog(null)}
            />
          </div>
        )}

        {editingBlog && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
            <BlogForm
              blog={editingBlog}
              onSave={saveBlog}
              onCancel={() => setEditingBlog(null)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {blog.category}
                  </span>
                  <h2 className="text-xl font-semibold mt-2">{blog.title}</h2>
                  <p className="text-gray-600 text-sm mt-2">{blog.preview}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingBlog(blog)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}