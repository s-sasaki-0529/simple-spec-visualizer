import React from 'react'
import PieChartExampleCount from './chart/PieChartExampleCount'
import ScatterChartGroupRunTime from './chart/ScatterChartGroupRunTime'
import BasicInformation from './BasicInformation'
import { Divider, Card, CardContent, CardHeader, Grid, Box } from '@material-ui/core/'
import { Alert, AlertTitle } from '@material-ui/lab'
import ReportContext from '../context/report'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

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

const StyledGrid = withStyles({
  root: {
    padding: '15px !important'
  }
})(Grid)

const StyledCard = withStyles({
  root: {
    height: '100%',
    backgroundColor: grey[50]
  }
})(Card)

const GridCardItem = ({ title, children }) => {
  return (
    <StyledGrid item xs={6}>
      <StyledCard>
        <CardHeader title={title} />
        <Divider />
        <CardContent>{children}</CardContent>
      </StyledCard>
    </StyledGrid>
  )
}

const TabGenerate = ({ report }) => {
  const contentWidth = window.innerWidth - 120
  const contentHeight = window.innerHeight

  return (
    <Box height="100vh" overflow="scroll">
      <ResultAlert report={report} />
      <Grid container>
        <GridCardItem title="Result rate">
          <PieChartExampleCount width={contentWidth / 2.2} height={contentHeight / 2} />
        </GridCardItem>
        <GridCardItem title="Basic information">
          <BasicInformation report={report} />
        </GridCardItem>
        <GridCardItem title="Volume and Times">
          <ScatterChartGroupRunTime width={contentWidth / 2.2} height={contentHeight / 2} />
        </GridCardItem>
      </Grid>
    </Box>
  )
}

export default () => <ReportContext.Consumer>{report => <TabGenerate report={report} />}</ReportContext.Consumer>
