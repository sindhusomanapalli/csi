/* assets/script.js — Web3Forms email sender + basic helpers */

document.addEventListener('DOMContentLoaded', function() {

    // Auto update footer years
    var year = new Date().getFullYear();
    ['yearIndex', 'yearAbout', 'yearServices', 'yearProjects', 'yearContact']
    .forEach(id => {
        var el = document.getElementById(id);
        if (el) el.textContent = year;
    });

    // Highlight active nav link
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar .nav-link').forEach(a => {
        if (a.getAttribute('href') === path) a.classList.add('active');
    });

    // Contact form email sending
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactStatus");

    if (form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            status.textContent = "Sending... Please wait.";

            const formData = new FormData(form);

            // Web3Forms Email API
            fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        status.textContent = "Thanks! Your message has been received. We'll contact you within 48 hours.";
                        form.reset();
                    } else {
                        status.textContent = "Error: " + data.message;
                    }
                })
                .catch(() => {
                    status.textContent = "Something went wrong. Please try again later.";
                });
        });
    }
});