import React from 'react'
import DetailLeftPainResultTree from './DetailLeftPainResultTree'
import DetailLeftPainFilters from './DetailLeftPainFilters'
import DetailLeftPainSortButtons from './DetailLeftPainSortButtons'
import ReportContext from '../../context/report'
import Example from '../../models/example'
import { Divider } from '@material-ui/core/'

type Props = {
  onSelectExample: (example: Example) => void
}

type State = {
  sortSetting: {
    key: 'Name' | 'Tests' | 'Faileds' | 'Time'
    order: 'asc' | 'desc'
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
      sortSetting: {
        key: 'Name',
        order: 'asc'
      },
      checkedState: {
        passed: true,
        failed: true,
        pending: false
      }
    }
  }

  componentDidMount() {
    this.context.filter(this.state.checkedState)
    this.setState(this.state) // HACK: フィルターしたレポートを強制的に再描画
  }

  setSortSetting(key, order) {
    this.setState({
      sortSetting: { key, order }
    })
    this.context.sort(key, order)
  }

  onToggleFilter(key) {
    const newCheckedState = {
      ...this.state.checkedState,
      [key]: !this.state.checkedState[key]
    }
    this.setState({ checkedState: newCheckedState })
    this.context.filter(newCheckedState)
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
        <DetailLeftPainFilters
          passed={this.state.checkedState.passed}
          failed={this.state.checkedState.failed}
          pending={this.state.checkedState.pending}
          onToggleFilter={key => this.onToggleFilter(key)}
        />
        <DetailLeftPainSortButtons
          sortKey={this.state.sortSetting.key}
          sortOrder={this.state.sortSetting.order}
          onSubmit={(key, order) => this.setSortSetting(key, order)}
        />
        <Divider />
        <div style={styles.resultTreeWrapper}>
          <DetailLeftPainResultTree onSelect={this.props.onSelectExample} />
        </div>
        <Divider />
      </div>
    )
  }
}
