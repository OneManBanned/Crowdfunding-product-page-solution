import c from '/campaign.js'

const amountRaised = document.querySelector('.progressAmount')
const progressBar = document.querySelector('.--progress-bar-progress')
const backers = document.querySelector('.backers')
const pledgePackagesLeftMain = document.querySelectorAll('.pledge-div-stats')
const pledgePackagesLeftModel = document.querySelectorAll('.pledgePackage')

const packagesDisplay = [...pledgePackagesLeftMain, ...pledgePackagesLeftModel]
const options = { style: 'decimal', currency: 'usd' }

function updateStats() {
    amountRaised.innerHTML = `$${c.donations.toLocaleString('en-US', options)}`
    backers.innerHTML = c.backers.toLocaleString()
    progressBar.style.width = c.progressPercentage() + '%'
    packagesDisplay.forEach(pack => {
        pack.innerHTML = `${c.backerPackages[pack.dataset.pledge]}<span>left</span>`
    })
}

export { updateStats }