
const footer = document.querySelector('footer');
footer.innerHTML = '<a href="https://github.com/lundaTempo/lundaTempo.github.io">Källkod</><br><br>';

window.goatcounter = { endpoint: 'https://lundatempo.goatcounter.com/count' };
const script = document.createElement('script');
script.async = true;
script.src = '//gc.zgo.at/count.js';
footer.appendChild(script);
