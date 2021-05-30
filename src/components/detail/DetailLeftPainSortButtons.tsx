import React from 'react'
import { TableSortLabel } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { SORT_KEY, SORT_ORDER } from '../../models/types'

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignItems: 'baseLine'
  },
  button: {
    width: '100%'
  }
})

type Props = {
  sortKey: SORT_KEY
  sortOrder: SORT_ORDER
  onSubmit: (key: SORT_KEY, order: SORT_ORDER) => void
}

export default function ({ sortKey, sortOrder, onSubmit }: Props) {
  const toggelButtonStyle = useStyles().button
  const createToggleButton = (name: SORT_KEY, className: string) => {
    return (
      <ToggleButton className={className} value={name}>
        <TableSortLabel active={sortKey === name} direction={sortOrder}>
          {name}
        </TableSortLabel>
      </ToggleButton>
    )
  }

  const handleChange = (selectedButtonName: SORT_KEY) => {
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
