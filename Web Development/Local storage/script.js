let wisdom = [];

const wisdomClick = function () {
    const text = document.getElementById("text");
    wisdom.push({ text: text.value });
    console.log(wisdom);

    if (wisdom.length % 2 === 0) {
        localStorage.wisdom = JSON.stringify(wisdom);
    }
    renderWisdom();
};

const loadPage = function () {
    const savedWisdom = JSON.parse(localStorage.wisdom || "[]");
    wisdom.push(...savedWisdom);
    console.log(wisdom);
    renderWisdom();
};

const renderWisdom = function () {
    const lines = document.querySelectorAll(".line");
    lines.forEach(line => line.remove());

    wisdom.forEach((elem, index) => {
        const newLine = document.createElement("h4");
        newLine.setAttribute("class", "line");
        const deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = " ❌";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.setAttribute("data-index", index);
        deleteBtn.addEventListener("click", function () {
            deleteLine(index);
        });
        newLine.innerHTML = elem.text;
        newLine.appendChild(deleteBtn);
        document.body.appendChild(newLine);
    });
};

const clearWisdom = function () {
    localStorage.clear();
    wisdom = [];
    const lines = document.querySelectorAll(".line");
    lines.forEach(line => line.remove());
};

const deleteLine = function (index) {
    wisdom.splice(index, 1);
    localStorage.wisdom = JSON.stringify(wisdom);
    renderWisdom();
};