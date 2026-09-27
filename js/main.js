/* ==========================================================================
   Breakthrough Author Live — page behavior
   ========================================================================== */

/* ---- EASY-EDIT CONFIG -----------------------------------------------------
   Replace these two values with the real checkout link and coupon code.
   Every "Join the Challenge — $47" button on the page reads from here,
   so you only need to change it in one place. */
const CONFIG = {
  checkoutUrl: "https://example.com/replace-with-real-checkout-link", // PLACEHOLDER: real GHL/checkout URL (shows $950, coupon drops to $47)
  couponCode: "BAL47", // PLACEHOLDER: real coupon code
};
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Dark / light theme toggle — persisted in localStorage.
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("bal-theme");
  if (stored === "dark") {
    root.setAttribute("data-theme", "dark");
    if (toggle) { toggle.textContent = "☀️"; toggle.setAttribute("aria-pressed", "true"); }
  }
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("bal-theme", "light");
        toggle.textContent = "🌙";
        toggle.setAttribute("aria-pressed", "false");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("bal-theme", "dark");
        toggle.textContent = "☀️";
        toggle.setAttribute("aria-pressed", "true");
      }
    });
  }


  // Wire up every CTA button to the real checkout URL.
  document.querySelectorAll("[data-cta]").forEach((btn) => {
    btn.setAttribute("href", CONFIG.checkoutUrl);
  });

  // Fill in the coupon code on the pricing section.
  document.querySelectorAll("[data-coupon]").forEach((el) => {
    el.textContent = CONFIG.couponCode;
  });

  // FAQ accordion — accessible via keyboard (native <button>), one open at a time.
  const faqButtons = document.querySelectorAll(".faq-q");
  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const answer = document.getElementById(button.getAttribute("aria-controls"));

      // Close any other open answers for a clean single-open accordion.
      faqButtons.forEach((other) => {
        if (other !== button) {
          other.setAttribute("aria-expanded", "false");
          const otherAnswer = document.getElementById(other.getAttribute("aria-controls"));
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });
});
