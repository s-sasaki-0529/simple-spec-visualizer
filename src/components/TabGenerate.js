import React from 'react'
import { LineChart, Line } from 'recharts'

const data = [
  { uv: Math.random() },
  { uv: Math.random() },
  { uv: Math.random() },
  { uv: Math.random() },
  { uv: Math.random() },
  { uv: Math.random() }
]
export default () => (
  <LineChart width={1280} height={400} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  </LineChart>
)
