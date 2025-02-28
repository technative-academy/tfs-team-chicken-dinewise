class Menu {
    constructor() {
        this.menuButton = document.querySelector('.header__menu-button')
        this.buttonImage = this.menuButton.querySelector('.menu-button__image')
        this.buttonText = this.menuButton.querySelector('.menu-button__text')
        this.nav = document.querySelector('.header__nav')
    }

    init() {
        this.buttonImage.addEventListener('click', (e) => this.toggleMenu())
    }

    toggleMenu() {
        if (window.innerWidth <= 800) {
            if (this.nav.style.display === 'none') {
                console.log('Opening menu')
                this.buttonText.textContent = 'CLOSE'
                this.nav.style.display = 'flex'
            } else {
                console.log('Closing menu')
                this.buttonText.textContent = 'MENU'
                this.nav.style.display = 'none'
            }
        }
    }
}

export default new Menu()
