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
import UndoIcon from '@material-ui/icons/Undo'
import Group from '../models/group'
import { GroupOwnable } from '../models/interfaces'

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
 */
type GridCardItemProps = {
  title: string | JSX.Element
  size?: 6 | 12
  children: JSX.Element
}
const GridCardItem: React.FunctionComponent<GridCardItemProps> = props => {
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
  chartTitle: JSX.Element | string
  chartGroup: Group
}
export default class TabGeneral extends React.Component<{}, State> {
  static contextType = ReportContext

  constructor(props) {
    super(props)
    this.state = {
      chartTitle: null,
      chartGroup: null
    }
  }

  componentWillMount() {
    this.resetScatterChart()
  }

  resetScatterChart() {
    this.setState({
      chartTitle: null,
      chartGroup: null
    })
  }

  updateChart(group: Group) {
    if (!group) {
      this.resetScatterChart()
      return
    }
    this.setState({
      chartGroup: group,
      chartTitle: (
        <Box>
          {group.getFullNames().join(' > ')}
          <UndoIcon
            color="primary"
            onClick={() => {
              this.updateChart(group.parent)
            }}
          />
        </Box>
      )
    })
  }

  render() {
    const contentWidth = window.innerWidth - 120
    const contentHeight = window.innerHeight
    const cardWidth = contentWidth / 2.2
    const cardHeight = contentHeight / 3

    // 円グラフ/散布図で現在選択中のGroupオブジェクトまたはReportオブジェクト
    const reportOrGroup: GroupOwnable = this.state.chartGroup || this.context

    return (
      <Box height="100vh" overflow="scroll">
        <AlertHeader report={this.context} />
        <Grid container>
          <GridCardItem title="Basic Information">
            <BasicInformation report={this.context} />
          </GridCardItem>
          <GridCardItem title={this.state.chartTitle || 'Result Rate'}>
            <PieChartExampleCount
              width={cardWidth}
              height={cardHeight}
              passedCount={reportOrGroup.getPassedExampleCount()}
              failedCount={reportOrGroup.getFailedExampleCount()}
              pendingCount={reportOrGroup.getPendingExampleCount()}
            />
          </GridCardItem>
          <GridCardItem title="Failed Examples">
            <FailedExampleList height={cardHeight} />
          </GridCardItem>
          <GridCardItem title={this.state.chartTitle || 'Volume and Times'}>
            <ScatterChartGroupRunTime
              groups={reportOrGroup.groups}
              width={cardWidth}
              height={cardHeight}
              onClickScatter={group => this.updateChart(group)}
            />
          </GridCardItem>
        </Grid>
      </Box>
    )
  }
}
