import React, { CSSProperties } from 'react'
import { Badge, Box, Chip } from '@material-ui/core'
import { TreeView, TreeItem } from '@material-ui/lab'
import { red, yellow, green } from '@material-ui/core/colors'
import { Timer as TimerIcon, ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import Group from '../../models/group'
import Example from '../../models/example'
import ReportContext from '../../context/report'
import { COLOR } from '../../models/types'

type Props = {
  onSelect: (example: Example) => void
}

const StyledTreeItem = withStyles({
  label: {
    fontSize: '0.85rem',
    lineHeight: 2
  }
})(TreeItem)

/**
 * Exampleの一覧をツリーで描画するコンポーネント
 */
export default function (props: Props) {
  const onSelectExample = props.onSelect

  /**
   * グループの結果集計を示すバッチコンポーネント
   */
  const GroupResultBatch = (props: { number: number; type: string; color: COLOR }) => {
    if (props.number === 0) return null

    return (
      <div style={{ width: 30 }}>
        <Badge max={999} badgeContent={props.number} color={props.color} />
      </div>
    )
  }

  /**
   * Exampleの情報を表示するツリーアイテムコンポーネント
   */
  const ExampleTreeItem = (props: { example: Example }) => {
    const color = {
      passed: green[900],
      pending: yellow[900],
      failed: red[900]
    }[props.example.status]

    const exampleStyle: CSSProperties = {
      margin: 0,
      padding: 0,
      lineHeight: 1.5
    }

    return (
      <StyledTreeItem
        key={props.example.id}
        nodeId={`${props.example.id}`}
        label={
          <Box color={color}>
            <p style={exampleStyle}>{props.example.name}</p>
            <p style={exampleStyle}>→ {props.example.expectation}</p>
          </Box>
        }
        onLabelClick={() => onSelectExample(props.example)}
      />
    )
  }

  /**
   * Groupの情報を再帰的に表示するツリーアイテムコンポーネント
   */
  const GroupTreeItem = (props: { group: Group }) => (
    <StyledTreeItem
      key={props.group.id}
      nodeId={`${props.group.id}`}
      label={
        <Box display="flex" justifyContent="space-between">
          <div>{props.group.name}</div>
          <Box display="flex" justifyContent="space-between" style={{ paddingRight: 20 }}>
            <GroupResultBatch number={props.group.getPassedExampleCount()} type="passed" color="primary" />
            <GroupResultBatch number={props.group.getPendingExampleCount()} type="pending" color="secondary" />
            <GroupResultBatch number={props.group.getFailedExampleCount()} type="failed" color="error" />
            <Chip size="small" icon={<TimerIcon />} label={props.group.getFormattedTotalTime()} />
          </Box>
        </Box>
      }
    >
      {props.group.groups.map(child => (
        <GroupTreeItem key={child.id} group={child} />
      ))}
      {props.group.examples.map(example => (
        <ExampleTreeItem key={example.id} example={example} />
      ))}
    </StyledTreeItem>
  )

  return (
    <div>
      <TreeView
        onNodeSelect={(e: any, v: any) => console.log(v)}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <ReportContext.Consumer>
          {value => value.groups.map(group => <GroupTreeItem key={group.id} group={group} />)}
        </ReportContext.Consumer>
      </TreeView>
    </div>
  )
}
