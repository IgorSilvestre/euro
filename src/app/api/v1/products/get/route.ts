import { NextResponse } from "next/server";
import { firestore } from "../../../../../../firebase/admin";

export async function GET() {
    try {
        const snapshot = await firestore.collection("products").get();
        const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

