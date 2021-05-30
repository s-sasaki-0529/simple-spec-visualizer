import React, { VFC } from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { Search as SearchIcon, Clear as ClearIcon } from '@material-ui/icons'

type Props = {
  value: string
  onSubmit: (v: string) => void
}

const SearchInput: VFC<Props> = props => {
  return (
    <TextField
      value={props.value}
      onChange={event => props.onSubmit(event.target.value)}
      placeholder="Search"
      style={{ width: '100%' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {props.value && <ClearIcon style={{ cursor: 'pointer' }} onClick={() => props.onSubmit('')} />}
          </InputAdornment>
        )
      }}
    />
  )
}

export default SearchInput
