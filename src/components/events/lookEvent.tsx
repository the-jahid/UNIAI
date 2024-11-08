'use client'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

interface LookEventProps {
  control: Control<any>
}

const LookEvent: React.FC<LookEventProps> = ({ control }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Are you looking for an event or a place to go?</h2>
      <Controller
        name="initialChoice"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="event" id="event" />
              <Label htmlFor="event">Event</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="place" id="place" />
              <Label htmlFor="place">Place to go</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="either" id="either" />
              <Label htmlFor="either">Either</Label>
            </div>
          </RadioGroup>
        )}
      />
    </div>
  )
}

export default LookEvent