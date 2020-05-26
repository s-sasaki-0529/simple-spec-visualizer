import React from 'react'
import { Link, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import WorkIcon from '@material-ui/icons/Work'
import GitHubIcon from '@material-ui/icons/GitHub'
import CodeIcon from '@material-ui/icons/Code'

const ListItemWithIcon = ({ icon, title, subTitle, isLink, url }) => {
  const SubTitleText = () => {
    if (isLink && subTitle) {
      url = url || subTitle
      return (
        <Link target="_blank" href={url}>
          {subTitle}
        </Link>
      )
    } else {
      return title || '-'
    }
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={<SubTitleText />} />
    </ListItem>
  )
}

export default ({ report }) => {
  return (
    <List>
      <ListItemWithIcon
        icon={<ScheduleIcon />}
        title={`${report.getFormattedStartTime()} - ${report.getFormattedEndTime()}`}
        subTitle={report.getFormattedTotalTime()}
      />
      <ListItemWithIcon
        isLink
        icon={<CodeIcon />}
        title="Branch"
        subTitle={report.ci.branchName}
        url={report.getBranchUrl()}
      />
      <ListItemWithIcon isLink icon={<WorkIcon />} title="Build URL" subTitle={report.ci.buildUrl} />
      <ListItemWithIcon isLink icon={<GitHubIcon />} title="Pull Request" subTitle={report.ci.pullRequestUrl} />
    </List>
  )
}
