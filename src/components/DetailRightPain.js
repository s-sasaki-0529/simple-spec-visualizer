import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'
import Example from '../models/example'
import ReportContext from '../context/report'

/**
 * Detailタブの右ペインコンポーネント
 * @param {Object} props
 * @param {Example} props.example
 * @param {function():void} props.onClickImage
 */
export default function ({ example, onClickImage }) {
  const styles = {
    root: {
      height: window.innerHeight - 20, // FIXME: ゴリ押し辞めたいね
      overflow: 'scroll'
    }
  }

  /**
   * Exampleの結果をテーブル描画するコンポーネント
   * @param {Object} props
   * @param {string} props.expectation
   * @param {string} props.location
   * @param {string} props.imageUrl
   */
  const ExampleResultTable = ({ expectation, location, imageUrl }) => (
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

  // Exampleが渡されている場合はそれ、渡されなかった場合はContext経由で先頭のExampleを描画する
  if (example) {
    return (
      <ExampleResultTable expectation={example.expectation} location={example.location} imageUrl={example.imageUrl} />
    )
  } else {
    return (
      <ReportContext.Consumer>
        {value => {
          const example = value.firstExample()
          return (
            <ExampleResultTable
              expectation={example.expectation}
              location={example.location}
              imageUrl={example.imageUrl}
            />
          )
        }}
      </ReportContext.Consumer>
    )
  }
}
