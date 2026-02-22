const footer = document.querySelector('footer');
footer.innerHTML = '<a href="https://github.com/lundaTempo/lundaTempo.github.io">Källkod</a>';

const script = document.createElement('script');
script.dataset.goatcounter = 'https://lundatempo.goatcounter.com/count';
script.async = true;
script.src = '//gc.zgo.at/count.js';
footer.appendChild(script);
