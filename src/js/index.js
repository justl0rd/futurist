'use strict'

// ***********************

		// all scripts created by rkfr 
		 						// 21.03.2019
		 	// contacts
		// https://github.com/rkfr
		// xvid2y@gmail.com

// ***********************


// ***practical dom lib

class ElementsConstructor {
	constructor(){}

	create(tag, classList, ...attributes) {
		const element = document.createElement(tag);

		(classList && 
			(element.className = classList)
		);

		(arguments.length > 2 && (
			attributes.forEach(obj => {
				for(let attr in obj) {
					element.setAttribute(attr, obj[attr])
				}
			})
		));
		
		return element;
	}

	get(selector) {
		const element = document.querySelector(selector);
		return element;
	}

	getAll(selector) {
		const elements = document.querySelectorAll(selector);
		return elements;
	}

	setStyle(element, ...style) {
		if (arguments.length < 2)
			element.style = '';

		style.forEach(obj => {
			for(let spec in obj) {
				element.style[spec] = obj[spec];
			}
		});
	}
}


// gallery start

const dom = new ElementsConstructor();

(function gallery(limit) {
	const image = dom.get('.gallery__photo'),
		imageSrc = image.src,
		leftButton = dom.get('.gallery__button_left'),
		rightButton = dom.get('.gallery__button_right');

	let i = 1;

	leftButton.addEventListener('click', () => {
		i--;
		if (i < 1) i = 1;
		const imageName = `${i}.jpg`,
			newImageSrc = imageSrc.replace(`1.jpg`, imageName);

		image.src = newImageSrc;
	});
	rightButton.addEventListener('click', () => {
		i++;
		if (i > limit) i = limit;
		const imageName = `${i}.jpg`,
			newImageSrc = imageSrc.replace(`1.jpg`, imageName);

		image.src = newImageSrc;
	});
})(4);

// gallery end

// timer start
const currentDate = new Date(),
	currentDay = currentDate.getDate(),
	currentMonth = currentDate.getMonth(),
	currentYear = currentDate.getFullYear();

let targetDate = [currentDay, currentMonth + 1, currentYear],
	targetUserDate = [];


if (!localStorage.getItem('houseComplexHeroesUserTime')) {
	localStorage.setItem('houseComplexHeroesUserTime', JSON.stringify(targetDate));
}


targetUserDate = JSON.parse(localStorage.getItem('houseComplexHeroesUserTime'));

const manageTimer = function(destDate){

	const destinationDate = new Date(destDate[2], destDate[1], destDate[0]);

	let today = new Date();
	const seconds = Math.floor((destinationDate - today) / 1000);

	const minutes = Math.floor(seconds / 60),
		hours = Math.floor(minutes / 60),
		days =  Math.floor(hours / 24);
	return {
		secondsToshow: seconds % 60,
		minutesToshow: minutes % 60,
		hoursToshow: hours % 24,
		daysToshow: days
	}
};

function showTime() {
	const date = document.querySelectorAll('.timer__unit'),
		dd = date[0],
		hh = date[1],
		mm = date[2],
		ss = date[3];

	const timer = setInterval(() => {
		const {
				secondsToshow: sec,
				minutesToshow: min,
				hoursToshow: hour,
				daysToshow: day
			} = manageTimer(targetUserDate);
		
		if (day < 0) {
			clearInterval(timer);
			return;
		}

		dd.innerText = (day < 10) ? `0${day}` : day;
		hh.innerText = (hour < 10) ? `0${hour}` : hour;
		mm.innerText = (min < 10) ? `0${min}` : min;
		ss.innerText = (sec < 10) ? `0${sec}` : sec;
	}, 1000);
}
showTime();

// timer end

// start options script

