import './timer.js';

// modules
import Gallery from './Gallery/Gallery';
import Quize from './Quize/Quize';
import RoomOptions from './RoomOptions/RoomOptions';

// data
import flatsQuizeData from './static-data/questions-8';
import mortgageQuizeData from './static-data/questions-8';
import flatsData from './static-data/flats-data';

Gallery();

const flatQuizeButton = document.querySelector('.flat-quize__button'),
    flatQuizeContainer = document.querySelector('.personal-flat__flat-quize'),
    flatsQuize = new Quize(flatQuizeContainer);

flatsQuize.setQuestions(flatsQuizeData.questions);
flatsQuize.setForm(flatsQuizeData.form);
flatsQuize.startHandler(flatQuizeButton);

const mortgageQuizeButton = document.querySelector('.mortgage-quize__button'),
    mortgageQuizeContainer = document.querySelector('.mortgage-flat__flat-quize'),
    mortgageQuize = new Quize(mortgageQuizeContainer);

mortgageQuize.setQuestions(mortgageQuizeData.questions);
mortgageQuize.setForm(mortgageQuizeData.form);
mortgageQuize.startHandler(mortgageQuizeButton);

const roomOptionsContainer = document.querySelector('.flats-preview__flat-cards'),
    roomOptions = new RoomOptions(roomOptionsContainer, flatsData);