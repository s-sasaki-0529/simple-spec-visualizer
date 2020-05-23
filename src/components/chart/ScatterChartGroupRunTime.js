import React from 'react'
import ReportContext from '../../context/report'
import { Card, CardContent, CardHeader, Box, Chip } from '@material-ui/core'
import TimerIcon from '@material-ui/icons/Timer'
import { withStyles } from '@material-ui/core/styles'
import { red, green, yellow } from '@material-ui/core/colors'
import { Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import Group from '../../models/group'

const StyleChip = withStyles({
  root: {
    backgroundColor: red[700],
    color: 'white'
  }
})(Chip)

/**
 * オンマウス時に表示するカスタムツールチップ
 * グループのテスト実行結果、実行時間を描画する
 * @param {Object} props
 */
const CustomToolTip = props => {
  if (props.active === false) return null

  const { group } = props.payload[0].payload
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

/**
 * テスト件数と実行時間に関する散布図を描画するコンポーネント
 */
export default class RunTimeScatter extends React.Component {
  constructor(props) {
    super(props)
    this.width = props.width
    this.height = props.height
    this.state = {
      groups: props.groups,
      selectedGroupName: ''
    }
  }

  /**
   * スカッタークリック時に、対象GroupにChildrenが存在すれば、
   * Childrenの散布図を描画するようにする
   */
  onClickScatter(clickedData) {
    const { group } = clickedData

    this.setState({ groups: group.children })
    this.props.onChangeScatterChartGroup(group)
  }

  render() {
    const data = this.state.groups.map(group => {
      const hasFailed = group.getFailedExampleCount() > 0
      const hasPending = group.getPendingExampleCount() > 0

      return {
        group,
        passed: group.getPassedExampleCount(),
        times: group.getTotalTime(),
        color: hasFailed ? red[700] : hasPending ? yellow[700] : green[700]
      }
    })

    return (
      <ScatterChart width={this.width} height={this.height}>
        <CartesianGrid />
        <XAxis type="number" dataKey="passed" name="example" />
        <YAxis type="number" dataKey="times" name="run time" unit="s" />
        <Tooltip content={<CustomToolTip />} />
        <Scatter data={data} onClick={e => this.onClickScatter(e)}>
          {data.map(d => (
            <Cell key={d.group.id} fill={d.color} />
          ))}
        </Scatter>
      </ScatterChart>
    )
  }
}
