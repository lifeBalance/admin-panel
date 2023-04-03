import Wrapper from '../components/Wrapper'
import * as c3 from 'c3'
import { useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            ['x'],
            ['Sales'],
          ],
          types: {
            Sales: 'bar',
          },
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d',
            },
          },
        },
      })

      const response = await axios.get('chart')
      console.log(response)
      chart.load({
        columns: [
          [
            'x',
            ...response.data.result.map((r: { date: string, sum: string }) => new Date(r.date)),
          ],
          ['Sales', ...response.data.result.map((r: { date: string, sum: string }) => +r.sum)],
        ],
      })
    })()
  }, [])

  return (
    <Wrapper>
      <h2>Daily Sales</h2>
      <div id='chart'></div>
    </Wrapper>
  )
}

export default Dashboard
