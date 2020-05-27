import React from 'react'
import PieChartExampleCount from './chart/PieChartExampleCount'
import ScatterChartGroupRunTime from './chart/ScatterChartGroupRunTime'
import BasicInformation from './BasicInformation'
import FailedExampleList from './FailedExampleList'
import { Divider, Card, CardContent, CardHeader, Grid, Box } from '@material-ui/core/'
import { Alert, AlertTitle } from '@material-ui/lab'
import ReportContext from '../context/report'
import { withStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

/**
 * テスト結果を通知するヘッダーアラートコンポーネント
 * @param {Object} props
 * @param {Report} props.report
 */
const AlertHeader = ({ report }) => {
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

/**
 * グリッド内に配置するカードUIコンポーネント
 * @param {Object} props
 * @param {String} props.title カードのタイトル
 * @param {Number} props.size カードのグリッドサイズ
 * @param {JSX.Element} props.children カードが内包する子要素
 */
type GridCardItemProps = {
  title: string,
  size?: 6 | 12,
  children: JSX.Element
}
const GridCardItem: React.FunctionComponent<GridCardItemProps> = (props) => {
  const StyledGrid = withStyles({ root: { padding: '15px !important' } })(Grid)
  const StyledCard = withStyles({ root: { height: '100%', backgroundColor: grey[50] } })(Card)
  return (
    <StyledGrid item xs={props.size || 6}>
      <StyledCard>
        <CardHeader title={props.title} />
        <Divider />
        <CardContent>{props.children}</CardContent>
      </StyledCard>
    </StyledGrid>
  )
}

/**
 * Generalタブ用のページコンポーネント
 */
type State = {
  scatterChartTitle?: string
}
export default class TabGeneral extends React.Component<{}, State> {
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
    const cardWidth = contentWidth / 2.2
    const cardHeight = contentHeight / 3

    return (
      <Box height="100vh" overflow="scroll">
        <AlertHeader report={this.context} />
        <Grid container>
          <GridCardItem title="Result Rate">
            <PieChartExampleCount width={cardWidth} height={cardHeight} />
          </GridCardItem>
          <GridCardItem title="Basic Information">
            <BasicInformation report={this.context} />
          </GridCardItem>
          <GridCardItem title="Failed Examples">
            <FailedExampleList height={cardHeight} />
          </GridCardItem>
          <GridCardItem title={this.state.scatterChartTitle || 'Volume and Times'}>
            <ScatterChartGroupRunTime
              updateTitle={group => this.updateScatterChartTitle(group)}
              groups={this.context.groups}
              width={cardWidth}
              height={cardHeight}
            />
          </GridCardItem>
        </Grid>
      </Box>
    )
  }
}
