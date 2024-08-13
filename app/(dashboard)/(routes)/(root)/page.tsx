import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server"
import { Clock } from "lucide-react";
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
            icon = {Clock}
            title="Courses in progress" 
            numberOfItems={courseInProgress.length}
          />
        </div>
        <CoursesList 
          items={[...courseInProgress, ...completedCourses]}
        />
      </div>
  )
}
