import React from 'react'
import PieChartExampleCount from './chart/PieChartExampleCount'
import ScatterChartGroupRunTime from './chart/ScatterChartGroupRunTime'
import { Divider, Card, CardContent, CardHeader, Grid, Box } from '@material-ui/core/'
import { Alert, AlertTitle } from '@material-ui/lab'

const ResultAlert = ({ report }) => {
  const failedCount = report.getFailedExampleCount()
  if (failedCount > 0) {
    const message = failedCount === 1 ? 'There is 1 failed test...' : `There are ${failedCount} failed tests...`
    return (
      <Alert severity="error">
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    )
  } else {
    return null
  }
}

export default () => {
  const contentWidth = window.innerWidth - 120
  const contentHeight = window.innerHeight

  return (
    <Box>
      <ReportContext.Consumer>{report => <ResultAlert report={report} />}</ReportContext.Consumer>
      <Grid container>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Result rate" />
            <Divider />
            <CardContent>
              <PieChartExampleCount width={contentWidth / 2.2} height={contentHeight / 2} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Volume and Times" />
            <Divider />
            <CardContent>
              <ScatterChartGroupRunTime width={contentWidth / 2.2} height={contentHeight / 2} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
