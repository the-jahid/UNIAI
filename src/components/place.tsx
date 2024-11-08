'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function PlaceStepper(setEventsdrilling:any) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    purpose: '',
    atmosphere: '',
    companion: '',
    cuisine: '',
    activity: '',
    dislikes: '',
    budget: '',
    distance: '',
    specialRequirements: '',
    timeConstraints: '',
    previousExperiences: '',
    previousExperienceDescription: '',
    frequency: '',
    weather: '',
    culturalPreferences: ''
  })

  const steps = [
    {
      title: "Purpose of Visit",
      field: "purpose",
      options: ['Dining', 'Entertainment', 'Relaxation', 'Shopping', 'Exploring']
    },
    {
      title: "Mood or Atmosphere",
      field: "atmosphere",
      options: ['Casual', 'Romantic', 'Adventurous', 'Quiet', 'Festive']
    },
    {
      title: "Companion Considerations",
      field: "companion",
      options: ['Solo', 'Family', 'Friends', 'Date', 'Children']
    },
    {
      title: "Type of Cuisine or Activity",
      field: "cuisine",
      input: true,
      placeholder: "Cuisine (e.g., Italian, Japanese, Vegan)"
    },
    {
      title: "Activity",
      field: "activity",
      input: true,
      placeholder: "Activity (e.g., Movies, Bowling, Art Galleries)"
    },
    {
      title: "Dislikes",
      field: "dislikes",
      input: true,
      placeholder: "Anything you want to avoid?"
    },
    {
      title: "Budget Range",
      field: "budget",
      options: ['100$', '1000$', '10000$']
    },
    {
      title: "Distance Willing to Travel",
      field: "distance",
      options: ['Less than 5 miles', '5-10 miles', 'Over 10 miles']
    },
    {
      title: "Special Requirements",
      field: "specialRequirements",
      options: ['Wheelchair Access', 'Pet-Friendly', 'Vegetarian Options', 'Child-Friendly']
    },
    {
      title: "Time Constraints",
      field: "timeConstraints",
      options: ['Less than an hour', 'A couple of hours', 'Half a day', 'No rush']
    },
    {
      title: "Previous Experiences",
      field: "previousExperiences",
      options: ['Yes', 'No']
    },
    {
      title: "Previous Experience Description",
      field: "previousExperienceDescription",
      input: true,
      placeholder: "Describe the place",
      condition: (data: { [key: string]: string }) => data.previousExperiences === 'Yes'
    },
    {
      title: "Frequency of Visits",
      field: "frequency",
      options: ['Special Occasion', 'Routine Outing', 'First Time', 'Rarely']
    },
    {
      title: "Weather Considerations",
      field: "weather",
      options: ['Indoor', 'Outdoor', 'No preference']
    },
    {
      title: "Cultural or Thematic Preferences",
      field: "culturalPreferences",
      options: ['Live Music', 'Sports', 'Art', 'Theater', 'None']
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      console.log(formData)
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className=" md:mt-20 bg-gradient-to-b from-[#000033] to-black text-white p-4 sm:p-6 md:p-8 w-full rounded-md ">
      <div className="max-w-4xl ">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-blue-200 rounded-full">
            <div 
              className="h-full bg-cyan-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-right text-sm text-cyan-300">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Main content */}
        <Card className="bg-black bg-opacity-50 border-cyan-500 shadow-lg shadow-cyan-500/20">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
              {currentStepData.title}
            </h2>

            {currentStepData.input ? (
              <Input
                name={currentStepData.field}
                placeholder={currentStepData.placeholder}
                value={formData[currentStepData.field]}
                onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                className="bg-blue-900 border-cyan-500 text-white placeholder-cyan-300"
              />
            ) : (
              currentStepData.options && (
                <RadioGroup
                  name={currentStepData.field}
                  value={formData[currentStepData.field]}
                  onValueChange={(value) => handleInputChange(currentStepData.field, value)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {currentStepData.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option} 
                        id={`${currentStepData.field}-${option}`}
                        className="border-cyan-500 text-cyan-500"
                      />
                      <Label 
                        htmlFor={`${currentStepData.field}-${option}`}
                        className="text-white cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )
            )}

            <div className="mt-8 flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="bg-blue-700 hover:bg-blue-600 text-black px-4 py-2 rounded-full flex items-center"
              >
                {currentStep === steps.length - 1 ? 'Search' : 'Next'}
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}