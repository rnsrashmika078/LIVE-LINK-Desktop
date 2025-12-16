import { auth, provider } from "@/lib/firebase/firebase";
import {  signInWithPopup } from "firebase/auth";

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);

    return {
      success: true,
      user: result.user,
      message: "Successfully Signed in with Google!",
    };
  } catch (error) {
    return {
      success: false,
      user: null,
      message: error instanceof Error ? error.toString() : "Unknown error",
    };
  }
}
