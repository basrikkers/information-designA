//jqeury start en conclusion button

$(document).ready(function(){
$("#start").click(function(){
    $(".start").fadeOut(2000);

});

$("#conclusieClose").click(function(){
    $(".conclusie").fadeOut(1000);

});
$("#conclusieOpen").click(function(){
    $(".conclusie").fadeIn(1000);

});

});

// the average number of visiters in a stadium.
// bron: www.transfermarkt.nl
var bezoekers = {
      "Burnley":20558,
      "Crystal Palace":25161,
      "Everton":39080,
      "Hull":20656,
      "Man City":54019,
      "Middlesbrough":30449,
      "Southampton":30936,
      "Arsenal":59957,
      "Bournemouth":11182,
      "Chelsea":41508,
      "Man United":75290,
      "Leicester":31893,
      "Stoke":27433,
      "Swansea":20619,
      "Tottenham":31639,
      "Watford":20571,
      "West Brom":23876,
      "Sunderland":41287,
      "West Ham":56972,
      "Liverpool":53016,
      "Augsburg":28172,
      "Bayern Munich":75000,
      "Darmstadt":16753,
      "Dortmund":79712,
      "Ein Frankfurt":49176,
      "FC Koln":49571,
      "Freiburg":23959,
      "Hamburg":52341,
      "Hertha":50267,
      "Hoffenheim":28155,
      "Ingolstadt":14601,
      "Leverkusen":28428,
      "M'gladbach":51494,
      "Mainz":29096,
      "RB Leipzig":41478,
      "Schalke 04":60762,
      "Werder Bremen":40946,
      "Wolfsburg":27586,
      "Alaves":17758,
      "Ath Bilbao":41058,
      "Ath Madrid":44735,
      "Barcelona":78575,
      "Betis":33564,
      "Celta":16961,
      "Eibar":5324,
      "Espanol":20396,
      "Granada":14888,
      "La Coruna":22432,
      "Las Palmas":20441,
      "Leganes":10130,
      "Malaga":21941,
      "Osasuna":14757,
      "Real Madrid":71513,
      "Sevilla":32774,
      "Sociedad":21476,
      "Sp Gijon":22968,
      "Valencia":33922,
      "Villarreal":17774,
      "Angers":11734,
      "Bastia":10511,
      "Bordeaux":24217,
      "Caen":16799,
      "Dijon":10128,
      "Guingamp":14790,
      "Lille":29415,
      "Lorient":11832,
      "Lyon":39171,
      "Marseille":39898,
      "Metz":16196,
      "Monaco":9038,
      "Montpellier":12356,
      "Nancy":17516,
      "Nantes":23152,
      "Nice":22916,
      "Paris SG":45159,
      "Rennes":22689,
      "St Etienne":27028,
      "Toulouse":17068,
      "Atalanta":16944,
      "Bologna":21192,
      "Cagliari":12998,
      "Chievo":11842,
      "Crotone":8213,
      "Empoli":9409,
      "Fiorentina":26470,
      "Genoa":21332,
      "Inter":46620,
      "Juventus":39925,
      "Lazio":20400,
      "Milan":40292,
      "Napoli":36557,
      "Palermo":13204,
      "Pescara":13293,
      "Roma":32638,
      "Sampdoria":19662,
      "Sassuolo":12362,
      "Torino":18992,
      "Udinese":17851,
}

/*

Main Graph
scatterplot Mike Bostock
bron: https://bl.ocks.org/mbostock/3887118
changed d3.v3 to d3.v4

*/

var margin = {top: 20, right: 20, bottom: 30, left: 40}, //margin within svg
    width = 660 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10); //color scheme for country/league

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);
  var slider = document.getElementById("BZS") //detect slider
var svg = d3.select("#svgMain") //main svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("dataset.csv", function(error, data) { //dataset load

  if (error) throw error;

