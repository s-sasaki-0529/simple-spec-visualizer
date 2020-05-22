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
import { red, yellow, green } from '@material-ui/core/colors'
import ReportContext from './context/report'

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

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tabValue: 1, report: new Report(dummy) }
  }

  setTabValue(tabValue) {
    this.setState({
      tabValue,
      report: this.state.report.resetFilter()
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
        marginTop: 10,
        marginLeft: 120,
        minWidth: 1280 + 15
      }
    }
    return (
      <ThemeProvider theme={theme}>
        <Drawer variant="permanent" anchor="left">
          <List>
            {['General', 'Detail'].map(text => (
              <ListItem button key={text} onClick={() => this.setTabValue(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <ReportContext.Provider value={this.state.report}>
          <div style={styles.tabContentWrapper}>{this.tabContent()}</div>
        </ReportContext.Provider>
      </ThemeProvider>
    )
  }
}
