document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.city-select-toggle');
  const list = document.querySelector('.city-select-list');
  const icon = document.querySelector('.city-select-toggle_icon');
  const searchInput = document.querySelector('.city-select-list__search');
  const items = document.querySelectorAll('.city-select-list__item');

  toggle.addEventListener('click', () => {
    const isVisible = list.classList.contains('city-select-list--show');
    list.classList.toggle('city-select-list--show', !isVisible);
    icon.classList.toggle('city-select-toggle_icon--rotate', !isVisible);
  });

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.classList.toggle('city-select-list__item--hide', !text.includes(searchTerm));
    });
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('.city-select-toggle_city-selected').textContent = item.textContent;
      list.classList.remove('city-select-list--show');
      icon.classList.remove('city-select-toggle_icon--rotate');
    });
  });
});

window.onload = function() {
      setTimeout(() => {
        document.querySelector('.loading').classList.add('d-none'); // Esconde o loading
        document.body.style.overflow = 'auto'; // Restaura a rolagem
      }, 2000); // 2 segundos
    };

    
