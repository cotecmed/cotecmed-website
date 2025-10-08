document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // NAVBAR SCROLL Y MENÚ MÓVIL
  // ===============================
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.remove("scrolled");
      navbar.classList.add("transparent");
    }
  });

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  // ===============================
  // FORMULARIO DE CONTACTO
  // ===============================
  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        nombre: form.nombre.value.trim(),
        correo: form.correo.value.trim(),
        telefono: form.telefono.value.trim(),
        asunto: form.asunto.value.trim(),
        mensaje: form.mensaje.value.trim()
      };

      // Validación de campos obligatorios
      if (!data.nombre || !data.correo || !data.mensaje) {
        statusMsg.textContent = "⚠️ Por favor completa los campos obligatorios.";
        statusMsg.classList.add("show", "error");
        return;
      }

      // Validación de correo electrónico
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correoValido.test(data.correo)) {
        statusMsg.textContent = "⚠️ Ingresa un correo válido.";
        statusMsg.classList.add("show", "error");
        return;
      }

      statusMsg.textContent = "⏳ Enviando mensaje...";
      statusMsg.classList.add("show");

      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbyo-2hd35Bt3KQttPN1u5PF2ylY54qz-2pmYeF_lDn-u50w7bUGBwF1coXS-70QbJ5GkA/exec",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const result = await res.json();

        if (result.result === "success") {
          statusMsg.textContent = "✅ Tu mensaje ha sido enviado correctamente.";
          statusMsg.classList.add("show", "success");
          form.reset();
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
  }

  // ===============================
  // ANIMACIONES AOS
  // ===============================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      once: true
    });
  }
});
