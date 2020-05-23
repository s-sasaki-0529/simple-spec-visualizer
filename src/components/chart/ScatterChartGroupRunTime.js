import React from 'react'
import ReportContext from '../../context/report'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const CustomToolTip = props => {
  if (props.active === false) return null

  const { name, passed, failed, pending, times } = props.payload[0].payload
  return (
    <TableContainer component={Card}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Passed</TableCell>
            <TableCell>{passed}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Failed</TableCell>
            <TableCell>{failed}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pending</TableCell>
            <TableCell>{pending}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Times</TableCell>
            <TableCell>{times}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const RunTimeScatter = ({ width, height, groups }) => {
  const data = groups.map(group => {
    return {
      name: group.name,
      passed: group.getPassedExampleCount(),
      failed: group.getFailedExampleCount(),
      pending: group.getPendingExampleCount(),
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
