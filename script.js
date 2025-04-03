const categories = [
    {
        name: "Meth",
        drugs: [
            { name: "Shiny Crack", materials: ["meth" , "Mouth Wash", "Donut", "Cuke", "Flu Medicine", "Battery", "Mega Bean", "Horse Semen"] },
            { name: "Hairy Punch", materials: ["meth" , "Mouth Wash", "Donut", "Cuke", "Flu Medicine", "battery", "Mega Bean"] }
        ]
    },
    {
        name: "Μαριχουάνα",
        drugs: [
            { name: "Aspen Diamond", materials: ["Green Crack", "Viagra", "Paracetamol"] }
        ]
    },
    {
        name: "Cocaine",
        drugs: [
            { name: "Cocaine", materials: ["Coca Leaves", "Sulfuric Acid", "Kerosene"] }
        ]
    },
];

let selectedDrug = null;

function renderMenu() {
    const menu = document.getElementById("drugsMenu");
    menu.innerHTML = "";
    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";
        categoryDiv.innerHTML = `
            <h3>${category.name}</h3>
            <ul>
                ${category.drugs.map((drug, drugIndex) => `
                    <li class="${selectedDrug && selectedDrug.category === category.name && selectedDrug.drugIndex === drugIndex ? 'active' : ''}" 
                        onclick="selectDrug('${category.name}', ${drugIndex})">
                        ${drug.name}
                    </li>
                `).join("")}
            </ul>
        `;
        menu.appendChild(categoryDiv);
    });
}

function renderMaterials() {
    const section = document.getElementById("materialsSection");
    const title = document.getElementById("selectedDrugName");
    
    // Προσθέτουμε κλάση για το transition
    title.classList.remove("fade-in");
    section.classList.remove("fade-in");
    
    if (!selectedDrug) {
        title.textContent = "ΕΠΙΛΕΞΕ ΕΝΑ ΝΑΡΚΩΤΙΚΟ";
        section.innerHTML = `
            <div class="placeholder">
                <div class="placeholder-icon"></div>
                <p>Επίλεξε ένα ναρκωτικό από το μενού για να δεις τα υλικά.</p>
            </div>
        `;
    } else {
        const category = categories.find(cat => cat.name === selectedDrug.category);
        const drug = category.drugs[selectedDrug.drugIndex];
        title.textContent = drug.name;
        section.innerHTML = `
            <ul class="material-list">
                ${drug.materials.map((material, index) => `
                    <li>${index === 0 ? "- " + material : material}</li>
                `).join("")}
            </ul>
        `;
    }
    
    // Ενεργοποιούμε το transition
    void title.offsetWidth; // Trigger reflow για να ξαναρχίσει το animation
    void section.offsetWidth; // Trigger reflow για να ξαναρχίσει το animation
    title.classList.add("fade-in");
    section.classList.add("fade-in");
}

function selectDrug(categoryName, drugIndex) {
    selectedDrug = { category: categoryName, drugIndex: drugIndex };
    renderMenu();
    renderMaterials();
    // Κλείνουμε το sidebar σε κινητά μετά την επιλογή
    if (window.innerWidth <= 1024) {
        document.getElementById("sidebar").classList.remove("active");
        document.getElementById("hamburgerMenu").classList.remove("active");
    }
}

// Hamburger Menu Toggle
document.getElementById("hamburgerMenu").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburgerMenu");
    sidebar.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Απενεργοποίηση δεξιού κλικ σε όλη τη σελίδα
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
});

// Αποτροπή drag και επιλογής κειμένου
document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
});

document.addEventListener("selectstart", (e) => {
    e.preventDefault();
    return false;
});

// Απενεργοποίηση συντομεύσεων για DevTools (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
document.addEventListener("keydown", (e) => {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
        showIntruderAlert();
        return false;
    }
});

// Ενισχυμένη ανίχνευση DevTools
const detectDevTools = () => {
    const threshold = 200;
    const devToolsOpen = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;

    const isFirebug = typeof window.console !== "undefined" && window.console.firebug;
    const isDevTools = devToolsOpen || isFirebug || (window.__DEVTOOLS__ !== undefined);

    if (isDevTools) {
        showIntruderAlert();
    }
};

// Εμφάνιση του Intruder Alert
const showIntruderAlert = () => {
    document.body.innerHTML = `
        <div class="intruder-container">
            <div class="intruder-content">
                <h1>INTRUDER ALERT!</h1>
                <p>Nice try, but this vault is locked tighter than a dealer's stash.</p>
                <p>Close the DevTools to proceed, or enjoy the glitch show!</p>
            </div>
        </div>
    `;
};

// Εκτέλεση ανίχνευσης κάθε 500ms
setInterval(detectDevTools, 500);

// Initial render
renderMenu();
renderMaterials();