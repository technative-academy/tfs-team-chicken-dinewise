class Menu {
    constructor() {
        this.menuButton = document.querySelector('.header__menu-button')
        this.buttonImage = this.menuButton.querySelector('.menu-button__image')
        this.buttonText = this.menuButton.querySelector('.menu-button__text')
        this.nav = document.querySelector('.header__nav')
    }

    init() {
        console.log('Menu module loaded')

        this.buttonImage.addEventListener('click', (e) => this.toggleMenu())
        window.addEventListener('resize', (e) => {
            if (window.innerWidth > 800) {
                console.log('Window width over 800px - showing nav')
                this.openMenu()
            }
        })

        if (window.innerWidth > 800) {
            this.nav.classList.add('header__nav--visible')
        } else {
            this.nav.classList.add('header__nav--hidden')
        }
    }

    toggleMenu() {
        if (window.innerWidth <= 800) {
            if (this.nav.classList.contains('header__nav--hidden')) {
                this.openMenu()
            } else {
                this.closeMenu()
            }
        }
    }

    openMenu() {
        console.log('Opening menu')
        this.buttonText.textContent = 'CLOSE'
        this.nav.classList.add('header__nav--visible')
        this.nav.classList.remove('header__nav--hidden')
    }

    closeMenu() {
        console.log('Closing menu')
        this.buttonText.textContent = 'MENU'
        this.nav.classList.add('header__nav--hidden')
        this.nav.classList.remove('header__nav--visible')
    }
}

export default new Menu()
