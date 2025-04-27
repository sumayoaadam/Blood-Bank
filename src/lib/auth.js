import supabase from "./supabase";

// Sign Up
export async function signUp(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (error) {
    console.error("Auth signup error:", error.message);
    throw error;
  }

  console.log("Auth signup successful:", data);

  if (data?.user) {
    const displayName = username || email.split("@")[0];

    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .insert({
        id: data.user.id,
        username: displayName,
        avatar_url: null
      })
      .select()
      .single();

    if (profileError) {
      console.error("Profile creation error:", profileError.message);
    } else {
      console.log("Profile created successfully", profileData);
    }
  }

  return data;
}

// Sign In
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Sign-in error:", error.message);
    throw error;
  }

  console.log("User info", data);

  if (data?.user) {
    try {
      const profile = await getUserProfile(data.user.id, data.user.email);
      console.log("Profile info", profile);
    } catch (profileError) {
      console.error("Error with profile during sign-in:", profileError.message);
    }
  }

  return data;
}

// Get user profile, create if not exists
export async function getUserProfile(userId, fallbackEmail = "") {
  console.log("user email:", fallbackEmail);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code === "PGRST116") {
    console.log("No profile found, creating one for user:", userId);

    const email = fallbackEmail || `user_${Date.now()}@example.com`;
    const defaultUsername = email.split("@")[0];

    const { data: newProfile, error: profileError } = await supabase
      .from("users")
      .insert({
        id: userId,
        username: defaultUsername,
        avatar_url: null
      })
      .select()
      .single();

    if (profileError) {
      console.error("Profile creation error:", profileError.message);
      throw profileError;
    }

    return newProfile;
  }

  if (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }

  return data;
}



// Listen to auth state changes
export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null, event);
  });

  return () => data.subscription.unsubscribe();
}


export const logout = async () => {
  return await supabase.auth.signOut();
};