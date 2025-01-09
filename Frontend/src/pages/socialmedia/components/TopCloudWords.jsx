import Plot from "react-plotly.js";

export default function TopCloudWords({showTopWords, onHideTopWords , Top5Words, animationClass}) {

      const x = Top5Words.map((_, index) => `Top ${index + 1}`);
      const y = Top5Words.map(item => item.frequency);
      

      const data = [
        {
          x: x,
          y: y,
          name: "initial",
          type: 'scatter',
          mode: 'lines+markers',
          line: { shape: 'spline', color: '#152063', width: 2 },
          marker: { size: 6 },
          fill: 'tonexty', 
          fillcolor: 'rgba(58, 16, 120, 0.2)',
          hovertemplate: '%{x}, %{y} Times<extra></extra>',
        },
      ];

      const annotations = Top5Words.map((item, index) => ({
        x: x[index],
        y: y[index],
        text: `${item.word}<br>${item.frequency} Times`,
        showarrow: false,
        yshift: 40,
        align: 'center',
        font: {
            family: 'BaiJamjuree-Bold',
            size: 18,
            color: '#152063',
          },
      }));
    
      const layout = {
        xaxis: {
            visible: false,
          },
        yaxis: {
            visible: false,
        },
        margin: {l:50, r:50, t: 10, b: 10 },
        annotations: annotations,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        dragmode: false
      };

      const config = {
        displayModeBar: false,
      };



    return (
    <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          showTopWords ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-10 pr-10 flex flex-col">
            <div className="w-full h-[370px] bg-gray-50 border-2 border-white rounded-[30px] shadow-[2px_2px_4px_rgba(0,0,0,0.15)]">
                <div className="mt-5 ml-5 text-[#152063] text-[25px] font-BaiJamjureeBold">
                    Top 5 most frequently appearing words in social platform comments
                </div>

                <div className={`overflow-hidden transition-all ${animationClass}`}>
                  <div>
                    <Plot
                        data={data}
                        layout={layout}
                        config={config}
                        useResizeHandler
                        className="w-full h-[250px]"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                    <button
                    onClick={onHideTopWords}
                    className="w-[100px] h-[35px] text-white font-PoppinsRegular rounded-[10px]
                                bg-gradient-to-r from-[#3949AB] to-[#152063] shadow-[0px_5px_15px_rgba(0,0,0,0.3)]
                                hover:scale-105 hover:shadow-[0px_5px_5px_rgba(0,0,0,0.5),0_0_5px_#4a90e2] transition-all
                                duration-500 relative overflow-hidden"
                    >
                    Hide
                    </button>
                </div>
            </div>
        </div>
    </div>
     
    )
}