// modifing and math with data
  data.forEach(function(d) {
    d.AF = +d.AF;
    d.HF = +d.HF;
    d.AY = +d.AY;
    d.HY = +d.HY;
    d.AR = +d.AR;
    d.HR = +d.HR;
    d.FTAG = +d.FTAG;
    d.FTHG = +d.FTHG;
    var thuis = (1*d.HF + 2*d.HY + 3*d.HR) // HomeTeam decisions
    var uit = (1*d.AF + 2*d.AY + 3*d.AR) // AwayTeam decisions
    var voordeel = (uit/(thuis + uit) )* 100 //HomeTeam advantage
    d.TV = voordeel;
    d.BZ = bezoekers[d.HomeTeam]; //add the average crowd to the game

  });


  x.domain([0, 100]); // 0, 100 % x domain
  y.domain(d3.extent(data, function(d) { return bez(d.BZ) ; })).nice(); //y domain depens on average crowd

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("% Thuisvoordeel")
      .style("fill", "black");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("y", 6)
      .attr("dy", "-1.29em")
      .attr("x", 100)
      .style("text-anchor", "end")
      .text("Aantal toeschouwers")
      .style("fill", "black");

      // creating the dots, x is home advantage , y is average crowd
  var node = svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 2.5)
      .attr("id", function(d){return d.Div;})
      .attr("cx", function(d) { return x(d.TV); })
      .attr("cy", function(d) { return y(d.BZ); })
      .style("fill", function(d) { return color(d.Div); })
      .on('mouseover', function(d, i) { //on hover, shows the specifications of the played game
        document.getElementById('SpecsHomeTeam').innerHTML = d.HomeTeam + " " + d.FTHG;
        document.getElementById('SpecsAwayTeam').innerHTML = d.AwayTeam + " " +d.FTAG;
        document.getElementById('SpecsFouls').innerHTML = "Overtredingen: </br>" + d.HomeTeam + " " + d.HF + "</br>" + d.AwayTeam + " " + d.AF ;
        document.getElementById('SpecsYellow').innerHTML = "Gele Kaarten: </br>" + d.HomeTeam + " " + d.HY + "</br>" + d.AwayTeam + " " + d.AY ;
        document.getElementById('SpecsRed').innerHTML = "Rode Kaarten: </br>" + d.HomeTeam + " " + d.HR + "</br>" + d.AwayTeam + " " + d.AR ;
        document.getElementById('SpecsBZ').innerHTML = "Toeschouwers: </br>" + d.BZ ;
        d3.select(this).attr("r", 4.5);
})
.on('mouseout', function(d, i) { //removes specifications after mouse leave
  document.getElementById('SpecsHomeTeam').innerHTML = "";
  document.getElementById('SpecsAwayTeam').innerHTML = "";
  document.getElementById('SpecsFouls').innerHTML = "";
  document.getElementById('SpecsYellow').innerHTML = "";
  document.getElementById('SpecsRed').innerHTML = "";
  document.getElementById('SpecsBZ').innerHTML = "";
  d3.select(this).attr("r", 2.5);
});

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

      var div = function (d){
          return d.Div;
      }

      /*
      checkbox check and change (country filter)
      */
      d3.selectAll("input[name=checkb]").on("change", function() {
      function getCheckedBoxes(chkboxName) {
          var checkboxes = document.getElementsByName(chkboxName);
          var checkboxesChecked = [];
          for (var i=0; i<checkboxes.length; i++) { //creates array with all checkboxes
             if (checkboxes[i].checked) { //checkboxes that are checked
                checkboxesChecked.push(checkboxes[i].defaultValue);
             }
          }
          return checkboxesChecked.length > 0 ? checkboxesChecked : " ";
        }

        var checkedBoxes = getCheckedBoxes("checkb");
        var node = svg.selectAll(".dot")
        node.style("opacity", 1); // if checked, opacity 1


          node.filter(function(d) {
              return checkedBoxes.indexOf(d.Div) === -1;
            })
            .style("opacity", "0.1"); // if not checked, opacity 0.1


      });
      /*
      Change in crowd slider
      */
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


          var slider = document.getElementById("BZS")
          var dataslider = data.filter(function(d){if(d.BZ > slider.value){return d}}); //filter data to only crowd above slider value.


          document.getElementById("toeschouwers").textContent = "Min toeschouwers: " + slider.value; //slider value

        x.domain([0, 100]);
        y.domain(d3.extent(dataslider, function(d) { return bez(d.BZ) ; })).nice();

        //remove and recreate dots with new data (dataslider)
        svg.selectAll(".dot").remove();
        var node = svg.selectAll(".dot")
                   .data(dataslider)  // Update with new data
                   .enter().append("circle")
                       .attr("class", "dot")
                       .attr("r", 0)
                       .attr("id", function(d){return d.Div;})
                       .attr("cx", function(d) { return x(d.TV); })
                       .attr("cy", function(d) { return y(d.BZ); })
                       .style("opacity", "0")
                       .style("fill", function(d) { return color(d.Div); })
                       .on('mouseover', function(d, i) {
                         document.getElementById('SpecsHomeTeam').innerHTML = d.HomeTeam + " " + d.FTHG;
                         document.getElementById('SpecsAwayTeam').innerHTML = d.AwayTeam + " " +d.FTAG;
                         document.getElementById('SpecsFouls').innerHTML = "Overtredingen: </br>" + d.HomeTeam + " " + d.HF + "</br>" + d.AwayTeam + " " + d.AF ;
                         document.getElementById('SpecsYellow').innerHTML = "Gele Kaarten: </br>" + d.HomeTeam + " " + d.HY + "</br>" + d.AwayTeam + " " + d.AY ;
                         document.getElementById('SpecsRed').innerHTML = "Rode Kaarten: </br>" + d.HomeTeam + " " + d.HR + "</br>" + d.AwayTeam + " " + d.AR ;
                         document.getElementById('SpecsBZ').innerHTML = "Toeschouwers: </br>" + d.BZ ;
                         d3.select(this).attr("r", 4.5);
                 })
                 .on('mouseout', function(d, i) {
                   document.getElementById('SpecsHomeTeam').innerHTML = "";
                   document.getElementById('SpecsAwayTeam').innerHTML = "";
                   document.getElementById('SpecsFouls').innerHTML = "";
                   document.getElementById('SpecsYellow').innerHTML = "";
                   document.getElementById('SpecsRed').innerHTML = "";
                   document.getElementById('SpecsBZ').innerHTML = "";
                   d3.select(this).attr("r", 2.5);
                 })
                       .transition()
                       .duration(1000)
                       .attr("r", 2.5)
                       .style("opacity", "1")



                  svg.select(".x.axis") //update the x axis
            .transition()
            .duration(1000)
            .call(xAxis);

          svg.select(".y.axis").transition() // update the y axis
          .duration(750)
          .call(yAxis);


          node.style("opacity", 1);


            node.filter(function(d) {
                return checkedBoxes.indexOf(d.Div) === -1;
              })
              .style("opacity", "0.1");


        // bar change Overtredingen


        g3.selectAll(".bar").remove()
        var databar3 = d3.nest()
          .key(function(d) { return d.Div; })
          .rollup(function(data) { return {"AFV": d3.mean(data, function(d){ return ((d.AF)/(d.HF+d.AF))})}; })
          .entries(dataslider);

          var tip3 = d3.tip().html(overtr);

          var tip3 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(description3)

          svg3.call(tip3)

          function description3(d) {
          return 'Overtredingen: ' + (d.value.AFV*100).toFixed(2)+ "%";
        }
        function overtr(d) {
        return d.value.AFV;
      }
        x3.domain(databar3.map(function(d) { return d.key; }));
        y3.domain(d3.extent(databar3, function(d) { return d.value.AFV; })).nice();

        console.log(databar3)
        g3.selectAll(".bar")
          .data(databar3)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x3(d.key); })
            .attr("y", function(d) {  return y3(d.value.AFV); })
            .attr("width", x3.bandwidth())
            .attr("height", function(d) { return height3 - y3(d.value.AFV); })
            .style("fill", "darkblue")
            .on('mouseover', tip3.show)
            .on('mouseout', tip3.hide);


    g3.select(".axis--x")
      .transition()
      .duration(750)
        .call(d3.axisBottom(x3))
      .style("fill", "red");



    g3.select(".axis--y").transition() // change the y axis
    .duration(750)
    .call(d3.axisLeft(y3).ticks(10, "%"));

    // bar change Rode Kaarten

    g2.selectAll(".bar").remove()
    var databar2 = d3.nest()
      .key(function(d) { return d.Div; })
      .rollup(function(data) { return {"RKV": d3.mean(data, function(d){ return ((d.AR)/(d.HR+d.AR))})}; })
      .entries(dataslider);


                var tip2 = d3.tip().html(rkaart);

                var tip2 = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(description2)

                svg1.call(tip2)

                function description2(d) {
                return 'Rode kaarten: ' + (d.value.RKV*100).toFixed(2)+ "%";
              }
              function rkaart(d) {
              return d.value.RKV;
            }

    x2.domain(databar2.map(function(d) { return d.key; }));
    y2.domain(d3.extent(databar2, function(d) { return d.value.RKV; })).nice();

    console.log(databar2)
    g2.selectAll(".bar")
      .data(databar2)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x2(d.key); })
        .attr("y", function(d) {  return y2(d.value.RKV); })
        .attr("width", x2.bandwidth())
        .attr("height", function(d) { return height2 - y2(d.value.RKV); })
        .style("fill", "darkred")
        .on('mouseover', tip2.show)
        .on('mouseout', tip2.hide);

