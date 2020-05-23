import React from 'react'
import PieChartExampleCount from './chart/PieChartExampleCount'
import ScatterChartGroupRunTime from './chart/ScatterChartGroupRunTime'
import { Divider, Card, CardContent, CardHeader, Grid, Box } from '@material-ui/core/'

export default () => {
  const contentWidth = window.innerWidth - 120
  const contentHeight = window.innerHeight

  // FIXME: JSで力押ししてるけど、多分ResponsiveContainerとか使ってレスポンシブにできる
  return (
    <Box>
      <Grid container>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Test Result Rate" />
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
