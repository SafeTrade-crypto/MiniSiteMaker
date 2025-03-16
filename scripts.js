document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Handle user registration
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        registerUser(email, password);
    });

    // Handle user login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        loginUser(email, password);
    });

    // Handle mini site creation
    const miniSiteForm = document.getElementById('miniSiteForm');
    miniSiteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('miniSiteTitle').value;
        const description = document.getElementById('miniSiteDescription').value;
        createMiniSite(title, description);
    });

    // Function to display mini sites
    async function displayMiniSites() {
        const miniSitesList = document.getElementById('miniSitesList');
        miniSitesList.innerHTML = '';
        const querySnapshot = await getDocs(collection(db, "MiniSites"));
        querySnapshot.forEach((doc) => {
            const miniSite = doc.data();
            const miniSiteElement = document.createElement('div');
            miniSiteElement.innerHTML = `
                <h3>${miniSite.title}</h3>
                <p>${miniSite.description}</p>
                <p><small>Criado em: ${miniSite.createdAt.toDate().toLocaleDateString()}</small></p>
            `;
            miniSitesList.appendChild(miniSiteElement);
        });
    }

    // Call displayMiniSites on page load
    displayMiniSites();
});
