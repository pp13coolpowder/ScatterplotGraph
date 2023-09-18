function App() {
    React.useEffect(() => {
       
        const url =
            'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

   
        const margin = {
            top: 100,
            right: 20,
            bottom: 30,
            left: 60,
        };
        const width = 920 - margin.left - margin.right;
        const height = 630 - margin.top - margin.bottom;

   
        const svg = d3
            .select('.scatter-plot')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'graph')
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

       
        d3.json(url).then((data) => {
           
            data.forEach(function (d) {
                d.Place = +d.Place;
                var parsedTime = d.Time.split(':');
                d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
            });

        
            const x = d3.scaleLinear().range([0, width]);
            const y = d3.scaleTime().range([0, height]);

            x.domain([
                d3.min(data, function (d) {
                    return d.Year - 1;
                }),
                d3.max(data, function (d) {
                    return d.Year + 1;
                }),
            ]);
            y.domain(
                d3.extent(data, function (d) {
                    return d.Time;
                })
            );

          
            const xAxis = d3.axisBottom(x).tickFormat(d3.format('d'));
            const yAxis = d3.axisLeft(y).tickFormat(d3.timeFormat('%M:%S'));

           
            svg
                .append('g')
                .attr('class', 'x axis')
                .attr('id', 'x-axis')
                .attr('transform', `translate(0, ${height})`)
                .call(xAxis)
                .append('text')
                .attr('class', 'x-axis-label')
                .attr('x', width)
                .attr('y', -6)
                .style('text-anchor', 'end')
                .text('Year');

            svg
                .append('g')
                .attr('class', 'y axis')
                .attr('id', 'y-axis')
                .call(yAxis)
                .append('text')
                .attr('class', 'label')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text('Best Time (minutes)');

            svg
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('x', -160)
                .attr('y', -44)
                .style('font-size', 18)
                .text('Time in Minutes');
            svg
                .selectAll('.dot')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'dot')
                .attr('r', 6)
                .attr('cx', function (d) {
                    return x(d.Year);
                })
                .attr('cy', function (d) {
                    return y(d.Time);
                })
                .attr('data-xvalue', function (d) {
                    return d.Year;
                })
                .attr('data-yvalue', function (d) {
                    return d.Time.toISOString();
                })
                .style('fill', function (d) {
                    return d.Doping !== '' ? 'red' : 'green';
                })
                .on('mouseover', function (event, d) {


                })
                .on('mouseout', function () {

                });

            svg
                .append('text')
                .attr('id', 'title')
                .attr('x', width / 2)
                .attr('y', 0 - margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '30px')
                .text('Doping in Professional Bicycle Racing');

            svg
                .append('text')
                .attr('x', width / 2)
                .attr('y', 0 - margin.top / 2 + 25)
                .attr('text-anchor', 'middle')
                .style('font-size', '20px')
                .text("35 Fastest times up Alpe d'Huez");
            const legendContainer = svg.append('g').attr('id', 'legend');

            const legend = legendContainer
                .selectAll('#legend')
                .data([true, false]) 
                .enter()
                .append('g')
                .attr('class', 'legend-label')
                .attr('transform', function (d, i) {
                    return 'translate(0,' + (height / 2 - i * 20) + ')';
                });

            legend
                .append('rect')
                .attr('x', width - 18)
                .attr('width', 18)
                .attr('height', 18)
                .style('fill', function (d) {
                    return d ? 'red' : 'green';
                });

            legend
                .append('text')
                .attr('x', width - 24)
                .attr('y', 9)
                .attr('dy', '.35em')
                .style('text-anchor', 'end')
                .text(function (d) {
                    return d ? 'Riders with doping allegations' : 'No doping allegations';
                });
        });
    }, []);

    return (
        <div className="App">
            <div className="scatter-plot"></div>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById("root"));