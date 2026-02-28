
const footer = document.querySelector('footer');
footer.innerHTML = '<a href="https://github.com/lundaTempo/lundaTempo.github.io">Källkod</><br><br>';

window.goatcounter = { endpoint: 'https://lundatempo.goatcounter.com/count' };
const script = document.createElement('script');
script.async = true;
script.src = '//gc.zgo.at/count.js';
footer.appendChild(script);

//.querySelector('header').innerHTML = '<a href="/gauss/" style="display:block;width:400%;height:100%;opacity:0;position:absolute;top:0;left:0;" aria-hidden="true" tabindex="-1"></a>'
