import React from 'react'
import ReportContext from '../../context/report'
import { List, ListItemText, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

/**
 * 失敗したExampleリストを描画するコンポーネント
 * @param {Object} props
 * @param {Number} props.height カードが使用できる高さ
 * @param {[Example]} props.examples 失敗したExampleのリスト
 */
const FailedExampleList = ({ height, examples }) => {
  const StyledList = withStyles({
    root: {
      maxHeight: height,
      overflow: 'scroll',
      whiteSpace: 'nowrap',
      color: red[500]
    }
  })(List)

  if (examples.length === 0) {
    return <span>There are no failed examples.</span>
  }

  return (
    <StyledList component="nav" aria-label="secondary mailbox folders">
      {examples.map(example => (
        <div key={example.id}>
          <ListItemText primary={example.getFullText()} />
          <Divider />
        </div>
      ))}
    </StyledList>
  )
}

export default ({ height }) => (
  <ReportContext.Consumer>
    {report => <FailedExampleList height={height} examples={report.getFailedExamples()} />}
  </ReportContext.Consumer>
)
