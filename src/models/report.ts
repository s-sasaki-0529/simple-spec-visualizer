import { GroupOwnable } from './interfaces'
import Group from './group'
import Example from './example'
import { SORT_ORDER, SORT_KEY } from './types'
import axios from 'axios'

export default class Report implements GroupOwnable {
  // フィールド
  source: any
  startTime: Date
  endTime: Date
  ci: {
    branchName: string
    buildUrl: string
    commitHash: string
    pullRequestUrl: string
  }
  groups: Group[]
  repositoryName: string

  // キャッシュ
  totalTime: number
  formattedTotalTime: string

  constructor(source: any) {
    this.source = source
    this.startTime = new Date(source.start_time * 1000)
    this.endTime = new Date(source.end_time * 1000)
    this.ci = {
      branchName: source.ci.branch_name,
      buildUrl: source.ci.build_url,
      commitHash: source.ci.commit_hash,
      pullRequestUrl: source.ci.pull_request_url
    }
    this.groups = []
    this.repositoryName = process.env.REACT_APP_REPOSITORY_NAME
    this.reset()
  }

  /**
   * テストレポートをフェッチし、Reportオブジェクトを生成する
   * @param url テストレポートファイルが配置されているURL or Path
   */
  static fetch(url: string): Promise<Report> {
    return axios.get(url).then(res => {
      try {
        return Promise.resolve(new Report(res.data))
      } catch (e) {
        return Promise.reject(e)
      }
    })
  }

  /**
   * データソースを元にグループ一覧を再帰的に定義する
   */
  reset(): this {
    this.groups = Object.keys(this.source.groups).map(groupName => {
      return new Group(null, groupName, this.source.groups[groupName])
    })
    this.sort('Name', 'asc')
    return this
  }

  /**
   * Exampleステータスに応じてグループリストをフィルタリングする
   */
  filter({ passed = true, failed = true, pending = true }) {
    this.reset()
    this.groups = this.groups.filter(group => group.filterByExampleStatus({ passed, failed, pending }))
  }

  /**
   * Group及びExampleをまとめて並び替える
   */
  sort(key: SORT_KEY, order: SORT_ORDER) {
    Group.sort(this.groups, key, order)
  }

  /**
   * Examleのリストを、groupsを再帰的に走査して取得する
   */
  getAllExamples(): Example[] {
    return this.groups.map(g => g.getAllExamples()).flat()
  }

  /**
   * 先頭のExampleを走査して取得する
   */
  firstExample(): Example {
    return this.getAllExamples()[0]
  }

  /**
   * 基準となるExampleの次のExampleを取得する
   * @param currentExample
   */
  nextExample(currentExample: Example): Example {
    const allExamples = this.getAllExamples()
    const currentIndex = allExamples.findIndex(e => e.id === currentExample.id)
    return allExamples[currentIndex + 1] || allExamples[0]
  }

  /**
   * 基準となるExampleの前　のExampleを取得する
   * @param currentExample
   */
  prevExample(currentExample: Example): Example {
    const allExamples = this.getAllExamples()
    const currentIndex = allExamples.findIndex(e => e.id === currentExample.id)
    return allExamples[currentIndex - 1] || allExamples[allExamples.length - 1]
  }

  /**
   * 全Example数を取得する
   * FIXME: getAllExamples使えばよくない？
   */
  getTotalExampleCount(): number {
    return this.groups.reduce((count, group) => (count += group.getTotalExampleCount()), 0)
  }

  /**
   * 全成功Example数を取得する
   * FIXME: getAllExamples使えばよくない？
   */
  getPassedExampleCount(): number {
    return this.groups.reduce((count, group) => (count += group.getPassedExampleCount()), 0)
  }

  /**
   * 全失敗Example数を取得する
   * FIXME: getAllExamples使えばよくない？
   */
  getFailedExampleCount(): number {
    return this.groups.reduce((count, group) => (count += group.getFailedExampleCount()), 0)
  }

  /**
   * 全保留Example数を取得する
   * FIXME: getAllExamples使えばよくない？
   */
  getPendingExampleCount(): number {
    return this.groups.reduce((count, group) => (count += group.getPendingExampleCount()), 0)
  }

  /**
   * 総実行時間を取得する
   * FIXME: getAllExamples使えばよくない？
   * NOTE: startTimeとendTimeから算出できなくもない
   */
  getTotalTime(): number {
    if (this.totalTime !== undefined) return this.totalTime

    this.totalTime = 0
    this.groups.forEach(group => (this.totalTime += group.getTotalTime()))
    return this.totalTime
  }

  /**
   * 失敗したExampleの一覧を取得する
   * FIXME: getAllExamples使えばよくない？
   */
  getFailedExamples(): Example[] {
    return this.groups.reduce((failedExamples, group) => {
      return failedExamples.concat(group.getFailedExamples())
    }, [])
  }

  /**
   * ブランチ名とリポジトリ名が設定されている場合、Githubnのコミット一覧ページのURLを戻す
   */
  getBranchUrl(): string | null {
    if (this.ci.branchName && this.repositoryName) {
      return `https://github.com/${this.repositoryName}/commits/${this.ci.branchName}`
    } else {
      return null
    }
  }

  /**
   * ソースコードのパスを元に、Github上のコードURLを戻す
   * @param {String} location
   */
  getLocationUrl(location: string): string | null {
    if (location && this.ci.branchName && this.repositoryName) {
      return `https://github.com/${this.repositoryName}/blob/${this.ci.branchName}/${location}`
    } else {
      return null
    }
  }

  /**
   * 実行時間をフォーマットした文字列を戻す
   * 未実行の場合00:00が戻るので注意
   * FIXME: groupクラスにも同じようなのあるので汎用化する
   */
  getFormattedTotalTime(): string {
    if (this.formattedTotalTime !== undefined) return this.formattedTotalTime

    const m = Math.floor(this.getTotalTime() / 60)
    const s = this.getTotalTime() % 60
    this.formattedTotalTime = `${('00' + String(m)).substr(-2)} min ${('00' + String(s)).substr(-2)} sec`
    return this.formattedTotalTime
  }

  /**
   * テスト開始日時をフォーマットした文字列を戻す
   */
  getFormattedStartTime(): string {
    return this.startTime.toLocaleString()
  }

  /**
   * テスト終了日時をフォーマットした文字列を戻す
   */
  getFormattedEndTime(): string {
    return this.endTime.toLocaleString()
  }
}
