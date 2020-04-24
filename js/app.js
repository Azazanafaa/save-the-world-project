const dropdown = document.querySelector('#dropdown');
const dropnav = document.querySelector('.nav-holder');

const presentationSection = document.querySelector('#presentation');
const teamSection = document.querySelector('#team');
const storiesSection = document.querySelector('#stories');
const supportSection = document.querySelector('#support');

const presentationNav = document.querySelector('#pre');
const teamNav = document.querySelector('#tea');
const storiesNav = document.querySelector('#sto');
const supportNav = document.querySelector('#sup');

const navItems = [presentationNav, teamNav, storiesNav, supportNav];

const firstsection = document.getElementById('firstsection');
const header = document.querySelector('.header-holder');
const footer = document.getElementById('footer');


const teamCards = document.getElementsByClassName('team-card');
const supportCards = document.querySelectorAll('.support-card');
const deleteSpans = document.querySelectorAll('.close-btn');
const cardBlock = document.querySelector('#support-cards');

const form = document.getElementById('form');
const submitBtn = document.getElementById('submitForm');
const card_title = document.getElementById('support-title');
const card_message = document.getElementById('support-text');
const errorMsg = document.querySelector('.error-msg');

const showMoreBtn = document.querySelector('.show-more');

let sectionReached;
let navReached;

function hideCards() {
    for (let index = 3; index < teamCards.length; index++) {
        teamCards[index].classList.add('hide-card');
    }
}

if (teamCards.length > 3) {
    this.hideCards();
}

showMoreBtn.addEventListener('click', () => {
    const hiddenCards = document.querySelectorAll('.hide-card');
    console.log(hiddenCards);
    if (hiddenCards.length > 0) {
        for (let card of hiddenCards) {
            card.classList.remove('hide-card')
        }
        showMoreBtn.textContent = 'Show Less';
    }
    else {
        this.hideCards();
        showMoreBtn.textContent = 'Show More';
    }

});


function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (rect.top < 100 && rect.bottom > 100);
}

function addNavBorder(section, nav) {
    if (navReached) {
        navReached.classList.remove('section-reached');
    }
    sectionReached = section;
    navReached = nav;
    nav.classList.add('section-reached');
}

window.onscroll = () => {
    if (sectionReached != presentationSection && this.isElementInViewport(presentationSection)) {
        this.addNavBorder(presentationSection, presentationNav);
    } else if (sectionReached != teamSection && this.isElementInViewport(teamSection)) {
        this.addNavBorder(teamSection, teamNav);
    } else if (sectionReached != storiesSection && this.isElementInViewport(storiesSection)) {
        this.addNavBorder(storiesSection, storiesNav);
    } else if (sectionReached != supportSection && this.isElementInViewport(supportSection)) {
        this.addNavBorder(supportSection, supportNav);
    } else if (navReached && this.isElementInViewport(firstsection) || this.isElementInViewport(footer)) {
        navReached.classList.remove('section-reached');
        sectionReached = null;
    }

    if (window.pageYOffset > 0) {
        header.classList.add('nav-down');
    } else {
        header.classList.remove('nav-down');
    }
};



supportCards.forEach(card => {
    card.addEventListener('mouseover', function onHoverCard() {
        card.lastElementChild.classList.remove('hide-span');
    });

    card.addEventListener('mouseout', function onMouseOut() {
        card.lastElementChild.classList.add('hide-span');
    });
});


deleteSpans.forEach(span => {
    span.addEventListener('click', function deleteCard() {
        span.parentElement.remove();
    });
});

submitBtn.addEventListener('click', function submitForm() {
    if (!card_title.value || card_title.value == "" || !card_message.value || card_message.value == "") {
        errorMsg.style.display = 'block';
    } else {
        let cardssupport = document.querySelectorAll('.support-card');
        if (cardssupport.length > 5) {
            cardssupport[5].remove();
        }
        errorMsg.style.display = 'none';
        const cardContent = `<div class="support-card">
    <div class="support-title">${card_title.value}</div>
    <div class="support-message"> ${card_message.value}</div>
    <span class="close-btn hide-span">&times;</span>
    </div>`;
        cardBlock.insertAdjacentHTML('afterbegin', cardContent);
        const elementCreated = cardBlock.firstElementChild;

        elementCreated.addEventListener('mouseover', function onHoverCard() {
            elementCreated.lastElementChild.classList.remove('hide-span');
        });
        elementCreated.addEventListener('mouseout', function onMouseOut() {
            elementCreated.lastElementChild.classList.add('hide-span');
        });

        elementCreated.lastElementChild.addEventListener('click', function deleteCard() {
            elementCreated.remove();
        });
    }
});

for(let item of navItems) {
    item.addEventListener('click', () => {
        dropnav.classList.remove('dropdown-menu');
    });
}


dropdown.addEventListener('click', () => {
    dropnav.classList.toggle('dropdown-menu');
});


