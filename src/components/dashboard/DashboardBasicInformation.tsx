import React, { useState } from 'react'
import { TextField, Link, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import WorkIcon from '@material-ui/icons/Work'
import GitHubIcon from '@material-ui/icons/GitHub'
import CodeIcon from '@material-ui/icons/Code'
import DescriptionIcon from '@material-ui/icons/Description'
import Report from '../../models/report'

const ListItemWithIcon = (props: {
  icon: JSX.Element
  primary: JSX.Element | string
  secondary?: string
  isLink?: boolean
  url?: string
}) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{props.icon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.primary}
        secondary={
          props.isLink && (props.url || props.secondary) ? (
            <Link target="_blank" href={props.url || props.secondary}>
              {props.secondary}
            </Link>
          ) : (
            props.secondary
          )
        }
      />
    </ListItem>
  )
}

const SourceURLInput = (props: { initialValue: string; onSubmit: (url: string) => void }) => {
  const [value, setValue] = useState(props.initialValue)
  return (
    <TextField
      style={{ width: '100%' }}
      label="source url"
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          props.onSubmit(value)
        }
      }}
    />
  )
}

export default (props: { report: Report; reloadReport: (newSourceUrl: string) => void }) => {
  return (
    <List>
      <ListItemWithIcon
        icon={<DescriptionIcon />}
        primary={<SourceURLInput initialValue={props.report.sourceURL} onSubmit={v => props.reloadReport(v)} />}
      />
      <ListItemWithIcon
        icon={<ScheduleIcon />}
        primary={`${props.report.getFormattedStartTime()} - ${props.report.getFormattedEndTime()}`}
        secondary={props.report.getFormattedTotalTime()}
      />
      <ListItemWithIcon
        isLink
        icon={<CodeIcon />}
        primary="Branch"
        secondary={props.report.ci.branchName || '-'}
        url={props.report.getBranchUrl() || undefined}
      />
      <ListItemWithIcon isLink icon={<WorkIcon />} primary="Build URL" secondary={props.report.ci.buildUrl} />
      <ListItemWithIcon
        isLink
        icon={<GitHubIcon />}
        primary="Pull Request"
        secondary={props.report.ci.pullRequestUrl}
      />
    </List>
  )
}
