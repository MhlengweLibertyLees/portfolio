// script.js

window.onload = function () {
  const welcomeMessage = document.getElementById('welcomeMessage');
  const currentHour = new Date().getHours();
  let message;
  
  if (currentHour < 12) {
    message = "Good Morning! Welcome to My Portfolio";
  } else if (currentHour < 18) {
    message = "Good Afternoon! Welcome to My Portfolio";
  } else {
    message = "Good Evening! Welcome to My Portfolio";
  }
  
  welcomeMessage.textContent = message;
  
  // Remove preloader after page loads
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
  
  // Initialize AOS animations
  AOS.init({
    duration: 800,  // Global animation duration (ms)
    once: true      // Each element animates only once
  });
};

// Back-to-top button functionality
window.addEventListener("scroll", function () {
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
