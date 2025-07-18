// List of popular places in Goa
const places = [
    {
        name: 'Baga Beach',
        img: 'https://static.toiimg.com/thumb/msid-59486326,width=1200,height=900/59486326.jpg',
        desc: 'Famous for its lively beach parties, water sports, and shacks.'
    },
    {
        name: 'Basilica of Bom Jesus',
        img: 'https://s7ap1.scene7.com/is/image/incredibleindia/basilica-of-bom-jesus-goa-2-musthead-hero?qlt=82&ts=1742156651015',
        desc: 'UNESCO World Heritage Site, known for its baroque architecture.'
    },
    {
        name: 'Dudhsagar Falls',
        img: 'https://imgmediagumlet.lbb.in/media/2021/10/6165b8de6a9fc04e3f38c58c_1634056414914.jpg',
        desc: 'Spectacular four-tiered waterfall located on the Mandovi River.'
    },
    {
        name: 'Fort Aguada',
        img: 'https://s7ap1.scene7.com/is/image/incredibleindia/fort-aguada-goa-1-musthead-hero?qlt=82&ts=1742172021596',
        desc: '17th-century Portuguese fort with panoramic views of the Arabian Sea.'
    },
    {
        name: 'Anjuna Flea Market',
        img: 'https://media1.thrillophilia.com/filestore/im5nqd5xl4j7dxsmgcbh3bxxgyin_1574855580_1_6ozxU8h6ehzSascJU5Olhw.jpeg',
        desc: 'Vibrant market famous for souvenirs, clothes, and jewelry.'
    },
    {
        name: 'Palolem Beach',
        img: 'https://www.tourmyindia.com/states/goa/image/palolem-beach-banner.webp',
        desc: 'Scenic crescent-shaped beach with calm waters and palm trees.'
    }
];

const grid = document.querySelector('.places-grid');
const favoritesList = document.getElementById('favorites-list');

// Load favorites from LocalStorage
let favorites = JSON.parse(localStorage.getItem('goaFavorites') || '[]');

function renderPlaces() {
    grid.innerHTML = '';
    places.forEach((place, idx) => {
        const card = document.createElement('div');
        card.className = 'place-card fade-in';
        card.innerHTML = `
            <img src="${place.img}" alt="${place.name}">
            <div class="info">
                <h3>${place.name}</h3>
                <p>${place.desc}</p>
            </div>
            <button class="favorite-btn${favorites.includes(place.name) ? ' favorited' : ''}" title="Add to Favorites">&#9733;</button>
        `;
        // Favorite button logic
        const favBtn = card.querySelector('.favorite-btn');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(place.name);
            favBtn.classList.toggle('favorited');
        });
        // Card click: show alert with place name
        card.addEventListener('click', () => {
            alert(`You clicked on ${place.name}!`);
        });
        grid.appendChild(card);
    });
    observeFadeIn();
}

function renderFavorites() {
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<li>No favorites yet. Click the star to add!</li>';
        return;
    }
    favorites.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        favoritesList.appendChild(li);
    });
}

function toggleFavorite(name) {
    if (favorites.includes(name)) {
        favorites = favorites.filter(fav => fav !== name);
    } else {
        favorites.push(name);
    }
    localStorage.setItem('goaFavorites', JSON.stringify(favorites));
    renderFavorites();
}

// New Web Feature: Intersection Observer for fade-in effect
function observeFadeIn() {
    const cards = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(40px)';
        observer.observe(card);
    });
}

// Initial render
renderPlaces();
renderFavorites(); 
