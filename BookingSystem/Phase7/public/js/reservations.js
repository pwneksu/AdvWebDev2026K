import { initAuthUI, getUserRole, requireAuthOrBlockPage, logout, getTokenPayload } from "./auth-ui.js";

window.logout = logout;

initAuthUI();
if (!requireAuthOrBlockPage()) {
    throw new Error("Authentication required");
}

const payload = getTokenPayload();
const role = getUserRole();

const reservationForm = document.getElementById("reservationForm");
const reservationIdInput = document.getElementById("reservationId");
const resourceSelect = document.getElementById("resourceId");
const userIdInput = document.getElementById("userId");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const noteInput = document.getElementById("note");
const statusSelect = document.getElementById("status");
const reservationListEl = document.getElementById("reservationList");
const formMessage = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");

let reservationsCache = [];
let formMode = "create";

if (payload && payload.sub) {
    userIdInput.value = payload.sub;
}

async function loadResources() {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/resources", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await res.json();
        if (res.ok && Array.isArray(body.data)) {
            resourceSelect.innerHTML = '<option value="" disabled selected>Select a resource</option>';
            body.data.forEach(r => {
                const option = document.createElement("option");
                option.value = r.id;
                option.textContent = r.name;
                resourceSelect.appendChild(option);
            });
        }
    } catch (err) {
        console.error("Failed to load resources:", err);
    }
}

async function loadReservations() {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/reservations", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await res.json();
        if (res.ok && Array.isArray(body.data)) {
            reservationsCache = body.data;
            renderReservationList(reservationsCache);
        }
    } catch (err) {
        console.error("Failed to load reservations:", err);
    }
}

function renderReservationList(reservations) {
    if (!reservationListEl) return;
    reservationListEl.innerHTML = reservations
        .map((r) => {
            const start = new Date(r.start_time).toLocaleString();
            return `
        <button
          type="button"
          data-reservation-id="${r.id}"
          class="w-full text-left rounded-2xl border border-black/10 bg-white px-4 py-3 transition hover:bg-black/5"
        >
          <div class="font-semibold truncate">${r.resource_name || 'Resource ' + r.resource_id}</div>
          <div class="text-xs text-black/60">${start}</div>
          <div class="text-xs font-medium text-brand-primary uppercase">${r.status}</div>
        </button>
      `;
        })
        .join("");

    reservationListEl.querySelectorAll("[data-reservation-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.reservationId);
            const reservation = reservationsCache.find((x) => Number(x.id) === id);
            if (reservation) selectReservation(reservation);
        });
    });
}

function selectReservation(r) {
    reservationIdInput.value = r.id;
    resourceSelect.value = r.resource_id;
    userIdInput.value = r.user_id;
    
    if (r.start_time) startTimeInput.value = new Date(r.start_time).toISOString().slice(0, 16);
    if (r.end_time) endTimeInput.value = new Date(r.end_time).toISOString().slice(0, 16);
    
    noteInput.value = r.note || "";
    statusSelect.value = r.status || "active";

    formMode = "edit";
    submitBtn.textContent = "Update Reservation";
    submitBtn.value = "update";
    
    // Add delete button if it doesn't exist
    if (!document.getElementById("deleteBtn")) {
        const deleteBtn = document.createElement("button");
        deleteBtn.id = "deleteBtn";
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out bg-rose-600 text-white hover:bg-rose-700 shadow-soft";
        deleteBtn.addEventListener("click", () => handleDelete(r.id));
        document.getElementById("reservationActions").appendChild(deleteBtn);
    }
    
    clearFormMessage();
}

function clearForm() {
    reservationForm.reset();
    reservationIdInput.value = "";
    if (payload && payload.sub) userIdInput.value = payload.sub;
    formMode = "create";
    submitBtn.textContent = "Create Reservation";
    submitBtn.value = "create";
    const deleteBtn = document.getElementById("deleteBtn");
    if (deleteBtn) deleteBtn.remove();
    clearFormMessage();
}

function showMessage(type, msg) {
    formMessage.textContent = msg;
    formMessage.className = `mt-6 rounded-2xl border px-4 py-3 text-sm ${
        type === "success" ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700"
    }`;
    formMessage.classList.remove("hidden");
}

function clearFormMessage() {
    formMessage.classList.add("hidden");
}

async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/reservations/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (res.ok) {
            showMessage("success", "Reservation deleted successfully");
            clearForm();
            loadReservations();
        } else {
            showMessage("error", "Failed to delete reservation");
        }
    } catch (err) {
        showMessage("error", "Network error");
    }
}

reservationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const action = submitBtn.value;
    
    // Basic validation
    if (!resourceSelect.value) {
        return showMessage("error", "Please select a resource.");
    }
    if (!userIdInput.value || userIdInput.value === "0") {
        return showMessage("error", "Please provide a valid User ID.");
    }
    if (!startTimeInput.value || !endTimeInput.value) {
        return showMessage("error", "Please provide both start and end times.");
    }

    const start = new Date(startTimeInput.value);
    const end = new Date(endTimeInput.value);

    if (end <= start) {
        return showMessage("error", "End time must be after start time.");
    }

    const payloadData = {
        resourceId: Number(resourceSelect.value),
        userId: Number(userIdInput.value),
        startTime: startTimeInput.value,
        endTime: endTimeInput.value,
        note: noteInput.value,
        status: statusSelect.value
    };

    try {
        const token = localStorage.getItem("token");
        let url = "/api/reservations";
        let method = "POST";
        
        if (action === "update") {
            const id = reservationIdInput.value;
            url = `/api/reservations/${id}`;
            method = "PUT";
        }

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payloadData)
        });

        const body = await res.json();
        if (res.ok) {
            showMessage("success", `Reservation ${action === "create" ? "created" : "updated"} successfully`);
            clearForm();
            loadReservations();
        } else {
            showMessage("error", body.error || "Operation failed");
        }
    } catch (err) {
        showMessage("error", "Network error");
    }
});

clearBtn.addEventListener("click", clearForm);

// Initial load
loadResources();
loadReservations();
