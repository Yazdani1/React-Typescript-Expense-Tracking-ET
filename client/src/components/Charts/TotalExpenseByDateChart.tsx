import { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface TotalExpenseByDateChartProps {
  totalExpensesByDate: [] | any;
}

const TotalExpenseByDateChart: FC<TotalExpenseByDateChartProps> = ({
  totalExpensesByDate,
}) => {
  return (
    <div>
      {/* Area Chart */}

      {totalExpensesByDate.length >= 1 && (
        <AreaChart
          width={600}
          height={300}
          data={totalExpensesByDate}
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
            dataKey="TotalExpenses"
            stroke="#8884d8"
            fill="orange"
          />
        </AreaChart>
      )}
    </div>
  );
};

export default TotalExpenseByDateChart;
