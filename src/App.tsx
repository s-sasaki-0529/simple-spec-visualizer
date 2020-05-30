import React from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Detail from './components/detail/Detail'
import Report from './models/report'
import dummy from './dummy.json'
import { ListItem, ListItemText, List, Grid } from '@material-ui/core'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { grey, red, yellow, green } from '@material-ui/core/colors'
import ReportContext from './context/report'

/**
 * アプリケーション全体のテーマカラーを設定
 * テストの成功、保留、失敗に合わせた三色を用いる
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[700]
    },
    secondary: {
      main: yellow[700]
    },
    error: {
      main: red[700]
    }
  }
})

/**
 * メインメニュー用のメニューアイテム
 */
const StyledListItem = withStyles({
  root: {
    '&.Mui-selected': {
      color: grey[100]
    }
  }
})(ListItem)

type Props = {}
type State = {
  tabValue: string
  report: Report
}

export default class App extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { tabValue: 'Dashboard', report: new Report(dummy) }
  }

  setTabValue(tabValue) {
    this.setState({
      tabValue,
      report: this.state.report.reset()
    })
  }

  render() {
    const sideMenuStyle: React.CSSProperties = {
      backgroundColor: grey[900],
      color: grey[700],
      height: '100%',
      minHeight: '100vh',
      maxHeight: '100vh',
      overflowY: 'hidden'
    }
    const tabContentWrapperStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      marginTop: 10,
      minWidth: 1280 + 15,
      minHeight: 920
    }

    return (
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={1}>
            <div style={sideMenuStyle}>
              <List>
                {['Dashboard', 'Detail'].map(text => (
                  <StyledListItem
                    button
                    key={text}
                    selected={text === this.state.tabValue}
                    onClick={() => this.setTabValue(text)}
                  >
                    <ListItemText primary={text} />
                  </StyledListItem>
                ))}
              </List>
            </div>
          </Grid>
          <Grid item xs={11}>
            <ReportContext.Provider value={this.state.report}>
              <div style={tabContentWrapperStyle}>
                {this.state.tabValue === 'Dashboard' ? <Dashboard /> : <Detail />}
              </div>
            </ReportContext.Provider>
          </Grid>
        </Grid>
      </ThemeProvider>
    )
  }
}
