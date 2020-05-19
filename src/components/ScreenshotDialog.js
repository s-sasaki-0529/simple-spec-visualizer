import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { grey } from '@material-ui/core/colors'

export default props => {
  const { expectation, imageUrl } = props.example
  const styles = {
    dialogTitle: {
      textAlign: 'center',
      backgroundColor: grey[100]
    },
    dialogContent: {
      textAlign: 'center'
    }
  }

  return (
    <Dialog fullScreen open keepMounted onClose={() => props.onClose()} onClick={() => props.onClose()}>
      <DialogTitle style={styles.dialogTitle}>{expectation}</DialogTitle>
      <DialogContent style={styles.dialogContent}>
        <img width="100%" src={imageUrl} alt={expectation}></img>
      </DialogContent>
    </Dialog>
  )
}
