import React from 'react'
import PieChartExampleCount from './chart/PieChartExampleCount'
import ScatterChartGroupRunTime from './chart/ScatterChartGroupRunTime'
import { Grid, Box } from '@material-ui/core/'

export default () => {
  const contentWidth = window.innerWidth - 120
  const contentHeight = window.innerHeight

  // FIXME: JSで力押ししてるけど、多分ResponsiveContainerとか使ってレスポンシブにできる
  return (
    <Box width="100%" height="100%">
      <Grid container>
        <Grid item xs={6}>
          <PieChartExampleCount width={contentWidth / 2} height={contentHeight / 2} />
        </Grid>
        <Grid item xs={6}>
          <ScatterChartGroupRunTime width={contentWidth / 2} height={contentHeight / 2} />
        </Grid>
      </Grid>
    </Box>
  )
}
