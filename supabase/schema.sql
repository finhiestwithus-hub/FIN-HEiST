-- ==============================================================================
-- FIN-HEIST SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================
-- Instructions: Run this entire script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query -> Run)
-- It will set up the profiles table, enquiries table, Row Level Security (RLS) policies, and auto-profile triggers.
-- ==============================================================================

-- 1. Enable UUID Extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. CREATE PROFILES TABLE (Stores user vs admin roles)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies:
-- Allow users to view their own profile OR allow admins to view all profiles
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Allow public insertion during signup trigger
CREATE POLICY "Enable insert for authenticated users during registration" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);


-- ==============================================================================
-- 3. CREATE ENQUIRIES TABLE (Stores all client submissions across all categories)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    client_category TEXT DEFAULT 'Business Owner',
    service_category TEXT NOT NULL,
    preferred_time TEXT DEFAULT 'Immediate (Within 2 Hours)',
    message_notes TEXT,
    form_source TEXT DEFAULT 'Header Booking Modal',
    status TEXT NOT NULL DEFAULT 'New Inquiry' CHECK (status IN ('New Inquiry', 'Assigned to CA', 'In Review', 'Resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security on enquiries
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Enquiries RLS Policies:
-- 1. Normal Users can only view their own submitted enquiries
CREATE POLICY "Users can view own submitted enquiries" 
ON public.enquiries FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Normal Users can insert inquiries linked to their user_id
CREATE POLICY "Authenticated users can submit new enquiries" 
ON public.enquiries FOR INSERT 
WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated');

-- 3. CA Admins can VIEW ALL client enquiries across all categories
CREATE POLICY "Admins can view all enquiries" 
ON public.enquiries FOR SELECT 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 4. CA Admins can UPDATE status or assign inquiries
CREATE POLICY "Admins can update enquiries status" 
ON public.enquiries FOR UPDATE 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 5. CA Admins can DELETE inquiries if needed
CREATE POLICY "Admins can delete enquiries" 
ON public.enquiries FOR DELETE 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');


-- ==============================================================================
-- 4. AUTOMATIC USER PROFILE CREATION TRIGGER (On Sign Up)
-- ==============================================================================
-- Automatically insert a row into public.profiles whenever a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, phone, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Client Profile'),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==============================================================================
-- 5. SEED INITIAL CA ADMIN ACCOUNT (Optional Quick-Start Helper)
-- ==============================================================================
-- Note: After creating an account with email 'admin@fin-heist.com' via the Signup UI,
-- you can run this SQL query to promote that account to 'admin' role instantly:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@fin-heist.com';
