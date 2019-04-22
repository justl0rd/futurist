import ElementsConstructor from './elements-constructor';
const dom = new ElementsConstructor();

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