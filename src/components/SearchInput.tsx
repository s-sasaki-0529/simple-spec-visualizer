import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

type Prop = {
  onSubmit: (v: string) => void
}

type State = {
  value: string
}

export default class SearchInput extends React.Component<Prop, State> {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  setValue(value: string) {
    this.setState({ value })
  }

  render() {
    return (
      <TextField
        onChange={event => this.setValue(event.target.value)}
        onKeyPress={event => (event.key === 'Enter' ? this.props.onSubmit(this.state.value) : null)}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    )
  }
}
