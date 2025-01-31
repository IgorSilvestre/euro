import { NextRequest, NextResponse } from "next/server";
import { userRoles } from "@/lib/shared/userRoles";
import { errorMessages } from "@/lib/shared/errorMessages";
import firebaseAdmin from "../../../../../../firebase/admin";

export async function POST(req: NextRequest) {
  const uid =  req.nextUrl.searchParams.get('uid')
  if (!uid || typeof uid !== 'string') return NextResponse.json({ error: errorMessages.api.missingUid }, { status: 400 });

  try {
    await firebaseAdmin.auth().setCustomUserClaims(uid, { role: userRoles.USER });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
