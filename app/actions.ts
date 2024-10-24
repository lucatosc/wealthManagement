"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Sign Up Error Code: ", error.code);
    console.error("Sign Up Error Message: ", error.message);
    console.error("Error Details: ", error);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    console.log("Sign Up Success Data: ", data);

    const { data : userData, error : userError } = await supabase
    .from('User')
    .insert([
      { email: email, auth_id: data.user?.id },
    ])
    .select()

    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const updateProfileAction = async (formData: FormData) => {
  const supabase = createClient();

  const fname = formData.get("fname") as string;
  const lname = formData.get("lname") as string;
  const email = formData.get("email") as string;
  const confirmEmail = formData.get("confirmEmail") as string;
  const address = formData.get("address") as string;
  
  if (email !== confirmEmail) {
    encodedRedirect(
      "error",
      "/protected/profile",
      "Emails do not match",
    );
  }

  let updateData : any = {};
  if(fname || lname) updateData['name'] = fname + lname;
  if(email) updateData['email'] = email;
  if(address) updateData['address'] = address;

  const { data, error } = await supabase
  .from('User')
  .update(updateData)
  .eq('auth_id', '7f57080d-74cf-4528-922f-fb8f1e5ca818')
  .select()

  if (error) {
    encodedRedirect(
      "error",
      "/protected/profile",
      "Profile update failed",
    );
  }

  encodedRedirect("success", "/protected/profile", "Profile updated");
};

export const deleteProfileAction = async (formData: FormData) => {
  const supabase = createClient();

  const { error } = await supabase
  .from('User')
  .delete()
  .eq('auth_id', '7f57080d-74cf-4528-922f-fb8f1e5ca818')

  if (error) {
    encodedRedirect(
      "error",
      "/protected/profile",
      "Profile delete failed",
    );
  }

  encodedRedirect("success", "/protected/profile", "Profile deleted");
};