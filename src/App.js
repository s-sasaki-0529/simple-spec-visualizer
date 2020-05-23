import React from 'react'
import TabGeneral from './components/TabGenerate'
import TabDetail from './components/TabDetail'
import Report from './models/report'
import dummy from './dummy.json'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { grey, red, yellow, green } from '@material-ui/core/colors'
import ReportContext from './context/report'
import { withStyles } from '@material-ui/core/styles'

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
 * メインメニュー用のドロワーコンポーネント
 */
const StyledDrawer = withStyles({
  paper: {
    backgroundColor: grey[900],
    color: grey[700]
  }
})(Drawer)

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

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tabValue: 'General', report: new Report(dummy) }
  }

  setTabValue(tabValue) {
    this.setState({
      tabValue,
      report: this.state.report.reset()
    })
  }

  tabContent() {
    if (this.state.tabValue === 'General') {
      return <TabGeneral />
    } else {
      return <TabDetail />
    }
  }

  render() {
    const styles = {
      tabContentWrapper: {
        width: '100%',
        height: '100vh',
        marginTop: 10,
        marginLeft: 120,
        minWidth: 1280 + 15
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <StyledDrawer variant="permanent" anchor="left">
          <List>
            {['General', 'Detail'].map(text => (
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
        </StyledDrawer>
        <ReportContext.Provider value={this.state.report}>
          <div style={styles.tabContentWrapper}>{this.tabContent()}</div>
        </ReportContext.Provider>
      </ThemeProvider>
    )
  }
}
