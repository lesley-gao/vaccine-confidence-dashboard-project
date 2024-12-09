import Plot from 'react-plotly.js';

function DiseaseCase() {

  const data = [
    // Dataset 1：Measles
    {
      x: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      y: [103, 15, 30, 2213, 9, 0, 0, 14],
      type: "bar",
      name: "Measles",
      marker: { color: "8979FF" },
    },
    // Dataset 2：Mumps
    {
      x: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      y: [20, 1337, 442, 264, 144, 1, 1, 16],
      type: "bar",
      name: "Mumps",
      marker: { color: "FF928A" },
    },
    // Dataset 3：Rubella
    {
      x: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      y: [0, 0, 0, 0, 0, 0, 0, 0],
      type: "bar",
      name: "Rubella",
      marker: { color: "3CC3DF" },
    },
  ]

  const layout = {
    xaxis: { title: "Year", type: "category" },
    yaxis: {
      title: "Number of Cases",
    },
    barmode: "stack",
    margin: {
      l: 70,
      r: 20,
      t: 10,
      b: 40,
    },
    legend: {
      x: 0.95,
      y: 0.15,
      xanchor: "right",
      yanchor: "bottom",
    },
    paper_bgcolor: '#f8f9fa',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    autosize: true,
  }

  return (
    <div className="h-full p-4 bg-gray-50 border-2 border-white rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,0.15)] flex flex-col">

      <div className="text-xl font-bold font-PoppinsBold mb-3"> MMR Disease Cases (2016-2023) </div>

      <div className='flex-1 justify-center'>
        <Plot
          data={data}
          layout={layout}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true }}
          useResizeHandler={true}
        />
      </div>

    </div>
  );
}

export default DiseaseCase;