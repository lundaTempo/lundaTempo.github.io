# lundaTempo
Tillgänglig på https://lundaTempo.github.io/

## Anvisningar
För att lägga till en låt, lägg till den som en .md i /songs

## Kontakt
joel.t.t.o@gmail.com

## För utvecklare

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

För full utveckling, kör `npm run watch` och `npm start` samtidigt i två terminaler.
