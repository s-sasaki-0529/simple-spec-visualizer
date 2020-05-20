import React from 'react'
import TabGeneral from './components/TabGenerate'
import TabDetail from './components/TabDetail'
import Report from './models/report'
import dummy from './dummy.json'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tabValue: 1, report: new Report(dummy) }
  }

  setTabValue(tabValue) {
    this.setState({ tabValue })
  }

  tabContent() {
    if (this.state.tabValue === 'General') {
      return <TabGeneral report={this.state.report} />
    } else {
      return <TabDetail report={this.state.report} />
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
      <div>
        <Drawer variant="permanent" anchor="left">
          <List>
            {['General', 'Detail'].map(text => (
              <ListItem button key={text} onClick={() => this.setTabValue(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <div style={styles.tabContentWrapper}>{this.tabContent()}</div>
      </div>
    )
  }
}
