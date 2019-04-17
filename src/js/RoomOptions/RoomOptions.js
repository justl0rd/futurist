import ElementsConstructor from '../elements-constructor';
const dom = new ElementsConstructor();

export default class RoomOptions {
	constructor(container, data) {
		this.props = {
			data: [...data],
			container: container,
			checkedFlatId: 0,
			currentCard: 0,
			screenWidth: ''
		}

		this.renderCards();
		this.changeCardsHandler();
	}

	renderCards() {
		const {container, data, checkedFlatId} = this.props,
			currentCardsList = data[checkedFlatId].flatData;

        container.innerText = '';
        currentCardsList.forEach(cardData => {
            container.append(this.renderCard(cardData));
        });
        
		this.showLagePhoto();
	}

	renderSlider() {
		const {container, data, checkedFlatId, currentCard: cardId} = this.props,
			currentCardsList = data[checkedFlatId].flatData,
			currentCard = currentCardsList[cardId];

		const cardContainer = dom.create('div', 'flat-cards__card-wrapper'), 
			leftButton = dom.create('button', 'options__arr options__arr_left'),
			rightButton = dom.create('button', 'options__arr options__arr_right');
	
		cardContainer.append(this.renderCard(currentCard));
		container.append(leftButton, cardContainer, rightButton);
		this.cardChangehandler(currentCardsList);
	}

	cardChangehandler(data) {
		const container = dom.get('.flat-cards__card').parentNode,
			left = dom.get('.options__arr_left'),
			right = dom.get('.options__arr_right');
		
		left.addEventListener('click', () => {
			container.innerText = '';
			this.props.currentCard -= 1;
			if (this.props.currentCard < 0)
				this.props.currentCard = data.length - 1;
			container.append(this.renderCard(data[this.props.currentCard]));
		});

		right.addEventListener('click', () => {
			container.innerText = '';
			this.props.currentCard += 1;
			if (this.props.currentCard > data.length - 1)
				this.props.currentCard = 0;
			container.append(this.renderCard(data[this.props.currentCard]));
		});
	}

	renderCard(data) {
		const card = dom.create('div', 'flat-cards__card'),
			cardImage = dom.create('img', 'flat-cards__image', data.image),
			title = dom.create('h3', 'flat-cards__title'),
			subtitle = dom.create('p', 'flat-cards__info'),
			form = dom.create('form', 'flat-cards__form js-form',
				{
					'data-id': 'popupResult',
					'action': 'success.php'
				}),
			label = dom.create('label'),
			hiddenInput = dom.create('input', '', {
				'type': 'text',
				'name': 'id-form',
				'hidden': true,
				'value': data.title
			}),
			input = dom.create('input', 'flat-cards__get-number', 
				{
					'type': 'text',
					'name': 'tel',
					'placeholder': 'Введите телефон',
					'required': true
				}),
			button = dom.create('button', 'flat-cards__button btn', {'data-submit': ''});

		title.innerText = data.title;
		subtitle.innerHTML = data.subtitle;
		button.innerText = 'Хочу на экскурсию';

		label.append(input);
		form.append(label, button, hiddenInput);
		card.append(cardImage, title, subtitle, form);

		return card;
	}

	changeCardsHandler() {
		const buttons = dom.getAll('.flats-preview__item'),
			buttonsContainer = dom.get('.flats-preview__list');

		buttonsContainer.addEventListener('click', e => {
			const {target} = e,
				{flatId: id} = target.dataset;

			if (target.tagName !== 'LI') return;

			for (let button of buttons) {
				if (button.classList.contains('flats-preview__checked')){
					button.classList.remove('flats-preview__checked');
				}
			}

			target.classList.add('flats-preview__checked');
			this.props.checkedFlatId = +id;
			this.renderCards();
		});
	}

	showLagePhoto() {
		const photo = dom.get('.flat-cards__image'),
			blockClassName = 'options__large-image-wrapper';


		window.addEventListener('click', (e) => {
			const {target} = e;
			if (target.className !== photo.className) {
				if (dom.get(`.${blockClassName}`))
					dom.get(`.${blockClassName}`).remove();
				return;
			};
			if (dom.get(`.${blockClassName}`))
					dom.get(`.${blockClassName}`).remove();
			const imageData = {
				src: target.src,
				alt: target.alt
			};
			document.body.append(this.renderModalWindowPhoto(imageData, blockClassName));
		});
	}

	renderModalWindowPhoto(data, className) {

		const block = dom.create('div', className),
			image = dom.create('img', 'layout-options__large-image', data);

		block.append(image);
		return block;
	}
}