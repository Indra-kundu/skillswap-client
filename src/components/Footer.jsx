"use client"

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { usePathname } from "next/navigation";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const pathname = usePathname()
    if (pathname.includes('dashboard')) {
        return null;
    }

    return (
        <footer className="mt-16 border-t border-white/10 bg-[#1e1b2e] text-slate-200">
            <div className="container mx-auto px-4">
                <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand Section */}
                    <div>
                        <Link href="/" className="inline-block">
                            <div className="text-3xl font-extrabold tracking-tighter text-white">
                                Skill<span className="text-pink-500">Swap</span>
                            </div>
                        </Link>
                        <p className="mt-4 text-sm text-slate-300">
                            Empowering freelancers and clients to connect seamlessly.
                            Find the perfect talent or the best project here.
                        </p>
                        {/* Social Links */}
                        <div className="mt-5 flex items-center gap-3">
                            {[
                                { Icon: FaFacebook, href: "#" },
                                { Icon: BsInstagram, href: "#" },
                                { Icon: FaXTwitter, href: "#" },
                                { Icon: LiaLinkedin, href: "#" },
                            ].map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    className="rounded-full border border-white/10 p-2 transition hover:bg-gradient-to-r from-pink-500 to-violet-600 hover:text-white"
                                >
                                    <social.Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Platform Section */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Platform</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            {['Browse Tasks', 'Browse Freelancers', 'Post a Task', 'How it Works'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-pink-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            {['Contact Us', 'FAQ', 'Privacy Policy', 'Terms'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-pink-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
                        <div className="space-y-4 text-sm text-slate-300">
                            <div className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-pink-500" /> <span>Dhaka, Bangladesh</span></div>
                            <div className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-pink-500" /> <span>+880 1234-567890</span></div>
                            <div className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-pink-500" /> <span>support@skillswap.com</span></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Section */}
                <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-center text-sm text-slate-400 md:flex-row">
                    <p>© {currentYear} SkillSwap. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="hover:text-pink-400">Privacy</Link>
                        <Link href="/terms" className="hover:text-pink-400">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}