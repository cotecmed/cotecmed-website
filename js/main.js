// ===============================
// NAVBAR SCROLL Y MENÚ MÓVIL
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  // Cambia el estilo del navbar al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.remove("scrolled");
      navbar.classList.add("transparent");
    }
  });

  // Menú hamburguesa (móvil)
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Cierra el menú al hacer clic en un enlace
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
});

// ===============================
// FORMULARIO DE CONTACTO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value.trim(),
      correo: form.correo.value.trim(),
      telefono: form.telefono.value.trim(),
      asunto: form.asunto.value.trim(),
      mensaje: form.mensaje.value.trim()
    };

    if (!data.nombre || !data.correo || !data.mensaje) {
      statusMsg.textContent = "⚠️ Por favor completa los campos obligatorios.";
      statusMsg.classList.add("show", "error");
      return;
    }

    statusMsg.textContent = "⏳ Enviando mensaje...";
    statusMsg.classList.add("show");

    // ===============================
    // CONFIGURACIÓN DE CONEXIÓN
    // ===============================
    const proxyUrl = "https://corsproxy.io/?";
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyO7mLz3myS0xRlds3RKys9Fopjl7REEROCq1q54bD0uOupvrAPIYffSnqiOlIF0Ufo3A/exec";

    try {
      const res = await fetch(proxyUrl + scriptUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (result.result === "success") {
        statusMsg.textContent = "✅ Tu mensaje ha sido enviado correctamente.";
        statusMsg.classList.add("show", "success");
        form.reset();

        // Oculta mensaje después de 4 segundos
        setTimeout(() => {
          statusMsg.classList.remove("show", "success");
        }, 4000);
      } else {
        statusMsg.textContent = "❌ Ocurrió un error. Intenta nuevamente.";
        statusMsg.classList.add("show", "error");
      }
    } catch (error) {
      console.error("Error en el envío:", error);
      statusMsg.textContent = "⚠️ Error de conexión. Revisa tu internet.";
      statusMsg.classList.add("show", "error");
    }
  });
});

// ===============================
// ANIMACIONES AOS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      once: true
    });
  }
});
