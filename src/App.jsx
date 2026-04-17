import { useState, Suspense, lazy } from 'react';
import {
  RefreshCw, GitBranch, Settings, Box, Server, Cloud, Database,
  BookOpen, Star, CheckCircle, Menu, X
} from 'lucide-react';

const DevOpsUnit1 = lazy(() => import('./units/DevOpsUnit1.jsx'));
const DevOpsUnit2 = lazy(() => import('./units/DevOpsUnit2.jsx'));
const DevOpsUnit3 = lazy(() => import('./units/DevOpsUnit3.jsx'));
const DevOpsUnit4 = lazy(() => import('./units/DevOpsUnit4.jsx'));
const DevOpsUnit5 = lazy(() => import('./units/DevOpsUnit5.jsx'));
const CloudUnit1  = lazy(() => import('./units/CloudUnit1.jsx'));
const CloudUnit2  = lazy(() => import('./units/CloudUnit2.jsx'));

const UNITS = [
  {
    id:'do1', label:'Unit I', subject:'DevOps', icon:<RefreshCw size={16}/>,
    desc:'SDLC, Agile, Scrum, Kanban, Code Quality, Release Mgmt', color:'indigo', qs:'Q1–Q10', component:DevOpsUnit1,
  },
  {
    id:'do2', label:'Unit II', subject:'DevOps', icon:<GitBranch size={16}/>,
    desc:'Git, Version Control, SonarQube, CI/CD Integration', color:'blue', qs:'Q11–Q20', component:DevOpsUnit2,
  },
  {
    id:'do3', label:'Unit III', subject:'DevOps', icon:<Settings size={16}/>,
    desc:'Jenkins Architecture, Master-Slave, Jenkinsfile, Pipelines', color:'orange', qs:'Q21–Q30', component:DevOpsUnit3,
  },
  {
    id:'do4', label:'Unit IV', subject:'DevOps', icon:<Box size={16}/>,
    desc:'Docker, Containers, Selenium WebDriver, TestNG, JUnit', color:'cyan', qs:'Q31–Q45', component:DevOpsUnit4,
  },
  {
    id:'do5', label:'Unit V', subject:'DevOps', icon:<Server size={16}/>,
    desc:'Ansible, Configuration Management, Kubernetes, K8s', color:'green', qs:'Q46–Q55', component:DevOpsUnit5,
  },
  {
    id:'cc1', label:'CC Unit I', subject:'Cloud', icon:<Cloud size={16}/>,
    desc:'Virtualization, Hypervisors, Live Migration, SOA, REST, AWS, Azure', color:'sky', qs:'CC Q1–Q25', component:CloudUnit1,
  },
  {
    id:'cc2', label:'CC Unit II', subject:'Cloud', icon:<Database size={16}/>,
    desc:'GFS, AFS, GPFS, MapReduce, Pervasive Computing, Multicore, GPU, CAP', color:'violet', qs:'CC Q26–Q42', component:CloudUnit2,
  },
];

