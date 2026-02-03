console.log("✅ main.js loaded");

// ===============================
// Sample Tutorial Data
// ===============================
const tutorials = [
  {
    id: 1,
    title: "Python Basics - Getting Started",
    description: "Your first steps in Python programming.",
    category: "python",
    level: "beginner",
    duration: "10:51",
    videoUrl: "https://youtu.be/u68yDCeYhsw",
    thumbnail: "https://img.youtube.com/vi/u68yDCeYhsw/hqdefault.jpg"
  },
  {
    id: 2,
    title: "Python Loops",
    description: "Learn for & while loops.",
    category: "python",
    level: "beginner",
    duration: "12:26",
    videoUrl: "https://youtu.be/KeK274e7XrM",
    thumbnail: "https://img.youtube.com/vi/KeK274e7XrM/hqdefault.jpg"
  },
  {
    id: 3,
    title: "Functions in Python",
    description: "Reusable code using functions.",
    category: "python",
    level: "beginner",
    duration: "18:09",
    videoUrl: "https://youtu.be/D8ISfPzOb2A",
    thumbnail: "https://img.youtube.com/vi/D8ISfPzOb2A/hqdefault.jpg"
  }
];

// ===============================
// DOM READY (IMPORTANT)
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // Mobile Menu
  // ===============================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      const navLinks = document.querySelector(".nav-links");
      if (navLinks) {
        navLinks.style.display =
          navLinks.style.display === "flex" ? "none" : "flex";
      }
    });
  }

  // ===============================
  // Newsletter Form (Formspree)
  // ===============================
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("📩 Newsletter submit");

      const messageEl = document.getElementById("newsletterMessage");
      const submitBtn = newsletterForm.querySelector("button");

      messageEl.textContent = "";
      messageEl.className = "form-message";

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const data = {
        name: document.getElementById("newsletterName").value,
        email: document.getElementById("newsletterEmail").value
      };

      try {
        const res = await fetch("https://formspree.io/f/mqeljdky", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error();

        messageEl.textContent = "✅ Thanks for subscribing!";
        messageEl.className = "form-message success";
        newsletterForm.reset();
      } catch (err) {
        messageEl.textContent = "❌ Subscription failed. Try again.";
        messageEl.className = "form-message error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Subscribe";
      }
    });
  }

  // ===============================
  // Contact Form (Formspree)
  // ===============================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const messageEl = contactForm.querySelector(".form-message");
      const submitBtn = contactForm.querySelector("button");

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const data = {
        name: document.getElementById("contactName").value,
        email: document.getElementById("contactEmail").value,
        subject: document.getElementById("contactSubject").value,
        message: document.getElementById("contactMessage").value
      };

      try {
        const res = await fetch("https://formspree.io/f/xnjzrzyz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error();

        messageEl.textContent = "✅ Message sent!";
        messageEl.className = "form-message success";
        contactForm.reset();
      } catch {
        messageEl.textContent = "❌ Failed to send message.";
        messageEl.className = "form-message error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });
  }

  // ===============================
  // Featured Tutorials
  // ===============================
  const featuredContainer = document.getElementById("featuredTutorials");

  if (featuredContainer) {
    featuredContainer.innerHTML = tutorials
      .map(t => `
        <div class="tutorial-card">
          <div class="tutorial-thumbnail">
            <img src="${t.thumbnail}" alt="${t.title}">
          </div>
          <div class="tutorial-content">
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <a class="btn btn-primary" href="${t.videoUrl}" target="_blank">
              Watch
            </a>
          </div>
        </div>
      `)
      .join("");
  }

  // ===============================
  // Scroll Animations
  // ===============================
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".tutorial-card, .mission-card, .stat-card")
    .forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "0.6s ease";
      observer.observe(el);
    });

});
