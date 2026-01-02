const API_URL = "https://wedding-backend-zsdc.onrender.com";

export function connection() {
  return fetch(`${API_URL}/guests`)
    .then((res) => res.json())
    .then((data) => data);
}

export function addGuest(guest) {
  return fetch(`${API_URL}/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guest),
  });
}

// para confimar asistencia
export function confirmGuest(guest) {
  return fetch(`${API_URL}/guests/${guest._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      asistencia: guest.asistencia,
    }),
  });
}

export function updateGuest(guest) {
  return fetch(`${API_URL}/guests/${guest._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guest),
  });
}

export function deleteGuest(guestId) {
  return fetch(`${API_URL}/guests/${guestId}`, {
    method: "DELETE",
  });
}
