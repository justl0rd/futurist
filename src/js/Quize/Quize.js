import ElementsConstructor from '../elements-constructor';
const dom = new ElementsConstructor();

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

export default class QuizeHandler extends QuizeRender{
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