


//Next.js Server Components allow you to read a cookie but not write back to it.

//Middleware on the other hand allow you to both read and write to cookies.

//Middleware to refresh the user's session before loading Server Component routes.





import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from './types_db'


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  return res
}