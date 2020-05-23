import React from 'react'
import ReportContext from '../../context/report'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import TimerIcon from '@material-ui/icons/Timer'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const StyleChip = withStyles({
  root: {
    backgroundColor: red[700],
    color: 'white'
  }
})(Chip)

const CustomToolTip = props => {
  if (props.active === false) return null

  const { group, passed, failed, pending, times } = props.payload[0].payload
  return (
    <Card>
      <CardHeader title={group.name} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Box display="flex" justifyContent="flex-end" style={{ paddingLeft: 5 }}>
          <Chip size="small" color="primary" label={group.getPassedExampleCount()} style={{ marginRight: 5 }} />
          <StyleChip size="small" color="default" label={group.getFailedExampleCount()} style={{ marginRight: 5 }} />
          <Chip size="small" color="secondary" label={group.getPendingExampleCount()} style={{ marginRight: 5 }} />
          <Chip size="small" icon={<TimerIcon />} label={group.getFormattedTotalTime()} />
        </Box>
      </CardContent>
    </Card>
  )
}

const RunTimeScatter = ({ width, height, groups }) => {
  const data = groups.map(group => {
    return {
      group,
      passed: group.getPassedExampleCount(),
      times: group.getTotalTime()
    }
  })

  return (
    <ScatterChart width={width} height={height}>
      <CartesianGrid />
      <XAxis type="number" dataKey="passed" name="example" />
      <YAxis type="number" dataKey="times" name="run time" unit="s" />
      <Tooltip content={<CustomToolTip />} />
      <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
  )
}

export default ({ width, height }) => (
  <ReportContext.Consumer>
    {report => <RunTimeScatter width={width} height={height} groups={report.groups} />}
  </ReportContext.Consumer>
)
