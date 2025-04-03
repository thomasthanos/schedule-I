const categories = [
    {
        name: "Meth",
        drugs: [
            { name: "Shiny Crack", materials: ["Mouth Wash", "Donut", "Cuke", "Flu Medicine", "Battery", "Mega Bean", "Horse Semen"] }
        ]
    },
    {
        name: "Μαριχουάνα",
        drugs: [
            { name: "Marijuana", materials: ["Cannabis Plant", "THC Extract"] },
            { name: "Psilocybin", materials: ["Psilocybe Mushrooms"] }
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
    if (!selectedDrug) {
        title.textContent = "ΕΠΙΛΕΞΕ ΕΝΑ ΝΑΡΚΩΤΙΚΟ";
        section.innerHTML = `
            <div class="placeholder">
                <div class="placeholder-icon"></div>
                <p>Επίλεξε ένα ναρκωτικό από το μενού για να δεις τα υλικά.</p>
            </div>
        `;
        return;
    }
    const category = categories.find(cat => cat.name === selectedDrug.category);
    const drug = category.drugs[selectedDrug.drugIndex];
    title.textContent = drug.name;
    section.innerHTML = `
        <ul class="material-list">
            ${drug.materials.map(material => `
                <li>${material}</li>
            `).join("")}
        </ul>
    `;
}

function selectDrug(categoryName, drugIndex) {
    selectedDrug = { category: categoryName, drugIndex: drugIndex };
    renderMenu();
    renderMaterials();
}

// Απενεργοποίηση δεξιού κλικ και άλλων ενεργειών
document.addEventListener("DOMContentLoaded", () => {
    const materialsSection = document.getElementById("materialsSection");
    
    // Απενεργοποίηση δεξιού κλικ
    materialsSection.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
    };

    // Αποτροπή επιλογής κειμένου
    materialsSection.onselectstart = (e) => {
        e.preventDefault();
        return false;
    };

    // Αποτροπή drag
    materialsSection.ondragstart = (e) => {
        e.preventDefault();
        return false;
    };

    // Ανίχνευση DevTools (όχι 100% αξιόπιστο, αλλά δυσκολεύει)
    const devtoolsDetector = () => {
        const threshold = 160;
        if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
            document.body.innerHTML = "<h1>DevTools detected! Access denied.</h1>";
        }
    };
    setInterval(devtoolsDetector, 1000);
});

// Initial render
renderMenu();
renderMaterials();