import { firebaseAuth } from "../../../firebase/clientApp";

export async function getUserClaims() {
  const user = firebaseAuth.currentUser;
  if (!user) return null;

  await user.getIdToken(true); // `true` forces refresh

  const idTokenResult = await user.getIdTokenResult();
  return idTokenResult.claims
}
