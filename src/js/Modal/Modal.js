import ElementsConstructor from '../elements-constructor';
const dom = new ElementsConstructor();

class ModalWindow {
	constructor() {
		this.props = {
			container: '',
			target: '',
			className: ''
		}
		window.addEventListener('click', this.modalHandler());
	}

	setProps(container, target, param) {
		this.props.container = container;
		this.props.target = target;
		
		if (arguments.length > 2) {
			this.props.className = param.className;
		}
	}

	modalHandler() {

		return (e) => {
			const {target} = e,
				className = this.props.container.className.split(' ');

			if (target.className === this.props.target.className) {
				if (this.props.className)
					this.props.container.classList.toggle(this.props.className);
				else
					this.props.container.style.display = 'flex';
			}
			else if (!target.closest(`.${className[0]}`)) {
				if (!this.props.className) {
					this.props.container.style.display = 'none';
					if (target === this.props.target)
						this.props.container.style.display = 'none';
				}
			}
		}
	}
}

const headerForm = new ModalWindow();
headerForm.setProps(dom.get('.header__form'), dom.get('.header__callback_open'));

const headerFormMobile = new ModalWindow();
headerFormMobile.setProps(dom.get('.header__form_mobile'), dom.get('.header__callback_mobile'));

const footerForm = new ModalWindow();
footerForm.setProps(dom.get('.footer__form'), dom.get('.footer__callback_open'));


const conditionsForm = new ModalWindow();
conditionsForm.setProps(dom.get('.conditions__form'), dom.get('.conditions__btn'));

const getDemoForm = new ModalWindow();
getDemoForm.setProps(dom.get('.get-demo__form'), dom.get('.get-demo__button'));

const mobileMenu = new ModalWindow();
mobileMenu.setProps(dom.get('.menu'), dom.get('.mobile-menu'), {className: 'menu__open'});

