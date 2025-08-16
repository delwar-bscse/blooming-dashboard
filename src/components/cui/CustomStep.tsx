"use client"

import { cn } from '@/lib/utils';
import { StepDataType } from '@/type/type';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react'

const CustomStepSuspense = ({ stepDatas, className }: { stepDatas: StepDataType[], className?: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStep = searchParams.get('step') || stepDatas[0]?.label;

  useEffect(() => {
    // Initialize the step if no query param is set
    if (!searchParams.get('step') && stepDatas.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', stepDatas[0].label);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, stepDatas, router]);

  const handleStyle = (label?: string) => {
    return `font-bold text-gray-600 border-b-6 pb-2 border-b-gray-300 hover:border-b-gray-500 px-6 md:pr-20 text-xl cursor-pointer transition-colors duration-500 ${currentStep === label ? 'border-b-gray-600 text-gray-800' : ''}`
  }

  const handleStepChange = (label: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', label);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <div>
        <div>
          <ul className='flex relative z-10'>
            {stepDatas.map((item) => (
              <li 
                key={item.id} 
                onClick={() => handleStepChange(item.label)} 
                className={cn(`${handleStyle(item.label)}`, className)}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <div className={cn('border-b-6 border-b-gray-300 relative -top-1.5 w-full')} />
        </div>
      </div>
    </div>
  )
}

export default function CustomStep({ stepDatas, className }: { stepDatas: StepDataType[], className?: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomStepSuspense stepDatas={stepDatas} className={className} />
    </Suspense>
  );
}