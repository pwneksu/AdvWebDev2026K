
// ===============================
// Form handling for resources page
// ===============================

// -------------- Helpers --------------
function $(id) {
  return document.getElementById(id);
}

function logSection(title, data) {
  console.group(title);
  console.log(data);
  console.groupEnd();
}

function isNameValid(val) {
  return val.length >= 5 && val.length <= 30 && ALPHANUMERIC_PATTERN.test(val);
}

function isDescValid(val) {
  return val.length >= 10 && val.length <= 50 && ALPHANUMERIC_PATTERN.test(val);
}

// -------------- Form wiring --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = $("resourceForm");
  if (!form) {
    console.warn("resourceForm not found. Ensure the form has id=\"resourceForm\".");
    return;
  }

  form.addEventListener("submit", onSubmit);
});

async function onSubmit(event) {
  event.preventDefault();
  const submitter = event.submitter;
  const actionValue = submitter && submitter.value ? submitter.value : "create";

  const rawName = $("resourceName")?.value ?? "";
  const rawDesc = $("resourceDescription")?.value ?? "";
  const rawPrice = $("resourcePrice")?.value ?? "";
  var price = parseFloat(rawPrice.trim() == "" ? 0 : rawPrice.trim() );

  const payload = {
    action: actionValue,
    resourceName: rawName.trim(),
    resourceDescription: rawDesc.trim(),
    resourceAvailable: $("resourceAvailable")?.checked ?? false,
    resourcePrice: price,
    resourcePriceUnit: document.querySelector('input[name="resourcePriceUnit"]:checked')?.value ?? "hour"
  };

  if (!isNameValid(payload.resourceName) || 
      !isDescValid(payload.resourceDescription)) {
    console.warn("Form submission blocked: Invalid data detected.");
    alert("Please correct the errors in the form before submitting.");
    return; 
  }

  logSection("Sending payload to httpbin.org/post", payload);

  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText}\n${text}`);
    }

    const data = await response.json();

    console.group("Response from httpbin.org");
    console.log("Status:", response.status);
    console.log("URL:", data.url);
    console.log("You sent (echo):", data.json);
    console.log("Headers (echoed):", data.headers);
    console.groupEnd();

  } catch (err) {
    console.error("POST error:", err);
  }
}
