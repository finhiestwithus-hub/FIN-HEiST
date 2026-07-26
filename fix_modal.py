import re

with open('/Users/vaasu/Desktop/FIN-Heist/src/components/ui/FloatingWidgets.tsx', 'r') as f:
    content = f.read()

# Fix Modal Container and Header
content = content.replace(
    '<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-fadeIn">',
    '<div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/65 backdrop-blur-md animate-fadeIn">'
)

content = content.replace(
    '<div className="relative w-full max-w-xl bg-gradient-to-br from-white via-slate-50 to-[#FCFBFA] border-2 border-slate-200/90 rounded-3xl shadow-[0_25px_80px_-15px_rgba(245,158,11,0.3)] overflow-hidden">',
    '<div className="relative w-full max-w-xl max-h-[95vh] flex flex-col bg-gradient-to-br from-white via-slate-50 to-[#FCFBFA] border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_-15px_rgba(245,158,11,0.3)] overflow-hidden">'
)

content = content.replace(
    '<div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-7 py-5.5 border-b border-amber-300 flex items-center justify-between shadow-xs">',
    '<div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-4 py-4 sm:px-7 sm:py-5.5 border-b border-amber-300 flex items-start sm:items-center justify-between shadow-xs shrink-0">'
)

content = content.replace(
    '<div className="w-11 h-11 rounded-2xl bg-slate-950/15 border border-slate-950/25 flex items-center justify-center text-slate-950 font-extrabold shadow-2xs">',
    '<div className="hidden sm:flex w-11 h-11 rounded-2xl bg-slate-950/15 border border-slate-950/25 items-center justify-center text-slate-950 font-extrabold shadow-2xs shrink-0">'
)

content = content.replace(
    '<h3 className="text-xl sm:text-2xl font-extrabold font-poppins text-slate-950 tracking-tight">Book Free Consultation</h3>',
    '<h3 className="text-lg sm:text-2xl font-extrabold font-poppins tracking-tight" style={{ color: \'#0f172a\' }}>Book Free Consultation</h3>'
)

content = content.replace(
    '<p className="text-xs sm:text-sm text-slate-900/90 font-semibold font-inter mt-0.5">Direct consultation with CA Finalist & Compliance Team</p>',
    '<p className="text-[10px] sm:text-sm font-semibold font-inter mt-0.5 leading-tight" style={{ color: \'#1e293b\' }}>Direct consultation with CA Finalist & Compliance Team</p>'
)

content = content.replace(
    '<button\n                                onClick={() => setIsModalOpen(false)}\n                                className="w-9 h-9 rounded-xl bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 flex items-center justify-center transition-colors font-bold shrink-0"\n                                title="Close Modal"\n                            >\n                                <X className="w-5 h-5 stroke-[2.5]" />\n                            </button>',
    '<button\n                                onClick={() => setIsModalOpen(false)}\n                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 flex items-center justify-center transition-colors font-bold shrink-0 ml-2"\n                                title="Close Modal"\n                            >\n                                <X className="w-4 h-4 sm:w-5 h-5 stroke-[2.5]" />\n                            </button>'
)

# Fix scrollable content wrapper
content = content.replace(
    '<div className="p-7 sm:p-8">',
    '<div className="p-4 sm:p-7 overflow-y-auto">'
)

# Fix label colors
content = content.replace(
    'text-slate-700',
    'text-slate-700 dark:text-slate-700'
)
content = content.replace(
    'text-slate-900',
    'text-slate-900 dark:text-slate-900'
)


# Add inline styles to all form inputs
input_pattern = r'(className="w-full px-4[^"]*")'
content = re.sub(input_pattern, r'\1 style={{ backgroundColor: "#ffffff", color: "#0f172a" }}', content)


# Form layout - remove columns on mobile
content = content.replace(
    '<div className="grid grid-cols-1 md:grid-cols-2 gap-4">',
    '<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">'
)


# Modal Footer
content = content.replace(
    '<div className="px-7 py-3.5 bg-slate-100/90 border-t border-slate-200/90 flex items-center justify-between text-xs font-bold text-slate-600 font-inter">',
    '<div className="px-4 py-3 sm:px-7 sm:py-3.5 bg-slate-100/90 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] sm:text-xs font-bold text-slate-600 font-inter shrink-0">'
)

with open('/Users/vaasu/Desktop/FIN-Heist/src/components/ui/FloatingWidgets.tsx', 'w') as f:
    f.write(content)

