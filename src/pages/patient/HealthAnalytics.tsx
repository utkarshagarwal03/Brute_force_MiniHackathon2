import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Simple implementation of Card component
const Card = ({ children, className }) => {
  return (
    <div className={bg-white rounded-lg shadow-md ${className}}>
      {children}
    </div>
  );
};

const initialData = [
  { date: "Jan", weight: 70, bloodPressure: 120, sleep: 7 },
  { date: "Feb", weight: 71, bloodPressure: 118, sleep: 7.5 },
  { date: "Mar", weight: 70.5, bloodPressure: 122, sleep: 6.5 },
  { date: "Apr", weight: 69.8, bloodPressure: 119, sleep: 8 },
];

export default function HealthAnalytics() {
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState(initialData);
  const [newEntry, setNewEntry] = useState({
    date: "",
    weight: "",
    bloodPressure: "",
    sleep: ""
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activePeriod, setActivePeriod] = useState("all"); // "all", "3months", "6months"
  const [filterValue, setFilterValue] = useState("");

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: name === "date" ? value : parseFloat(value) || ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.date || !newEntry.weight || !newEntry.bloodPressure || !newEntry.sleep) {
      alert("Please fill all fields");
      return;
    }
    
    setHealthData(prev => [...prev, newEntry]);
    setNewEntry({ date: "", weight: "", bloodPressure: "", sleep: "" });
    setIsFormOpen(false);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setHealthData(prev => prev.filter((_, i) => i !== index));
    }
  };

  const filteredData = healthData.filter(item => {
    // First apply time period filter
    if (activePeriod === "3months" && healthData.length > 3) {
      const lastThreeMonths = healthData.slice(-3);
      if (!lastThreeMonths.includes(item)) return false;
    } else if (activePeriod === "6months" && healthData.length > 6) {
      const lastSixMonths = healthData.slice(-6);
      if (!lastSixMonths.includes(item)) return false;
    }
    
    // Then apply search filter if any
    if (filterValue) {
      return item.date.toLowerCase().includes(filterValue.toLowerCase());
    }
    
    return true;
  });

  // Calculate health metrics
  const calculateBMI = () => {
    // Assuming height is 1.75m (this would normally come from patient profile)
    const height = 1.75;
    const latestWeight = healthData.length > 0 ? healthData[healthData.length - 1].weight : 0;
    return (latestWeight / (height * height)).toFixed(1);
  };

  const getWeightTrend = () => {
    if (healthData.length < 2) return "Not enough data";
    
    const latest = healthData[healthData.length - 1].weight;
    const previous = healthData[healthData.length - 2].weight;
    
    if (latest > previous) return "⬆ Increasing";
    if (latest < previous) return "⬇ Decreasing";
    return "➡ Stable";
  };

  const getSleepAverage = () => {
    if (healthData.length === 0) return 0;
    
    const sum = healthData.reduce((acc, curr) => acc + curr.sleep, 0);
    return (sum / healthData.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Health Analytics</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search months..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <select 
            value={activePeriod}
            onChange={(e) => setActivePeriod(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Time</option>
            <option value="6months">Last 6 Months</option>
            <option value="3months">Last 3 Months</option>
          </select>
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isFormOpen ? "Close Form" : "Add New Entry"}
          </button>
        </div>
      </div>

      {isFormOpen && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Add Health Data</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Month</label>
                <input
                  type="text"
                  name="date"
                  placeholder="e.g., May"
                  value={newEntry.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="e.g., 70.5"
                  value={newEntry.weight}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Blood Pressure</label>
                <input
                  type="number"
                  name="bloodPressure"
                  placeholder="e.g., 120"
                  value={newEntry.bloodPressure}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sleep (hours)</label>
                <input
                  type="number"
                  name="sleep"
                  placeholder="e.g., 7.5"
                  value={newEntry.sleep}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  step="0.1"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Entry
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Overall Health Summary Card */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Health Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Current Weight</h4>
            <p className="text-2xl font-bold">
              {healthData.length > 0 ? ${healthData[healthData.length - 1].weight} kg : "No data"}
            </p>
            <p className="text-sm text-gray-600">Trend: {getWeightTrend()}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">BMI</h4>
            <p className="text-2xl font-bold">{calculateBMI()}</p>
            <p className="text-sm text-gray-600">
              {calculateBMI() < 18.5 ? "Underweight" : 
               calculateBMI() < 25 ? "Normal" : 
               calculateBMI() < 30 ? "Overweight" : "Obese"}
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Blood Pressure</h4>
            <p className="text-2xl font-bold">
              {healthData.length > 0 ? ${healthData[healthData.length - 1].bloodPressure} : "No data"}
            </p>
            <p className="text-sm text-gray-600">
              {healthData.length > 0 && (
                healthData[healthData.length - 1].bloodPressure > 130
                  ? "Above normal"
                  : healthData[healthData.length - 1].bloodPressure < 90
                    ? "Below normal"
                    : "Normal range"
              )}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Avg. Sleep</h4>
            <p className="text-2xl font-bold">{getSleepAverage()} hrs</p>
            <p className="text-sm text-gray-600">
              {getSleepAverage() < 6 ? "Insufficient" : 
               getSleepAverage() > 9 ? "Excessive" : "Optimal"}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Weight Tracking</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Recent Entries:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Month</th>
                    <th className="text-right">Weight (kg)</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(-5).map((entry, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{entry.date}</td>
                      <td className="text-right">{entry.weight}</td>
                      <td className="text-right">
                        <button 
                          onClick={() => handleDelete(healthData.indexOf(entry))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Blood Pressure</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bloodPressure"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Recent Entries:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Month</th>
                    <th className="text-right">BP</th>
                    <th className="text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(-5).map((entry, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{entry.date}</td>
                      <td className="text-right">{entry.bloodPressure}</td>
                      <td className="text-right">
                        {entry.bloodPressure > 130
                          ? "⚠ High"
                          : entry.bloodPressure < 90
                            ? "⚠ Low"
                            : "✅ Normal"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Sleep Pattern</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#ffc658"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Recent Entries:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Month</th>
                    <th className="text-right">Sleep (hrs)</th>
                    <th className="text-right">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(-5).map((entry, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{entry.date}</td>
                      <td className="text-right">{entry.sleep}</td>
                      <td className="text-right">
                        {entry.sleep < 6
                          ? "⚠ Low"
                          : entry.sleep > 9
                            ? "ℹ High"
                            : "✅ Good"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Health Recommendations</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Weight Insights</h4>
              {healthData.length >= 2 && (
                <p>
                  {healthData[healthData.length - 1].weight > healthData[healthData.length - 2].weight 
                    ? "Your weight has increased since last entry. Consider reviewing your diet plan." 
                    : healthData[healthData.length - 1].weight < healthData[healthData.length - 2].weight
                      ? "Your weight has decreased since last entry. Keep up with your healthy habits." 
                      : "Your weight remains stable. Maintain your current routine."}
                </p>
              )}
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Blood Pressure Management</h4>
              {healthData.length >= 1 && (
                <p>
                  {healthData[healthData.length - 1].bloodPressure > 130
                    ? "Your blood pressure is above recommended levels. Consider reducing sodium intake and stress management techniques."
                    : healthData[healthData.length - 1].bloodPressure < 90
                      ? "Your blood pressure is below recommended levels. Consider consulting with your doctor about this."
                      : "Your blood pressure is within normal range. Continue with your current lifestyle choices."}
                </p>
              )}
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Sleep Advice</h4>
              {healthData.length >= 1 && (
                <p>
                  {healthData[healthData.length - 1].sleep < 6
                    ? "You're not getting enough sleep. Try to establish a regular sleep schedule and avoid caffeine before bedtime."
                    : healthData[healthData.length - 1].sleep > 9
                      ? "You're sleeping more than average. While rest is important, excessive sleep can sometimes indicate other health issues."
                      : "Your sleep duration is within recommended range. Continue with your current sleep habits."}
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
