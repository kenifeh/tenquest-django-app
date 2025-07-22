// Main Menu
const menuButton = document.getElementById("menuButton");
const menu = document.querySelector(".menu_links");
menuButton.addEventListener("click", function () {
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
        menuButton.classList.add("menu_open");
    } else {
        menu.style.display = "none";
        menuButton.classList.remove("menu_open");
    }
});
// Submenus
const subMenus = document.querySelectorAll(".sub_menu");
subMenus.forEach((subMenu) => {
    const parentMenuItem = subMenu.closest("li");
    const menuItemLink = parentMenuItem.querySelector(".menu_link");
    menuItemLink.addEventListener("click", function (event) {
        event.preventDefault();
        if (subMenu.style.display === "none" || subMenu.style.display === "") {
            subMenu.style.display = "block";
        } else {
            subMenu.style.display = "none";
        }
    });
});

$(document).ready(function() {
    $('.single_utcs:first-child').addClass('first-child');
    $('.single_utcs:last-child').addClass('last-child');
});

// Tabs
function openTab(tabNumber) {
    var tabs = document.getElementsByClassName("tab");
    var buttons = document.getElementsByClassName("tab-button");

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
        buttons[i].classList.remove("active");
    }

    tabs[tabNumber - 1].style.display = "block";
    buttons[tabNumber - 1].classList.add("active");
}
openTab(1);
