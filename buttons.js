const buttons = document.querySelectorAll(".buttons-container > button");
const containers = document.querySelectorAll(".lab-container");

for(let i = 0; i < buttons.length; i++) {
    buttons.item(i).addEventListener("click", () => {
        hideAll();
        let containerId = buttons.item(i).getAttribute("container");
        let container = document.querySelector(`#${containerId}`);
        container.removeAttribute("hidden");
        let height = buttons.item(i).getAttribute("win-height");
        document.body.style.height = height;
    })
};

function hideAll() {
    for(let i = 0; i < containers.length; i++) {
        containers.item(i).setAttribute("hidden", "");
    };
}