document.getElementById("menu-categories").onclick = () => {
    document.getElementById("categories").classList.toggle("fly-in");
};

document.getElementById("filter-options-menu").onclick = () => {
    document.getElementById("filter-options").classList.toggle("come-in");
    document.getElementById("overlay").classList.toggle("hidden");
};

document.getElementById("close-filter-options").onclick = () => {
    document.getElementById("filter-options").classList.remove("come-in");
    document.getElementById("overlay").classList.add("hidden");
};

document.getElementById("overlay").onclick = () => {
    document.getElementById("filter-options").classList.remove("come-in");
    document.getElementById("overlay").classList.add("hidden");
};

const filterCheckboxes = document.querySelectorAll(
    "#filter-options input[type=checkbox]"
);

filterCheckboxes.forEach((filterCheckbox) => {
    filterCheckbox.onchange = () => {
        updateFilterNumbers();
    };
});

function updateFilterNumbers() {
    const form = document.querySelector("#filter-options form");
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    fetch(`/api/filter-numbers?${queryString}`)
        .then((response) => response.json())
        .then((filterNumbers) => {
            const list = document.querySelectorAll(".filterNumber");
            list.forEach((el) => {
                if (filterNumbers[el.dataset.filter] != null) {
                    if (filterNumbers[el.dataset.filter] === 0) {
                        el.parentElement.previousElementSibling.disabled = true;
                    } else {
                        el.parentElement.previousElementSibling.disabled = false;
                    }
                    el.textContent = `(${filterNumbers[el.dataset.filter]})`;
                }
            });
            document.querySelector(
                "#filter-options input[type=submit]"
            ).value = `Show methods (${filterNumbers.total})`;
        })
        .catch((error) => console.log(error));
}

updateFilterNumbers();

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const logo = entry.target.querySelector(".flipable");
            logo?.classList.toggle("flip", entry.isIntersecting);
        });
    },
    { threshold: 1 }
);

const categoryLogos = document.querySelectorAll(
    ".category-description:has(.flipable)"
);

categoryLogos.forEach((element) => {
    observer.observe(element);
});