g2.select(".axis--x")
  .transition()
  .duration(750)
    .call(d3.axisBottom(x2))
  .style("fill", "red");



g2.select(".axis--y").transition() // change the y axis
.duration(750)
.call(d3.axisLeft(y2).ticks(10, "%"));

// bar change GEle Kaarten

g1.selectAll(".bar").remove()
var databar1 = d3.nest()
  .key(function(d) { return d.Div; })
  .rollup(function(data) { return {"GKV": d3.mean(data, function(d){ return ((d.AY)/(d.HY+d.AY))})}; })
  .entries(dataslider);


        var tip = d3.tip().html(gkaart);

        var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(description)

        svg1.call(tip)

        function description(d) {
        return 'Gele kaarten: ' + (d.value.GKV*100).toFixed(2)+ "%";
      }
      function gkaart(d) {
      return d.value.GKV;
    }

x1.domain(databar1.map(function(d) { return d.key; }));
y1.domain(d3.extent(databar1, function(d) { return d.value.GKV; })).nice();

console.log(databar1)
g1.selectAll(".bar")
  .data(databar1)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x1(d.key); })
    .attr("y", function(d) {  return y1(d.value.GKV); })
    .attr("width", x1.bandwidth())
    .attr("height", function(d) { return height1 - y1(d.value.GKV); })
    .style("fill", "#e2db5a")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

