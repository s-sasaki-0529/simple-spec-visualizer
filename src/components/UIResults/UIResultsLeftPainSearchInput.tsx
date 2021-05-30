import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { Search as SearchIcon, Clear as ClearIcon } from '@material-ui/icons'

type Props = {
  value: string
  onSubmit: (v: string) => void
}

export default class SearchInput extends React.Component<Props, {}> {
  render() {
    return (
      <TextField
        value={this.props.value}
        onChange={event => this.props.onSubmit(event.target.value)}
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
              {this.props.value && <ClearIcon style={{ cursor: 'pointer' }} onClick={() => this.props.onSubmit('')} />}
            </InputAdornment>
          )
        }}
      />
    )
  }
}
