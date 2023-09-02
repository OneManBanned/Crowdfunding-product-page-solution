const bookmark = document.querySelector('#bookmark')
const burgerMenu = document.querySelector('#hamburger')
const header = document.querySelector('.overlay')
const nav = document.querySelector('.--nav-list')

burgerMenu.addEventListener('click', toggleNav)
bookmark.addEventListener('click', toggleBookmark)

// NAV TOGGLE MOBILE

window.onscroll = () => { if (nav.classList.contains('active')) toggleNav() }

function toggleNav() {
    nav.classList.toggle('active')
    nav.classList.contains('active')
        ? navOpenClose('url(./images/icon-close-menu.svg)')
        : navOpenClose('url(./images/icon-hamburger.svg)')
}

function navOpenClose(svg) {
    header.classList.toggle('open')
    burgerMenu.style.backgroundImage = svg
}

// TOGGLE BOOKMARK

function toggleBookmark() {
    const fill = document.querySelector('#bookFill')
    const fillLogo = document.querySelector('#bookFill-logo')
    fill.classList.toggle('bookmarked')
    fillLogo.classList.toggle('bookmarked-logo')
    document.querySelector('.bookmarkDiv').classList.toggle('bookmarkDivChecked')
    document.querySelector('.bookmarkDiv').classList.toggle('bookmarked')
}