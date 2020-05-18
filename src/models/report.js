import Group from './group'

export default class Report {
  constructor(source) {
    this.startTime = new Date(source.start_time)
    this.endTime = new Date(source.end_time)
    this.exampleCount = source.example_count
    this.failedCount = source.failed_count
    this.pendingCount = source.pending_count
    this.ci = {
      branchName: source.ci.branch_name,
      buildUrl: source.ci.build_url,
      commitHash: source.ci.commit_hash,
      pullRequestUrl: source.ci.pull_request_url
    }
    this.groups = Object.keys(source.groups).map(groupName => {
      return new Group(groupName, source.groups[groupName])
    })
  }
}
