import  { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ComposedChart,
  Scatter
} from "recharts";

import { TotalExpenseChartTypes,ExpenseCountByCategory } from "../../services/DataProvider";

interface ChartsProps {
  expenseListTotalAmount: ExpenseCountByCategory[];
  chooseChartType: string;
}

const Charts: FC<ChartsProps> = ({
  expenseListTotalAmount,
  chooseChartType,
}) => {
  return (
    <div>
      {/* Area Chart */}

      {TotalExpenseChartTypes.Area_Chart === chooseChartType &&
        expenseListTotalAmount.length >= 1 && (
          <AreaChart
            width={600}
            height={300}
            data={expenseListTotalAmount}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalammount"
              stroke="#8884d8" fill="#8884d8" 
            />
          </AreaChart>
        )}

      {/* Line Chart */}

      {TotalExpenseChartTypes.Line_Chart === chooseChartType && (
        <LineChart
          width={500}
          height={300}
          data={expenseListTotalAmount}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="6 6" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalammount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}

      {/* Bar Chart */}

      {TotalExpenseChartTypes.Bar_Chart === chooseChartType && (
        <BarChart
          width={500}
          height={300}
          data={expenseListTotalAmount}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalammount" fill="#8884d8" />
        </BarChart>
      )}

      {/* Pie Chart */}

      {TotalExpenseChartTypes.Pie_Chart === chooseChartType && (
        <PieChart width={400} height={400}>
          <Pie
            dataKey="totalammount"
            startAngle={180}
            endAngle={0}
            data={expenseListTotalAmount}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
      )}

      {/* LineBarAreaComposedChart */}

      {TotalExpenseChartTypes.Line_Bar_Area_Composed_Chart ===
        chooseChartType && (
        <ComposedChart
          width={500}
          height={400}
          data={expenseListTotalAmount}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="_id" scale="band" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="totalammount" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="totalammount" stroke="#ff7300" />
          <Scatter dataKey="totalammount" fill="orange" />
        </ComposedChart>
      )}
    </div>
  );
};

export default Charts;
