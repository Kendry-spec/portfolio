// NAV ACTIVE ON SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// FORM VALIDATION
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const btn = document.getElementById("submit-btn");

if (form) {

  function setError(input, message) {
    const error = input.nextElementSibling;
    error.innerText = message;
    input.classList.add("error-border");
  }

  function clearError(input) {
    const error = input.nextElementSibling;
    error.innerText = "";
    input.classList.remove("error-border");
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Reset state
    status.innerText = "";
    status.className = "";

    [name, email, message].forEach(clearError);

    // Validation
    if (name.value.trim() === "") {
      setError(name, "Name is required");
      valid = false;
    }

    if (email.value.trim() === "") {
      setError(email, "Email is required");
      valid = false;
    } else if (!validateEmail(email.value)) {
      setError(email, "Enter a valid email");
      valid = false;
    }

    if (message.value.trim() === "") {
      setError(message, "Message cannot be empty");
      valid = false;
    }

    if (!valid) return;

    // Loading state
    btn.innerText = "Sending...";
    btn.disabled = true;

    // SEND EMAIL (EmailJS)
    emailjs.sendForm(
      "service_n5qcubs",
      "template_q5hjsk9",
      form
    )
    .then(() => {
      status.innerText = "Message sent successfully! I’ll get back to you soon.";
      status.classList.add("success");
      form.reset();
    })
    .catch((error) => {
      status.innerText = "Failed to send message. Try again.";
      status.classList.add("fail");
      console.log(error);
    })
    .finally(() => {
      btn.innerText = "Send Message";
      btn.disabled = false;
    });
  });
}