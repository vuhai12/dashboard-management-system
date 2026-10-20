import api from "@/lib/axios";

// Get weekly revenue data
export async function getWeeklyRevenues(date) {
  const response = await api.get("/revenues/week", {
    params: { date },
  });

  return response.data;
}

// Get revenue dashboard data
export const getRevenueDashboard = async (date) => {
  const response = await api.get("/revenues/dashboard", {
    params: date ? { date } : {},
  });

  return response.data;
};

// Create a new revenue record
export async function createRevenue(data) {
  const response = await api.post("/revenues/week", data);

  return response.data;
}

// Update an existing revenue record
export async function updateRevenue(id, data) {
  const response = await api.patch(`/revenues/week/${id}`, data);

  return response.data;
}
