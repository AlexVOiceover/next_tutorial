import React from 'react'

const Page = async ({params}) => {
    const {slug} = params
  return (
    <section className='py-24'>
      <div className='container'>
        <header className='gb-gray-100 rounded p-8'>
          <h1 className='font-serif text-3xl'>Learn Next</h1>
          <p className='text-sm font-light uppercase'>Alexander Rodriguez</p>
        </header>
      </div>
    </section>
  )
}

export default Page
