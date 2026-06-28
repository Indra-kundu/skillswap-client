import DashBoardSidebar from '@/components/dashboard/DashBoardSidebar';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-50"> {/* হালকা গ্রে ব্যাকগ্রাউন্ড প্রফেশনাল লাগে */}
            {/* Sidebar - এটি সবসময় ফিক্সড থাকবে */}
            <DashBoardSidebar />

            {/* মেইন এরিয়া */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* প্রফেশনাল হেডার */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-sm text-gray-500">Manage your projects and earnings here.</p>
                    </div>

                    <Link
                        href="/"
                        className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-medium text-sm flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        Back to Home
                    </Link>
                </header>

                {/* মেইন কন্টেন্ট */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}