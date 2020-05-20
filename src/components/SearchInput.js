import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  setValue(value) {
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
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    )
  }
}
