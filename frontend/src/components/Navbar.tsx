"use client";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      <div>
        <h2 className="font-bold text-xl">
          IAM CyberSec
        </h2>

        <p className="text-sm text-slate-500">
          Access Management Platform
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}