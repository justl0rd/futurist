export default class ElementsConstructor {
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