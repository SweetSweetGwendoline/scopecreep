async function loadPresskit() {
    try {
        const response = await fetch('presskit.json');
        const data = await response.json();

        // Title & Header
        document.title = `${data.game.title}`;
        document.getElementById('nav-dev-name').textContent = data.developer.name;
        document.getElementById('nav-game-title').textContent = data.game.title;

        // Hero Section
        document.getElementById('hero-title').textContent = data.game.title;
        document.getElementById('hero-pitch').textContent = data.game.pitch;
        document.getElementById('hero-image').innerHTML = `<img src="${data.media.capsule}" alt="${data.game.title}">`;
        document.getElementById('hero-cta').innerHTML = `<a href="${data.downloads.presskit}" class="btn">Download Presskit (.zip)</a>`;

        // Facts Section
        const factsList = document.getElementById('facts-list');
        for (const [key, value] of Object.entries(data.facts)) {
            factsList.innerHTML += `<div class="fact-item"><strong>${key}</strong>${value}</div>`;
        }

        // Steam Widget
        if (data.game.storewidget) {
            document.getElementById('steam-widget').innerHTML = `
                <iframe src="${data.game.storewidget}" frameborder="0" width="100%" height="190"></iframe>
            `;
        }

        // Trailer
        if (data.game.trailer) {
            // Converts standard watch URL to embed URL
            const videoId = data.game.trailer.split('v=')[1];
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            document.getElementById('trailer-embed').innerHTML = `
                <iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
            `;
        } else {
            document.getElementById('trailer-container').style.display = 'none';
        }

        // Media Grids
        const screenshotsGrid = document.getElementById('screenshots-grid');
        data.media.screenshots.forEach(src => {
            screenshotsGrid.innerHTML += `<a href="${src}" target="_blank"><img src="${src}"></a>`;
        });

        const logosGrid = document.getElementById('logos-grid');
        data.media.logos.forEach(src => {
            logosGrid.innerHTML += `<a href="${src}" target="_blank"><img src="${src}"></a>`;
        });

        // Developer Section
        document.getElementById('dev-name').textContent = data.developer.name;
        const contactList = document.getElementById('dev-contact');
        for (const [platform, url] of Object.entries(data.developer.contact)) {
            contactList.innerHTML += `<li><a href="${url}" target="_blank">${platform}</a></li>`;
        }

        // Downloads Section
        const downloadsList = document.getElementById('downloads-list');
        downloadsList.innerHTML = `<li><a href="${data.downloads.presskit}">Download Presskit (.zip)</a></li>`;

        // Footer
        document.getElementById('footer-copy').textContent = `\u00A9 ${new Date().getFullYear()} ${data.developer.name}`;

    } catch (error) {
        console.error("Error loading presskit data:", error);
    }
}


window.addEventListener('DOMContentLoaded', loadPresskit);


