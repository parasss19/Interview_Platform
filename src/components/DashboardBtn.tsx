"use client"
import { useRole } from '@/hooks/useRole';
import Link from 'next/link';
import React from 'react'

function DashboardBtn() {
  const {isCandidate, isLoading} = useRole();

  if(isCandidate || isLoading) return null;
  
  return (
    <Link href={"/dashboard"} className='font-mono'>
        Dashboard
    </Link>
  )
}

export default DashboardBtn