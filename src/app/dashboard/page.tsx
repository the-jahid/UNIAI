"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { SearchIcon } from 'lucide-react'
import { div } from 'framer-motion/client'

const API_KEY = 'jeDSqSiRUMcWRAiZARvvODGYfAh8uHPG'

export default function TicketmasterEvents() {


  return (
    <div className="mt-20 flex items-center justify-center h-screen">
    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-700 dark:text-gray-300">
      This page is under development
    </h1>
  </div>
  )
}