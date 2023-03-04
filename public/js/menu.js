window.onload = () => {
  
    document.getElementById('menu-categories').onclick = (e) => {
        document.getElementById('categories').classList.toggle('fly-in');
    }

    document.getElementById('filter-options-menu').onclick = (e) => {
        document.getElementById('filter-options').classList.toggle('come-in');
    }

    document.getElementById('close-filter-options').onclick = (e) => {
        document.getElementById('filter-options').classList.remove('come-in');
    }
};