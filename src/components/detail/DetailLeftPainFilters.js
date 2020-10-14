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
 * TODO: 関数コンポーネントで書き直す
 * TODO: tsxにする
 */
export default class DetailLeftPainFilters extends React.Component {
  render() {
    return (
      <div>
        <ColorCheckBoxWithLabel
          checked={this.props.passed}
          onChange={() => this.props.onToggleFilter('passed')}
          color={green}
          label="passed"
        />
        <ColorCheckBoxWithLabel
          checked={this.props.failed}
          onChange={() => this.props.onToggleFilter('failed')}
          color={red}
          label="failed"
        />
        <ColorCheckBoxWithLabel
          checked={this.props.pending}
          onChange={() => this.props.onToggleFilter('pending')}
          color={yellow}
          label="pending"
        />
      </div>
    )
  }
}
