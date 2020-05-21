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
import { red, yellow, green } from '@material-ui/core/colors'

/**
 * Exampleの一覧をツリーで描画するコンポーネント
 * @param {Object} props
 * @param {[Group]} props.groups
 * @param {function(Example):void} props.onSelect
 */
export default function ({ groups, onSelect }) {
  const createExampleTreeItem = examples => {
    return examples.map(example => {
      return (
        <TreeItem
          key={example.id}
          nodeId={`${example.id}`}
          label={example.name}
          onLabelClick={() => onSelect(example)}
        ></TreeItem>
      )
    })
  }

  const createGroupTreeItem = groups => {
    return groups.map(group => {
      return (
        <TreeItem
          key={group.id}
          nodeId={`${group.id}`}
          label={
            <Box display="flex" justifyContent="space-between">
              <div>{group.name}</div>
              <Box display="flex" justifyContent="space-between" style={{ paddingRight: 20 }}>
                {group.getExampleCount('passed') > 0 ? (
                  <div style={{ width: 30 }}>
                    <Badge max={999} badgeContent={group.getExampleCount('passed')} color="primary" />
                  </div>
                ) : null}
                {group.getExampleCount('pending') > 0 ? (
                  <div style={{ width: 30 }}>
                    <Badge max={999} badgeContent={group.getExampleCount('pending')} color="secondary" />
                  </div>
                ) : null}
                {group.getExampleCount('failed') > 0 ? (
                  <div style={{ width: 30 }}>
                    <Badge max={999} badgeContent={group.getExampleCount('failed')} color="error" />
                  </div>
                ) : null}
              </Box>
            </Box>
          }
        >
          {createGroupTreeItem(group.children)}
          {createExampleTreeItem(group.examples)}
        </TreeItem>
      )
    })
  }

  console.log(groups)

  return (
    <div className={styles.root}>
      <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
        {createGroupTreeItem(groups, 0)}
      </TreeView>
    </div>
  )
}