const flatsData = [

	{
		flatId: 0,
		flatData: [
			{
				image: {
					alt: 'Однокомнатная квартира',
					src: '../img/one-room.png'
				},
				title: 'Однокомнатная квартира',
				subtitle: '48.22 м<sup>2</sup>'
			},
			{
				image: {
					alt: 'Однокомнатная квартира',
					src: '../img/one-room-1.png'
				},
				title: 'Однокомнатная квартира',
				subtitle: '41.81 м<sup>2</sup>'
			}
		]
	},
	{
		flatId: 1,
		flatData: [
			{
				image: {
					alt: 'Двухкомнатная квартира',
					src: '../img/two-rooms-1.png'
				},
				title: 'Двухкомнатная квартира',
				subtitle: '61.36 м<sup>2</sup>'
			},
			{
				image: {
					alt: 'Двухкомнатная квартира',
					src: '../img/two-rooms.png'
				},
				title: 'Двухкомнатная квартира',
				subtitle: '76.46 м<sup>2</sup>'
			}
		]
	},
	{
		flatId: 2,
		flatData: [
			{
				image: {
					alt: 'студия',
					src: '../img/studio.png'
				},
				title: 'студия',
				subtitle: '28.31 м<sup>2</sup>'
			},
			{
				image: {
					alt: 'студия',
					src: '../img/studio-1.png'
				},
				title: 'студия',
				subtitle: '35.26 м<sup>2</sup>'
			}
		]
	}
];

class RoomOptions {
	constructor(container, data) {
		this.props = {
			data: [...data],
			container: container,
			checkedFlatId: 2,
			currentCard: 0,
			screenWidth: ''
		}

		this.firstScreenHandler();
		this.renderCards();
		this.changeCardsHandler();
	}

	renderCards() {
		const {container, data, checkedFlatId} = this.props,
			currentCardsList = data[checkedFlatId].flatData,
			media = window.matchMedia('screen and (max-width: 1200px');

		// container.innerText = '';

		media.addListener(() => {
			if (!media.matches) {
				container.innerText = '';
				currentCardsList.forEach(cardData => {
					container.append(this.renderCard(cardData));
				});
			}
			else {
				container.innerText = '';
				this.renderSlider();
			}
		});

		if (this.props.screenWidth > 1200) {
			container.innerText = '';
			currentCardsList.forEach(cardData => {
					container.append(this.renderCard(cardData));
				});
		}
		else {
			container.innerText = '';
			this.renderSlider();
		}

		this.showLagePhoto();
	}

	firstScreenHandler() {
		let width = document.body.clientWidth;

		this.props.screenWidth = document.body.clientWidth;;
		setTimeout(()=> {
			width = document.body.clientWidth;
		}, 500);
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
					'placeholder': 'Введите номер',
					'required': true
				}),
			button = dom.create('button', 'flat-cards__button btn', {'data-submit': ''});

		title.innerText = data.title;
		subtitle.innerHTML = data.subtitle;
		button.innerText = 'Узнать подробнее';

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
			this.firstScreenHandler();
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

const roomCardsContainer = dom.get('.flats-preview__flat-cards');

const roomCards = new RoomOptions(roomCardsContainer, flatsData);

// end options script

function isValideNumber(data) {
	const rule = '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$';
	return !!(data.match(rule));
}

// start Quiz

function isValideNumber(data) {
	const rule = '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$';
	return !!(data.match(rule));
}

// start quize

class QuizeRender {
	constructor() {}

	renderAnswer(data) { // data must be a string
		const label = dom.create('label', 'quize__label'),
			span = dom.create('span', 'quize__span'),
			input = dom.create('input', 'quize__input', 
				{
					'type': 'radio',
					'name': 'quize-answer',
					'data-value': data
				});

		span.innerText = data;
		label.append(input, span);
		return label;
	}

	renderAnswers(data) { // data must be an array
		if (dom.get('.quize__answers-list')){  // if there is
			const div = dom.get('.quize__answers-list');
			div.innerText = '';
			data.forEach(text => {
				div.append(this.renderAnswer(text));
			});
		}
		else { // else create
			const div = dom.create('div', 'quize__answers-list');
			data.forEach(text => {
				div.append(this.renderAnswer(text));
			});
			return div;
		}
	}

	renderQuestion(data) { // data must be a sting
		if (dom.get('.quize__question'))
			dom.get('.quize__question').innerText = data;
		else {
			const h3 = dom.create('h3', 'quize__question');
			h3.innerText = data;
			return h3;
		}
	}

	renderButtons() {
		const buttonsComponent = dom.create('div', 'quize__buttons-wrapper'),
			leftButton = dom.create('button', 'quize__buttons btn quize__buttons_left'),
			rightButton = dom.create('button', 'quize__buttons btn quize__buttons_right');
		leftButton.innerText = 'Назад';
		rightButton.innerText = 'Далее';

		buttonsComponent.append(leftButton, rightButton);
		return buttonsComponent;
	}

