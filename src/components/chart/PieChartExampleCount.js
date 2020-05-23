import React from 'react'
import ReportContext from '../../context/report'
import { red, yellow, green } from '@material-ui/core/colors'
import { Label, PieChart, Pie, Cell } from 'recharts'

const ResultPieChart = ({ width, height, passedCount, failedCount, pendingCount }) => {
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
    <PieChart width={width} height={height}>
      <Pie data={chartData} dataKey="count" innerRadius="60%" outerRadius="80%" paddingAngle={0} label>
        <Label value={formattedPassedRate} style={{ fontSize: '2.5em' }} position="center" />
        {chartData.map((entity, index) => (
          <Cell key={`cell-${index}`} fill={entity.color} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default ({ width, height }) => (
  <ReportContext.Consumer>
    {report => (
      <ResultPieChart
        width={width}
        height={height}
        passedCount={report.getPassedExampleCount()}
        failedCount={report.getFailedExampleCount()}
        pendingCount={report.getPendingExampleCount()}
      />
    )}
  </ReportContext.Consumer>
)
