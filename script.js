document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('gridContainer');
    const sideInfo = document.getElementById('sideInfo');
    const userForm = document.getElementById('userForm');

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const level = generateLevel(name, dob);
        displayLevel(level);
    });

    function generateLevel(name, dob) {
        // Exemple de génération aléatoire de niveau
        const hash = name.length + dob.length;
        const randomNum = Math.floor(Math.random() * 10) + 1;
        return {
            stars: '★'.repeat(randomNum),
            points: randomNum,
            hash: hash
        };
    }

    function displayLevel(level) {
        const levelInfo = document.createElement('div');
        levelInfo.textContent = `Niveau : ${level.stars} (${level.points}/10)`;
        sideInfo.innerHTML = ''; // Effacer les anciennes informations de niveau
        sideInfo.appendChild(levelInfo);
    }

    // Créer et ajouter les cercles à la grille
    for (let i = 0; i < 40; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');

        // Vérifier si la ligne actuelle a déjà un cercle rouge
        const row = Math.floor(i / 4);
        const isRed = i === row * 4 + getRandomInt(4); // Choix aléatoire dans la rangée

        if (isRed) {
            circle.classList.add('red');
        }

        gridContainer.appendChild(circle);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Afficher le nombre de cercles allumés par ligne et les points sur le côté gauche de l'écran
    const circlesPerRow = countCirclesPerRow();
    circlesPerRow.forEach((count, index) => {
        const lineInfo = document.createElement('div');
        const points = count > 0 ? Math.floor(Math.random() * 10) + 1 : 0; // Nombre de points aléatoire
        lineInfo.textContent = `Ligne ${index + 1} : ${count} (${points}/10)`;
        sideInfo.appendChild(lineInfo);
    });

    // Fonction pour compter le nombre de cercles allumés par ligne
    function countCirclesPerRow() {
        const counts = new Array(10).fill(0); // Initialiser un tableau avec 10 lignes (index 0 à 9) et compteur à 0
        const circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            const rowIndex = Math.floor(Array.from(circle.parentNode.children).indexOf(circle) / 4); // Trouver l'index de la ligne
            counts[rowIndex]++;
        });
        return counts;
    }
});
