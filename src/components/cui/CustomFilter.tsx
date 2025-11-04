/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

export type CustomFilterProps = {
  language: string;
  gender: string;
  niche: string;
  ethnicity: string;
  skinType: string;
  bodyType: string;
  hairType: string;
}
const FILTER_KEYS: (keyof CustomFilterProps)[] = [
  'language',
  'gender',
  'niche',
  'ethnicity',
  'skinType',
  'bodyType',
  'hairType',
]

const defaultValues: Partial<CustomFilterProps> = {
  language: '',
  gender: '',
  niche: '',
  ethnicity: '',
  skinType: '',
  bodyType: '',
  hairType: '',
};

function CustomFilterSuspense() {
  const [values, setValues] = React.useState<Partial<CustomFilterProps>>(defaultValues);
  const searchParams = useSearchParams();
  const language = searchParams.get("language") || "";
  const gender = searchParams.get("gender") || "";
  const niche = searchParams.get("niche") || "";
  const ethnicity = searchParams.get("ethnicity") || "";
  const skinType = searchParams.get("skinType") || "";
  const bodyType = searchParams.get("bodyType") || "";
  const hairType = searchParams.get("hairType") || "";


  useEffect(() => {
    setValues(prevValues => ({ ...prevValues, language, gender, niche, ethnicity, skinType, bodyType, hairType }));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  // const updateQueryString = (values: Partial<CustomFilterProps>) => {
  //   // Get the current URL's query parameters
  //   const currentParams = new URLSearchParams(window.location.search);

  //   // Loop through the values and add them to the URLSearchParams if they are not empty
  //   Object.keys(values).forEach((key) => {
  //     if (values[key]) {
  //       currentParams.set(key, values[key] as string); // Set the new value for the key
  //     } else {
  //       currentParams.delete(key); // Remove the key if it's empty
  //     }
  //   });

  //   // Loop through existing query parameters and preserve them if they are not in the `values` object
  //   Object.keys(Object.fromEntries(currentParams)).forEach((key) => {
  //     if (!values[key]) {
  //       // Preserve parameters like 'step' and 'query' or any other dynamic ones
  //       const existingValue = currentParams.get(key);
  //       if (existingValue) {
  //         currentParams.set(key, existingValue); // Retain the current value if the field is not part of `values`
  //       }
  //     }
  //   });

  //   // Update the URL with the new query parameters
  //   window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`);
  // };


  // On Search button click, set filter values and update URL

  const updateQueryString = (values: Partial<CustomFilterProps>) => {
    const url = new URL(window.location.href)
    const params = url.searchParams

    FILTER_KEYS.forEach(key => {
      const v = values[key]
      if (typeof v === 'string' && v.trim() !== '') {
        params.set(key, v)
      } else {
        params.delete(key)
      }
    })

    window.history.pushState({}, '', `${url.pathname}?${params.toString()}`)
  }
  async function onSubmit() {

    // Update the query string in the URL with the current form values
    updateQueryString(values);
  }

  return (
    <div className='space-y-2'>
      <div className="flex flex-col gap-2">
        <label htmlFor="language">Language</label>
        <input name="language" value={values.language} onChange={handleInputChange} className="px-2 py-1 border border-gray-400 rounded-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="gender">Gender</label>
        <div className="px-2 border border-gray-400 rounded-sm">
          <select name="gender" value={values.gender} onChange={handleSelectChange} id="cars" className='w-full py-1 active:outline-none'>
            <option value="">Both</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="niche">Niche</label>
        <input name="niche" value={values.niche} onChange={handleInputChange} className="px-2 py-1 border border-gray-400 rounded-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ethnicity">Ethnicity</label>
        <input name="ethnicity" value={values.ethnicity} onChange={handleInputChange} className="px-2 py-1 border border-gray-400 rounded-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="skinType">Skin Type</label>
        <input name="skinType" value={values.skinType} onChange={handleInputChange} className="px-2 py-1 border border-gray-400 rounded-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="bodyType">Body Type</label>
        <input name="bodyType" value={values.bodyType} onChange={handleInputChange} className="px-2 py-1 border border-gray-400 rounded-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="hairType">Hair Type</label>
        <input name="hairType" value={values.hairType} onChange={handleInputChange} className="px-2 py-1 border border-gray-400 rounded-sm" />
      </div>
      <div className="w-full flex items-center justify-center gap-2 pt-4">
        <button onClick={onSubmit} className="bg-green-500 px-12 py-1 rounded-sm text-white">Search</button>
      </div>
    </div>
  );
}

export default function CustomFilter() {
  return (
    <Suspense fallback={<div>Loading...</div>} >
      <CustomFilterSuspense />
    </Suspense>
  )
};
