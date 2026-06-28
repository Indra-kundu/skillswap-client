import { NextResponse } from "next/server";
import { auth } from "./lib/auth"; // আপনার অথেনটিকেশন পাথ অনুযায়ী
import { headers } from "next/headers";

export default async function middleware(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const { pathname } = request.nextUrl;

    // ১. ইউজার লগইন না থাকলে সাইন-ইন পেজে পাঠান
    if (!session) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    const role = session.user.role;

    // ২. অ্যাডমিন ড্যাশবোর্ড প্রোটেকশন
    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url)); // unauthorised হলে হোমে ফেরত
    }

    // ৩. ক্লায়েন্ট ড্যাশবোর্ড প্রোটেকশন
    if (pathname.startsWith('/dashboard/client') && role !== 'client') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // ৪. ফ্রিল্যান্সার ড্যাশবোর্ড প্রোটেকশন
    if (pathname.startsWith('/dashboard/freelancer') && role !== 'freelancer') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// ৫. matcher আপডেট করুন যেন সব ড্যাশবোর্ড পাথ প্রোটেক্টেড থাকে
export const config = {
    matcher: [
        '/profile',
        '/dashboard/admin/:path*',
        '/dashboard/client/:path*',
        '/dashboard/freelancer/:path*',
        '/payment/success'
    ]
}

