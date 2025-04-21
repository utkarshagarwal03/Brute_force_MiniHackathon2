import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalendarDays, Moon, Scale, Heart, Apple } from 'lucide-react';

// Sample data - in a real app this would come from your backend
const initialSleepData = [
  { date: '04/15', hours: 7.5 },
  { date: '04/16', hours: 6.2 },
  { date: '04/17', hours: 8.0 },
  { date: '04/18', hours: 7.2 },
  { date: '04/19', hours: 6.8 },
  { date: '04/20', hours: 7.9 },
  { date: '04/21', hours: 7.3 },
];

const initialWeightData = [
  { date: '04/15', weight: 68.5 },
  { date: '04/16', weight: 68.5 },
  { date: '04/17', weight: 68.2 },
  { date: '04/18', weight: 68.1 },
  { date: '04/19', weight: 67.9 },
  { date: '04/20', weight: 67.8 },
  { date: '04/21', weight: 67.5 },
];

const initialBPData = [
  { date: '04/15', systolic: 122, diastolic: 81 },
  { date: '04/16', systolic: 120, diastolic: 80 },
  { date: '04/17', systolic: 118, diastolic: 79 },
  { date: '04/18', systolic: 121, diastolic: 82 },
  { date: '04/19', systolic: 119, diastolic: 78 },
  { date: '04/20', systolic: 117, diastolic: 76 },
  { date: '04/21', systolic: 118, diastolic: 77 },
];

const initialDietData = [
  { day: 'Monday', calories: 2100, protein: 120, carbs: 220, fat: 70 },
  { day: 'Tuesday', calories: 1950, protein: 130, carbs: 200, fat: 65 },
  { day: 'Wednesday', calories: 2050, protein: 125, carbs: 210, fat: 68 },
  { day: 'Thursday', calories: 2000, protein: 128, carbs: 205, fat: 67 },
  { day: 'Friday', calories: 2200, protein: 135, carbs: 225, fat: 72 },
  { day: 'Saturday', calories: 2300, protein: 140, carbs: 240, fat: 75 },
  { day: 'Sunday', calories: 1900, protein: 115, carbs: 195, fat: 62 },
];

