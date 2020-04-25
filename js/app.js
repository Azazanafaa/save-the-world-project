/***************** Variable Declarations */
const dropdown = document.querySelector('#dropdown');
const dropnav = document.querySelector('.nav-holder');

const presentationSection = document.querySelector('#presentation');
const teamSection = document.querySelector('#team');
const storiesSection = document.querySelector('#stories');
const supportSection = document.querySelector('#support');

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

/******************* Updating the items with the right params */
function updateElementsProperties(navItem, navLink, id, name, section) {
    navItem.classList.add('nav-item');
    navLink.classList.add('nav-link');
    navItem.setAttribute('id', id);
    navLink.setAttribute('href', '#');
    navItem.innerText = name;
    /* navItem.appendChild(navLink); */
    /**************** Hide dropdown menu when clicking item */
    navItem.addEventListener('click', () => {
        document.querySelector('.nav-holder').classList.remove('dropdown-menu');
    });
    navItem.addEventListener('click', () => {
        section.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    });
}

/************** Adding navigation menu to the navbar after dom loaded */
const fragment = document.createDocumentFragment();
const presentationNav = document.createElement('li');
const navLinkPre = document.createElement('a');
this.updateElementsProperties(presentationNav, navLinkPre, 'pre', 'Presentation', presentationSection);
fragment.appendChild(presentationNav);

const teamNav = document.createElement('li');
const navLinkTea = document.createElement('a');
this.updateElementsProperties(teamNav, navLinkTea, 'tea', 'Team', teamSection);
fragment.appendChild(teamNav);

const storiesNav = document.createElement('li');
const navLinkSto = document.createElement('a');
this.updateElementsProperties(storiesNav, navLinkSto, 'sto', 'Stories', storiesSection);
fragment.appendChild(storiesNav);

const supportNav = document.createElement('li');
const navLinkSup = document.createElement('a');
this.updateElementsProperties(supportNav, navLinkSup, 'sup', 'Show support', supportSection);
fragment.appendChild(supportNav);
document.querySelector('.nav-holder').appendChild(fragment);

/*************  Hide team cards if there are more than 3 teams */
function hideCards() {
    for (let index = 3; index < teamCards.length; index++) {
        teamCards[index].classList.add('hide-card');
    }
}

if (teamCards.length > 3) {
    this.hideCards();
}

/*************** Adding event to button to show the member of team cards or hide them */
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

/******************* function to test if an element is in viewport*/
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (rect.top < 100 && rect.bottom > 100);
}

/**************** function to add a decoration for the nav items when they are in the viewport */
function addNavBorder(section, nav) {
    if (navReached) {
        navReached.classList.remove('section-reached');
    }
    sectionReached = section;
    navReached = nav;
    nav.classList.add('section-reached');
}

/***************** Handling on scroll to test which element is on viewport */
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

/********** Adding on hover action to the support cards section so we can show the remove span */
supportCards.forEach(card => {
    card.addEventListener('mouseover', function onHoverCard() {
        card.lastElementChild.classList.remove('hide-span');
    });
    card.addEventListener('mouseout', function onMouseOut() {
        card.lastElementChild.classList.add('hide-span');
    });
});

/*********** On click on delete supporter card to delete it */
deleteSpans.forEach(span => {
    span.addEventListener('click', function deleteCard() {
        span.parentElement.remove();
    });
});

/*********** Handling submit form to add the new supporter card */
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

/******************************** Show dropdown menu */
dropdown.addEventListener('click', () => {
    dropnav.classList.toggle('dropdown-menu');
});