	renderQuize(data, container) {
		container.innerText = '';
		const {question, answers} = data,
		currentQuestion = this.renderQuestion(question),
			answersList = this.renderAnswers(answers),
			buttons = this.renderButtons();

		container.append(currentQuestion, answersList, buttons);
	}

	// form

	renderQuizeForm(data) { // string
		const form = dom.create('form', 'quize-form', {
				method: 'POST',
				action: 'test.php'
			});

		const formTitle = dom.create('p', 'quize-form__subtitle'),
			formInput = this.renderFormInput(),
			buttons = this.renderFormButtons();

		formTitle.innerText = data;
		form.append(formTitle, formInput, buttons);		
		return form;
	}

	renderFormInput() { // string
		const label = dom.create('label', 'quize-form__label'),
			input = dom.create('input', 'quize-form__input', {
				type: 'tel',
				name: 'quize-form-number',
				// required: ''
				placeholder: 'Введите свой телефон'
			});
		label.append(input);
		return label;
	}

	renderFormButtons() {
		const wrapper = dom.create('div', 'quize-form__buttons-wrapper'),
			prevButton = dom.create('button', 'quize__buttons quize-form__prev-button  btn'),
			submit = dom.create('input', 'quize__buttons btn quize-form__submit-button', {
				type: 'submit',
				value: 'Отправить'
			});

		prevButton.innerText = 'Назад';
		wrapper.append(prevButton, submit);
		return wrapper;
	}

	renderQuizeThanks(container) {

		container.innerText = '';

		const title = dom.create('h3', 'quize-thanks__title'),
			text = dom.create('p', 'quize-thanks__text');

		title.innerText = 'Спасибо, что прошли тест!';
		text.innerText = 'Мы уже начали работу и на менеджер свяжется с вами в ближайшее время';

		container.append(title, text);
	}

	// number
	renderNumber(data) {
		if (dom.get('.quize__number'))
			dom.get('.quize__number').innerText = data;
		else {
			const number = dom.create('span', 'quize__number');
			number.innerText = data;
			return number;
		}
	}
}

class QuizeHandler extends QuizeRender{
	constructor(container){
		super();

		this.data = {
			questions: [],
			form: {},
			currentData: {},
			allData: []
		}

		this.props = {
			container: container,
			questionId: 0
		}
	}

	startHandler(button) {
		button.addEventListener('click', () => {
			this.startQuize();
		});
	}

	setQuestions(data){
		this.data.questions = [...data];
	}

	setForm(data){
		this.data.form = {...data};
	}

	startQuize() {
		const {container, questionId} = this.props,
			{questions} = this.data;

		super.renderQuize(questions[questionId], container);

		this.dataHandler();
		this.changeQuestionsHandler();
		container.append(super.renderNumber(questionId + 1));
	}

	dataHandler() {
		const radioButtons = dom.getAll('.quize__input'),
			question = dom.get('.quize__question');

		for (let button of radioButtons) {
			button.addEventListener('change', (e) => {
				const {value} = e.target.dataset;
				this.data.currentData = {
					question: question.textContent,
					answer: value
				};
			});
		}
	}

	changeQuestionsHandler() {
		const leftButton = dom.get('.quize__buttons_left'),
			rightButton = dom.get('.quize__buttons_right');

		rightButton.addEventListener('click', ()=> {
			this.props.questionId++;
			if (this.props.questionId > this.data.questions.length - 1) {
				this.data.allData.push(this.data.currentData);
				this.createQuizeForm();
			}
			else 
				this.nextButtonHandler();
		});
		leftButton.addEventListener('click', ()=> {
			this.props.questionId--;
			(this.props.questionId < 0) ? 
				(
					this.props.questionId = 0,
					this.data.allData.splice(0, 1)
				) : 
				this.prevButtonHandler();
		});
	}

	nextButtonHandler() {
		const {questionId} = this.props,
			{questions, allData} = this.data,
			currentQuizeQuestion = questions[questionId];
		
		super.renderQuestion(currentQuizeQuestion.question);
		super.renderAnswers(currentQuizeQuestion.answers);
		super.renderNumber(questionId + 1);

		allData.push(this.data.currentData);
		this.dataHandler();
	}

