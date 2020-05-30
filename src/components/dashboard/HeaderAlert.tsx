import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'

/**
 * テスト結果を通知するヘッダーアラートコンポーネント
 */
type Props = {
  failedCount: number
}
const HeaderAlert: React.FunctionComponent<Props> = props => {
  if (props.failedCount > 0) {
    const message =
      props.failedCount === 1 ? 'There is 1 failed test...' : `There are ${props.failedCount} failed tests...`
    return (
      <Alert severity="error">
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    )
  } else {
    return null
  }
}

export default HeaderAlert
