import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import uploadOnSupabase from "@/lib/uploadOnSupabase";
import User from "@/models/user.model";
import authOptions from "@/lib/auth";


export async function POST(req:NextRequest){
try {
    await connectDB()
    const session = await getServerSession(authOptions)
    if(!session || !session.user.email || !session.user.id){
        return NextResponse.json(
            {message:'user does not have session'},
            {status:400},
        )
    }

    const formData = await req.formData()

    const name=formData.get('name') as string
    const file=formData.get('file') as Blob | null

    let imageUrl = session.user.image ?? null

    if(file){
        imageUrl = await uploadOnSupabase(file, session.user.id);
    }

    const user = await User.findByIdAndUpdate(session.user.id,{
        name,image:imageUrl
    },{new:true})

    if(!user){
        return NextResponse.json(
            {message:'user not found'},
            {status:400},
        )
    }

        return NextResponse.json(
            user,
            {status:200},
        )

} catch (error) {
     console.error("EDIT API FAILED:", error);
            return NextResponse.json(
            {message:`edit error ${error}`},
            {status:500},
        )
}
}