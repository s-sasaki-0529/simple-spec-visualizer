import React from 'react'
import { Grid } from '@material-ui/core'
import DetailLeftPain from './DetailLeftPain'
import DetailRightPain from './DetailRightPain'
import ScreenshotDialog from './ScreenshotDialog'
import ReportContext from '../../context/report'
import Example from '../../models/example'

type Props = {}
type State = {
  selectedExample: Example
  isShowDialog: boolean
}
export default class Detail extends React.Component<Props, State> {
  static contextType = ReportContext

  constructor(props) {
    super(props)
    this.state = {
      selectedExample: null,
      isShowDialog: false
    }
  }

  componentWillMount() {
    this.setState({ selectedExample: this.context.firstExample() })
  }

  setSelectedExample(selectedExample) {
    this.setState({ selectedExample })
  }

  showDialog() {
    this.setState({ isShowDialog: true })
  }

  hideDialog() {
    this.setState({ isShowDialog: false })
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <DetailLeftPain onSelectExample={example => this.setSelectedExample(example)} />
          </Grid>
          <Grid item xs={6}>
            <DetailRightPain
              example={this.state.selectedExample}
              locationUrl={this.context.getLocationUrl(this.state.selectedExample.location)}
              onClickImage={() => this.showDialog()}
            />
          </Grid>
        </Grid>
        <ScreenshotDialog
          open={this.state.isShowDialog}
          example={this.state.selectedExample}
          onClose={() => this.hideDialog()}
        />
      </div>
    )
  }
}
