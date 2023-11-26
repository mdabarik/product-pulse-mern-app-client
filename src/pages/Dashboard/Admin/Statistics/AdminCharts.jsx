import { Chart } from "react-google-charts";

const AdminCharts = ({users, products, reviews}) => {
   

    const data = [
        ["Task", "Hours per Day"],
        ["Users", reviews],
        ["Products", products],
        ["Reviews", users],
    ];

    const options = {
        title: "",
        legend: {
            position: 'bottom', // Place legend below the chart
            alignment: 'center', // Align legend items to the start (left) of the container
        },
    };

    return (
        <div className="border-2 flex items-center justify-center">
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

export default AdminCharts;