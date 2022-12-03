/*
    Modal
*/
const modalOpenerElements = document.querySelectorAll('[data-modal]')
const modalCloserElements = document.querySelectorAll('[data-close-modal]')

modalOpenerElements.forEach(modalOpener => {
    modalOpener.addEventListener('click', e => setModal(e, 'open'))
})

modalCloserElements.forEach(modalCloser => {
    modalCloser.addEventListener('click', e => setModal(e, 'close'))
})

document.addEventListener('keyup', e => {
    if (e.which !== 27) {
        return
    }

    closeAllModals()
})

function setModal(e, action) {
    e.preventDefault()

    const targetId = getTargetIdByAction(e, action)
    const modalTargets = document.querySelectorAll(`.modal#${targetId}`)

    if (!modalTargets) {
        return
    }

    modalTargets.forEach(modalTarget => {
        if (action === 'close') {
            modalTarget.classList.remove('open')
            return
        }

        modalTarget.classList.add('open')
    })
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal')
    
    if (!modals) {
        return
    }

    modals.forEach(modal => {
        modal.classList.remove('open')
    })
}

function getTargetIdByAction(e, action) {
    let targetId = e.target.getAttribute('data-modal')

    if (action === 'close') {
        targetId = e.target.getAttribute('data-close-modal')
    }

    return targetId
}

/*
    Alert
*/ 
class Alert {
    constructor(alertName) {
        this.alerts = document.querySelectorAll(`[data-alert="${alertName}"]`)
        this.duration = 2000
        this.transition = 500
    }

    show() {
        this.alerts.forEach(alert => {
            alert.classList.add('show')
            
            setTimeout(() => alert.classList.add('alert-fade-in'), 1)

            setTimeout(() => alert.classList.remove('alert-fade-in'), this.duration + this.transition)

            setTimeout(() => alert.classList.remove('show'), (this.transition * 2 + this.duration))
        })
    }
}