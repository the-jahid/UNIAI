"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[0-9+\-\s()]*$/, { message: "Please enter a valid phone number" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive SMS updates",
  }),
  frequency: z.enum(["weekly", "bigDrops", "allUpdates"]).optional(),
  categories: z.array(z.string()).optional(),
  instagramHandle: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const categories = [
  { id: "concerts", label: "Concerts" },
  { id: "nightlife", label: "Nightlife" },
  { id: "art", label: "Art" },
  { id: "dateIdeas", label: "Date Ideas" },
  { id: "food", label: "Food & Drinks" },
  { id: "sports", label: "Sports" },
]

export function UniSignupForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      consent: false,
      categories: [],
      instagramHandle: "",
      notes: "",
    },
  })

  function onSubmit(data: FormValues) {
    console.log(data)
    // Here you would typically send the data to your backend
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-zinc-800 text-white">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Thanks for signing up!</h3>
            <p className="text-zinc-400">
              You&apos;ll start receiving SMS updates from UNI based on your preferences.
            </p>
            <Button className="mt-4 bg-zinc-700 text-white hover:bg-zinc-600">
              Sign up another person
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-white">Sign up for UNI Updates</CardTitle>
        <CardDescription className="text-zinc-400">Get the latest updates on events and activities in your area.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} className="bg-zinc-700 text-white border-zinc-600" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} className="bg-zinc-700 text-white border-zinc-600" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-zinc-600 data-[state=checked]:bg-white data-[state=checked]:text-black" />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-zinc-300">Yes, I consent to receive SMS updates from UNI.</FormLabel>
                      <FormDescription className="text-xs text-zinc-400">
                        By opting in, you agree to receive text messages from UNI. Message & data rates may apply. You
                        can reply STOP at any time to unsubscribe.
                      </FormDescription>
                    </div>
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-300">Preferences (Optional)</h3>

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Frequency of updates</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-700 text-white border-zinc-600">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-700 text-white border-zinc-600">
                        <SelectItem value="weekly" className="text-white">Weekly</SelectItem>
                        <SelectItem value="bigDrops" className="text-white">Big drops only</SelectItem>
                        <SelectItem value="allUpdates" className="text-white">All updates</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel className="text-zinc-300">Categories of interest</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {categories.map((category) => (
                        <FormField
                          key={category.id}
                          control={form.control}
                          name="categories"
                          render={({ field }) => {
                            return (
                              <FormItem
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(category.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), category.id])
                                        : field.onChange(field.value?.filter((value) => value !== category.id))
                                    }}
                                    className="border-zinc-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-zinc-400">{category.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="instagramHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Instagram Handle (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourusername" {...field} className="bg-zinc-700 text-white border-zinc-600" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Final notes/preferences (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional preferences or notes you'd like to share"
                      className="min-h-[100px] bg-zinc-700 text-white border-zinc-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-zinc-700 text-white hover:bg-zinc-600">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}