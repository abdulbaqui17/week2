'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.data.token);
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Sign in failed');
      }
    } catch (_err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(140%_120%_at_10%_0%,#3e0d3d_0%,#090016_55%,#05000f_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,#ff6b2c55,transparent_70%)] blur-[120px]" />
        <div className="absolute right-[-20%] top-[-10%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,#7c3aed55,transparent_70%)] blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_50%,rgba(255,255,255,0.04),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-6 py-16 sm:px-10">
        <div className="mb-12 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur">
          FlowForge Cloud
        </div>

        <div className="w-full max-w-lg rounded-[28px] border border-white/15 bg-gradient-to-br from-white/20 via-white/5 to-transparent p-[2px] shadow-[0_45px_120px_-60px_rgba(124,58,237,0.75)]">
          <div className="rounded-[26px] bg-[#0b041c]/80 p-10 backdrop-blur-2xl">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Sign in to FlowForge
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Access your automation workspace
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/70">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-[0_18px_45px_-25px_rgba(124,58,237,0.45)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6b2c]/70"
                    placeholder="you@flowforge.dev"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-white/70">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-[0_18px_45px_-25px_rgba(124,58,237,0.45)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/70"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[linear-gradient(120deg,#4C1D95_0%,#3B82F6_55%,#06B6D4_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_25px_70px_-35px_rgba(59,130,246,0.9)] transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#0b041c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              <p className="text-center text-sm text-white/60">
                Don&apos;t have an account?{' '}
                <a href="/signup" className="font-medium text-[#67e3ff] transition-colors hover:text-white">
                  Create one
                </a>
              </p>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-white/40">
          Need workspace admin access?{' '}
          <a href="/signup" className="text-white/70 underline-offset-4 hover:underline">
            Request an invite
          </a>
        </div>
      </div>
    </div>
  );
}
