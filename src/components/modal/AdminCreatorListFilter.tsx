"use client"

import React, { Suspense } from 'react'
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useSearchParams, useRouter } from 'next/navigation'

const AdminCreatorListFilterSuspense = () => {
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
          <Label htmlFor="r1">All </Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="active" id="r2" />
          <Label htmlFor="r2">Active</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="inactive" id="r3" />
          <Label htmlFor="r3">Inactive</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

export default function AdminCreatorListFilter() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <AdminCreatorListFilterSuspense />
    </Suspense>
  )
}