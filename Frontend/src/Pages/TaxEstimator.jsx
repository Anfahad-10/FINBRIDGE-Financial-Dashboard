import React, { useState } from 'react';
import FooterCredit from '../Components/FooterCredit';

const TaxEstimator = () => {
    const [formData, setFormData] = useState({
        employmentType: 'Business', // 'Business' or 'Salaried'
        grossIncome: '',
        businessExpenses: '',
        medicalInsurance: '',
        lifeInsurance: '',
        otherDeductions: '',
        tdsDeducted: '' // Only used if Salaried
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const gross = parseFloat(formData.grossIncome) || 0;
    const deductions = 
        (parseFloat(formData.businessExpenses) || 0) +
        (parseFloat(formData.medicalInsurance) || 0) +
        (parseFloat(formData.lifeInsurance) || 0) +
        (parseFloat(formData.otherDeductions) || 0);

    let taxableIncome = Math.max(0, gross - deductions);

    let totalTax = 0;
    let remainingIncome = taxableIncome;

    if (remainingIncome > 2000000) {
        totalTax += (remainingIncome - 2000000) * 0.20;
        remainingIncome = 2000000;
    }
    if (remainingIncome > 1000000) {
        totalTax += (remainingIncome - 1000000) * 0.15;
        remainingIncome = 1000000;
    }
    if (remainingIncome > 500000) {
        totalTax += (remainingIncome - 500000) * 0.10;
        remainingIncome = 500000;
    }
    if (remainingIncome > 250000) {
        totalTax += (remainingIncome - 250000) * 0.05;
    }

    const tds = formData.employmentType === 'Salaried' ? (parseFloat(formData.tdsDeducted) || 0) : 0;
    const finalTaxPayable = Math.max(0, totalTax - tds);

    const q1 = finalTaxPayable * 0.15;
    const q2 = finalTaxPayable * 0.45;
    const q3 = finalTaxPayable * 0.75;
    const q4 = finalTaxPayable * 1;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10 h-screen overflow-y-auto z-10 relative block pb-20">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="header-text text-3xl font-bold text-white">Direct Tax Estimator</h1>
                    <p className="text-slate-400 mt-1 text-sm">Calculate your advance tax based on standard slab rates.</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Calculator */}
                <div className="lg:col-span-8 space-y-8">
                    
                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden flex-shrink-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-400">person</span>
                                Taxpayer Profile
                            </h3>
                        </div>
                        
                        <form className="space-y-6">
                            {/* Employment Type Toggle */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Employment Type</label>
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, employmentType: 'Business', tdsDeducted: ''})}
                                        className={`py-3 rounded-lg text-sm font-bold border transition-all ${formData.employmentType === 'Business' ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                                    >
                                        Business / Freelance
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, employmentType: 'Salaried'})}
                                        className={`py-3 rounded-lg text-sm font-bold border transition-all ${formData.employmentType === 'Salaried' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                                    >
                                        Salaried
                                    </button>
                                </div>
                            </div>
                            
                            <hr className="border-white/5 my-4" />
                            
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-white">Income &amp; Deductions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">Gross Income</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                            <input type="number" min="0" name="grossIncome" value={formData.grossIncome} onChange={handleInputChange} className="w-full rounded-lg input-glass py-3 pl-8 pr-4 text-sm placeholder-slate-600" placeholder="e.g. 800000" />
                                        </div>
                                    </div>

                                    {/* Show TDS Input ONLY if Salaried */}
                                    {formData.employmentType === 'Salaried' && (
                                        <div className="space-y-2">
                                            <label className="text-xs text-emerald-400">TDS Already Deducted (by Company)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500">₹</span>
                                                <input type="number" min="0" name="tdsDeducted" value={formData.tdsDeducted} onChange={handleInputChange} className="w-full rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-3 pl-8 pr-4 text-sm placeholder-emerald-800/50" placeholder="e.g. 15000" />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">Business Expenses</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                            <input type="number" min="0" name="businessExpenses" value={formData.businessExpenses} onChange={handleInputChange} className="w-full rounded-lg input-glass py-3 pl-8 pr-4 text-sm placeholder-slate-600" placeholder="0" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">Medical Insurance</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                            <input type="number" min="0" name="medicalInsurance" value={formData.medicalInsurance} onChange={handleInputChange} className="w-full rounded-lg input-glass py-3 pl-8 pr-4 text-sm placeholder-slate-600" placeholder="0" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">Life Insurance / PPF</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                            <input type="number" min="0" name="lifeInsurance" value={formData.lifeInsurance} onChange={handleInputChange} className="w-full rounded-lg input-glass py-3 pl-8 pr-4 text-sm placeholder-slate-600" placeholder="0" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">Other Deductions</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                            <input type="number" min="0" name="otherDeductions" value={formData.otherDeductions} onChange={handleInputChange} className="w-full rounded-lg input-glass py-3 pl-8 pr-4 text-sm placeholder-slate-600" placeholder="0" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Tax Calendar Based on Slabs */}
                    <div className="glass-panel rounded-2xl overflow-hidden mb-6 flex-shrink-0">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#131620]/50">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-purple-400">event_upcoming</span>
                                Advance Tax Schedule
                            </h3>
                            <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs border border-purple-500/20 font-bold">Financial Year 2025-26</span>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Q1 */}
                                <div className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                                    <div className="text-xs text-slate-400 mb-1">Quarter 1 (15%)</div>
                                    <div className="text-sm font-bold text-white mb-3">15th June</div>
                                    <div className="text-xl font-bold text-blue-400">{formatCurrency(q1)}</div>
                                </div>

                                {/* Q2 */}
                                <div className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                                    <div className="text-xs text-slate-400 mb-1">Quarter 2 (45%)</div>
                                    <div className="text-sm font-bold text-white mb-3">15th Sept</div>
                                    <div className="text-xl font-bold text-blue-400">{formatCurrency(q2)}</div>
                                </div>

                                {/* Q3 */}
                                <div className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                                    <div className="text-xs text-slate-400 mb-1">Quarter 3 (75%)</div>
                                    <div className="text-sm font-bold text-white mb-3">15th Dec</div>
                                    <div className="text-xl font-bold text-blue-400">{formatCurrency(q3)}</div>
                                </div>

                                {/* Q4 */}
                                <div className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                                    <div className="text-xs text-slate-400 mb-1">Quarter 4 (100%)</div>
                                    <div className="text-sm font-bold text-white mb-3">15th March</div>
                                    <div className="text-xl font-bold text-blue-400">{formatCurrency(q4)}</div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 text-center">
                                *Percentages indicate cumulative tax due. Amounts shown are the installments due for that specific quarter.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Right Column: Dynamic Tax Summary */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-panel p-8 rounded-2xl sticky top-24 border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.05)]">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-lg font-bold text-white">Tax Summary</h3>
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-lg shadow-orange-500/10">
                                <span className="material-symbols-outlined text-orange-400">receipt_long</span>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Gross Income</span>
                                <span className="text-white font-medium">{formatCurrency(gross)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Total Deductions</span>
                                <span className="text-red-400 font-medium">-{formatCurrency(deductions)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Taxable Income</span>
                                <span className="text-white font-bold">{formatCurrency(taxableIncome)}</span>
                            </div>
                            
                            <div className="h-px bg-white/10 my-4"></div>

                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Total Tax (By Slabs)</span>
                                <span className="text-white font-medium">{formatCurrency(totalTax)}</span>
                            </div>

                            {formData.employmentType === 'Salaried' && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-emerald-400">TDS Deducted</span>
                                    <span className="text-emerald-400 font-medium">-{formatCurrency(tds)}</span>
                                </div>
                            )}
                            
                            <div className="bg-[#131620] p-4 rounded-xl border border-white/5 mt-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-slate-300 font-bold">Remaining Tax</span>
                                    <span className="text-2xl text-orange-400 font-bold header-text">{formatCurrency(finalTaxPayable)}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 text-right mt-1">To be paid via Advance Tax Quarters</p>
                            </div>

                            {/* Current Slabs Reference */}
                            <div className="pt-4 border-t border-white/5 mt-4">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Current Tax Slabs</p>
                                <div className="text-[11px] text-slate-400 space-y-1">
                                    <div className="flex justify-between"><span>0 - 2.5L</span><span>0%</span></div>
                                    <div className="flex justify-between"><span>2.5L - 5L</span><span>5%</span></div>
                                    <div className="flex justify-between"><span>5L - 10L</span><span>10%</span></div>
                                    <div className="flex justify-between"><span>10L - 20L</span><span>15%</span></div>
                                    <div className="flex justify-between"><span> 20L</span><span>20%</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- GLOBAL FOOTER --- */}
            <div className="border-t border-white/5 mt-auto pt-6 flex-shrink-0">
                <FooterCredit />
            </div>

        </main>
    );
};

export default TaxEstimator;