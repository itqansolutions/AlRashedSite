/* ============================================================
   AL-RASHED – CONTACT.JS
   AJAX form submission for contact page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusDiv = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري الإرسال...';
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        const res = await fetch('api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
          form.reset();
          statusDiv.style.color = '#4CAF50';
          statusDiv.textContent = document.documentElement.lang === 'en' ? 'Message sent successfully. We will contact you soon.' : 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.';
          statusDiv.style.display = 'block';
        } else {
          statusDiv.style.color = '#ff5050';
          statusDiv.textContent = result.error || 'حدث خطأ. يرجى المحاولة مرة أخرى.';
          statusDiv.style.display = 'block';
        }
      } catch (err) {
        console.error(err);
        statusDiv.style.color = '#ff5050';
        statusDiv.textContent = 'حدث خطأ في الاتصال بالخادم.';
        statusDiv.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});
