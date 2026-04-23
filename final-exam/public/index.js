const customerForm = document.getElementById("customer-form");
const customerIdInput = document.getElementById("customer-id");
const firstNameInput = document.getElementById("first_name");
const lastNameInput = document.getElementById("last_name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const birthDateInput = document.getElementById("birth_date");
const deleteBtn = document.getElementById("delete-btn");
const clearBtn = document.getElementById("clear-btn");
const saveBtn = document.getElementById("save-btn");
const customerList = document.getElementById("customer-list");

async function loadCustomers() {
  try {
    const res = await fetch("/api/persons");
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();

    customerList.innerHTML = "";
    if (data.length === 0) {
      customerList.innerHTML = "<p>No customers found.</p>";
      return;
    }

    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";
      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong><br>
        Email: ${person.email}<br>
        Phone: ${person.phone || "-"}
      `;
      div.addEventListener("click", () => selectCustomer(person));
      customerList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    customerList.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}

function selectCustomer(person) {
  customerIdInput.value = person.id;
  firstNameInput.value = person.first_name;
  lastNameInput.value = person.last_name;
  emailInput.value = person.email;
  phoneInput.value = person.phone || "";

  if (person.birth_date) {
    birthDateInput.value = person.birth_date.split('T')[0];
  } else {
    birthDateInput.value = "";
  }

  deleteBtn.style.display = "inline-block";
  saveBtn.textContent = "Update Customer";
}

function clearForm() {
  customerForm.reset();
  customerIdInput.value = "";
  deleteBtn.style.display = "none";
  saveBtn.textContent = "Save Customer";
}

async function saveCustomer(e) {
  e.preventDefault();

  const id = customerIdInput.value;
  const personData = {
    first_name: firstNameInput.value,
    last_name: lastNameInput.value,
    email: emailInput.value,
    phone: phoneInput.value || null,
    birth_date: birthDateInput.value || null
  };

  const url = id ? `/api/persons/${id}` : "/api/persons";
  const method = id ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData)
    });

    const result = await res.json();
    if (!res.ok) {
      alert(result.error || "Failed to save customer");
      return;
    }

    clearForm();
    loadCustomers();
  } catch (err) {
    console.error(err);
    alert("Error saving customer");
  }
}

async function deleteCustomer() {
  const id = customerIdInput.value;
  if (!id) return;

  if (!confirm("Are you sure you want to delete this customer?")) return;

  try {
    const res = await fetch(`/api/persons/${id}`, { method: "DELETE" });
    const result = await res.json();
    if (!res.ok) {
      alert(result.error || "Failed to delete customer");
      return;
    }

    clearForm();
    loadCustomers();
  } catch (err) {
    console.error(err);
    alert("Error deleting customer");
  }
}

customerForm.addEventListener("submit", saveCustomer);
deleteBtn.addEventListener("click", deleteCustomer);
clearBtn.addEventListener("click", clearForm);

// Run on page load
loadCustomers();
