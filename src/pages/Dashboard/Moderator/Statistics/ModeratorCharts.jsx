import { Chart } from "react-google-charts";

const ModeratorCharts = ({ products, accepted, pending, rejected, reported }) => {


    const data = [
        ["Task", "Hours per Day"],
        ["Total Products", products],
        ["Pending", pending],
        ["Accepted", accepted],
        ["Rejected", rejected],
        ["Reported", reported],
    ];

    const options = {
        title: "",
        legend: {
            position: 'bottom',
            alignment: 'center',
        },
    };

    return (
        <div className=" drop-shadow-lg mt-3 flex items-center justify-center">
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

export default ModeratorCharts;