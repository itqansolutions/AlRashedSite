/* ============================================================
   AL-RASHED – BOOKING.JS
   Multi-step form logic, dependent selects, API submission
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  const totalSteps = 3;

  const form       = document.getElementById('bookingForm');
  const nextBtn    = document.getElementById('nextBtn');
  const prevBtn    = document.getElementById('prevBtn');
  const submitBtn  = document.getElementById('submitBtn');
  const errorDiv   = document.getElementById('formError');
  const dots       = document.querySelectorAll('.step-dot');
  const panels     = document.querySelectorAll('.step-panel');

  const brandSel   = document.getElementById('brand');
  const modelSel   = document.getElementById('model');
  const yearSel    = document.getElementById('year');
  const dateInput  = document.getElementById('date');

  // Prevent selecting past dates
  const today = new Date().toISOString().split('T')[0];
  if(dateInput) dateInput.setAttribute('min', today);

  // ── VEHICLE DATA MAPPING ─────────────────────────────────────
  const vehicleData = {
    "Mercedes-Benz": ["A-Class","B-Class","C-Class","E-Class","S-Class","CLA","CLS","GLA","GLB","GLC","GLE","GLS","G-Class","AMG GT","EQC","EQS","EQE","Other"],
    "Range Rover":   ["Range Rover","Sport","Velar","Evoque","Discovery","Discovery Sport","Defender","Other"]
  };

  // Populate Years dropdown
  if (yearSel) {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 2000; y--) {
      let opt = document.createElement('option');
      opt.value = y; opt.text = y;
      yearSel.add(opt);
    }
  }

  // Handle Brand change -> Update Model dropdown
  if (brandSel && modelSel) {
    brandSel.addEventListener('change', function() {
      const brand = this.value;
      modelSel.innerHTML = '<option value="" disabled selected>اختر الموديل</option>';
      if (vehicleData[brand]) {
        vehicleData[brand].forEach(model => {
          let opt = document.createElement('option');
          opt.value = model; opt.text = model;
          modelSel.add(opt);
        });
        modelSel.disabled = false;
        yearSel.disabled = false;
      } else {
        modelSel.disabled = true;
        yearSel.disabled = true;
      }
    });

    // Check URL parameters (e.g., from brands page)
    const urlParams = new URLSearchParams(window.location.search);
    const paramBrand = urlParams.get('brand');
    if (paramBrand) {
      if (paramBrand.toLowerCase() === 'mercedes') {
        brandSel.value = 'Mercedes-Benz';
        brandSel.dispatchEvent(new Event('change'));
      } else if (paramBrand.toLowerCase() === 'rangerover') {
        brandSel.value = 'Range Rover';
        brandSel.dispatchEvent(new Event('change'));
      }
    }
  }

  // ── MULTI-STEP LOGIC ───────────────────────────────────────
  function showStep(step) {
    panels.forEach((p, idx) => p.classList.toggle('active', idx === step - 1));
    
    dots.forEach((d, idx) => {
      d.classList.remove('active', 'done');
      if (idx === step - 1) d.classList.add('active');
      else if (idx < step - 1) d.classList.add('done');
    });

    if (step === 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'inline-block';
      submitBtn.style.display = 'none';
    } else if (step === totalSteps) {
      prevBtn.style.display = 'inline-block';
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-block';
    } else {
      prevBtn.style.display = 'inline-block';
      nextBtn.style.display = 'inline-block';
      submitBtn.style.display = 'none';
    }
    errorDiv.style.display = 'none';
  }

  function validateCurrentStep() {
    const inputs = panels[currentStep - 1].querySelectorAll('input, select');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.checkValidity()) {
        inp.reportValidity();
        valid = false;
      }
    });
    return valid;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        currentStep++;
        showStep(currentStep);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentStep--;
      showStep(currentStep);
    });
  }

  // ── FORM SUBMISSION ────────────────────────────────────────
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateCurrentStep()) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري الإرسال...';
      errorDiv.style.display = 'none';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        const res = await fetch('api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
          // Hide form, show success
          form.style.display = 'none';
          document.getElementById('bookingSteps').style.display = 'none';
          
          const successDiv = document.getElementById('bookingSuccess');
          successDiv.classList.add('visible');

          // Generate WhatsApp deep link
          const waLink = document.getElementById('waDeepLink');
          if (waLink) {
            const text = `أهلاً، لقد قمت بحجز موعد صيانة جديد عبر الموقع الإلكتروني.\nالاسم: ${data.name}\nالسيارة: ${data.brand} ${data.model}\nالخدمة: ${data.service}\nتاريخ الحجز: ${data.date}`;
            waLink.href = `https://wa.me/201000000000?text=${encodeURIComponent(text)}`;
          }
        } else {
          errorDiv.textContent = result.error || 'حدث خطأ. يرجى المحاولة مرة أخرى.';
          errorDiv.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = document.documentElement.lang === 'en' ? 'Confirm Booking' : 'تأكيد الحجز';
        }
      } catch (err) {
        console.error(err);
        errorDiv.textContent = 'حدث خطأ في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.';
        errorDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = document.documentElement.lang === 'en' ? 'Confirm Booking' : 'تأكيد الحجز';
      }
    });
  }
});
