"use client"

import React from 'react'
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useSearchParams, useRouter } from 'next/navigation'

type Props = {
  value: string
  label: string
}


const OrderFilter = ({ dynamicFilterValue }: { dynamicFilterValue: Props[] }) => {
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
        {dynamicFilterValue.map((item) => (
          <div className="flex items-center gap-3 py-1" key={item.value}>
            <RadioGroupItem value={item.value} id={item.value} />
            <Label htmlFor={item.value}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default OrderFilter