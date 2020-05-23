import React from 'react'
import ResultTree from './ResultTree'
import FilteringCheckBoxGroup from './FilteringCheckboxGroup'
import SortingButtonGroup from './SortingButtonGroup'
import ReportContext from '../context/report'
import { Divider } from '@material-ui/core/'

export default class PainExampleSelector extends React.Component {
  static contextType = ReportContext

  constructor(props) {
    super(props)
    this.state = {
      searchKeyword: '',
      sortSetting: {
        key: 'Name',
        order: 'asc'
      },
      checkedState: {
        passed: true,
        failed: true,
        pending: true
      }
    }
  }

  setSearchKeyword(searchKeyword) {
    this.setState({ searchKeyword })
  }

  setCheckedState(checkedState) {
    this.setState({ checkedState })
    this.context.filter({
      ...checkedState
    })
  }

  setSortSetting(key, order) {
    this.setState({
      sortSetting: { key, order }
    })
    this.context.sort(key, order)
  }

  render() {
    const styles = {
      root: {
        width: '95%',
        padding: 15
      },
      resultTreeWrapper: {
        height: 'calc(100vh - 150px)',
        overflow: 'scroll',
        marginTop: 10
      }
    }
    return (
      <div style={styles.root}>
        <FilteringCheckBoxGroup onChange={newState => this.setCheckedState({ ...newState })} />
        <SortingButtonGroup
          sortKey={this.state.sortSetting.key}
          sortOrder={this.state.sortSetting.order}
          onSubmit={(key, order) => this.setSortSetting(key, order)}
        />
        <Divider />
        <div style={styles.resultTreeWrapper}>
          <ResultTree onSelect={this.props.onSelectExample} />
        </div>
        <Divider />
      </div>
    )
  }
}
