import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import Group from '../models/group'
import Example from '../models/example'

/**
 * Exampleの一覧をツリーで描画するコンポーネント
 * @param {Object} props
 * @param {[Group]} props.groups
 * @param {function(Example):void} props.onSelect
 */
export default function ({ groups, onSelect }) {
  const createExampleTreeItem = examples => {
    return examples.map(example => {
      const id = Math.random()
      return <TreeItem key={id} nodeId={`${id}`} label={example.name} onClick={() => onSelect(example)}></TreeItem>
    })
  }

  const createGroupTreeItem = groups => {
    return groups.map(group => {
      const id = Math.random()
      return (
        <TreeItem key={id} nodeId={`${id}`} label={group.name}>
          {createGroupTreeItem(group.children)}
          {createExampleTreeItem(group.examples)}
        </TreeItem>
      )
    })
  }

  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {createGroupTreeItem(groups, 0)}
    </TreeView>
  )
}
