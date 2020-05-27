import React from 'react'
import { Link, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import WorkIcon from '@material-ui/icons/Work'
import GitHubIcon from '@material-ui/icons/GitHub'
import CodeIcon from '@material-ui/icons/Code'

type ListItemWithIconProps = {
  icon: JSX.Element
  title: string
  subTitle: string
  isLink?: boolean
  url?: string
}
const ListItemWithIcon: React.FunctionComponent<ListItemWithIconProps> = props => {
  const SubTitleText: any = () => {
    if (props.isLink && props.subTitle) {
      const url = props.url || props.subTitle
      return (
        <Link target="_blank" href={url}>
          {props.subTitle}
        </Link>
      )
    } else {
      return props.title || '-'
    }
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{props.icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.title} secondary={<SubTitleText />} />
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
