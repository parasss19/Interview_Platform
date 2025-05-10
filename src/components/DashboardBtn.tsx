"use client"
import { useRole } from '@/hooks/useRole';
import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

function DashboardBtn() {
  const {isCandidate, isLoading} = useRole();

  if(isCandidate || isLoading) return null;
  
  return (
    <Link href={"/dashboard"}>
      <Button variant="ghost" className="bg-green-500 hover:bg-green-500 font-medium px-2">
        <SparklesIcon className='size-4'/> 
        Dashboard
      </Button>
    </Link>
  )
}

export default DashboardBtn