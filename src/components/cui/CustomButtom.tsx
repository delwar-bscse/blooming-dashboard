import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

type Variant = 'button01' | 'button02'

const variantClasses: Record<Variant, string> = {
  button01: 'py-2 px-3',
  button02: 'lg:py-3 lg:px-4 py-2 px-3',
}

const CustomButton = ({
  text,
  url = "#",
  variant = 'button01',
}: {
  text: string
  url?: string
  variant?: Variant
}) => {
  return (
    <Link
      href={url}
      className={clsx(
        'bg-[#FFECAC] hover:bg-[rgb(255,231,152)] text-gray-700 hover:text-gray-500 block text-center w-full rounded-md shadow-sm cursor-pointer font-semibold transition-all hover:scale-105 duration-300',
        variantClasses[variant]
      )}
    >
      {text}
    </Link>
  )
}

export default CustomButton
