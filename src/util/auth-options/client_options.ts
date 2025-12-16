"use client";

import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";


export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Logout failed:", error);
    return { success: false, message: (error as Error).message };
  }
}
