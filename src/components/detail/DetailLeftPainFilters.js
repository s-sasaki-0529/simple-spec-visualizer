import React from 'react'
import { red, yellow, green } from '@material-ui/core/colors'
import { Checkbox, FormControlLabel } from '@material-ui/core'

/**
 * 色とラベル付きのチェックボックス
 * @param {Object} props
 * @param {String} props.label
 * @param {Boolean} props.checked
 * @param {red|yellow|green} props.color
 * @param {function():void} props.onChange
 */
const ColorCheckBoxWithLabel = ({ label, checked, color, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          color="default"
          checked={checked}
          onChange={onChange}
          style={{
            color: color[700]
          }}
        />
      }
      label={label}
      style={{
        userSelect: 'none'
      }}
    />
  )
}

/**
 * Group/Exampleを結果で絞り込むためのチェックボックスグループコンポーネント
 */
export default class DetailLeftPainFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedState: {
        passed: true,
        failed: true,
        pending: true
      }
    }
  }

  handleChange(key) {
    const newCheckedState = {
      ...this.state.checkedState,
      [key]: !this.state.checkedState[key]
    }
    this.setState({ checkedState: newCheckedState })
    this.props.onChange(newCheckedState)
  }

  render() {
    return (
      <div>
        <ColorCheckBoxWithLabel
          checked={this.state.checkedState.passed}
          onChange={() => this.handleChange('passed')}
          color={green}
          label="passed"
        />
        <ColorCheckBoxWithLabel
          checked={this.state.checkedState.failed}
          onChange={() => this.handleChange('failed')}
          color={red}
          label="failed"
        />
        <ColorCheckBoxWithLabel
          checked={this.state.checkedState.pending}
          onChange={() => this.handleChange('pending')}
          color={yellow}
          label="pending"
        />
      </div>
    )
  }
}
