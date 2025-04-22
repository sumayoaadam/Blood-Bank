import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey= import.meta.env.VITE_SUPABASE_ANON_KEY

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey);


const supabase = createClient(supabaseUrl,supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    },
    realtime:{
            params:{
                eventsPerSecond: 10
            }
    }
})


export default supabase;