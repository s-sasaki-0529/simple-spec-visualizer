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

const GridCardItem = ({ title, children, size = 6 }) => {
  return (
    <StyledGrid item xs={size}>
      <StyledCard>
        <CardHeader title={title} />
        <Divider />
        <CardContent>{children}</CardContent>
      </StyledCard>
    </StyledGrid>
  )
}

export default class TabGeneral extends React.Component {
  static contextType = ReportContext

  constructor(props) {
    super(props)
    this.state = {
      scatterChartTitle: null
    }
  }

  updateScatterChartTitle(title) {
    this.setState({ scatterChartTitle: title })
  }

  render() {
    const contentWidth = window.innerWidth - 120
    const contentHeight = window.innerHeight

    return (
      <Box height="100vh" overflow="scroll">
        <ResultAlert report={this.context} />
        <Grid container>
          <GridCardItem title="Result rate">
            <PieChartExampleCount width={contentWidth / 2.2} height={contentHeight / 3} />
          </GridCardItem>
          <GridCardItem title="Basic information">
            <BasicInformation report={this.context} />
          </GridCardItem>
          <GridCardItem title={this.state.scatterChartTitle || 'Volume and Times'} size={12}>
            <ScatterChartGroupRunTime
              updateTitle={group => this.updateScatterChartTitle(group)}
              groups={this.context.groups}
              width={contentWidth / 1.05}
              height={contentHeight / 3}
            />
          </GridCardItem>
        </Grid>
      </Box>
    )
  }
}
