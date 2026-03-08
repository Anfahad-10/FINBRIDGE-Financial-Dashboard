import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FooterCredit from '../Components/FooterCredit';

const Settings = () => {
    const { user } = useOutletContext();
    
    const [activeTab, setActiveTab] = useState('Categories');
    
    const [categoryType, setCategoryType] = useState('Expense');

    const expenseCategories =[
        { id: 1, name: 'Business Expenses', color: 'bg-red-500' },
        { id: 2, name: 'Office Rent', color: 'bg-blue-500' },
        { id: 3, name: 'Software Subscriptions', color: 'bg-purple-500' },
        { id: 4, name: 'Professional Development', color: 'bg-emerald-500' },
        { id: 5, name: 'Marketing', color: 'bg-orange-500' },
        { id: 6, name: 'Travel', color: 'bg-pink-500' },
        { id: 7, name: 'Meals & Entertainment', color: 'bg-indigo-500' },
        { id: 8, name: 'Utilities', color: 'bg-yellow-500' },
    ];

    const incomeCategories =[
        { id: 9, name: 'Freelance Work', color: 'bg-emerald-500' },
        { id: 10, name: 'Salary', color: 'bg-blue-500' },
        { id: 11, name: 'Investments', color: 'bg-purple-500' },
    ];

    const displayCategories = categoryType === 'Expense' ? expenseCategories : incomeCategories;

    return (
        <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10 h-screen overflow-y-auto z-10 relative flex flex-col">
            
            {/* Header */}
            <div className="mb-8">
                <h1 className="header-text text-3xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-1 text-sm">Manage your account settings and preferences</p>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
                
                {/* Left Sidebar Navigation */}
                <div className="md:col-span-3 space-y-2">
                    <button 
                        onClick={() => setActiveTab('Profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'Profile' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">person</span>
                        Profile
                    </button>
                    <button 
                        onClick={() => setActiveTab('Categories')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'Categories' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">sell</span>
                        Categories
                    </button>
                    <button 
                        onClick={() => setActiveTab('Notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'Notifications' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                        Notifications
                    </button>
                    <button 
                        onClick={() => setActiveTab('Security')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'Security' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">security</span>
                        Security
                    </button>
                </div>

                {/* Right Content Area */}
                <div className="md:col-span-9">
                    <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 min-h-[500px]">
                        
                        {activeTab === 'Categories' && (
                            <>
                                <h2 className="text-xl font-bold text-white mb-6">Category Management</h2>
                                
                                {/* Sub-tabs for Expense/Income */}
                                <div className="flex gap-6 border-b border-white/10 mb-6">
                                    <button 
                                        onClick={() => setCategoryType('Expense')}
                                        className={`pb-3 text-sm font-medium transition-all relative ${categoryType === 'Expense' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                    >
                                        Expense Categories
                                        {categoryType === 'Expense' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>}
                                    </button>
                                    <button 
                                        onClick={() => setCategoryType('Income')}
                                        className={`pb-3 text-sm font-medium transition-all relative ${categoryType === 'Income' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                    >
                                        Income Categories
                                        {categoryType === 'Income' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>}
                                    </button>
                                </div>

                                {/* Category List */}
                                <div className="space-y-2 mb-8">
                                    {displayCategories.map((cat) => (
                                        <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${cat.color} shadow-[0_0_8px_${cat.color.replace('bg-', '')}]`}></div>
                                                <span className="text-slate-300 text-sm font-medium">{cat.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-slate-500 hover:text-blue-400 transition-colors rounded-md hover:bg-blue-500/10">
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10">
                                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Button */}
                                <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add New Category
                                </button>
                            </>
                        )}

                        {activeTab !== 'Categories' && (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-50 pt-20">
                                <span className="material-symbols-outlined text-6xl text-slate-500 mb-4">{activeTab === 'Profile' ? 'person' : activeTab === 'Notifications' ? 'notifications' : 'security'}</span>
                                <h3 className="text-xl font-bold text-white mb-2">{activeTab} Settings</h3>
                                <p className="text-sm text-slate-400">This section is currently under construction.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 mt-auto pt-6 flex-shrink-0">
                <FooterCredit />
            </div>

        </main>
    );
};

export default Settings;