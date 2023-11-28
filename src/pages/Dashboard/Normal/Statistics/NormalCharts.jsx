import { Chart } from "react-google-charts";

const NormalCharts = ({accepted, rejected, pending, products}) => { // accepted, rejected, pending, products

    console.log(rejected, pending);
   
    // reported, rejected, pending, products, reviews,
    const data = [
        ["Task", "Hours per Day"],
        ["Total Products", products],
        ["Rejected", rejected],
        ["Pending", pending],
        ["Accepted", accepted],
    ];

    const options = {
        title: "",
        legend: {
            position: 'bottom',
            alignment: 'center'
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