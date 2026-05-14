window.goatcounter = { endpoint: 'https://lundatempo.goatcounter.com/count' };
const script = document.createElement('script');
script.async = true;
script.src = '//gc.zgo.at/count.js';

const footer = document.querySelector('footer');
if (footer) {
  footer.appendChild(script);

  const link = document.createElement('a');
  link.href = 'https://github.com/lundaTempo/lundaTempo.github.io';
  link.innerHTML = '<b>Källkod</b><br>';
  footer.appendChild(link);
}
