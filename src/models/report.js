import Group from './group'
import Example from './example'

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
    this.originGroups = Object.keys(source.groups).map(groupName => {
      return new Group(null, groupName, source.groups[groupName])
    })

    // originGroupsを元に、ソートや検索、絞り込みをgroupsに対して行う
    this.groups = this.originGroups
    this.sort('Name', 'asc')
    console.log(this.groups)
  }

  resetFilter() {
    this.groups = this.originGroups
  }

  filter({ passed = true, failed = true, pending = true, keyword = '' }) {
    this.resetFilter()

    this.groups = this.originGroups.filter(group => {
      return (
        (passed && group.hasExampleByStatus('passed')) ||
        (failed && group.hasExampleByStatus('failed')) ||
        (pending && group.hasExampleByStatus('pending'))
      )
    })
  }

  /**
   * Group及びExampleをまとめて並び替える
   * @param {'Name'|'Tests'|'Faileds'|'Time'} key
   * @param {'desc'|'asc'} order
   */
  sort(key, order) {
    switch (key) {
      case 'Name':
        this.groups.sort((a, b) => ('' + a.name).localeCompare(b.name))
        break
      case 'Tests':
        this.groups.sort((a, b) => (a.getTotalExampleCount() > b.getTotalExampleCount() ? 1 : -1))
        break
      case 'Faileds':
        this.groups.sort((a, b) => (a.getFailedExampleCount() > b.getFailedExampleCount() ? 1 : -1))
        break
      case 'Time':
        this.groups.sort((a, b) => (a.getTotalTime() > b.getTotalTime() ? 1 : -1))
        break
      default:
        break
    }
    if (order === 'desc') {
      this.groups.reverse()
    }
  }

  /**
   * 先頭のExampleを走査して取得する
   * @return [Example]
   */
  firstExample() {
    let result = null
    this.groups.forEach(group => {
      result = group.firstExample()
      if (result) return
    })
    return result
  }

  /**
   * 総実行時間を取得する
   */
  getTotalTime() {
    if (this.totalTime !== undefined) return this.totalTime

    this.totalTime = 0
    this.groups.forEach(group => (this.totalTime += group.getTotalTime()))
    return this.totalTime
  }
}
