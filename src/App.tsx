import React from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Detail from './components/detail/Detail'
import Report from './models/report'
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

type TabValue = 'Dashboard' | 'Detail'
type State = {
  tabValue: TabValue
  loading: boolean
  loadingError: any
  sourceUrl: string
  report: Report | null
}

export default class App extends React.Component<{}, State> {
  constructor() {
    super({})
    this.state = {
      tabValue: 'Dashboard',
      loading: true,
      loadingError: null,
      sourceUrl: window.location.search.substr(1) || '/sample.json',
      report: null
    }
  }

  setTabValue(tabValue: TabValue) {
    this.setState({
      tabValue,
      report: this.state.report.reset()
    })
  }

  fetchReport(newSourceUrl: string) {
    Report.fetch(newSourceUrl)
      .then(report => {
        this.setState({ report })
      })
      .catch(e => {
        this.setState({ loadingError: e })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  componentDidMount() {
    this.fetchReport(this.state.sourceUrl)
  }

  render() {
    if (this.state.loading) {
      return <p>Loading source from {this.state.sourceUrl}</p>
    }

    if (!!this.state.loadingError) {
      return (
        <div>
          <p>Error</p>
          <p>{this.state.loadingError.toString()}</p>
        </div>
      )
    }

    const tabValues: TabValue[] = ['Dashboard', 'Detail']

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
                {tabValues.map(text => (
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
                {this.state.tabValue === 'Dashboard' ? (
                  <Dashboard reloadReport={newSourceUrl => this.fetchReport(newSourceUrl)} />
                ) : (
                  <Detail />
                )}
              </div>
            </ReportContext.Provider>
          </Grid>
        </Grid>
      </ThemeProvider>
    )
  }
}
