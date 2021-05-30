import React from 'react'
import Report from '../models/report'

/**
 * アプリケーション全体でレポートを共有するためのコンテキスト
 * ルートコンポーネントで正しいレポートが注入されるという前提の元、型アサーションする
 */
export default React.createContext<Report>({} as Report)
