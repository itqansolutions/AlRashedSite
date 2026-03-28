/* ============================================================
   AL-RASHED – GALLERY.JS
   Masonry Filter & Lightbox Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.services-tabs .tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  // ── FILTERING ────────────────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Manage active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-cat') === filterValue) {
          item.style.display = 'block';
          // Use setTimeout to allow display:block to apply before animating opacity
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300); // match CSS transition duration
        }
      });
    });
  });

  // ── LIGHTBOX ───────────────────────────────────────────────
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent bg scrolling
      }
    });
  });

  // Close via button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close via background click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
});
