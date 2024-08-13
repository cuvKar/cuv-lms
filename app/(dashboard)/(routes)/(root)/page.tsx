import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server"
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation"
import * as React from "react"
import { InfoCard } from "./_components/info-card";


export default async function Dashboard() {
  const { userId } = auth();

  if(!userId){
    return redirect("/")
  }

  const {
    completedCourses,
    courseInProgress,
  } = await getDashboardCourses(userId)
  return (
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            variant={"default"} 
            icon = {Clock}
            label="Courses in progress" 
            numberOfItems={courseInProgress.length}
          />
          <InfoCard
            variant={"success"} 
            icon = {CheckCircle}
            label="Completed" 
            numberOfItems={completedCourses.length}
          />
        </div>
        <CoursesList 
          items={[...courseInProgress, ...completedCourses]}
        />
      </div>
  )
}
