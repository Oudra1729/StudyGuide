import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Save, 
  X,
  BookOpen,
  GraduationCap,
  Award,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [schools, setSchools] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [community, setCommunity] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load data from localStorage or initialize from JSON files
    const loadData = async () => {
      // Load Blogs
      const storedBlogs = localStorage.getItem('blogs');
      if (storedBlogs) {
        setBlogs(JSON.parse(storedBlogs));
      } else {
        const blogsModule = await import('../../data/blogs.json');
        setBlogs(blogsModule.default);
        localStorage.setItem('blogs', JSON.stringify(blogsModule.default));
      }

      // Load Schools
      const storedSchools = localStorage.getItem('schools');
      if (storedSchools) {
        setSchools(JSON.parse(storedSchools));
      } else {
        const schoolsModule = await import('../../data/schools.json');
        setSchools(schoolsModule.default);
        localStorage.setItem('schools', JSON.stringify(schoolsModule.default));
      }

      // Load Scholarships
      const storedScholarships = localStorage.getItem('scholarships');
      if (storedScholarships) {
        setScholarships(JSON.parse(storedScholarships));
      } else {
        const scholarshipsModule = await import('../../data/scholarships.json');
        setScholarships(scholarshipsModule.default);
        localStorage.setItem('scholarships', JSON.stringify(scholarshipsModule.default));
      }

      // Load Community
      const storedCommunity = localStorage.getItem('community');
      if (storedCommunity) {
        setCommunity(JSON.parse(storedCommunity));
      } else {
        const communityModule = await import('../../data/community.json');
        setCommunity(communityModule.default);
        localStorage.setItem('community', JSON.stringify(communityModule.default));
      }
    };

    loadData();
  }, []);

  const saveItem = (item) => {
    const updateData = (data, setData, storageKey) => {
      const updatedData = editingItem
        ? data.map((d) => (d.id === item.id ? item : d))
        : [...data, { ...item, id: Date.now() }];
      setData(updatedData);
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
    };

    switch (activeTab) {
      case 'blogs':
        updateData(blogs, setBlogs, 'blogs');
        break;
      case 'schools':
        updateData(schools, setSchools, 'schools');
        break;
      case 'scholarships':
        updateData(scholarships, setScholarships, 'scholarships');
        break;
      case 'community':
        updateData(community, setCommunity, 'community');
        break;
    }

    setEditingItem(null);
    setNewItem(null);
  };

  const deleteItem = (id) => {
    const updateData = (data, setData, storageKey) => {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
    };

    switch (activeTab) {
      case 'blogs':
        updateData(blogs, setBlogs, 'blogs');
        break;
      case 'schools':
        updateData(schools, setSchools, 'schools');
        break;
      case 'scholarships':
        updateData(scholarships, setScholarships, 'scholarships');
        break;
      case 'community':
        updateData(community, setCommunity, 'community');
        break;
    }
  };

  const BlogForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item || {
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

  const SchoolForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item || {
      name: '',
      city: '',
      country: '',
      programs: [],
      type: '',
      acceptance: '',
      contact: ''
    });

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="School Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <input
            type="text"
            placeholder="Programs (comma-separated)"
            value={formData.programs.join(', ')}
            onChange={(e) => setFormData({ ...formData, programs: e.target.value.split(',').map(p => p.trim()) })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="text"
            placeholder="Type (e.g., Public Research University)"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="text"
            placeholder="Acceptance Rate (e.g., 15%)"
            value={formData.acceptance}
            onChange={(e) => setFormData({ ...formData, acceptance: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="email"
            placeholder="Contact Email"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
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
              Save School
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ScholarshipForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item || {
      title: '',
      country: '',
      level: 'Graduate',
      amount: '',
      deadline: new Date().toISOString().split('T')[0],
      description: ''
    });

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Scholarship Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Graduate</option>
            <option>Undergraduate</option>
            <option>Masters</option>
            <option>PhD</option>
            <option>Postdoc</option>
          </select>

          <input
            type="text"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              Save Scholarship
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CommunityForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item || {
      username: user?.name || '',
      avatar: user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
      topic: '',
      category: 'Academic Advice',
      message: '',
      replies: 0,
      likes: 0,
      timestamp: new Date().toISOString()
    });

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Academic Advice</option>
            <option>Study Groups</option>
            <option>Resources</option>
            <option>Social</option>
            <option>Career</option>
            <option>Grad School</option>
            <option>Jobs</option>
            <option>Wellness</option>
          </select>

          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
              Save Post
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    const props = {
      item: editingItem || newItem,
      onSave: saveItem,
      onCancel: () => {
        setEditingItem(null);
        setNewItem(null);
      }
    };

    switch (activeTab) {
      case 'blogs':
        return <BlogForm {...props} />;
      case 'schools':
        return <SchoolForm {...props} />;
      case 'scholarships':
        return <ScholarshipForm {...props} />;
      case 'community':
        return <CommunityForm {...props} />;
      default:
        return null;
    }
  };

  const getItems = () => {
    switch (activeTab) {
      case 'blogs':
        return blogs;
      case 'schools':
        return schools;
      case 'scholarships':
        return scholarships;
      case 'community':
        return community;
      default:
        return [];
    }
  };

  const tabs = [
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
    { id: 'schools', label: 'Schools', icon: GraduationCap },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'community', label: 'Community', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl opacity-90">Manage your platform content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex space-x-4 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setEditingItem(null);
                setNewItem(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {!newItem && !editingItem && (
          <button
            onClick={() => setNewItem({})}
            className="mb-8 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Plus className="w-4 h-4" /> Add New {activeTab.slice(0, -1)}
          </button>
        )}

        {(newItem || editingItem) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Create New ${activeTab.slice(0, -1)}`}
            </h2>
            {renderForm()}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {getItems().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {item.category || item.type || item.level}
                  </span>
                  <h2 className="text-xl font-semibold mt-2">{item.title || item.name || item.topic}</h2>
                  <p className="text-gray-600 text-sm mt-2">{item.preview || item.description || item.message}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    {item.author && <span>{item.author}</span>}
                    {item.date && <span>{new Date(item.date).toLocaleDateString()}</span>}
                    {item.deadline && <span>Deadline: {new Date(item.deadline).toLocaleDateString()}</span>}
                    {item.country && <span>{item.country}</span>}
                    {item.timestamp && <span>{new Date(item.timestamp).toLocaleDateString()}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
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