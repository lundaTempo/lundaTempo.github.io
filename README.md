# lundaTempo
Tillgänglig på https://lundaTempo.github.io/

## Anvisningar
För att lägga till en låt, lägg till den som en .md i /songs genom att kopiera mallen (song_template.md)

## För utvecklare

Använd två terminaler samtidigt:

Kompilera SASS en gång och Bevaka SASS-ändringar (kompilerar automatiskt när du sparar):
```
npx sass style.sass style.css
npm run watch
```

Starta utvecklingsservern (serverar sidan med live-reload, inkluderar inte SASS):
```
npm start
```
Serverns URL visas i terminalen när du kör kommandot.
