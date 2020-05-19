export default class Example {
  /**
   * @param {*} name シナリオ名
   * @param {Object} params
   * @param {string} params.expectation 期待値
   * @param {string} params.location 元ソースコード
   * @param {number} params.runTime  実行時間
   * @param {status} params.status   結果種別
   */
  constructor(name, params) {
    this.name = name
    this.expectation = params.expectation
    this.location = params.location
    this.runTime = params.run_time
    this.status = params.status
    this.imageUrl = 'https://d3utmhtlcphhyc.cloudfront.net/files/topics/24949_ext_25_0.jpg'
  }
}