g1.select(".axis--x")
.transition()
.duration(750)
.call(d3.axisBottom(x1))
.style("fill", "red");



g1.select(".axis--y").transition() // change the y axis
.duration(750)
.call(d3.axisLeft(y1).ticks(10, "%"));
      })

      function bez(d){
      if (d.BZ > slider.value)
      console.log(d)
        return d;
      }



});




/*

  GELE KAARTEN
  Bar chart Mike Bostock
  bron: https://bl.ocks.org/mbostock/3885304

*/


var svg1 = d3.select("#svgSmallOne"), //select first small svg
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width1 = +svg1.attr("width") - margin.left - margin.right,
  height1 = +svg1.attr("height") - margin.top - margin.bottom;


var x1 = d3.scaleBand().rangeRound([0, width1]).padding(0.1),
  y1 = d3.scaleLinear().rangeRound([height1, 0]);

var g1 = svg1.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("dataset.csv", function(error, data) {

      if (error) throw error;



    data.forEach(function(d) {
      d.AF = +d.AF;
      d.HF = +d.HF;
      d.AY = +d.AY;
      d.HY = +d.HY;
      d.AR = +d.AR;
      d.HR = +d.HR;
      d.FTAG = +d.FTAG;
      d.FTHG = +d.FTHG;
      var thuis = (1*d.HF + 2*d.HY + 3*d.HR)
      var uit = (1*d.AF + 2*d.AY + 3*d.AR)
      var voordeel = (uit/(thuis + uit) )* 100
      d.RKV = (d.AR)/(d.HR+d.AR)
      d.AFV = (d.AF)/(d.HF+d.AF)
      d.GKV = (d.AY)/(d.HY+d.AY)
      d.TV = voordeel;
      d.BZ = bezoekers[d.HomeTeam];

    });
    var data = data.filter(function(d){return d});
    var data = d3.nest() // nest data
      .key(function(d) { return d.Div; }) //combine games by country
      .rollup(function(data) { return {"GKV": d3.mean(data, function(d){ return (d.GKV)})}; }) //define mean of yellow card advantage
      .entries(data);

/*
tooltip Titus Wormer
bron: https://cmda-fe3.github.io/course-17-18/class-4/tip/

*/

      var tip = d3.tip().html(gkaart); //tip bar chart

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(description)

      svg1.call(tip)

      function description(d) {
      return 'Gele kaarten: ' + (d.value.GKV*100).toFixed(2)+ "%"; //tip description
    }
    function gkaart(d) {
    return d.value.GKV;
  }


x1.domain(data.map(function(d) { return d.key; }));
y1.domain(d3.extent(data, function(d) { return d.value.GKV; })).nice();
g1.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height1 + ")")
    .call(d3.axisBottom(x1));

g1.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y1).ticks(10, "%"))
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

g1.selectAll(".bar")
  .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x1(d.key); })
    .attr("y", function(d) {  return y1(d.value.GKV); })
    .attr("width", x1.bandwidth())
    .attr("height", function(d) { return height1 - y1(d.value.GKV); })
    .style("fill", "#e2db5a")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
});



/*

  RODE KAARTEN

*/


var svg2 = d3.select("#svgSmallTwo"), //select second small svg
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width2 = +svg2.attr("width") - margin.left - margin.right,
  height2 = +svg2.attr("height") - margin.top - margin.bottom;

