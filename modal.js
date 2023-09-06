import c from './campaign.js'
import { updateStats } from './statsDisplay.js'

const pledgeDiv = document.querySelectorAll('.--pledge-div')
const modalPledgeDiv = document.querySelectorAll('.pledgeModal-div')
const statsDiv = document.querySelector('#div-two')
const errors = document.querySelectorAll('.err')
const inputs = document.querySelectorAll('.amount-input')

const pledgeModalOpenButtons = document.querySelectorAll('.pledge')

const pledgeModal = document.querySelector('#pledgeModal')
const pledgeRadioButtons = document.querySelectorAll('.--radio')

const completeModal = document.querySelector('#completeModal')
const confirmPledgeButtons = document.querySelectorAll('.continue')
const completeModalClose = document.querySelector('#gotIt')

const dialogs = [pledgeModal, completeModal]

window.onload = () => updateStats(); checkPledgeSoldOut();
pledgeModalOpenButtons.forEach(function (btn, index) {
    btn.addEventListener('click', function (index) {
        return () => openPledgeModal(index)
    }(index))
})
pledgeRadioButtons.forEach(function (radioBtn, index) {
    radioBtn.addEventListener('change', function (index) {
        return () => handleRadioGroup(index)
    }(index))
})
confirmPledgeButtons.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        return (e) => submitPledge(e, index)
    }(index))
})
dialogs.forEach(dialog => dialog.onclose = (e) => closeModal(e.target))
inputs.forEach(input => input.addEventListener('input', () => {
    if (input.value.length > input.max.length) {
        input.value = input.value.split('').slice(0, 3).join('', ',')
    }
    if (input.validity.valid) {
        removeInputErrors(errors)
        input.style.border = '1px solid hsla(0, 0%, 48%, .4)'
    }
}))

function openPledgeModal(btnClicked) {
    pledgeModal.showModal()
    handleRadioGroup(btnClicked)
    pledgeRadioButtons[btnClicked].focus()
}

function submitPledge(e, index) {
    e.preventDefault()
    const formInput = e.target.form[0]
    if (errorChecking(formInput, index)) {
        pledgeModal.close()
        completeModal.showModal()
        completeModalClose.focus()
        c.addBacker()
        if (index > 0) c.addDonation(+formInput.value)
        c.packageClaimed(formInput.defaultValue)
        checkPledgeSoldOut()
        updateStats()
    }
}

function errorChecking(formInput, index) {
    if (formInput.validity.valueMissing) {
        formInput.style.border = '2px solid red'
        errors[index - 1].innerHTML = 'Required'
        errors[index - 1].classList.add('error')
    } else if (formInput.validity.rangeOverflow) {
        formInput.style.border = '2px solid red'
        errors[index - 1].innerHTML = `Max of ${formInput.max}`
        errors[index - 1].classList.add('error')
    } else if (formInput.validity.rangeUnderflow) {
        formInput.style.border = '2px solid red'
        errors[index - 1].innerHTML = `Minimum of ${formInput.min}`
        errors[index - 1].classList.add('error')
    } else {
        return true
    }
}

function closeModal(modal) {
    modal === pledgeModal
        ? document.activeElement.scrollIntoView({ block: "center" })
        : statsDiv.scrollIntoView({ block: "center" })
    resetInputs(confirmPledgeButtons)
    removeInputErrors(errors)
}

function handleRadioGroup(radioBtnIndex) {
    pledgeRadioButtons[radioBtnIndex].checked = true
    pledgeRadioButtons[radioBtnIndex].scrollIntoView({ block: "center" })
    resetInputs(confirmPledgeButtons)
    removeInputErrors(errors)
    modalPledgeDiv.forEach((div, divIndex) => {
        if (divIndex === radioBtnIndex) {
            div.childNodes[div.childNodes.length - 2].classList.add('pledgeFooterOpen')
            div.classList.add('selected')
        } else {
            div.childNodes[div.childNodes.length - 2].classList.remove('pledgeFooterOpen')
            div.classList.remove('selected')
        }
    })
}

function checkPledgeSoldOut() {
    pledgeModalOpenButtons.forEach((pledge, index) => {
        if (c.backerPackages[confirmPledgeButtons[index].form[0].defaultValue] === 0) {
            modalPledgeDiv[index].classList.add('modalPledgeDisabled')
            pledgeDiv[index - 1].classList.add('pledgeDivDisabled')
            pledge.innerHTML = 'Out of Stock'
            pledge.disabled = true
            pledgeRadioButtons[index].disabled = true
        }
    })
}

const resetInputs = inputs => inputs.forEach(input => {
    input.form[0].value = input.form[0].defaultValue
    input.form[0].style.border = '1px solid hsla(0, 0%, 48%, .4)'
})
const removeInputErrors = errors => errors.forEach(err => {
    err.innerHTML = ''
    err.classList.remove('error')
})



