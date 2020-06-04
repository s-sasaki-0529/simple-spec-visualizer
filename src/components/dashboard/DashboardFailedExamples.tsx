import React from 'react'
import { List, ListItemText, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import Example from '../../models/example'

/**
 * 失敗したExampleリストを描画するコンポーネント
 */
type Props = {
  height: number,
  examples: Example[]
}
const DashboardFailedExamples:React.FunctionComponent<Props> = (props) => {
  const StyledList = withStyles({
    root: {
      maxHeight: props.height,
      overflow: 'scroll',
      whiteSpace: 'nowrap',
      color: red[500]
    }
  })(List)

  if (props.examples.length === 0) {
    return <span>There are no failed examples.</span>
  }

  return (
    <StyledList aria-label="secondary mailbox folders">
      {props.examples.map(example => (
        <div key={example.id}>
          <ListItemText primary={example.getFullText()} />
          <Divider />
        </div>
      ))}
    </StyledList>
  )
}

export default DashboardFailedExamples