import Group from './group'
import Example from './example'

/**
 * 複数のグループを所有できるクラス用インタフェース
 * 所持しているグループに対する操作の共通インタフェースを定義する
 */
export interface GroupOwnable {
  groups: Group[]

  firstExample(): Example
  getAllExamples(): Example[]
  getTotalExampleCount(): number
  getPassedExampleCount(): number
  getFailedExampleCount(): number
  getPendingExampleCount(): number
  getTotalTime(): number
  getFailedExamples(): Example[]
  getFormattedTotalTime(): string
}
