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