export default function HealthDashboard() {
  const [sleepData, setSleepData] = useState(initialSleepData);
  const [weightData, setWeightData] = useState(initialWeightData);
  const [bpData, setBpData] = useState(initialBPData);
  const [dietData, setDietData] = useState(initialDietData);
  const [activeTab, setActiveTab] = useState('sleep');
  
  // Form states
  const [newSleep, setNewSleep] = useState({ date: '', hours: '' });
  const [newWeight, setNewWeight] = useState({ date: '', weight: '' });
  const [newBP, setNewBP] = useState({ date: '', systolic: '', diastolic: '' });
  const [newDiet, setNewDiet] = useState({ day: '', calories: '', protein: '', carbs: '', fat: '' });
  
  // Handlers for adding new data
  const addSleepData = (e) => {
    e.preventDefault();
    if (newSleep.date && newSleep.hours) {
      setSleepData([...sleepData, newSleep]);
      setNewSleep({ date: '', hours: '' });
    }
  };
  
  const addWeightData = (e) => {
    e.preventDefault();
    if (newWeight.date && newWeight.weight) {
      setWeightData([...weightData, newWeight]);
      setNewWeight({ date: '', weight: '' });
    }
  };
  
  const addBPData = (e) => {
    e.preventDefault();
    if (newBP.date && newBP.systolic && newBP.diastolic) {
      setBpData([...bpData, newBP]);
      setNewBP({ date: '', systolic: '', diastolic: '' });
    }
  };
  
  const addDietData = (e) => {
    e.preventDefault();
    if (newDiet.day && newDiet.calories && newDiet.protein && newDiet.carbs && newDiet.fat) {
      setDietData([...dietData, newDiet]);
      setNewDiet({ day: '', calories: '', protein: '', carbs: '', fat: '' });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Health Analytics Dashboard</h1>
      </header>
      
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar Navigation */}
        <nav className="bg-blue-100 p-4 md:w-64">
          <ul>
            <li 
              className={'flex items-center p-3 mb-2 rounded cursor-pointer ${activeTab === 'sleep' ? 'bg-blue-500 text-white' : 'bg-blue-200 hover:bg-blue-300'}'}
              onClick={() => setActiveTab('sleep')}
            >
              <Moon size={20} className="mr-2" />
              <span>Sleep Tracker</span>
            </li>
            <li 
              className={'flex items-center p-3 mb-2 rounded cursor-pointer ${activeTab === 'weight' ? 'bg-blue-500 text-white' : 'bg-blue-200 hover:bg-blue-300'}'}
              onClick={() => setActiveTab('weight')}
            >
              <Scale size={20} className="mr-2" />
              <span>Weight Tracker</span>
            </li>
            <li 
              className={'flex items-center p-3 mb-2 rounded cursor-pointer ${activeTab === 'bp' ? 'bg-blue-500 text-white' : 'bg-blue-200 hover:bg-blue-300'}'}
              onClick={() => setActiveTab('bp')}
            >
              <Heart size={20} className="mr-2" />
              <span>Blood Pressure</span>
            </li>
            <li 
              className={'flex items-center p-3 mb-2 rounded cursor-pointer ${activeTab === 'diet' ? 'bg-blue-500 text-white' : 'bg-blue-200 hover:bg-blue-300'}'}
              onClick={() => setActiveTab('diet')}
            >
              <Apple size={20} className="mr-2" />
              <span>Diet Planner</span>
            </li>
          </ul>
        </nav>
        
        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Sleep Tracker */}
          {activeTab === 'sleep' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Moon size={24} className="text-blue-500 mr-2" />
                <h2 className="text-xl font-bold text-blue-800">Sleep Tracker</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Sleep Hours</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sleepData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <form onSubmit={addSleepData} className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Add Sleep Data</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Date (MM/DD)</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="04/22"
                      value={newSleep.date}
                      onChange={(e) => setNewSleep({...newSleep, date: e.target.value})}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Hours Slept</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="7.5"
                      value={newSleep.hours}
                      onChange={(e) => setNewSleep({...newSleep, hours: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Add Entry
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* Weight Tracker */}
          {activeTab === 'weight' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Scale size={24} className="text-blue-500 mr-2" />
                <h2 className="text-xl font-bold text-blue-800">Weight Tracker</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Weight History (kg)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[Math.floor(Math.min(...weightData.map(d => d.weight)) - 2), Math.ceil(Math.max(...weightData.map(d => d.weight)) + 2)]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <form onSubmit={addWeightData} className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Add Weight Data</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Date (MM/DD)</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="04/22"
                      value={newWeight.date}
                      onChange={(e) => setNewWeight({...newWeight, date: e.target.value})}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="68.0"
                      value={newWeight.weight}
                      onChange={(e) => setNewWeight({...newWeight, weight: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Add Entry
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* Blood Pressure Tracker */}
          {activeTab === 'bp' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Heart size={24} className="text-blue-500 mr-2" />
                <h2 className="text-xl font-bold text-blue-800">Blood Pressure Tracker</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Blood Pressure History</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bpData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[60, 140]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="systolic" stroke="#3b82f6" strokeWidth={2} name="Systolic" />
                      <Line type="monotone" dataKey="diastolic" stroke="#60a5fa" strokeWidth={2} name="Diastolic" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <form onSubmit={addBPData} className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Add Blood Pressure Data</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Date (MM/DD)</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="04/22"
                      value={newBP.date}
                      onChange={(e) => setNewBP({...newBP, date: e.target.value})}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Systolic (mmHg)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="120"
                      value={newBP.systolic}
                      onChange={(e) => setNewBP({...newBP, systolic: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Diastolic (mmHg)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="80"
                      value={newBP.diastolic}
                      onChange={(e) => setNewBP({...newBP, diastolic: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Add Entry
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* Diet Planner */}
          {activeTab === 'diet' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Apple size={24} className="text-blue-500 mr-2" />
                <h2 className="text-xl font-bold text-blue-800">Diet Planner</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Weekly Nutrition Plan</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dietData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="protein" name="Protein (g)" fill="#3b82f6" />
                      <Bar dataKey="carbs" name="Carbs (g)" fill="#60a5fa" />
                      <Bar dataKey="fat" name="Fat (g)" fill="#93c5fd" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Calorie Intake</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dietData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="day" />
                        <YAxis domain={[1800, 2400]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <form onSubmit={addDietData} className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Add Diet Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Day</label>
                    <select
                      className="w-full p-2 border border-blue-300 rounded"
                      value={newDiet.day}
                      onChange={(e) => setNewDiet({...newDiet, day: e.target.value})}
                    >
                      <option value="">Select day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Calories</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="2000"
                      value={newDiet.calories}
                      onChange={(e) => setNewDiet({...newDiet, calories: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Protein (g)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="120"
                      value={newDiet.protein}
                      onChange={(e) => setNewDiet({...newDiet, protein: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Carbs (g)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="200"
                      value={newDiet.carbs}
                      onChange={(e) => setNewDiet({...newDiet, carbs: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Fat (g)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-blue-300 rounded"
                      placeholder="70"
                      value={newDiet.fat}
                      onChange={(e) => setNewDiet({...newDiet, fat: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Add Diet Entry
                    </button>
                  </div>
                </div>
              </form>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Meal Suggestions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded shadow">
                    <h4 className="font-semibold text-blue-600">Breakfast</h4>
                    <ul className="mt-2 text-sm">
                      <li>• Greek yogurt with berries and nuts</li>
                      <li>• Oatmeal with banana and cinnamon</li>
                      <li>• Eggs with whole grain toast</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded shadow">
                    <h4 className="font-semibold text-blue-600">Lunch</h4>
                    <ul className="mt-2 text-sm">
                      <li>• Grilled chicken salad</li>
                      <li>• Quinoa bowl with vegetables</li>
                      <li>• Turkey and avocado wrap</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded shadow">
                    <h4 className="font-semibold text-blue-600">Dinner</h4>
                    <ul className="mt-2 text-sm">
                      <li>• Baked salmon with roasted vegetables</li>
                      <li>• Stir-fry with tofu and brown rice</li>
                      <li>• Chicken with sweet potato</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
