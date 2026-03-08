// Get all sections and nav links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

// When the user scroll
window.addEventListener("scroll", () => {

  let current = "";

    // check which section user is in
  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

    // highlight the link
  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }

  });

});