function map(mapContainer, data, skiData) {
  const container = d3.select(mapContainer)

  const params = {
    width: container.node().getBoundingClientRect().width,
    height: 630,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  }

  const svg = container
    .append('svg')
    .attr('height', params.height)
    .attr('width', params.width)

  // create projection
  const projection = d3.geoMercator()
    .fitSize([params.width, params.height], data)

  // create path
  const path = d3.geoPath().projection(projection);
  // Create a group for the map features
  const features = svg.append("g")

  features.selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style('fill', "#AB182D")
    .attr('stroke', '#fafafa')
    .attr('stroke-width', 0.7)

  // zoom section
  const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

  svg.call(zoom)

  // reset buttons click
  d3.select('.plus').on('click', () => {
    svg.transition().duration(750).call(zoom.scaleTo, 2)
  })

  d3.select('.minus').on('click', () => {
    svg.transition().duration(750).call(zoom.scaleTo, 0)
  })

  function zoomed(event) {
    const { transform } = event;
    features.attr("transform", transform);
  }

  // adding circles on the map section
  const circle = features
    .selectAll('circle')
    .data(skiData)
    .enter()
    .append('circle')
    .attr('cx', (d) => projection([d.long, d.lat])[0])
    .attr('cy', (d) => projection([d.long, d.lat])[1])
    .attr('r', 7)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .on('mouseenter', function (d) {
      d3.select(this).attr('fill', '#AB182D')
    })
    .on('mouseleave', function (d) {
      d3.select(this).attr('fill', 'white')
    })


  // tippy
  circle.each(function (d) {
    tippy(this, {
      content: `<div class='bg-white flex justify-center items-center gap-2 px-3 py-1 font-bold text-[20px] border-2 border-black text-black rounded-full font-tungsten'>
      <div class='text-[#AB182D] text-lg font-arial'>${d['overall rank']} </div>
      <div> <img src='./images/flags/${d['country code']}.svg' alt='flag' class='w-[30px] h-[18px]' /> </div>
    <div>  ${d.resort}  </div>
      
      </div>`,
      allowHTML: true,
      maxWidth: 350,
      arrow: false,
      animateFill: false,
      theme: 'transparent',
    });

  });


}