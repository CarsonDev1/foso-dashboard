"use client"

import { useState, useEffect } from "react"

export interface ProductStat {
  id: string
  value: number
  label: string
  sublabel: string
  change?: number
  trend?: 'up' | 'down'
}

export interface ProductionData {
  category: string
  planned: number
  actual: number
  highlight?: boolean
}

export interface CustomerData {
  name: string
  value: number
}

export interface ProductionStatusData {
  total: number
  completed: number
  inProgress: number
  planned: number
}

export interface ProgressItem {
  id: string
  label: string
  value: number
  total: number
  amount: string
  percentage: number
}

export interface MaterialItem {
  id: string
  rank: number
  name: string
  type: string
  unit: string
  quantity: number
}

export interface StatusItem {
  count: number
  label: string
  color: string
}

export interface DashboardData {
  topProducts: ProductStat[]
  productionPlan: ProductionData[]
  topCustomers: CustomerData[]
  productionStatus: ProductionStatusData
  productionProgress: ProgressItem[]
  materialsNeeded: MaterialItem[]
  statusSummary: StatusItem[]
}

export function useFakeData(hasData: boolean = true) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const loadData = setTimeout(() => {
      if (hasData) {
        setDashboardData({
          topProducts: [
            {
              id: '1',
              value: 48,
              label: 'Áo sơ mi dài tay',
              sublabel: 'Áo sơ mi dài tay',
              change: 8.2,
              trend: 'up'
            },
            {
              id: '2',
              value: 18,
              label: 'Quần tây',
              sublabel: 'Quần tây',
              change: 5,
              trend: 'down'
            },
            {
              id: '3',
              value: 40,
              label: 'Áo hoodie',
              sublabel: 'Áo hoodie',
              change: 12,
              trend: 'up'
            },
            {
              id: '4',
              value: 23,
              label: 'Đầm maxi',
              sublabel: 'Đầm maxi',
              change: 3.5,
              trend: 'up'
            },
            {
              id: '5',
              value: 48,
              label: 'Áo thun cổ tròn',
              sublabel: 'Áo thun cổ tròn',
              change: 4.7,
              trend: 'up'
            }
          ],
          productionPlan: [
            { category: 'Hội hàng', planned: 90, actual: 40 },
            { category: 'Áo sơ mi', planned: 80, actual: 65 },
            { category: 'Áo thun polo', planned: 70, actual: 25 },
            { category: 'Quần baggy', planned: 75, actual: 45 },
            { category: 'Quần jogger', planned: 82, actual: 60 }
          ],
          topCustomers: [
            { name: 'Công ty DH Corp HCM', value: 3200 },
            { name: 'Công ty Thời Trang AZ', value: 2800 },
            { name: 'Outlet Launch', value: 2600 },
            { name: 'Shop thuê tại Greenmart Mall', value: 2300 },
            { name: 'Shop thời trang Online GYM', value: 2000 }
          ],
          productionStatus: {
            total: 16,
            completed: 5,
            inProgress: 6,
            planned: 5
          },
          productionProgress: [
            {
              id: '1',
              label: 'Áo sơ mi dài tay',
              value: 123,
              total: 246,
              amount: '123 cái',
              percentage: 50
            },
            {
              id: '2',
              label: 'Áo sơ mi cụt tay',
              value: 321,
              total: 428,
              amount: '321 cái',
              percentage: 75
            },
            {
              id: '3',
              label: 'Quần baggy',
              value: 231,
              total: 513,
              amount: '231 cái',
              percentage: 45
            },
            {
              id: '4',
              label: 'Quần tây',
              value: 999,
              total: 1665,
              amount: '999 cái',
              percentage: 60
            },
            {
              id: '5',
              label: 'Đầm maxi',
              value: 876,
              total: 973,
              amount: '876 cái',
              percentage: 90
            },
            {
              id: '6',
              label: 'Áo hoodie',
              value: 765,
              total: 5100,
              amount: '765 cái',
              percentage: 15
            },
            {
              id: '7',
              label: 'Áo khoác bomber',
              value: 543,
              total: 2262,
              amount: '543 cái',
              percentage: 24
            }
          ],
          materialsNeeded: [
            { id: '1', rank: 1, name: 'Chỉ cotton', type: 'Vải', unit: 'Cuộn', quantity: 8 },
            { id: '2', rank: 2, name: 'Vải lụa', type: 'Vải', unit: 'Mét', quantity: 8 },
            { id: '3', rank: 3, name: 'Vải dù', type: 'Vải', unit: 'Mét', quantity: 8 },
            { id: '4', rank: 4, name: 'Vải chống thấm', type: 'Vải', unit: 'Mét', quantity: 8 },
            { id: '5', rank: 5, name: 'Vải dạ', type: 'Vải', unit: 'Mét', quantity: 8 }
          ],
          statusSummary: [
            { count: 5, label: 'Chưa hoàn thành', color: 'amber' },
            { count: 6, label: 'Đang sản xuất', color: 'blue' },
            { count: 5, label: 'Hoàn thành', color: 'green' }
          ]
        })
      } else {
        setDashboardData(null)
      }

      setIsLoading(false)
    }, 500)

    return () => clearTimeout(loadData)
  }, [hasData])

  return { dashboardData, isLoading }
}