import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import DetailLeftPain from './DetailLeftPain'
import DetailRightPain from './DetailRightPain'
import ScreenshotDialog from './ScreenshotDialog'

export default class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedExample: null, // FIXME: デフォルトで先頭のexampleを選択状態にしたい
      isShowDialog: false
    }
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
      <Container fixed>
        <Grid container spacing={5}>
          <Grid container item xs={6} alignContent="flex-start">
            <DetailLeftPain report={this.props.report} onSelect={example => this.setSelectedExample(example)} />
          </Grid>
          <Grid item xs={6}>
            <DetailRightPain example={this.state.selectedExample} onClickImage={() => this.showDialog()} />
          </Grid>
        </Grid>
        <ScreenshotDialog
          open={this.state.isShowDialog}
          example={this.state.selectedExample}
          onClose={() => this.hideDialog()}
        />
      </Container>
    )
  }
}
