document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".linknav");
    buttons.forEach( (e) => {
        e.addEventListener("click", () => {
            window.location.replace(e.dataset.dir);
        })
    })
})