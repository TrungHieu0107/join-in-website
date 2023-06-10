import { useEffect, useState } from 'react'
import { userAPI } from 'src/api-client'
import { DashboardPerMonthModel } from 'src/models/class/DashboardPerMonthModel'
import { CommonResponse } from 'src/models/common/CommonResponse'
import withAuth from 'src/pages/withAuth'
import UserAndPremiunAccountChart from 'src/views/charts/UserAndPremiunAccountChart'

const DashboardPage = () => {
  const [listUserCount, setListUserCount] = useState<number[]>([])
  const [listTransactionCount, setListTransactionCount] = useState<number[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await userAPI.Admin.getDashboard().then(dashboard => {
      const newData = new CommonResponse(dashboard).data as DashboardPerMonthModel[]

      const newListUserCount: number[] = []
      const newListTransactionCount: number[] = []
      newData?.map(item => {
        newListUserCount.push(item.userCount)
        newListTransactionCount.push(item.transactionCount)
      })

      console.log(newListUserCount, newListTransactionCount)

      setListTransactionCount(newListTransactionCount)
      setListUserCount(newListUserCount)
    })
  }

  return (
    <div>
      <UserAndPremiunAccountChart listUserCount={listUserCount} listTransactionCount={listTransactionCount} />
    </div>
  )
}

export default withAuth(DashboardPage)
