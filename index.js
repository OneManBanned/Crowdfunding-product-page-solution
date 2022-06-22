const burgerMenu = document.querySelector('#hamburger')
const nav = document.querySelector('.--nav-list')
const overlay = document.querySelector('#overlay')
const progress = document.querySelector('.--progress-bar-progress')
const backProject = document.querySelector('#back')
const pledge = document.querySelector('#select-pledge-section')
const pledgeOverlay = document.querySelector('#pledge-overlay')
const closePledge = document.querySelector('#close-pledge')
const bookmark = document.querySelector('#bookmark')
const pledgeFooter = document.querySelectorAll('.--select-pledge-div-footer')
const radioBtn = document.querySelectorAll('.--radio')
const pledgeDiv = document.querySelectorAll('.--select-pledge-div')
const continueBtn = document.querySelector('.firstContinue')
const pledgeComplete = document.querySelector('#pledge-complete')
const finish = document.querySelector('#gotIt')
const amountInput = document.querySelectorAll('.amount-input')
const form = document.querySelectorAll('form')
const claimReward = document.querySelectorAll('.claimReward')
document.querySelector('.disabled').disabled = true

burgerMenu.addEventListener('click', toggleNav)
backProject.addEventListener('click', openSelect)
bookmark.addEventListener('click', toggleBookmark)
closePledge.addEventListener('click', closeSelect)
continueBtn.addEventListener('click', pledgeSupport)
gotIt.addEventListener('click', finished)


amountInput.forEach(val => val.innerHTML = '$')



let backedAmount = 89914
const backedGoal = 100000
let backers = 5007
const options = {
    style: 'decimal',
    currency: 'usd'
}

document.querySelector('.progressAmount').innerHTML = `$${backedAmount.toLocaleString('en-US', options)}`

let progressAmount = backedAmount / backedGoal * 100
progress.style.width = progressAmount + '%'

// NAV TOGGLE MOBILE

function toggleNav() {
    nav.classList.toggle('active')
    overlay.classList.toggle('overlay-active')
    if (nav.classList.contains('active')) {
        burgerMenu.style.backgroundImage = 'url(./images/icon-close-menu.svg)'
    } else {
        burgerMenu.style.backgroundImage = 'url(./images/icon-hamburger.svg)'
    }
}

// TOGGLE BOOKMARK

function toggleBookmark() {
    let fill = document.querySelector('#bookFill')
    let fillLogo = document.querySelector('#bookFill-logo')
    fill.classList.toggle('bookmarked')
    fillLogo.classList.toggle('bookmarked-logo')
    document.querySelector('.bookmarkDiv').classList.toggle('bookmarkDivChecked')
    document.querySelector('.bookmarkDiv').classList.toggle('bookmarked')
}

// INDIVIDUAL PLEDGE SELECT

for (let l = 0; l < claimReward.length; l++) {
    claimReward[l].addEventListener('click', () => {
        if (claimReward[l].id === 'rewardOne') {
            openSelect()
            window.scrollTo(0, 0)
            radioBtn[1].checked = 'true'
            pledgeFooter[1].classList.add('making-pledge')
            pledgeDiv[1].style.border = '2px solid hsl(176, 50%, 47%)'
        } else if (claimReward[l].id === 'rewardTwo') {
            openSelect()
            window.scrollTo(0, 0)
            radioBtn[2].checked = 'true'
            pledgeFooter[2].classList.add('making-pledge')
            pledgeDiv[2].style.border = '2px solid hsl(176, 50%, 47%)'
        }
    })
}

// PLEDGE SELECT MENU

function openSelect() {
    pledge.classList.add('pledge-open')
    pledgeOverlay.classList.add('pledge-overlay-open')
    pledgeFooter.forEach((val) => { val.classList.remove('making-pledge') })
    pledgeDiv.forEach((val) => { val.style.border = '1px solid hsla(0, 0%, 48%, .4)' })
    document.querySelector('.radioOne').checked = false
    document.querySelector('.radioTwo').checked = false
    document.querySelector('.radioThree').checked = false
}