	prevButtonHandler() {
		const {questionId} = this.props,
			{questions, allData} = this.data,
			currentQuestion = questions[questionId];
		
		super.renderQuestion(currentQuestion.question);
		super.renderAnswers(currentQuestion.answers);
		super.renderNumber(questionId + 1);

		allData.splice(allData.length - 1, 1);
		this.dataHandler();
	}

	createQuizeForm() {
		const {form, questions} = this.data,
			{container} = this.props;
			
		container.innerText = '';

		container.append(super.renderQuestion(form.title))
		container.append(super.renderQuizeForm(form.subtitle));
		container.append(super.renderNumber(this.props.questionId + 1));

		const submitButton = dom.get('.quize-form__submit-button'),
			prevButton = dom.get('.quize-form__prev-button'),
			input = dom.get('.quize-form__input');

		prevButton.addEventListener('click', () => {
			this.props.questionId = 0;
			this.data.allData.splice(0, this.data.allData.length);
			this.startQuize();
		});

		submitButton.addEventListener('click', (e) => {

			if (!isValideNumber(input.value)) {
				e.preventDefault();
				this.errorMessage(input);
			}
			else {
				this.sendQuizeForm();
			}
		});
	}

	errorMessage(el) {

		const parentEl = el.parentNode;

		if (parentEl.contains(dom.get('.quize__error-message'))) return;

		const message = dom.create('span', 'quize__error-message');
		message.innerText = 'Поле обязательно для заполнения';
		parentEl.insertBefore(message, el.nextSibling);

		setTimeout(() => {
			if (dom.get('.quize__error-message'))
				dom.get('.quize__error-message').remove();
		}, 3000);
	}

