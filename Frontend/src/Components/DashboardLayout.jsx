import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Helps us know which page we are on to highlight the menu
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // 1. Check if user is logged in (Moved here so ALL dashboard pages are protected)
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    setUser(result.data);
                } else {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // 2. Show loading screen while checking user
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F111A] flex items-center justify-center text-white">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    // Helper to check if a menu link is the active one
    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0F111A] flex font-sans">
            {/* Background Effects */}
            <div className="bg-grain"></div>
            <div className="glow-orb top-[-20%] left-[-10%] opacity-40"></div>
            <div className="glow-orb-secondary bottom-[-20%] right-[-10%] opacity-30"></div>

            {/* --- SIDEBAR (Desktop) --- */}
            <aside className="w-64 h-screen glass-sidebar fixed left-0 top-0 z-50 flex-col justify-between hidden md:flex">
                <div>
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500/80 to-purple-500/20 border border-blue-400/20 flex items-center justify-center backdrop-blur-sm">
                            <span className="material-symbols-outlined text-white text-[20px]">account_balance_wallet</span>
                        </div>
                        <span className="header-text text-xl font-bold text-white tracking-tight">TaxPal</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="mt-8 px-4 space-y-2">
                        <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${isActive('/dashboard') ? 'bg-blue-500/10 border border-blue-500/20 text-white' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                            <span className={`material-symbols-outlined transition-colors ${isActive('/dashboard') ? 'text-blue-400' : 'group-hover:text-blue-400'}`}>dashboard</span>
                            Dashboard
                        </Link>

                        <Link to="/transactions" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${isActive('/transactions') ? 'bg-blue-500/10 border border-blue-500/20 text-white' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                            <span className={`material-symbols-outlined transition-colors ${isActive('/transactions') ? 'text-blue-400' : 'group-hover:text-purple-400'}`}>receipt_long</span>
                            Transactions
                        </Link>

                        <Link to="/budgets" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${isActive('/budgets') ? 'bg-blue-500/10 border border-blue-500/20 text-white' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                            <span className={`material-symbols-outlined transition-colors ${isActive('/budgets') ? 'text-emerald-400' : 'group-hover:text-emerald-400'}`}>pie_chart</span>
                            Budgets
                        </Link>

                        <Link to="/tax-estimator" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${isActive('/tax-estimator') ? 'bg-blue-500/10 border border-blue-500/20 text-white' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                            <span className={`material-symbols-outlined transition-colors ${isActive('/tax-estimator') ? 'text-orange-400' : 'group-hover:text-orange-400'}`}>calculate</span>
                            Tax Estimator
                        </Link>

                        <Link to="/reports" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${isActive('/reports') ? 'bg-blue-500/10 border border-blue-500/20 text-white' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
                            <span className={`material-symbols-outlined transition-colors ${isActive('/reports') ? 'text-pink-400' : 'group-hover:text-pink-400'}`}>bar_chart</span>
                            Reports
                        </Link>
                    </nav>
                </div>

                {/* User Profile in Sidebar */}
                <div className="p-4 mt-auto">
                    <Link 
                        to="/settings" 
                        className="glass-panel p-4 rounded-xl flex items-center gap-3 hover:bg-white/10 cursor-pointer transition-colors border-white/5 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm overflow-hidden border border-white/10 group-hover:border-blue-400 transition-colors">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{user.name}</h4>
                            <p className="text-xs text-slate-400 truncate">Freelancer Pro</p>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.preventDefault(); // Prevents the Link from clicking when you just want to logout
                                handleLogout();
                            }} 
                            title="Logout"
                            className="p-1.5 rounded-lg hover:bg-red-500/20 group/logout transition-colors"
                        >
                            <span className="material-symbols-outlined text-slate-500 group-hover/logout:text-red-400 text-lg transition-colors">logout</span>
                        </button>
                    </Link>
                </div>
            </aside>

            {/* --- MOBILE TOP BAR --- */}
            <div className="md:hidden fixed top-0 w-full z-50 glass-sidebar px-4 py-3 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500/80 to-purple-500/20 border border-blue-400/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[20px]">account_balance_wallet</span>
                    </div>
                    <span className="header-text text-lg font-bold text-white">TaxPal</span>
                </div>
                <button className="text-slate-300" onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                </button>
            </div>


            <Outlet context={{ user }} />

        </div>
    );
};

export default DashboardLayout;