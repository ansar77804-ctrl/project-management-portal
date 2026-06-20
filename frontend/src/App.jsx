import React, { useEffect, useMemo, useState } from "react";
import DashboardPage from "../pages/DashboardPage.jsx";
import AddTaskPage from "../pages/AddTaskPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import Statistics from "../components/Statistics.jsx";
import { createTask, deleteTask, fetchTasks, updateTaskStatus, getStatistics } from "../services/taskService.js";

const filters = ["All", "Pending", "In Progress", "Completed"];

function App() {
  const [tasks, setTasks] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({});

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      loadTasks();
    }
  }, []);

  const loadTasks = async (search = "") => {
    try {
      setIsLoading(true);
      setError("");
      const data = await fetchTasks(search);
      setTasks(data);
      // Fetch statistics
      const statistics = await getStatistics();
      setStats(statistics);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        setError(err.response?.data?.message || "Unable to load tasks");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      loadTasks(value);
    } else {
      loadTasks();
    }
  };

  const filteredTasks = useMemo(() => {
    if (activeFilter === "All") {
      return tasks;
    }

    return tasks.filter((task) => task.status === activeFilter);
  }, [activeFilter, tasks]);

  const handleCreateTask = async (taskInput) => {
    const task = await createTask(taskInput);
    setTasks((currentTasks) => [task, ...currentTasks]);
    setActivePage("dashboard");
  };

  const handleCompleteTask = async (taskId) => {
    const task = await updateTaskStatus(taskId, "Completed");
    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === task.id ? task : currentTask
      )
    );
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((currentTasks) =>
      currentTasks.filter((currentTask) => currentTask.id !== taskId)
    );
  };

  const handleLoginSuccess = () => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      loadTasks();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setTasks([]);
    setSearchTerm("");
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Task workspace</p>
          <h1>project management portal</h1>
        </div>
        <div className="topbar-actions">
          <button
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activePage === "add-task" ? "active" : ""}
            onClick={() => setActivePage("add-task")}
          >
            Add Task
          </button>
          <label className="toggle">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={(event) => setIsDarkMode(event.target.checked)}
            />
            <span>Dark Mode</span>
          </label>
          <div className="user-info">
            <span className="username">{user?.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {activePage === "dashboard" ? (
        <>
          <Statistics stats={stats} />
          <DashboardPage
            tasks={filteredTasks}
            filters={filters}
            activeFilter={activeFilter}
            isLoading={isLoading}
            error={error}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onFilterChange={setActiveFilter}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            onRetry={loadTasks}
          />
        </>
      ) : (
        <AddTaskPage onCreateTask={handleCreateTask} />
      )}
    </main>
  );
}

export default App;