	sendQuizeForm() {
		const {container} = this.props;
		const form = dom.get('.quize-form'),
			input = dom.get('.quize-form__input').value,
			answersData = JSON.stringify(this.data.allData);

		form.addEventListener('submit', (e) => {
			e.preventDefault();
		});

		const request = new XMLHttpRequest();

		request.addEventListener('load', () => {
			console.log(request.response);
		});

		const url = 'quize-form-number=' + encodeURIComponent(input) + '&quize-form-hidden-data=' + encodeURIComponent(answersData);

		request.open('POST', 'test.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		request.send(url);

		setTimeout(() => {
			super.renderQuizeThanks(container);
		}, 100);
	}
}

// end Quize


// personal quize start

const manageQuizData = {
	questions: 
	[
		{
			id: 0,
			question: 'С какой целью вы планируете приобрести квартиру?',
			answers: [
				'Для проживания',
				'Для инвестиций',
				'Детям (на будущее)',
				'Не определился'
			]
		},
		{
			id: 1,
			question: 'Какое количество комнат вам необходимо',
			answers: [
				'1-комнатная',
				'2-комнатная',
				'3-комнатная',
				'Евро 2-комнатная',
				'Евро 3-комнатная',
				'Больше 3х комнат'
			]
		},
		{
			id: 2,
			question: 'Какая форма оплаты вам будет удобна?',
			answers: [
				'Удиновременная оплата',
				'Рассрочка',
				'Ипотека',
				'Субсидия',
				'Не определился'
			]
		},
		{
			id: 3,
			question: 'Вы хотели бы встречать рассвет или провожать закат?',
			answers: [
				'Рассвет',
				'Закат'
			]
		},
		{
			id: 4,
			question: 'Выберите тип отделки?',
			answers: [
				'Без отделки',
				'Подготовка под отделку',
				'Чистовая'
			]
		},
		{
			id: 5,
			question: 'Когда вы планируете отделку?',
			answers: [
				'В ближайшее время',
				'Через 6-8 месяцев',
				'Не раньше, чем через год',
				'Не определился',
				'Сразу, если квартира понравится'
			]
		},
		{
			id: 6,
			question: 'Какие дополнительные параметры для вас важны?',
			answers: [
				'Гардеробная или кладовая',
				'Кухня-гостиная',
				'Прачечная',
				'Широкий балкон',
				'Обеденная зона',
				'Не определился'
			]
		},
		{
			id: 7,
			question: 'Рассчитываете ли вы на определенный ценовой сегмент?',
			answers: [
				'До 6 млн. Р',
				'От 7 млн. Р до 9 млн. Р',
				'От 9 млн. Р до 11 млн. Р',
				'Не определился'
			]
		}
	],
	form: {
		id: 8,
		title: 'Отлично! Остался последний шаг!',
		subtitle: 'Укажите ваш номер телефона и мы сообщим вам результаты теста.'
	}
}


const personalFlatQuizeContainer = dom.get('.personal-flat__flat-quize'),
	personalFlatQuize = new QuizeHandler(personalFlatQuizeContainer),
	startFlatQuizeButton = dom.get('.flat-quize__button');

personalFlatQuize.setQuestions(manageQuizData.questions);
personalFlatQuize.setForm(manageQuizData.form);
personalFlatQuize.startHandler(startFlatQuizeButton);

// personal quize end

// mortgage data

const excursionQuizData =
{
	questions: 
	[
		{
			id: 0,
			question: 'Работаете ли вы официально?',
			answers: [
				'Да, работаю официально и белая зарплата',
				'Да, но большая часть зарплаты серая',
				'Работаю, но не официально',
				'Я моряк (военный)',
				'Пенсионер',
				'У меня своя компания (юридическое лицо или ИП)',
				'Не работаю'
			]
		},
		{
			id: 1,
			question: 'Как долго вы работаете на последнем месте?',
			answers: [
				'От 1 года',
				'От 1 года до 5 лет',
				'Свыше 5 лет'
			]
		},
		{
			id: 2,
			question: 'Какой первый взнос вы хотите сделать (в % от стоимости квартиры)',
			answers: [
				'От 0% до 20%',
				'От 20% до 50%',
				'От 50%'
			]
		},
		{
			id: 3,
			question: 'На какой срок вы хотели бы взять ипотеку?',
			answers: [
				'До 5 лет',
				'5 - 10 лет',
				'10 - 15 лет',
				'От 15 лет'
			]
		},
		{
			id: 4,
			question: 'Какой ежемесячный платеж был бы вам комфортен?',
			answers: [
				'До 40 000р',
				'От 40 000р до 50 000р',
				'От 50 000р'
			]
		},
	],
	form: {
		id: 5,
		title: 'Отлично! Остался последний шаг!',
		subtitle: 'Укажите ваш номер телефона и мы сообщим вам результаты теста.'
	}
};

const mortgageQuizeContainer = dom.get('.mortgage-flat__flat-quize'),
	mortgageQuize = new QuizeHandler(mortgageQuizeContainer),
	quizeButtonToStart = dom.get('.mortgage-quize__button');



mortgageQuize.setQuestions(excursionQuizData.questions);
mortgageQuize.setForm(excursionQuizData.form);
mortgageQuize.startHandler(quizeButtonToStart);



// modal handler

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
headerForm.setProps(dom.get('.header__form'), dom.get('.header__callback'));

const conditionsForm = new ModalWindow();
conditionsForm.setProps(dom.get('.conditions__form'), dom.get('.conditions__btn'));

const getDemoForm = new ModalWindow();
getDemoForm.setProps(dom.get('.get-demo__form'), dom.get('.get-demo__button'));

const mobileMenu = new ModalWindow();
mobileMenu.setProps(dom.get('.menu'), dom.get('.mobile-menu'), {className: 'menu__open'});


// little window

const offerWindowData = [
	`Пользователь из Дубровки только что забронировал квартиру`,
	`Пользователь из Низино только что забронировал квартиру`,
	`Пользователь из Санкт-Петербурга только что забронировал квартиру`,
	`Пользователь из Санкт-Петербурга только что записался на просмотр квартиры`

];

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
 }

function offerWindow(data, id) { // data = array
	const offer = dom.create('div', 'offer-window'),
		message = dom.create('div', 'offer-window__message'),
		image = dom.create('div', 'offer-window__image'),
		cancelButton = dom.create('div', 'offer-window__cancel-button');

	cancelButton.innerText = '×';
	message.innerText = data[id];

	offer.append(image, message, cancelButton);

	cancelButton.addEventListener('click', ()=> {
		offer.remove();
	});

	return offer;
}

window.onload = function() {
	
	setTimeout(() => {
		const randomRange = randomInteger(0, offerWindowData.length - 1);
		document.body.append(offerWindow(offerWindowData, randomRange));
	}, 30000);
 
	
	setInterval(() => {
		if (!dom.get('.offer-window')) {
			const randomRange = randomInteger(0, offerWindowData.length - 1);
			document.body.append(offerWindow(offerWindowData, randomRange));
		}
	}, 300000);
};