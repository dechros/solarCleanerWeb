var expanded = false;

function expandButtonClick() {
    var leftMenu = document.querySelector(".leftMenu");
    if (expanded) {
        leftMenu.classList.remove("expanded");
    } else {
        leftMenu.classList.add("expanded");
    }
    expanded = !expanded;
}