import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import Group from '../models/group'
import Example from '../models/example'
import styles from './ResultTree.module.scss' // FIXME: グローバル汚染とか恥ずかしくないの？

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
   * @param {Group} props.group
   * @param {'padded'|'pending'|'failed'} props.type
   * @param {'primary'|'secondary'|'error'} props.color
   */
  const GroupResultBatch = ({ group, type, color }) => {
    const count = group.getExampleCount(type)
    if (count === 0) return null

    return (
      <div style={{ width: 30 }}>
        <Badge max={999} badgeContent={count} color={color} />
      </div>
    )
  }

  /**
   * Exampleの情報を表示するツリーアイテムコンポーネント
   * @param {Object} props
   * @param {Example} props.example
   */
  const ExampleTreeItem = ({ example }) => (
    <TreeItem
      key={example.id}
      nodeId={`${example.id}`}
      label={example.name}
      onLabelClick={() => onSelect(example)}
    ></TreeItem>
  )

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
            <GroupResultBatch group={group} type="passed" color="primary" />
            <GroupResultBatch group={group} type="pending" color="secondary" />
            <GroupResultBatch group={group} type="failed" color="error" />
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
      <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
        {groups.map(group => (
          <GroupTreeItem key={group.id} group={group} />
        ))}
      </TreeView>
    </div>
  )
}
