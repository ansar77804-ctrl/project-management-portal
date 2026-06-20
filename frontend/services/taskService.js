import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api"
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTasks = async (search = "", page = 1, limit = 10) => {
  const params = {
    ...(search && { search }),
    page,
    limit,
    sortBy: "created_at",
    order: "desc"
  };
  const response = await api.get("/tasks", { params });
  // Handle both paginated and non-paginated responses
  return response.data.tasks || response.data;
};

export const getStatistics = async () => {
  const response = await api.get("/statistics");
  return response.data;
};

export const createTask = async (taskInput) => {
  const response = await api.post("/tasks", taskInput);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await api.put(`/tasks/${taskId}`, { status });
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

export const verifyToken = async () => {
  try {
    const response = await api.post("/auth/verify");
    return response.data;
  } catch (err) {
    throw err;
  }
};
