import React from 'react'
import Container from '@material-ui/core/Container'
import ResultTree from './ResultTree'
import FilteringCheckBoxGroup from './FilteringCheckboxGroup'
import SortingButtonGroup from './SortingButtonGroup'
import SearchInput from './SearchInput'

export default class PainExampleSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchKeyword: '',
      sortSetting: {
        key: 'Name',
        order: 'desc'
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
  }

  setSortSetting(key, order) {
    this.setState({
      sortSetting: { key, order }
    })
  }

  render() {
    return (
      <Container fixed>
        <FilteringCheckBoxGroup onChange={newState => this.setCheckedState({ ...newState })} />
        <SearchInput onSubmit={value => this.setSearchKeyword(value)} />
        <SortingButtonGroup
          sortKey={this.state.sortSetting.key}
          sortOrder={this.state.sortSetting.order}
          onSubmit={(key, order) => this.setSortSetting(key, order)}
        />
        <ResultTree groups={this.props.report.groups} onSelect={this.props.onSelectExample} />
      </Container>
    )
  }
}
