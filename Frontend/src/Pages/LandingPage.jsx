import React from 'react';
import { Link } from 'react-router-dom';
import FooterCredit from '../Components/FooterCredit';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#0F111A] text-slate-200 font-sans">
      {/* Background Effects */}
      <div className="bg-grain"></div>
      <div className="glow-orb top-[-20%] left-[-10%] opacity-60"></div>
      <div className="glow-orb-secondary bottom-[-20%] right-[-10%] opacity-50"></div>

      {/* Navbar */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500/80 to-purple-500/20 border border-blue-400/20 flex items-center justify-center backdrop-blur-sm">
            <span className="material-symbols-outlined text-white text-[20px]">account_balance_wallet</span>
          </div>
          <span className="header-text text-xl font-bold text-white tracking-tight">FINBRIDGE Finance</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a class="hover:text-white transition-colors" href="#features">Features</a>
          <a class="hover:text-white transition-colors" href="#">Pricing</a>
          <a class="hover:text-white transition-colors" href="#">Testimonials</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
            Log in
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/5 text-white text-sm font-medium transition-all backdrop-blur-md">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            v1.0 Now Available
          </div>
          <h1 className="header-text text-5xl lg:text-7xl font-bold text-white leading-[1.1]">
            Tax tracking for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">modern freelancer</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
            Stop worrying about surprise tax bills. FINBRIDGE helps you track income, categorize expenses, and estimate quarterly taxes automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/signup">
              <button className="shimmer-btn px-8 py-4 rounded-xl text-slate-900 font-bold text-base shadow-[0_0_20px_rgba(255,255,255,0.15)] w-full sm:w-auto">
                Start for Free
              </button>
            </Link>
            <button className="px-8 py-4 rounded-xl glass-panel text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">play_circle</span>
              Watch Demo
            </button>
          </div>
          <div className="pt-8 flex items-center gap-4 text-sm text-slate-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0F111A]"></div>
              <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-[#0F111A]"></div>
              <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-[#0F111A]"></div>
            </div>
            <p>Trusted by 10,000+ freelancers</p>
          </div>
        </div>

        {/* Hero Visual/Dashboard Mockup */}
        <div className="relative lg:h-[600px] flex items-center justify-center perspective-1000">
          <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-40"></div>
          <div className="relative w-full max-w-lg glass-panel rounded-2xl p-6 transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out shadow-2xl border border-white/10">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="h-2 w-20 bg-white/10 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="dash-card rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-slate-400">Est. Taxes</span>
                  <span className="material-symbols-outlined text-purple-400 text-sm">payments</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">$4,250</div>
                <div className="text-xs text-green-400">+12% vs last Q</div>
              </div>
              <div className="dash-card rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-slate-400">Net Income</span>
                  <span className="material-symbols-outlined text-blue-400 text-sm">trending_up</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">$12,890</div>
                <div className="text-xs text-slate-500">Current Month</div>
              </div>
            </div>
            <div className="dash-card rounded-xl p-4 h-48 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium text-slate-300">Expense Breakdown</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">Weekly</span>
              </div>
              <div className="flex items-end justify-between gap-2 h-32 px-2">
                <div className="w-full bg-blue-500/20 rounded-t-sm h-[40%] relative group cursor-pointer hover:bg-blue-500/40 transition-colors"></div>
                <div className="w-full bg-blue-500/20 rounded-t-sm h-[70%] relative group cursor-pointer hover:bg-blue-500/40 transition-colors"></div>
                <div className="w-full bg-purple-500/20 rounded-t-sm h-[50%] relative group cursor-pointer hover:bg-purple-500/40 transition-colors"></div>
                <div className="w-full bg-blue-500/20 rounded-t-sm h-[85%] relative group cursor-pointer hover:bg-blue-500/40 transition-colors"></div>
                <div className="w-full bg-blue-500/20 rounded-t-sm h-[60%] relative group cursor-pointer hover:bg-blue-500/40 transition-colors"></div>
                <div className="w-full bg-purple-500/20 rounded-t-sm h-[90%] relative group cursor-pointer hover:bg-purple-500/40 transition-colors"></div>
              </div>
            </div>
            <div className="absolute -right-12 top-20 glass-panel p-3 rounded-lg flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <div>
                <div className="text-xs text-slate-400">Tax Saved</div>
                <div className="text-sm font-bold text-white">$1,240</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="relative z-10 border-y border-white/5 bg-[#0F111A]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-center text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">Powering finances for top independent talent</p>
          <div className="flex flex-wrap justify-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-white font-display font-bold text-xl hover:text-blue-400 transition-colors cursor-default"><i className="fab fa-stripe text-2xl"></i> Stripe</div>
            <div className="flex items-center gap-2 text-white font-display font-bold text-xl hover:text-green-400 transition-colors cursor-default"><i className="fab fa-spotify text-2xl"></i> Spotify</div>
            <div className="flex items-center gap-2 text-white font-display font-bold text-xl hover:text-red-400 transition-colors cursor-default"><i className="fab fa-airbnb text-2xl"></i> Airbnb</div>
            <div className="flex items-center gap-2 text-white font-display font-bold text-xl hover:text-white transition-colors cursor-default"><i className="fab fa-github text-2xl"></i> GitHub</div>
            <div className="flex items-center gap-2 text-white font-display font-bold text-xl hover:text-blue-500 transition-colors cursor-default"><i className="fab fa-linkedin text-2xl"></i> LinkedIn</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="header-text text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to <br />stay tax compliant</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Powerful tools designed specifically for the unique needs of freelancers, contractors, and solopreneurs.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-panel p-8 rounded-2xl glass-card-hover group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <span className="material-symbols-outlined text-blue-400 text-2xl">account_balance</span>
            </div>
            <h3 className="header-text text-xl font-bold text-white mb-3">Income & Expense Management</h3>
            <p className="text-slate-400 leading-relaxed text-sm">Connect your bank accounts securely. Automatically track every dollar coming in and going out, ensuring nothing slips through the cracks.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl glass-card-hover group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <span className="material-symbols-outlined text-purple-400 text-2xl">category</span>
            </div>
            <h3 className="header-text text-xl font-bold text-white mb-3">Smart Categorization & Budgeting</h3>
            <p className="text-slate-400 leading-relaxed text-sm">Our AI learns your spending habits to categorize transactions instantly. Set smart budgets for software, equipment, and travel.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl glass-card-hover group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
              <span className="material-symbols-outlined text-emerald-400 text-2xl">public</span>
            </div>
            <h3 className="header-text text-xl font-bold text-white mb-3">Regional Tax Estimation Engine</h3>
            <p className="text-slate-400 leading-relaxed text-sm">Real-time tax estimates based on your location. Supports federal, state, and local tax rules updated for the current fiscal year.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl glass-card-hover group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <span className="material-symbols-outlined text-orange-400 text-2xl">description</span>
            </div>
            <h3 className="header-text text-xl font-bold text-white mb-3">Reporting & PDF/CSV Export</h3>
            <p className="text-slate-400 leading-relaxed text-sm">Generate profit & loss statements with one click. Export clean, accountant-ready CSV or PDF reports for tax season.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="glass-panel p-12 rounded-3xl border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px]"></div>
          <h2 className="header-text text-3xl md:text-4xl font-bold text-white mb-6">Ready to take control?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join thousands of freelancers who have simplified their tax season. Start your 14-day free trial today.</p>
          <Link to="/signup">
            <button className="shimmer-btn px-10 py-4 rounded-xl text-slate-900 font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] inline-flex items-center gap-2">
              Get Started Now
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-10">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-500/80 to-purple-500/20 border border-blue-400/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[14px]">account_balance_wallet</span>
            </div>
            <span className="header-text text-lg font-bold text-slate-300">FINBRIDGE Finance</span>
          </div>


          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a className="hover:text-slate-300 transition-colors" href="#">Features</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Pricing</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-slate-300 transition-colors" href="#">Terms of Service</a>
          </div>

          <div className="text-slate-600 text-sm">
            © 2026 FINBRIDGE Inc.
          </div>
        </div>

        <div className="border-t border-white/5">
          <FooterCredit />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;