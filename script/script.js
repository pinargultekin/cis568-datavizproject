var svg = d3.select("svg"),
  margin = 200,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin;

svg
  .append("text")
  .attr("class", "title")
  .attr("transform", "translate(100,0)")
  .attr("x", 50)
  .attr("y", 50)
  .text("Ukrainian refugee cost 2022 by country");

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
  yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv(
  "./dataset/ukrainian-refugee-cost-by-country.csv",
  function (error, data) {
    if (error) {
      throw error;
    }

    xScale.domain(
      data.map(function (d) {
        return d.Country;
      })
    );
    yScale.domain([
      0,
      d3.max(data, function (d) {
        return d.Cost;
      }),
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-50)")
      .attr("dy", "10px")
      .attr("dx", "-30px")
      .append("text")
      .attr("class", "xaxis")
      .attr("y", height - 250)
      .attr("x", width - 100)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Countries"); //problem! not show up

    g.append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(function (d) {
            return "€" + d;
          })
          .ticks(12)
      )
      .append("text")
      .attr("class", "xaxis")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-5.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Cost (billion Euros)");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return xScale(d.Country);
      })
      .attr("y", function (d) {
        return yScale(d.Cost);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return height - yScale(d.Cost);
      });
  }
);
