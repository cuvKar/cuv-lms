import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
){
    try {} catch(error) {
        console.log("CHAPTERS" ,error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}