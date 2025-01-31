'use server'
import { firestore } from "../../../firebase/admin";

export async function getProducts () {
    try {
        const snapshot = await firestore.collection("products").get();
        const products = snapshot.docs.map((doc) => {
          const { buyPrice, ...filteredData } = doc.data()
          return {
            id: doc.id,
            ...filteredData,
          }
        })
        return { products }
    } catch (error) {
        return { error: error }
    }
}
