# information-design Opdracht A

* Student:       Bas Rikkers
* Studentnummer: 500737460
* Coach:         Laurens Aarnoudse
* Datum:         10-11-17


## Opdracht
Ontwerp een datavisualisatie waaruit een gebruiker
(minstens) drie verschillende inzichten (bijv. wie, waar,
wanneer, hoe, wat, wie, waarom of combinaties daarvan)
kan opdoen uit jouw datasets. 

## Onderwerp
Mijn case gaat over het thuisvoordeel bij een voetbalwedstrijd. Nu er steeds meer onderzoek is naar de videoscheidsrechter, wordt de beslissingen van een scheidsrechter steeds meer onder de loep genomen. Een terugkerend aspect daarin is de invloed van het publiek op de scheidsrechter. "Fluit een scheidsrechter meer in het voordeel van de thuisploeg als er veel publiek aanwezig is?" Dit ben ik gaan onderzoeken en gaan visualiseren.

## Dataset
Voor mijn onderzoek heb ik alle gegevens van de wedstrijden gebruikt van de 5 grootste competities in Europa in het seizoen 2016/2017. 
Deze competities zijn:

* Premier League (Engeland)
* Bundesliga (Duitsland)
* Liga Santander (Spanje)
* Ligue 1 (Frankrijk)
* Serie A (Italie)

De datasets (csv) komen van [Football Data UK](http://www.football-data.co.uk/data.php). Deze heb ik bij elkaar gevoegd in het bestand dataset.csv.

Het gemiddeld aantal toeschouwers heb ik via [transfermarkt.nl](www.transfermarkt.nl) and handmatig ingevoerd in een array.

## Berekeningen

Om het thuisvoordeel te bepalen heb ik een aantal berekeningen uitvoerd via d3. Daar heb ik de volgende gegevens bij gebruikt:
* HF (thuisteam overtredingen)
* AF (uitteam overtredingen)
* HY (thuisteam gele kaarten)
* AY (uitteam gele kaarten)
* HR (thuisteam rode kaarten)
* AR (uitteam rode kaarten)

het thuisvoordeel ben ik gaan berekenen door te kijken welk percentage van de beslissingen in het voordeel van het thuisspelende team was.
Zo kom je op de volgende berekenening:

(AF + AY + AR)/(HF + HY + HR + AF + AY + AR) x 100

Deze berekingen zijn ook gedaan met alleen overtredingen, gele kaarten of rode kaarten.

## Scatterplot
Als belangrijkste grafiek heb ik gebruik gemaakt van een scatterplot van Mike Bostock
* bron: [Mike Bostock Scatterplot](https://bl.ocks.org/mbostock/3887118)

Deze grafiek heb ik aangepast van d3.v3 naar d3.v4

## Bar charts

De andere 3 grafieken zijn bar charts
* bron: [Mike Bostock bar chart](https://bl.ocks.org/mbostock/3885304)

hierbij heb ik een d3.nest functie toegepast om de wedstrijden te verdelen per land, om die uiteindelijk te kunnen vergelijken.

```JS

var data = d3.nest() // nest data
      .key(function(d) { return d.Div; }) //combine games by country
      .rollup(function(data) { return {"GKV": d3.mean(data, function(d){ return (d.GKV)})}; }) //define mean of yellow card advantage
      .entries(data);

```

hierbij heb ik ook tip functie gebruikt
* bron: [Titus Wormer tip](https://cmda-fe3.github.io/course-17-18/class-4/tip/)

## Update

Voor mijn visualisatie is het belangrijk dat het verschil tussen de grootte van toeschouwers goed zichtbaar is. Dit heb ik laten zien door een interactie te maken, waarbij je met een range input het minimaal aantal toeschouwers kan bepalen. Hier reageren alle grafieken op. 

bij een verandering wordt er een filter toegepast op de dataset:
```JS
  var dataslider = data.filter(function(d){if(d.BZ > slider.value){return d}}); //filter data to only crowd above slider value
  
        function bez(d){
      if (d.BZ > slider.value)
      console.log(d)
        return d;
      }
```

vervolgens worden de grafieken opnieuw aangemaakt of geupdate

## filter checkbox

In de scatterplot kan je via het filter menu landen verwijderen (minder zichtbaar maken). Dit kan aan de hand van de checkboxes.
* bron: [checkbox check](https://stackoverflow.com/questions/8563240/how-to-get-all-checked-checkboxes)

```JS
d3.selectAll("input[type=range]").on("change", function() {
        // recreate nodes with checkbox check
        function getCheckedBoxes(chkboxName) {
            var checkboxes = document.getElementsByName(chkboxName);
            var checkboxesChecked = [];
            for (var i=0; i<checkboxes.length; i++) {
               if (checkboxes[i].checked) {
                  checkboxesChecked.push(checkboxes[i].defaultValue);
               }
            }
            return checkboxesChecked.length > 0 ? checkboxesChecked : " ";
          }

          var checkedBoxes = getCheckedBoxes("checkb");
          
```

vervolgens verander ik de opacity van de dots

## functionaliteiten

* [d3.min](https://github.com/d3/d3-array/blob/master/README.md#min) - compute the minimum value in an array.
* [d3.max](https://github.com/d3/d3-array/blob/master/README.md#max) - compute the maximum value in an array.
* [d3.extent](https://github.com/d3/d3-array/blob/master/README.md#extent) - compute the minimum and maximum value in an array.
* [d3.mean](https://github.com/d3/d3-array/blob/master/README.md#mean) - compute the arithmetic mean of an array of numbers.
* [d3.nest](https://github.com/d3/d3-collection/blob/master/README.md#nest) - create a new nest generator.
* [*nest*.key](https://github.com/d3/d3-collection/blob/master/README.md#nest_key) - add a level to the nest hierarchy.
* [*nest*.rollup](https://github.com/d3/d3-collection/blob/master/README.md#nest_rollup) - specify a rollup function for leaf values.
* [*nest*.entries](https://github.com/d3/d3-collection/blob/master/README.md#nest_entries) - generate the nest, returning an array of key-values tuples.
* [d3.csv](https://github.com/d3/d3-request/blob/master/README.md#csv) - get a comma-separated values (CSV) file.
* [d3.schemeCategory10](https://github.com/d3/d3-scale/blob/master/README.md#schemeCategory10) - a categorical scheme with 10 colors.
* [d3.select](https://github.com/d3/d3-selection/blob/master/README.md#select) - select an element from the document.

#License

MIT @ Bas Rikkers
