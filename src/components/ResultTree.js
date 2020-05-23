import React from 'react'
import { Badge, Box, Chip } from '@material-ui/core'
import { TreeView, TreeItem } from '@material-ui/lab'
import { red, yellow, green } from '@material-ui/core/colors'
import { Timer as TimerIcon, ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import Group from '../models/group'
import Example from '../models/example'
import styles from './ResultTree.module.scss' // FIXME: グローバル汚染とか恥ずかしくないの？
import ReportContext from '../context/report'

/**
 * Exampleの一覧をツリーで描画するコンポーネント
 * @param {Object} props
 * @param {[Group]} props.groups
 * @param {function(Example):void} props.onSelect
 */
export default function ({ groups, onSelect }) {
  /**
   * グループの結果集計を示すバッチコンポーネント
   * @param {Object} props
   * @param {number} props.number
   * @param {'padded'|'pending'|'failed'} props.type
   * @param {'primary'|'secondary'|'error'} props.color
   */
  const GroupResultBatch = ({ number, type, color }) => {
    if (number === 0) return null

    return (
      <div style={{ width: 30 }}>
        <Badge max={999} badgeContent={number} color={color} />
      </div>
    )
  }

  /**
   * Exampleの情報を表示するツリーアイテムコンポーネント
   * @param {Object} props
   * @param {Example} props.example
   */
  const ExampleTreeItem = ({ example }) => {
    const color = {
      passed: green[900],
      pending: yellow[900],
      failed: red[900]
    }[example.status]

    return (
      <TreeItem
        key={example.id}
        nodeId={`${example.id}`}
        label={<Box color={color}>{example.name}</Box>}
        onLabelClick={() => onSelect(example)}
      />
    )
  }

  /**
   * Groupの情報を再帰的に表示するツリーアイテムコンポーネント
   * @param {Object} props
   * @param {Group} props.group
   */
  const GroupTreeItem = ({ group }) => (
    <TreeItem
      key={group.id}
      nodeId={`${group.id}`}
      label={
        <Box display="flex" justifyContent="space-between">
          <div>{group.name}</div>
          <Box display="flex" justifyContent="space-between" style={{ paddingRight: 20 }}>
            <GroupResultBatch number={group.getPassedExampleCount()} type="passed" color="primary" />
            <GroupResultBatch number={group.getPendingExampleCount()} type="pending" color="secondary" />
            <GroupResultBatch number={group.getFailedExampleCount()} type="failed" color="error" />
            <Chip size="small" icon={<TimerIcon />} label={group.getFormattedTotalTime()} />
          </Box>
        </Box>
      }
    >
      {group.children.map(child => (
        <GroupTreeItem key={child.id} group={child} />
      ))}
      {group.examples.map(example => (
        <ExampleTreeItem key={example.id} example={example} />
      ))}
    </TreeItem>
  )

  return (
    <div className={styles.root}>
      <TreeView
        onNodeSelect={(e, v) => console.log(v)}
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