var x2 = d3.scaleBand().rangeRound([0, width2]).padding(0.1),
  y2 = d3.scaleLinear().rangeRound([height2, 0]);

var g2 = svg2.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("dataset.csv", function(error, data) {

      if (error) throw error;


    data.forEach(function(d) {
      d.AF = +d.AF;
      d.HF = +d.HF;
      d.AY = +d.AY;
      d.HY = +d.HY;
      d.AR = +d.AR;
      d.HR = +d.HR;
      d.FTAG = +d.FTAG;
      d.FTHG = +d.FTHG;
      var thuis = (1*d.HF + 2*d.HY + 3*d.HR)
      var uit = (1*d.AF + 2*d.AY + 3*d.AR)
      var voordeel = (thuis/(thuis + uit) )* 100
      d.RKV = (d.AR)/(d.HR+d.AR)
      d.TV = voordeel;
      d.BZ = bezoekers[d.HomeTeam];

    });
    var data = data.filter(function(d){return d});
    var data = d3.nest() //nest data by country
      .key(function(d) { return d.Div; })
      .rollup(function(data) { return {"RKV": d3.mean(data, function(d){ return (d.RKV)})}; }) //define mean of red card advantage
      .entries(data);
    console.log(data)

          var tip2 = d3.tip().html(rkaart);//tooltip

          var tip2 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(description2)

          svg1.call(tip2)

          function description2(d) {
          return 'Rode kaarten: ' + (d.value.RKV*100).toFixed(2)+ "%"; //tooltip description
        }
        function rkaart(d) {
        return d.value.RKV;
      }

x2.domain(data.map(function(d) { return d.key; }));
y2.domain(d3.extent(data, function(d) { return d.value.RKV; })).nice();
g2.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2));

g2.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y2).ticks(10, "%"))
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

g2.selectAll(".bar")
  .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x2(d.key); })
    .attr("y", function(d) {  return y2(d.value.RKV); })
    .attr("width", x2.bandwidth())
    .attr("height", function(d) { return height2 - y2(d.value.RKV); })
    .style("fill", "darkred")
    .on('mouseover', tip2.show) //show tooltip on hover
    .on('mouseout', tip2.hide);

});



/*

  Overtredingen

*/


var svg3 = d3.select("#svgSmallThree"), // third small svg
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width3 = +svg3.attr("width") - margin.left - margin.right,
  height3 = +svg3.attr("height") - margin.top - margin.bottom;

var x3 = d3.scaleBand().rangeRound([0, width3]).padding(0.1),
  y3 = d3.scaleLinear().rangeRound([height3, 0]);

var g3 = svg3.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("dataset.csv", function(error, data) {

      if (error) throw error;


    data.forEach(function(d) {
      d.AF = +d.AF;
      d.HF = +d.HF;
      d.AY = +d.AY;
      d.HY = +d.HY;
      d.AR = +d.AR;
      d.HR = +d.HR;
      d.FTAG = +d.FTAG;
      d.FTHG = +d.FTHG;
      var thuis = (1*d.HF + 2*d.HY + 3*d.HR)
      var uit = (1*d.AF + 2*d.AY + 3*d.AR)
      var voordeel = (uit/(thuis + uit) )* 100
      d.AFV = (d.AF)/(d.HF+d.AF)
      d.TV = voordeel;
      d.BZ = bezoekers[d.HomeTeam];


    });
    var data = data.filter(function(d){return d});
    var data = d3.nest() // nest by country
      .key(function(d) { return d.Div; })
      .rollup(function(data) { return {"AFV": d3.mean(data, function(d){ return (d.AFV)})}; }) //define mean of fouls home advantage
      .entries(data);
    console.log(data)

              var tip3 = d3.tip().html(overtr); //tooltip

              var tip3 = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(description3)

              svg3.call(tip3)

              function description3(d) {
              return 'Overtredingen: ' + (d.value.AFV*100).toFixed(2)+ "%"; //tooltip description
            }
            function overtr(d) {
            return d.value.AFV;
          }

x3.domain(data.map(function(d) { return d.key; }));
y3.domain(d3.extent(data, function(d) { return d.value.AFV; })).nice();
g3.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height3 + ")")
    .call(d3.axisBottom(x3));

g3.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y3).ticks(10, "%"))
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

g3.selectAll(".bar")
  .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x3(d.key); })
    .attr("y", function(d) {  return y3(d.value.AFV); })
    .attr("width", x3.bandwidth())
    .attr("height", function(d) { return height3 - y3(d.value.AFV); })
    .style("fill", "darkblue")
    .on('mouseover', tip3.show) // show tooltip on hover
    .on('mouseout', tip3.hide);


});
