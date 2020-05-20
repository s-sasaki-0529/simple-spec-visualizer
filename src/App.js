import React from 'react'
import Container from '@material-ui/core/Container'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabGeneral from './components/TabGenerate'
import TabDetail from './components/TabDetail'
import { grey } from '@material-ui/core/colors'
import Report from './models/report'
import dummy from './dummy.json'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tabValue: 1, report: new Report(dummy) }
  }

  setTabValue(tabValue) {
    this.setState({ tabValue })
  }

  tabContent() {
    if (this.state.tabValue === 0) {
      return <TabGeneral report={this.state.report} />
    } else {
      return <TabDetail report={this.state.report} />
    }
  }

  render() {
    const styles = {
      tabs: {
        position: 'sticky',
        top: 0,
        height: 40,
        borderBottom: '1px solid #0006',
        backgroundColor: 'white',
        zIndex: 100
      },
      tabContentWrapper: {
        marginTop: 50,
        minWidth: 1280 + 15
      }
    }
    return (
      <div>
        <Tabs
          value={this.state.tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, newValue) => this.setTabValue(newValue)}
          centered
          style={styles.tabs}
        >
          <Tab label="General" />
          <Tab label="Details" />
        </Tabs>

        <Container style={styles.tabContentWrapper}>{this.tabContent()}</Container>
      </div>
    )
  }
}
