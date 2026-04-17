import { useState } from 'react';
import { Code, Star, Link, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';

export function UnitHeader({ title, subtitle, icon, color = 'indigo' }) {
  const colorMap = {
    indigo: 'from-indigo-950/40 border-indigo-800/40 text-indigo-400 bg-indigo-600/10 border-indigo-500/20',
    blue:   'from-blue-950/40 border-blue-800/40 text-blue-400 bg-blue-600/10 border-blue-500/20',
    orange: 'from-orange-950/40 border-orange-800/40 text-orange-400 bg-orange-600/10 border-orange-500/20',
    cyan:   'from-cyan-950/40 border-cyan-800/40 text-cyan-400 bg-cyan-600/10 border-cyan-500/20',
    green:  'from-green-950/40 border-green-800/40 text-green-400 bg-green-600/10 border-green-500/20',
    sky:    'from-sky-950/40 border-sky-800/40 text-sky-400 bg-sky-600/10 border-sky-500/20',
    violet: 'from-violet-950/40 border-violet-800/40 text-violet-400 bg-violet-600/10 border-violet-500/20',
  };
  const [grad, border, textC, bgIcon, borderIcon] = colorMap[color]?.split(' ') ?? colorMap.indigo.split(' ');
  return (
    <div className={`px-6 md:px-10 py-8 border-b border-slate-800 bg-gradient-to-r ${grad} to-slate-900`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 ${bgIcon} border ${borderIcon} rounded-xl ${textC}`}>{icon}</div>
        <div>
          <h1 className="text-2xl font-black text-slate-100">{title}</h1>
          <p className={`text-sm ${textC} font-bold`}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export function QuestionBadge({ qNums }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {qNums.map(q => (
        <span key={String(q)} className="bg-indigo-900/60 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/40">
          {String(q).startsWith('Q') ? q : `Q${q}`}
        </span>
      ))}
    </div>
  );
}

export function ExamTip({ children }) {
  return (
    <div className="mt-6 bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex gap-3">
      <Star className="text-amber-400 shrink-0 mt-0.5" size={16} />
      <div>
        <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">10-Mark Exam Tip</p>
        <p className="text-sm text-amber-200">{children}</p>
      </div>
    </div>
  );
}

export function CrossRef({ label }) {
  return (
    <span className="inline-flex items-center gap-1 bg-emerald-950/50 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700/50 ml-2">
      <Link size={9} /> {label}
    </span>
  );
}

export function DiagramBox({ title, children }) {
  return (
    <div className="w-full bg-slate-950 border border-slate-700 rounded-xl p-5 shadow-inner">
      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Code size={12} /> {title || 'Exam Diagram — Draw This'}
      </p>
      {children}
    </div>
  );
}

export function ConceptSection({ title, questions, qNums, Theory, Diagram, reverse, examTip, crossRef }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-slate-800/60 last:border-0 fade-in">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-base md:text-lg font-black text-slate-100 leading-tight">{title}</h2>
          {crossRef && <CrossRef label={crossRef} />}
          <span className="text-xs text-slate-500">{questions}</span>
        </div>
        {open ? <ChevronUp size={18} className="text-slate-500 shrink-0" /> : <ChevronDown size={18} className="text-slate-500 shrink-0" />}
      </button>

      {open && (
        <div className="flex flex-col lg:flex-row border-t border-slate-800/40">
          {/* Mobile diagram first */}
          <div className="lg:hidden p-4 bg-slate-950 border-b border-slate-800">
            <DiagramBox>{Diagram}</DiagramBox>
          </div>

          {/* Theory */}
          <div className={`w-full lg:w-1/2 p-6 md:p-8 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <QuestionBadge qNums={qNums} />
            <div className="text-slate-300 text-sm leading-relaxed space-y-4">
              {Theory}
            </div>
            {examTip && <ExamTip>{examTip}</ExamTip>}
          </div>

          {/* Desktop diagram */}
          <div className={`hidden lg:flex w-full lg:w-1/2 bg-slate-950 p-8 flex-col justify-center border-l border-slate-800 ${reverse ? 'lg:order-1 border-r border-l-0' : 'lg:order-2'}`}>
            <DiagramBox>{Diagram}</DiagramBox>
          </div>
        </div>
      )}
    </div>
  );
}

export function FlowArrow({ label, color = 'slate' }) {
  return (
    <div className="flex flex-col items-center my-1">
      {label && <span className={`text-[9px] font-bold text-${color}-400 mb-0.5`}>{label}</span>}
      <ArrowDown size={14} className="text-slate-600" />
    </div>
  );
}

export function CompareTable({ headers, rows }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-700">
            {headers.map((h, i) => (
              <th key={i} className={`text-left py-1.5 pr-3 font-bold ${h.color || 'text-slate-400'}`}>{h.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-800 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`py-1.5 pr-3 text-[10px] ${headers[j]?.cellColor || 'text-slate-300'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CodeSnippet({ lines }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs space-y-0.5">
      {lines.map((line, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
    </div>
  );
}

export function FlowBox({ label, sub, color = 'slate', icon }) {
  const colorClasses = {
    slate:  'bg-slate-800 border-slate-600 text-slate-300',
    indigo: 'bg-indigo-950/40 border-indigo-500/40 text-indigo-300',
    blue:   'bg-blue-950/40 border-blue-500/40 text-blue-300',
    emerald:'bg-emerald-950/40 border-emerald-500/40 text-emerald-300',
    orange: 'bg-orange-950/40 border-orange-500/40 text-orange-300',
    purple: 'bg-purple-950/40 border-purple-500/40 text-purple-300',
    red:    'bg-red-950/40 border-red-500/40 text-red-300',
    cyan:   'bg-cyan-950/40 border-cyan-500/40 text-cyan-300',
    yellow: 'bg-yellow-950/40 border-yellow-600/40 text-yellow-300',
    green:  'bg-green-950/40 border-green-500/40 text-green-300',
  };
  const cls = colorClasses[color] || colorClasses.slate;
  return (
    <div className={`border rounded-xl p-3 ${cls}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-base">{icon}</span>}
        <div>
          <p className="font-bold text-[11px]">{label}</p>
          {sub && <p className="text-[9px] text-slate-500 mt-0.5">{sub}</p>}
        </div>
      </div>
    </div>
  );
}
