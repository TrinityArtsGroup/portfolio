document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const thankYou = document.getElementById("thankYouMessage");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const action = form.getAttribute("action");

    const response = await fetch(action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.style.display = "none";
      thankYou.style.display = "block";
    } else {
      alert("There was a problem submitting your form.");
    }
  });
});
