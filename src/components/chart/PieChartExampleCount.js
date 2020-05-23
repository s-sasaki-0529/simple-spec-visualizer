import React from 'react'
import ReportContext from '../../context/report'
import { red, yellow, green } from '@material-ui/core/colors'
import { ResponsiveContainer, Label, PieChart, Pie, Cell } from 'recharts'

const ResultPieChart = ({ passedCount, failedCount, pendingCount }) => {
  const chartData = [
    {
      name: 'passed',
      count: passedCount,
      color: green.A700
    },
    {
      name: 'failed',
      count: failedCount,
      color: red.A700
    },
    {
      name: 'pending',
      count: pendingCount,
      color: yellow.A700
    }
  ]
  const totalExamples = passedCount + failedCount + pendingCount
  const passedRate = (passedCount / totalExamples) * 100
  const formattedPassedRate = `${Math.round(passedRate * 100) / 100}%`

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={chartData} dataKey="count" innerRadius="60%" outerRadius="80%" paddingAngle={5} label>
          <Label value={formattedPassedRate} style={{ fontSize: '100vm' }} position="center" />
          {chartData.map((entity, index) => (
            <Cell key={`cell-${index}`} fill={entity.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default () => (
  <ReportContext.Consumer>
    {report => (
      <ResultPieChart
        passedCount={report.getPassedExampleCount()}
        failedCount={report.getFailedExampleCount()}
        pendingCount={report.getPendingExampleCount()}
      />
    )}
  </ReportContext.Consumer>
)
