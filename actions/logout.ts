"use server";

import { signOut } from "@/auth";

export async function logout() {
  // some server stuff if its needed
  await signOut();
}