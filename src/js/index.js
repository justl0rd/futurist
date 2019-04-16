import './timer.js';
import Gallery from './Gallery/Gallery';
import Quize from './Quize/Quize';
import flatsQuizeData from './static-data/questions-8';

Gallery();

const flatQuizeButton = document.querySelector('.flat-quize__button'),
    flatQuizeContainer = document.querySelector('.personal-flat__flat-quize'),
    flatsQuize = new Quize(flatQuizeContainer);

flatsQuize.setQuestions(flatsQuizeData.questions);
flatsQuize.setForm(flatsQuizeData.form);
flatsQuize.startHandler(flatQuizeButton);