import Group from './group'
import Example from './example'

export default class Report {
  constructor(source) {
    this.source = source
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
    this.groups = []
    this.reset()
  }

  /**
   * データソースを元にグループ一覧を再帰的に定義する
   */
  reset() {
    this.groups = Object.keys(this.source.groups).map(groupName => {
      return new Group(null, groupName, this.source.groups[groupName])
    })
    this.sort('Name', 'asc')
    return this
  }

  /**
   * Exampleステータスに応じてグループリストをフィルタリングする
   * FIXME: フィルタリングの対象はルートグループのみなので再帰的にどうこうしたい
   * @param {Object} params
   * @param {boolean} params.passed
   * @param {boolean} params.failed
   * @param {boolean} params.pending
   */
  filter({ passed = true, failed = true, pending = true }) {
    this.reset()
    this.groups = this.groups.filter(group => group.filterByExampleStatus({ passed, failed, pending }))
  }

  /**
   * Group及びExampleをまとめて並び替える
   * @param {'Name'|'Tests'|'Faileds'|'Time'} key
   * @param {'desc'|'asc'} order
   */
  sort(key, order) {
    Group.sort(this.groups, key, order)
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
