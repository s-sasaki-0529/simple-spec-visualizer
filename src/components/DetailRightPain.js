import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Example from '../models/example'

/**
 * Detailタブの右ペインコンポーネント
 * @param {Object} props
 * @param {Example} props.example
 * @param {function():void} props.onClickImage
 */
export default function ({ example, onClickImage }) {
  const { expectation, imageUrl, location } = example

  const styles = {
    root: {
      height: window.innerHeight - 20, // FIXME: ゴリ押し辞めたいね
      overflow: 'scroll'
    }
  }

  return (
    <div style={styles.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Expectation</TableCell>
              <TableCell>{expectation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell>{location}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => onClickImage()}>
                <img style={{ border: '1px solid', width: '100%' }} src={imageUrl} alt={expectation}></img>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
