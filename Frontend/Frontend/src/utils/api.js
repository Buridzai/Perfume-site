const API_URL = import.meta.env.VITE_API_URL;

// GET request
export async function apiGet(endpoint, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return await res.json();
}

// POST JSON
export async function apiPost(endpoint, data, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("Raw response:", text);

  if (!res.ok) throw new Error(`HTTP ${res.status} - ${text}`);
  return JSON.parse(text);
}

// POST FormData
export async function apiPostForm(endpoint, formData, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) throw new Error("POST form failed");
  return await res.json();
}

// PUT
export async function apiPut(endpoint, data, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("PUT request failed");
  return await res.json();
}

// DELETE
export async function apiDelete(endpoint, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("DELETE failed");
  return await res.json();
}
