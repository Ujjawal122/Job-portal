"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

type JobProps = {
  title: string
  company: string
  location: string
  description: string
}

export function JobCard({ title, company, location, description }: JobProps) {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium">{company}</p>
        <p className="text-xs text-muted-foreground">{location}</p>
        <p className="mt-2 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Details</Button>
        <Button>Apply</Button>
      </CardFooter>
    </Card>
  )
}
