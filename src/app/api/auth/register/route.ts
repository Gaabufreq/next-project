
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        await connectDB();

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return NextResponse.json(
                { message: "Name, email and password must be strings" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const hash = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name,
            email,
            password: hash,
        });

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: newUser,
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("Registration error:", err);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
