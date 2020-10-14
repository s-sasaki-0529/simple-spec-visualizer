import React from 'react'
import { red, yellow, green } from '@material-ui/core/colors'
import { Checkbox, FormControlLabel } from '@material-ui/core'

/**
 * 色とラベル付きのチェックボックス
 */
const ColorCheckBoxWithLabel = (props: {
  label: string
  color: typeof red | typeof yellow | typeof green
  checked: boolean
  onChange: () => void
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          color="default"
          checked={props.checked}
          onChange={props.onChange}
          style={{
            color: props.color[700]
          }}
        />
      }
      label={props.label}
      style={{
        userSelect: 'none'
      }}
    />
  )
}

type Props = {
  passed: boolean
  failed: boolean
  pending: boolean
  onToggleFilter: (key: string) => void
}
const DetailLeftPainFilters: React.FC<Props> = props => (
  <div>
    <ColorCheckBoxWithLabel
      checked={props.passed}
      onChange={() => props.onToggleFilter('passed')}
      color={green}
      label="passed"
    />
    <ColorCheckBoxWithLabel
      checked={props.failed}
      onChange={() => props.onToggleFilter('failed')}
      color={red}
      label="failed"
    />
    <ColorCheckBoxWithLabel
      checked={props.pending}
      onChange={() => props.onToggleFilter('pending')}
      color={yellow}
      label="pending"
    />
  </div>
)
export default DetailLeftPainFilters