const COLOR_ACTIVE = {
  indigo:'bg-indigo-600/20 border-indigo-500/50 text-indigo-300',
  blue:  'bg-blue-600/20 border-blue-500/50 text-blue-300',
  orange:'bg-orange-600/20 border-orange-500/50 text-orange-300',
  cyan:  'bg-cyan-600/20 border-cyan-500/50 text-cyan-300',
  green: 'bg-green-600/20 border-green-500/50 text-green-300',
  sky:   'bg-sky-600/20 border-sky-500/50 text-sky-300',
  violet:'bg-violet-600/20 border-violet-500/50 text-violet-300',
};

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm">Loading content...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState('do1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const active = UNITS.find(u => u.id === activeId);
  const ActiveComponent = active?.component;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between px-4 md:px-6 h-14">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-600/10 border border-indigo-500/20 rounded-lg">
              <BookOpen size={18} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white leading-none">AI Study Coach</h1>
              <p className="text-[10px] text-slate-500 leading-none mt-0.5">DevOps + Cloud Computing • Exam Prep</p>
            </div>
          </div>
          {/* Stats */}
          <div className="hidden md:flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1.5 text-indigo-400">
              <CheckCircle size={12}/>
              <span>97 Questions Covered</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Star size={12}/>
              <span>Every Topic Has Exam Diagram</span>
            </div>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => setMobileMenuOpen(o => !o)}
          >
            {mobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        {/* ── Subject Labels (Desktop) + Nav ── */}
        <div className="hidden md:block border-t border-slate-800/60">
          <div className="flex">
            {/* DevOps label */}
            <div className="flex items-center px-3 py-1 text-[9px] font-black text-indigo-400 uppercase tracking-widest border-r border-slate-800 shrink-0">
              DevOps
            </div>
            <div className="flex overflow-x-auto hide-scrollbar">
              {UNITS.filter(u => u.subject === 'DevOps').map(unit => (
                <NavTab key={unit.id} unit={unit} active={activeId === unit.id} onClick={() => setActiveId(unit.id)} />
              ))}
            </div>
            {/* Cloud label */}
            <div className="flex items-center px-3 py-1 text-[9px] font-black text-sky-400 uppercase tracking-widest border-x border-slate-800 shrink-0">
              Cloud
            </div>
            <div className="flex overflow-x-auto hide-scrollbar">
              {UNITS.filter(u => u.subject === 'Cloud').map(unit => (
                <NavTab key={unit.id} unit={unit} active={activeId === unit.id} onClick={() => setActiveId(unit.id)} />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-14 overflow-y-auto">
          <div className="p-4 space-y-2">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-2 mb-3">DevOps</p>
            {UNITS.filter(u => u.subject === 'DevOps').map(unit => (
              <MobileNavItem key={unit.id} unit={unit} active={activeId === unit.id} onClick={() => { setActiveId(unit.id); setMobileMenuOpen(false); }} />
            ))}
            <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest px-2 mt-5 mb-3">Cloud Computing</p>
            {UNITS.filter(u => u.subject === 'Cloud').map(unit => (
              <MobileNavItem key={unit.id} unit={unit} active={activeId === unit.id} onClick={() => { setActiveId(unit.id); setMobileMenuOpen(false); }} />
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile bottom tab bar ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 flex overflow-x-auto hide-scrollbar px-2 py-1.5 gap-1">
        {UNITS.map(unit => (
          <button
            key={unit.id}
            onClick={() => setActiveId(unit.id)}
            className={`flex-1 min-w-10 flex flex-col items-center gap-0.5 py-1 rounded-lg transition-colors
              ${activeId === unit.id ? `bg-${unit.color}-600/20 text-${unit.color}-300` : 'text-slate-500'}`}
          >
            {unit.icon}
            <span className="text-[7px] font-bold">{unit.label}</span>
          </button>
        ))}
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 pb-20 md:pb-0">
        <Suspense fallback={<LoadingState />}>
          {ActiveComponent && <ActiveComponent />}
        </Suspense>
      </main>
    </div>
  );
}

function NavTab({ unit, active, onClick }) {
  const activeCls = COLOR_ACTIVE[unit.color] || COLOR_ACTIVE.indigo;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap
        ${active
          ? `${activeCls} border-current`
          : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-600'}`}
    >
      <span className={active ? '' : 'opacity-60'}>{unit.icon}</span>
      <span>{unit.label}</span>
      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${active ? 'bg-current/10' : 'bg-slate-800 text-slate-600'}`}>
        {unit.qs}
      </span>
    </button>
  );
}

function MobileNavItem({ unit, active, onClick }) {
  const activeCls = COLOR_ACTIVE[unit.color] || COLOR_ACTIVE.indigo;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left
        ${active ? activeCls + ' border-current/30' : 'border-slate-800 text-slate-400 hover:border-slate-700'}`}
    >
      <div className={active ? '' : 'opacity-40'}>{unit.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold">{unit.label} — {unit.qs}</p>
        <p className="text-[10px] text-slate-500 truncate">{unit.desc}</p>
      </div>
    </button>
  );
}
