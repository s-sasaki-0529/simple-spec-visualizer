import Group from './group'
import Example from './example'

export default class Report {
  constructor(source) {
    this.source = source
    this.startTime = new Date(source.start_time)
    this.endTime = new Date(source.end_time)
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
   * 全成功Example数を取得する
   */
  getPassedExampleCount() {
    return this.groups.reduce((count, group) => (count += group.getPassedExampleCount()), 0)
  }

  /**
   * 全失敗Example数を取得する
   */
  getFailedExampleCount() {
    return this.groups.reduce((count, group) => (count += group.getFailedExampleCount()), 0)
  }

  /**
   * 全保留Example数を取得する
   */
  getPendingExampleCount() {
    return this.groups.reduce((count, group) => (count += group.getPendingExampleCount()), 0)
  }

  /**
   * 総実行時間を取得する
   * NOTE: startTimeとendTimeから算出できなくもない
   */
  getTotalTime() {
    if (this.totalTime !== undefined) return this.totalTime

    this.totalTime = 0
    this.groups.forEach(group => (this.totalTime += group.getTotalTime()))
    return this.totalTime
  }
}
