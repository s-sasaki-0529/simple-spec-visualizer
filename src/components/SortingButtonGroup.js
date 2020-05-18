import React from 'react'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { makeStyles } from '@material-ui/core/styles'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignItems: 'baseLine'
  },
  button: {
    width: '100%'
  }
})

export default props => {
  const toggelButtonStyle = useStyles().button
  const createToggleButton = (name, className) => {
    return (
      <ToggleButton className={className} value={name}>
        <TableSortLabel active={props.value.key === name} direction={props.value.order}>
          {name}
        </TableSortLabel>
      </ToggleButton>
    )
  }

  const handleChange = selectedButtonName => {
    const clickedSameButton = selectedButtonName === null
    if (clickedSameButton) {
      const newOrder = props.value.order === 'desc' ? 'asc' : 'desc'
      props.onSubmit(props.value.key, newOrder)
    } else {
      props.onSubmit(selectedButtonName, 'desc')
    }
  }

  return (
    <ToggleButtonGroup
      value={props.value.key}
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
