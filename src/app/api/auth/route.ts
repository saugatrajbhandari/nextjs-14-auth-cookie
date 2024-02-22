import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(req: NextRequest) {
  try {
    const userData = req.cookies.get("user");
    const token = req.cookies.get("token");

    return Response.json({ userData, token });
  } catch (error) {
    return NextResponse.json({ message: "User data not found" });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.user) {
    return NextResponse.json(
      { message: "User data not found." },
      { status: 400 }
    );
  }

  if (!data?.token?.trim()) {
    return NextResponse.json({ message: "Token not found." }, { status: 400 });
  }

  try {
    const days = 24 * 60 * 60 * 1000 * 7;

    cookies().set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: true,
      expires: Date.now() + days,
    });

    cookies().set({
      name: "user",
      value: JSON.stringify(data.user || {}),
      httpOnly: true,
      secure: true,
      sameSite: true,
      expires: Date.now() + days,
    });

    return NextResponse.json({ message: "Login successful." });
  } catch {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    cookies().delete("user");
    cookies().delete("token");
    
    return NextResponse.json({ message: "Logout successful." });
  } catch (error) {
    return NextResponse.json({
      message: "internal server error",
    });
  }
}
