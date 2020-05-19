import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export default props => {
  if (!props.example) return null
  const example = props.example
  const {
    group = '画面名をなんとかして取得する',
    subGroups = ['サブグループリストを', 'なんとかして取得する'],
    name,
    expectation,
    imageUrl,
    runTime,
    location
  } = example

  console.log(example)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Group</TableCell>
              <TableCell>{group}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sub Groups</TableCell>
              <TableCell>
                {subGroups.map(subGroup => {
                  return (
                    <p style={{ margin: 5 }} key={subGroup}>
                      {subGroup}
                    </p>
                  )
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Scenario</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Expectation</TableCell>
              <TableCell>{expectation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={2}
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => props.onClickImage()}
              >
                <img style={{ width: '100%' }} src={imageUrl} alt={expectation}></img>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>{runTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell>{location}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
