"use client"

import React from 'react'
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useSearchParams, useRouter } from 'next/navigation'

const OrderFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get initial value from query params or use default
  const filterValue = searchParams.get('filter') || 'comfortable'

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', value)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div>
      <RadioGroup
        value={filterValue}
        onValueChange={handleValueChange}
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="all" id="r1" />
          <Label htmlFor="r1">All Orders</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="pending" id="r2" />
          <Label htmlFor="r2">Pending Orders</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="completed" id="r3" />
          <Label htmlFor="r3">Completed</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="shipped" id="r4" />
          <Label htmlFor="r4">Shipped</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="delevered" id="r5" />
          <Label htmlFor="r5">Delevered</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

export default OrderFilter