function closeSelect() {
    pledge.classList.remove('pledge-open')
    pledgeOverlay.classList.remove('pledge-overlay-open')
}


// PLEDGE SELECT RADIO BUTTON

for (let i = 0; i < radioBtn.length; i++) {
    radioBtn[i].addEventListener('click', () => {
        if (radioBtn[i].value == 'one') {
            pledgeDiv.forEach((val) => { val.style.border = '1px solid hsla(0, 0%, 48%, .4)' })
            pledgeDiv[i].style.border = '2px solid hsl(176, 50%, 47%)'
            pledgeFooter.forEach((val) => { val.classList.remove('making-pledge') })
            pledgeFooter[i].classList.add('making-pledge')
        }
        else if (radioBtn[i].value == 'two') {
            pledgeDiv.forEach((val) => { val.style.border = '1px solid hsla(0, 0%, 48%, .4)' })
            pledgeDiv[i].style.border = '2px solid hsl(176, 50%, 47%)'
            pledgeFooter.forEach((val) => { val.classList.remove('making-pledge') })
            pledgeFooter[i].classList.add('making-pledge')
        }
        else if (radioBtn[i].value == 'three') {
            pledgeDiv.forEach((val) => { val.style.border = '1px solid hsla(0, 0%, 48%, .4)' })
            pledgeDiv[i].style.border = '2px solid hsl(176, 50%, 47%)'
            pledgeFooter.forEach((val) => { val.classList.remove('making-pledge') })
            pledgeFooter[i].classList.add('making-pledge')
        }
    })
}

// SUBMITTING PLEDGE FORM

for (let j = 0; j < form.length; j++) {
    form[j].addEventListener('submit', () => {
        if (form[j].id === 'formOne') {
            if (parseInt(amountInput[0].value) < 25 || parseInt(amountInput[0].value) >= 75) {
                return
            } else {
                let donation = parseInt(amountInput[0].value)
                pledgeComplete.classList.add('open')
                pledge.classList.remove('pledge-open')
                window.scrollTo(0, 0)
                backedAmount += donation
                backers += 1
                document.querySelector('.progressAmount').innerHTML = `$${backedAmount.toLocaleString('en-US', options)}`
                document.querySelector('.backers').innerHTML = backers.toLocaleString('en-Us', options)
                backedAmount = backedAmount
                progressAmount = backedAmount / backedGoal * 100
                progress.style.width = progressAmount + '%'
            }
        }
        if (form[j].id === 'formTwo') {
            if (parseInt(amountInput[1].value) < 75 || parseInt(amountInput[1].value) > 100) {
                return
            } else {
                let donation = parseInt(amountInput[1].value)
                pledgeComplete.classList.add('open')
                pledge.classList.remove('pledge-open')
                window.scrollTo(0, 0)
                backedAmount += donation
                backers += 1
                document.querySelector('.progressAmount').innerHTML = `$${backedAmount.toLocaleString('en-US', options)}`
                document.querySelector('.backers').innerHTML = backers.toLocaleString('en-Us', options)
                backedAmount = backedAmount
                progressAmount = backedAmount / backedGoal * 100
                progress.style.width = progressAmount + '%'
            }
        }
    })
}



function pledgeSupport() {
    pledgeComplete.classList.add('open')
    pledge.classList.remove('pledge-open')
    window.scrollTo(0, 0)
    backers += 1
    document.querySelector('.backers').innerHTML = backers.toLocaleString('en-Us', options)
}

// RELOAD AFTER PLEDGE COMPLETE

function finished() {
    pledgeFooter.forEach((val) => { val.classList.remove('making-pledge') })
    pledgeDiv.forEach((val) => { val.style.border = '1px solid hsla(0, 0%, 48%, .4)' })
    pledgeOverlay.classList.remove('pledge-overlay-open')
    pledgeComplete.classList.remove('open')
    document.querySelector('.radioOne').checked = false
    document.querySelector('.radioTwo').checked = false
    document.querySelector('.radioThree').checked = false
}



