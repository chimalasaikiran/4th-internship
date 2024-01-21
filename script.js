const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

console.log(itemsArray);

document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item");
    createItem(item);
});

function displayItems() {
    let items = "";
    for (let i = 0; i < itemsArray.length; i++) {
        items += `
            <div class="item">
                <div class="input-controller">
                    <textarea disabled>${itemsArray[i]}</textarea>
                    <div class="edit-controller">
                    <i class='bx bxs-trash-alt deleteBtn'></i>                        <i class='bx bx-edit editBtn'></i>
                    </div>
                </div>
                <div class="update-controller">
                    <button class="saveBtn">Save</button>
                    <button class="cancelBtn">Cancel</button>
                </div>
            </div>`;
    }
    document.querySelector(".to-do-list").innerHTML = items;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners(); // Call the new function to activate cancel listeners
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => {
            deleteItem(i);
        });
    });
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn");
    const updatecontroller = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((ed, i) => {
        ed.addEventListener("click", () => {
            updatecontroller[i].style.display = "block";
            inputs[i].disabled = false;
        });
    });
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i);
        });
    });
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updatecontroller = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cd, i) => {
        cd.addEventListener("click", () => {
            updatecontroller[i].style.display = "none";
            inputs[i].disabled = true;
        });
    });
}

function updateItem(text, i) {
    itemsArray[i] = text;
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
}

function deleteItem(i) {
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
}

function createItem(item) {
    itemsArray.push(item.value);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
}

function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
    displayDate();
    displayItems();
};
