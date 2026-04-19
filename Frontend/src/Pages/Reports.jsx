import React, { useEffect, useState } from 'react';
import FooterCredit from '../Components/FooterCredit';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

const Reports = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [reportConfig, setReportConfig] = useState({
        type: 'All Transactions',
        period: 'All Time',
        format: 'CSV'
    });

    const [previewData, setPreviewData] = useState(null);
    const [reportHistory, setReportHistory] = useState([]); // Mock history for the bottom table

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/transactions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = await response.json();

                if (result.success) {
                    setTransactions(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const handleInputChange = (e) => {
        setReportConfig({
            ...reportConfig,
            [e.target.name]: e.target.value
        });
    };

    const handleGenerateReport = () => {
        let filtered = [...transactions];
        const now = new Date();

        if (reportConfig.period === 'Current Month') {
            filtered = filtered.filter(tx => {
                const txDate = new Date(tx.date);
                return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
            });
        } else if (reportConfig.period === 'Last Month') {
            filtered = filtered.filter(tx => {
                const txDate = new Date(tx.date);
                const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
                const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
                return txDate.getMonth() === lastMonth && txDate.getFullYear() === year;
            });
        } else if (reportConfig.period === 'Year to Date') {
            filtered = filtered.filter(tx => {
                const txDate = new Date(tx.date);
                return txDate.getFullYear() === now.getFullYear();
            });
        }

        if (reportConfig.type === 'Income Statement') {
            filtered = filtered.filter(tx => tx.type === 'income');
        } else if (reportConfig.type === 'Expense Report') {
            filtered = filtered.filter(tx => tx.type === 'expense');
        }

        let totalIncome = 0;
        let totalExpense = 0;
        filtered.forEach(tx => {
            if (tx.type === 'income') totalIncome += tx.amount;
            if (tx.type === 'expense') totalExpense += tx.amount;
        });

        setPreviewData({
            records: filtered,
            totalIncome,
            totalExpense,
            net: totalIncome - totalExpense
        });

        setReportHistory([{
            id: Date.now(),
            name: `${reportConfig.type} - ${reportConfig.period}`,
            date: new Date().toLocaleDateString(),
            format: reportConfig.format
        }, ...reportHistory]);
    };

    const handleReset = () => {
        setReportConfig({ type: 'All Transactions', period: 'All Time', format: 'CSV' });
        setPreviewData(null);
    };

    // Download CSV 
    const downloadCSV = () => {
        if (!previewData || previewData.records.length === 0) {
            alert("No data to download!");
            return;
        }

        // CSV Headers
        const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];

        // CSV Rows
        const csvRows = previewData.records.map(tx => {
            return [
                new Date(tx.date).toLocaleDateString(),
                `"${tx.description || 'No Description'}"`, // Quotes prevent commas in descriptions from breaking the CSV
                tx.category,
                tx.type,
                tx.amount
            ].join(',');
        });

        const csvString = [headers.join(','), ...csvRows].join('\n');

        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `FINBRIDGE_${reportConfig.type.replace(' ', '_')}_${Date.now()}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    if (loading) return <div className="text-white p-10">Loading Reports...</div>;

    return (
        <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10 h-screen overflow-y-auto z-10 relative flex flex-col">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="header-text text-3xl font-bold text-white">Reports &amp; Export</h1>
                    <p className="text-slate-400 mt-1 text-sm">Generate financial statements and download CSVs for tax filing.</p>
                </div>
            </div>

            {/* Generate Report Form */}
            <div className="glass-panel p-6 rounded-2xl mb-8 flex-shrink-0">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <span className="material-symbols-outlined text-pink-400">tune</span>
                    </div>
                    <h2 className="text-lg font-bold text-white">Generate Report</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Report Type</label>
                        <select name="type" value={reportConfig.type} onChange={handleInputChange} className="w-full bg-[#131620] border border-white/10 rounded-lg text-white text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer">
                            <option>All Transactions</option>
                            <option>Income Statement</option>
                            <option>Expense Report</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Period</label>
                        <select name="period" value={reportConfig.period} onChange={handleInputChange} className="w-full bg-[#131620] border border-white/10 rounded-lg text-white text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer">
                            <option>All Time</option>
                            <option>Current Month</option>
                            <option>Last Month</option>
                            <option>Year to Date</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Format</label>
                        <select name="format" value={reportConfig.format} onChange={handleInputChange} className="w-full bg-[#131620] border border-white/10 rounded-lg text-white text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer">
                            <option>CSV Spreadsheet (.csv)</option>
                            <option disabled>PDF Document (.pdf) - Coming Soon</option>
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={handleReset} className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-all">
                            Reset
                        </button>
                        <button onClick={handleGenerateReport} className="flex-[2] px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                            Generate
                        </button>
                    </div>
                </div>
            </div>

            {/* Report Preview Placeholder */}
            <div className="glass-panel rounded-2xl mb-8 flex flex-col min-h-[400px] flex-shrink-0 transition-all">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-500 text-lg">visibility</span>
                        Report Preview {previewData && `- ${reportConfig.type} (${reportConfig.period})`}
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={downloadCSV}
                            disabled={!previewData || previewData.records.length === 0}
                            className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-[16px]">download</span>
                            Download CSV
                        </button>
                    </div>
                </div>

                {/* DYNAMIC CONTENT based on whether they clicked Generate */}
                {!previewData ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 relative report-preview-placeholder">
                        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl backdrop-blur-sm">
                            <span className="material-symbols-outlined text-5xl text-slate-500/50">description</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-300 mb-2">Select a report to preview</h3>
                        <p className="text-sm text-slate-500 text-center max-w-sm">Generated reports will appear here for your review before downloading. You can customize the date range and format above.</p>
                    </div>
                ) : (
                    <div className="p-6 flex flex-col flex-1">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                                <p className="text-xs text-emerald-400 font-medium mb-1">Total Income</p>
                                <h3 className="text-2xl font-bold text-white">{formatCurrency(previewData.totalIncome)}</h3>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                <p className="text-xs text-red-400 font-medium mb-1">Total Expenses</p>
                                <h3 className="text-2xl font-bold text-white">{formatCurrency(previewData.totalExpense)}</h3>
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                                <p className="text-xs text-blue-400 font-medium mb-1">Net Balance</p>
                                <h3 className="text-2xl font-bold text-white">{formatCurrency(previewData.net)}</h3>
                            </div>
                        </div>

                        {/* Quick Chart Visual */}
                        <div className="h-32 mb-6 w-full border-b border-white/5 pb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[{ name: 'Summary', Income: previewData.totalIncome, Expense: previewData.totalExpense }]} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#131620', border: '1px solid rgba(255,255,255,0.1)' }} formatter={(val) => formatCurrency(val)} />
                                    <Bar dataKey="Income" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                                    <Bar dataKey="Expense" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex justify-between items-center text-sm text-slate-400 mb-2">
                            <span>Showing {previewData.records.length} records</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Recent Reports Table */}
            <div className="glass-panel rounded-2xl overflow-hidden mb-6 flex-shrink-0">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Recent Generations</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-xs text-slate-400 uppercase tracking-wider">
                                <th className="p-4 font-medium pl-6">Report Name</th>
                                <th className="p-4 font-medium">Generated On</th>
                                <th className="p-4 font-medium">Format</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-300 divide-y divide-white/5">
                            {reportHistory.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center text-slate-500">
                                        No reports generated in this session.
                                    </td>
                                </tr>
                            ) : (
                                reportHistory.map(history => (
                                    <tr key={history.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 pl-6 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                                <span className="material-symbols-outlined text-sm">summarize</span>
                                            </div>
                                            <span className="font-medium text-white">{history.name}</span>
                                        </td>
                                        <td className="p-4 text-slate-400">{history.date}</td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                                                <i className="fas fa-file-csv"></i> {history.format}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- GLOBAL FOOTER --- */}
            <div className="border-t border-white/5 mt-auto pt-6 flex-shrink-0">
                <FooterCredit />
            </div>

        </main>
    );
};

export default Reports;