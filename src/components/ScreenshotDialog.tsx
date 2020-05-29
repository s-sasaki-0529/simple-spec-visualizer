import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Example from '../models/example'

/**
 * スクリーンショットをフルスクリーンで表示するためのダイアログ
 */
export default function (props: { open: boolean; example: Example; onClose: () => void }) {
  if (!props.example) return null

  const { expectation, imageUrl } = props.example
  const styles = {
    dialogTitle: {
      textAlign: 'center',
      backgroundColor: grey[100]
    } as React.CSSProperties,
    dialogContent: {
      textAlign: 'center'
    } as React.CSSProperties
  }

  return (
    <Dialog open={props.open} fullScreen keepMounted onClose={() => props.onClose()} onClick={() => props.onClose()}>
      <DialogTitle style={styles.dialogTitle}>{expectation}</DialogTitle>
      <DialogContent style={styles.dialogContent}>
        <img width="100%" src={imageUrl} alt={expectation}></img>
      </DialogContent>
    </Dialog>
  )
}
