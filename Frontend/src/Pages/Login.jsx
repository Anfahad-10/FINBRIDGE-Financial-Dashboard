import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();

      if (response.ok) {
        // PHASE 10: Store token and user data
        localStorage.setItem('token', result.token);
        localStorage.setItem('loggedInUser', result.user.name);

        alert("Login Success!");
        navigate('/dashboard');
      } else {
        alert(result.message || "Login Failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong. Check the console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0F111A]">
      <div className="bg-grain"></div>
      <div className="glow-orb"></div>
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="glass-card rounded-[20px] p-8 sm:p-10 w-full">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500/20 to-transparent border border-blue-400/10 flex items-center justify-center shadow-lg backdrop-blur-sm">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
            <h1 className="header-text text-[28px] font-bold text-white mb-2">Sign in to FINBRIDGE</h1>
            <p className="text-slate-400 text-[15px] font-normal leading-relaxed">Manage your freelance finances efficiently.</p>
          </div>


          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-slate-400 ml-1 block" htmlFor="email">Email address</label>
              <input
                className="w-full px-4 py-3 custom-input rounded-lg text-[15px] placeholder-slate-600 focus:ring-0"
                id="email"
                name="email"
                value={loginInfo.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[13px] font-medium text-slate-400" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="text-[13px] text-blue-400 hover:text-blue-300 transition-colors font-medium">Forgot password?</Link>
              </div>
              <input
                className="w-full px-4 py-3 custom-input rounded-lg text-[15px] placeholder-slate-600 focus:ring-0"
                id="password"
                name="password"
                value={loginInfo.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                type="password"
              />
            </div>

            <button className="w-full bg-white hover:bg-gray-50 text-slate-900 font-bold py-3.5 rounded-lg mt-6 text-[15px] shadow-lg shadow-white/10 transition-all duration-200" type="submit">
              Log In
            </button>
          </form>



          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full separator-line"></div>
            </div>
            <div className="relative flex justify-center text-[12px] font-medium">
              <span className="bg-[#131620] px-3 text-slate-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 bg-white/[0.02] hover:bg-white/[0.05] text-slate-200 border border-white/5 hover:border-white/10 rounded-lg py-2.5 transition-all duration-200 text-[14px] font-medium group" type="button">
              <img alt="Google logo" className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0_QJ7Gv1XR23-8CUJm0dey6K9LBWWUix3M_zqYeSHo0wgEpU_-xeG1dTgN15yjjD5fz-1x6Up-nVHJtcMdKYbUKnFkWTFwuB_TORy5il4hxjJt8aDoTV4fzh3k5KE4MvvYvC1cK9qf8JbiwHcUIdNnfDkY3WKJIeu-MgkUUdF3HDuuy5ZVfgDqkhAJ8YTNR8rmTON-BtnS0CF76_7iWO10AIZp4Av-SBe4l_3iNTjO8NKgPDt3Ze7_nr5IRxiYr0vviyKUsQOg4" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2.5 bg-white/[0.02] hover:bg-white/[0.05] text-slate-200 border border-white/5 hover:border-white/10 rounded-lg py-2.5 transition-all duration-200 text-[14px] font-medium group" type="button">
              <i className="fab fa-github text-[16px] text-slate-400 group-hover:text-white transition-colors"></i>
              <span>GitHub</span>
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-[14px]">
              Don't have an account?
              <Link to="/signup" className="text-blue-400 font-medium hover:text-blue-300 transition-colors ml-1">Sign up</Link>
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-[12px] font-medium text-slate-600">
          <a className="hover:text-slate-400 transition-colors" href="#">Privacy</a>
          <a className="hover:text-slate-400 transition-colors" href="#">Terms</a>
          <a className="hover:text-slate-400 transition-colors" href="#">Contact</a>
        </div>
      </div>
    </div>
  );
}

export default Login;