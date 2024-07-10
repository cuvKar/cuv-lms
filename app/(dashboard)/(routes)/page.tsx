"use client"

import * as React from "react"


export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between my-0">
        <section className='flex flex-col items-center justify-center w-screen h-[calc(100vh-80px)]'>
          <h1 className='text-4xl font-bold'>This is protetced Page</h1>
        </section>
      </main>
  )
}
