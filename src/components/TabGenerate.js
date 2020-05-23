import React from 'react'
import ReportContext from '../context/report'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const ResultPieChart = ({ exampleCount, failedCount, pendingCount }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const chartData = [
    {
      name: 'example',
      count: exampleCount
    },
    {
      name: 'failed',
      count: failedCount
    },
    {
      name: 'pending',
      count: pendingCount
    }
  ]

  console.log({ exampleCount, failedCount, pendingCount })

  return (
    <PieChart width={730} height={250}>
      <Pie data={chartData} dataKey="count" cx="50%" cy="50%" outerRadius={80} label>
        {chartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default () => (
  <ReportContext.Consumer>
    {report => (
      <ResultPieChart
        exampleCount={report.getPassedExampleCount()}
        failedCount={report.getFailedExampleCount()}
        pendingCount={report.getPendingExampleCount()}
      />
    )}
  </ReportContext.Consumer>
)
