import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { grey } from '@material-ui/core/colors'
import Example from '../models/example'

/**
 * スクリーンショットをフルスクリーンで表示するためのダイアログ
 * @param {Object} props
 * @param {Boolean} props.open
 * @param {Example} props.example
 * @param {function():void} props.onClose
 */
export default function ({ open, example, onClose }) {
  if (!example) return null

  const { expectation, imageUrl } = example
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
    <Dialog open={open} fullScreen keepMounted onClose={() => onClose()} onClick={() => onClose()}>
      <DialogTitle style={styles.dialogTitle}>{expectation}</DialogTitle>
      <DialogContent style={styles.dialogContent}>
        <img width="100%" src={imageUrl} alt={expectation}></img>
      </DialogContent>
    </Dialog>
  )
}
