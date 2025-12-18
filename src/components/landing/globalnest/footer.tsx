"use client";

import React from "react";
import Link from "next/link";
import { Globe, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gn-black text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gn-blue rounded-lg flex items-center justify-center">
                                <Globe className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl">GlobalNest</span>
                        </Link>
                        <p className="text-gray-500 text-sm mb-6">
                            The operating system for the global real estate investor.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Twitter className="w-4 h-4 text-gray-400" />
                            </Link>
                            <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Linkedin className="w-4 h-4 text-gray-400" />
                            </Link>
                            <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Github className="w-4 h-4 text-gray-400" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white transition-colors">Marketplace</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">AI Analysis</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Deal Room</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} GlobalNest Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
