import React from 'react'
import { Link, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import WorkIcon from '@material-ui/icons/Work'
import GitHubIcon from '@material-ui/icons/GitHub'
import CodeIcon from '@material-ui/icons/Code'

const ListItemWithIcon = ({ icon, primary, secondary, link }) => {
  const SecondaryText = () => {
    if (link && secondary) {
      return (
        <Link target="_blank" href={secondary}>
          {secondary}
        </Link>
      )
    } else {
      return secondary || '-'
    }
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={<SecondaryText />} />
    </ListItem>
  )
}

export default ({ report }) => {
  return (
    <List>
      <ListItemWithIcon
        icon={<ScheduleIcon />}
        primary={`${report.getFormattedStartTime()} - ${report.getFormattedEndTime()}`}
        secondary={report.getFormattedTotalTime()}
      />
      <ListItemWithIcon icon={<CodeIcon />} primary="Branch" secondary={report.ci.branchName} />
      <ListItemWithIcon link icon={<WorkIcon />} primary="Build URL" secondary={report.ci.buildUrl} />
      <ListItemWithIcon link icon={<GitHubIcon />} primary="Pull Request" secondary={report.ci.pullRequestUrl} />
    </List>
  )
}
