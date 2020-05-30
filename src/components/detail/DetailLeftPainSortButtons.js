import React from 'react'
import { TableSortLabel } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignItems: 'baseLine'
  },
  button: {
    width: '100%'
  }
})

/**
 * @param {Object} props
 * @param {'Name'|'Tests'|'Faileds'|'Time'} props.sortKey
 * @param {'desc'|'asc'} props.sortOrder 'desc' | 'asc'
 * @param {function(string, string):void} props.onSubmit
 */
export default function ({ sortKey, sortOrder, onSubmit }) {
  const toggelButtonStyle = useStyles().button
  const createToggleButton = (name, className) => {
    return (
      <ToggleButton className={className} value={name}>
        <TableSortLabel active={sortKey === name} direction={sortOrder}>
          {name}
        </TableSortLabel>
      </ToggleButton>
    )
  }

  const handleChange = selectedButtonName => {
    const clickedSameButton = selectedButtonName === null
    if (clickedSameButton) {
      const newOrder = sortOrder === 'desc' ? 'asc' : 'desc'
      onSubmit(sortKey, newOrder)
    } else {
      onSubmit(selectedButtonName, 'desc')
    }
  }

  return (
    <ToggleButtonGroup
      value={sortKey}
      size="small"
      exclusive
      onChange={(_, value) => handleChange(value)}
      aria-label="text alignment"
      className={useStyles().root}
    >
      {createToggleButton('Name', toggelButtonStyle)}
      {createToggleButton('Tests', toggelButtonStyle)}
      {createToggleButton('Faileds', toggelButtonStyle)}
      {createToggleButton('Time', toggelButtonStyle)}
    </ToggleButtonGroup>
  )
}
