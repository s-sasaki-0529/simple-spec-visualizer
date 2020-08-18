import React from 'react'
import DetailLeftPainResultTree from './DetailLeftPainResultTree'
import DetailLeftPainFilters from './DetailLeftPainFilters'
import DetailLeftPainSortButtons from './DetailLeftPainSortButtons'
import ReportContext from '../../context/report'
import Example from '../../models/example'
import { SORT_KEY, SORT_ORDER } from '../../models/types'
import { Divider } from '@material-ui/core/'

type Props = {
  selectedExample: Example
  onSelectExample: (example: Example) => void
}

type State = {
  expandedNodeIds: string[]
  searchKeyword: String
  sortSetting: {
    key: SORT_KEY
    order: SORT_ORDER
  }
  checkedState: {
    passed: Boolean
    failed: Boolean
    pending: Boolean
  }
}

export default class DetaileLeftPain extends React.Component<Props, State> {
  static contextType = ReportContext

  constructor(props: Props) {
    super(props)
    this.state = {
      expandedNodeIds: [],
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

  onSelectExample(example: Example) {
    const parentIds = example.getParents().map(g => g.id)
    const newExpandedNodeIds = Array.from(new Set(this.state.expandedNodeIds.concat(parentIds)))
    this.setState({
      expandedNodeIds: newExpandedNodeIds
    })
    this.props.onSelectExample(example)
  }

  onToggleTree(nodeIds: string[]) {
    this.setState({
      expandedNodeIds: nodeIds
    })
  }

  onClickNext() {
    const nextExample = this.context.nextExample(this.props.selectedExample)
    this.onSelectExample(nextExample)
  }

  onClickPrev() {
    const prevExample = this.context.prevExample(this.props.selectedExample)
    this.onSelectExample(prevExample)
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
        <DetailLeftPainFilters onChange={newState => this.setCheckedState({ ...newState })} />
        <DetailLeftPainSortButtons
          sortKey={this.state.sortSetting.key}
          sortOrder={this.state.sortSetting.order}
          onSubmit={(key, order) => this.setSortSetting(key, order)}
        />
        <Divider />
        <div style={styles.resultTreeWrapper}>
          <DetailLeftPainResultTree
            selectedNodeId={this.props.selectedExample.id}
            expandedNodeIds={this.state.expandedNodeIds}
            onSelect={example => this.onSelectExample(example)}
            onToggle={nodeIds => this.onToggleTree(nodeIds)}
          />
        </div>
        <button onClick={() => this.onClickPrev()}>prev</button>
        <button onClick={() => this.onClickNext()}>next</button>
        <Divider />
      </div>
    )
  }
}
