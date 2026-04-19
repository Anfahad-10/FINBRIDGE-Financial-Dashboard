import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();

      if (response.ok) {
        alert("Signup Successful!");
        navigate('/login');
      } else {
        alert(result.message || "Signup Failed");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Something went wrong. Check the console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0B1120]">
      <div className="bg-grain"></div>
      <div className="glow-orb"></div>

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="glass-card rounded-[20px] p-8 sm:p-10 w-full">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 border border-blue-400/20 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
            <h1 className="font-display text-[26px] font-bold text-white mb-2">Create your FINBRIDGE account</h1>
            <p className="text-slate-400 text-[14px] font-normal">Start managing your freelance finances today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-400 ml-0.5" htmlFor="fullname">Full Name</label>
              <input
                className="w-full px-4 py-3 custom-input rounded-lg text-[14px] placeholder-slate-600 focus:ring-0"
                id="fullname"
                name="name"
                value={signupInfo.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                type="text" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-400 ml-0.5" htmlFor="email">Email address</label>
              <input
                className="w-full px-4 py-3 custom-input rounded-lg text-[14px] placeholder-slate-600 focus:ring-0"
                id="email"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                placeholder="name@company.com"
                required
                type="email" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-400 ml-0.5" htmlFor="password">Password</label>
              <input
                className="w-full px-4 py-3 custom-input rounded-lg text-[14px] placeholder-slate-600 focus:ring-0"
                id="password"
                name="password"
                value={signupInfo.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
                type="password" />
            </div>
            <div className="pt-2">
              <button className="w-full shimmer-btn font-bold py-3.5 rounded-lg text-[14px] text-slate-900 shadow-lg tracking-tight hover:shadow-xl" type="submit">
                Sign up
              </button>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full separator-line"></div>
            </div>
            <div className="relative flex justify-center text-[12px]">
              <span className="bg-[#131926] px-3 text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 bg-slate-800/40 hover:bg-slate-700/50 text-slate-200 border border-slate-700/50 hover:border-slate-600/50 rounded-lg py-2.5 transition-all duration-200 text-[13px] font-medium group" type="button">
              <img alt="Google logo" className="w-4 h-4 opacity-90 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0_QJ7Gv1XR23-8CUJm0dey6K9LBWWUix3M_zqYeSHo0wgEpU_-xeG1dTgN15yjjD5fz-1x6Up-nVHJtcMdKYbUKnFkWTFwuB_TORy5il4hxjJt8aDoTV4fzh3k5KE4MvvYvC1cK9qf8JbiwHcUIdNnfDkY3WKJIeu-MgkUUdF3HDuuy5ZVfgDqkhAJ8YTNR8rmTON-BtnS0CF76_7iWO10AIZp4Av-SBe4l_3iNTjO8NKgPDt3Ze7_nr5IRxiYr0vviyKUsQOg4" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2.5 bg-slate-800/40 hover:bg-slate-700/50 text-slate-200 border border-slate-700/50 hover:border-slate-600/50 rounded-lg py-2.5 transition-all duration-200 text-[13px] font-medium group" type="button">
              <i className="fab fa-github text-base text-slate-400 group-hover:text-white transition-colors"></i>
              <span>GitHub</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-[13px]">
              Already have an account?
              <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors ml-1">Sign in</Link>
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-[12px] font-medium text-slate-600">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;