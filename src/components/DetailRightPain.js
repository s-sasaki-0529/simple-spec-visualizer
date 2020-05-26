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

  const LocationLink = ({ location, url }) => {
    if (location && url) {
      return (
        <a href={url} target="_blank">
          {location}
        </a>
      )
    } else if (location) {
      return <span>{location}</span>
    } else {
      return <span>-</span>
    }
  }

  /**
   * Exampleの結果をテーブル描画するコンポーネント
   * @param {Object} props
   * @param {string} props.expectation
   * @param {string} props.location
   * @param {string} props.locationUrl
   * @param {string} props.imageUrl
   */
  const ExampleResultTable = ({ expectation, location, locationUrl, exception, imageUrl }) => (
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
              <TableCell>
                <LocationLink location={location} url={locationUrl} />
              </TableCell>
            </TableRow>
            {exception ? (
              <TableRow>
                <TableCell>Exception</TableCell>
                <TableCell>{exception}</TableCell>
              </TableRow>
            ) : null}
            {imageUrl ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => onClickImage()}
                >
                  <img style={{ border: '1px solid', width: '100%' }} src={imageUrl} alt={expectation}></img>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

  return (
    <ReportContext.Consumer>
      {report => {
        example = example || report.firstExample()
        return <ExampleResultTable {...example} locationUrl={report.getLocationUrl(example.location)} />
      }}
    </ReportContext.Consumer>
  )
}
