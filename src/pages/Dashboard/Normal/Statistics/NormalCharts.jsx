import { Chart } from "react-google-charts";

const NormalCharts = ({reported, rejected, pending, products, reviews}) => {

    console.log(rejected, pending);
   
    // reported, rejected, pending, products, reviews,
    const data = [
        ["Task", "Hours per Day"],
        ["Products", products],
        ["Reviews", reviews],
        ["Reported", reported],
        ["Rejected", rejected],
        ["Pending", pending],
    ];

    const options = {
        title: "",
        legend: {
            position: 'bottom', // Place legend below the chart
            alignment: 'center', // Align legend items to the start (left) of the container
        },
    };

    return (
        <div className="drop-shadow-lg mt-3 flex items-center justify-center">
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default NormalCharts;