import React from 'react'
import ReportContext from '../../context/report'
import { red, yellow, green } from '@material-ui/core/colors'
import { Label, PieChart, Pie, Cell } from 'recharts'

/**
 * テスト全体の結果を円グラフで描画するコンポーネント
 */
const ResultPieChart = (props: {
  width: number
  height: number
  passedCount: number
  failedCount: number
  pendingCount: number
}) => {
  const chartData = [
    {
      name: 'passed',
      count: props.passedCount,
      color: green.A700
    },
    {
      name: 'failed',
      count: props.failedCount,
      color: red.A700
    },
    {
      name: 'pending',
      count: props.pendingCount,
      color: yellow.A700
    }
  ]

  // 全体のテスト成功率 Pendingは計算対象から意図的に除外している
  const passedRate = (props.passedCount / (props.passedCount + props.failedCount)) * 100
  const formattedPassedRate = `${Math.round(passedRate * 100) / 100}%`

  return (
    <PieChart width={props.width} height={props.height}>
      <Pie data={chartData} dataKey="count" innerRadius="60%" outerRadius="80%" paddingAngle={0} label>
        <Label value={formattedPassedRate} style={{ fontSize: '2.5em' }} position="center" />
        {chartData.map((entity, index) => (
          <Cell key={`cell-${index}`} fill={entity.color} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default (props: { width: number; height: number }) => (
  <ReportContext.Consumer>
    {report => (
      <ResultPieChart
        width={props.width}
        height={props.height}
        passedCount={report.getPassedExampleCount()}
        failedCount={report.getFailedExampleCount()}
        pendingCount={report.getPendingExampleCount()}
      />
    )}
  </ReportContext.Consumer>
)
