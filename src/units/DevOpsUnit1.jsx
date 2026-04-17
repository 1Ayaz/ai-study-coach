import { RefreshCw, ArrowDown, ArrowRight, Settings, Shield } from 'lucide-react';
import { UnitHeader, ConceptSection, FlowArrow, CompareTable, FlowBox } from '../components/Shared.jsx';

export default function DevOpsUnit1() {
  return (
    <div className="flex flex-col">
      <UnitHeader
        title="Unit I — DevOps, SDLC & Agile"
        subtitle="Q1–Q10 • Architecture, CI/CD, Waterfall, Agile, Scrum, Kanban, Release Management"
        icon={<RefreshCw size={24} />}
        color="indigo"
      />

      {/* ── CONCEPT 1: DevOps Architecture ── */}
      <ConceptSection
        title="DevOps Architecture & CI/CD Automation"
        questions="Answers Q1, Q2, Q3, Q4"
        qNums={[1,2,3,4]}
        examTip="Draw the DevOps Infinity Loop. Label ALL 8 phases: Plan→Code→Build→Test→Release→Deploy→Operate→Monitor. Name 2 tools per phase. Then draw the CI/CD pipeline as a horizontal flow with arrows. This alone gets you 8/10."
        Theory={<>
          <p><strong className="text-white">What is DevOps? (Q1)</strong> DevOps eliminates the wall between Development and Operations. It is a combination of <em>culture, practices, and tools</em> that enables organizations to deliver software faster and more reliably through automation of the entire software delivery pipeline.</p>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
            <p className="text-xs font-black text-indigo-400 uppercase mb-3">8 Phases of the DevOps Lifecycle</p>
            <div className="space-y-2">
              {[
                ['Plan','Define requirements & roadmap','Jira, Trello, Azure Boards'],
                ['Code','Write & commit source code','Git, VS Code, IntelliJ'],
                ['Build','Compile, package application','Maven, Gradle, Ant'],
                ['Test','Automated quality assurance','JUnit, Selenium, TestNG'],
                ['Release','Approve; prepare artifact','Jenkins, GitHub Actions'],
                ['Deploy','Push to production/cloud','Docker, Kubernetes, Ansible'],
                ['Operate','Manage infrastructure','Ansible, Terraform, Chef'],
                ['Monitor','Track performance & errors','Nagios, Prometheus, Grafana'],
              ].map(([phase, desc, tools], i) => (
                <div key={phase} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-2">
                  <span className="text-indigo-400 font-black text-xs w-16 shrink-0">{i+1}. {phase}</span>
                  <div className="flex-1">
                    <p className="text-xs text-slate-300">{desc}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Tools: {tools}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p><strong className="text-white">Build & Delivery Automation (Q2):</strong> Build automation (Maven/Gradle) compiles code and runs tests without human intervention. Delivery automation moves tested artifacts through staging to production automatically, eliminating the #1 delay source — manual handoffs.</p>
          <p><strong className="text-white">Delivery Pipeline Bottlenecks (Q4):</strong> Common bottlenecks: manual testing gates, environment mismatches (Docker solves), long build times (parallel agents in Jenkins), approval delays (automated quality gates), configuration drift (Ansible/Puppet solves).</p>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Infinity Loop */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-indigo-400 uppercase mb-3 text-center">DevOps Infinity Loop</p>
              <div className="flex gap-2">
                {/* DEV side */}
                <div className="flex-1 bg-blue-950/30 border border-blue-700/30 rounded-xl p-3">
                  <p className="text-[9px] font-black text-blue-400 text-center mb-2">DEV SIDE</p>
                  <div className="space-y-1.5">
                    {[['Plan','Jira'],['Code','Git'],['Build','Maven'],['Test','JUnit']].map(([p,t])=>(
                      <div key={p} className="flex justify-between items-center bg-blue-950/40 rounded px-2 py-1 border border-blue-800/30">
                        <span className="text-[10px] font-bold text-blue-300">{p}</span>
                        <span className="text-[9px] text-slate-500">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Divider */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="w-px h-full bg-slate-700"></div>
                  <span className="text-[8px] text-slate-600 rotate-90 whitespace-nowrap">∞</span>
                  <div className="w-px h-full bg-slate-700"></div>
                </div>
                {/* OPS side */}
                <div className="flex-1 bg-emerald-950/30 border border-emerald-700/30 rounded-xl p-3">
                  <p className="text-[9px] font-black text-emerald-400 text-center mb-2">OPS SIDE</p>
                  <div className="space-y-1.5">
                    {[['Release','Jenkins'],['Deploy','Docker'],['Operate','Ansible'],['Monitor','Nagios']].map(([p,t])=>(
                      <div key={p} className="flex justify-between items-center bg-emerald-950/40 rounded px-2 py-1 border border-emerald-800/30">
                        <span className="text-[10px] font-bold text-emerald-300">{p}</span>
                        <span className="text-[9px] text-slate-500">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* CI/CD Pipeline */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-3 text-center">CI/CD Pipeline Flow</p>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {[
                  {l:'Git Push',c:'blue'},
                  {l:'→',plain:true},
                  {l:'Jenkins Build',c:'indigo'},
                  {l:'→',plain:true},
                  {l:'JUnit Tests',c:'purple'},
                  {l:'→',plain:true},
                  {l:'SonarQube',c:'orange'},
                  {l:'→',plain:true},
                  {l:'Docker Image',c:'cyan'},
                  {l:'→',plain:true},
                  {l:'K8s Deploy',c:'emerald'},
                ].map((s,i)=>s.plain
                  ? <ArrowRight key={i} size={12} className="text-slate-600"/>
                  : <span key={i} className={`text-[9px] font-bold bg-${s.c}-950/50 text-${s.c}-300 px-2 py-1 rounded border border-${s.c}-700/40`}>{s.l}</span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[9px]">
                <div className="bg-blue-950/30 p-2 rounded border border-blue-800/30 text-center">
                  <p className="font-black text-blue-400">CI (Continuous Integration)</p>
                  <p className="text-slate-500">Merge + Build + Test automatically</p>
                </div>
                <div className="bg-emerald-950/30 p-2 rounded border border-emerald-800/30 text-center">
                  <p className="font-black text-emerald-400">CD (Continuous Delivery)</p>
                  <p className="text-slate-500">One-click release to production</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 2: Waterfall vs Agile + SDLC ── */}
      <ConceptSection
        reverse
        title="Waterfall vs Agile & Full SDLC Phases"
        questions="Answers Q5, Q6"
        qNums={[5,6]}
        examTip="Draw BOTH models: Waterfall as cascading steps (Requirements→Design→Implementation→Testing→Deployment→Maintenance). Agile as a cycle/wheel (Plan→Code→Test→Deploy repeating). Then write a 5-point comparison table. Both diagrams = 4 marks guaranteed."
        Theory={<>
          <p><strong className="text-white">SDLC Phases (Q6):</strong> Software Development Life Cycle is the structured process of planning, creating, testing, and deploying a software system.</p>
          <div className="space-y-1.5">
            {[
              ['1. Requirements','Gather what client needs; create BRS (Business Requirements Spec)'],
              ['2. System Design','Architecture (HLD = High-Level Design, LLD = Low-Level Design)'],
              ['3. Implementation','Developers write code based on design documents'],
              ['4. Testing','QA team verifies against requirements; find and fix bugs'],
              ['5. Deployment','Release to production environment; user acceptance testing'],
              ['6. Maintenance','Ongoing bug fixes, patches, and feature enhancements'],
            ].map(([phase, desc])=>(
              <div key={phase} className="flex gap-3 bg-slate-800/40 rounded-lg p-2">
                <span className="text-indigo-400 font-black text-xs w-28 shrink-0">{phase}</span>
                <span className="text-xs text-slate-400">{desc}</span>
              </div>
            ))}
          </div>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'Waterfall',color:'text-orange-400'},
              {label:'Agile',color:'text-emerald-400'},
            ]}
            rows={[
              ['Process Type','Sequential (linear)','Iterative (sprints)'],
              ['Requirements','Fixed at start','Flexible, can change anytime'],
              ['Testing','Only at end','Continuous every sprint'],
              ['Delivery','Single big release','Frequent small releases'],
              ['Risk','High (late feedback)','Low (early feedback loops)'],
              ['Best For','Stable, clear requirements','Dynamic, evolving requirements'],
            ]}
          />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Waterfall Visual */}
            <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-orange-400 mb-3 text-center">WATERFALL MODEL — Linear Flow</p>
              <div className="flex flex-col items-start gap-0.5">
                {['Requirements','System Design','Implementation','Testing','Deployment','Maintenance'].map((p,i)=>(
                  <div key={p} className="flex items-center gap-2">
                    <div className={`bg-slate-800 border border-slate-600 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded`} style={{marginLeft: i * 10}}>
                      {i+1}. {p}
                    </div>
                    {i < 5 && <ArrowDown size={10} className="text-slate-600"/>}
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-red-400 mt-2">⚠ Cannot go back — very inflexible</p>
            </div>
            {/* Agile Sprint Wheel */}
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-emerald-400 mb-3 text-center">AGILE MODEL — Iterative Sprints</p>
              <div className="flex justify-center">
                <div className="relative w-36 h-36">
                  <div className="absolute inset-2 rounded-full border-4 border-dashed border-emerald-500/40 animate-spin-slow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-[9px] font-black text-emerald-400">Sprint</p>
                      <p className="text-[8px] text-slate-500">2 weeks</p>
                    </div>
                  </div>
                  {[
                    {label:'Plan',pos:'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', bg:'bg-purple-900 border-purple-700'},
                    {label:'Code',pos:'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', bg:'bg-blue-900 border-blue-700'},
                    {label:'Test',pos:'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', bg:'bg-emerald-900 border-emerald-700'},
                    {label:'Deploy',pos:'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2', bg:'bg-orange-900 border-orange-700'},
                  ].map(({label,pos,bg})=>(
                    <div key={label} className={`absolute ${pos} ${bg} border text-[9px] font-bold text-white px-2 py-0.5 rounded`}>{label}</div>
                  ))}
                </div>
              </div>
              <p className="text-[8px] text-emerald-400 text-center mt-2">✓ Working software delivered every sprint</p>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 3: Scrum vs Kanban ── */}
      <ConceptSection
        title="Scrum vs Kanban — Full Detail"
        questions="Answers Q7"
        qNums={[7]}
        examTip="For 10 marks: Describe Scrum roles (Product Owner, Scrum Master, Dev Team), Sprint cycle, and artifacts (Product Backlog, Sprint Backlog, Burndown Chart). Then describe Kanban WIP limits with a board diagram. End with a 5-row comparison table. This structure guarantees full marks."
        Theory={<>
          <p><strong className="text-white">Scrum Framework:</strong> Agile framework using fixed-length <em>Sprints</em> (typically 2 weeks). Three pillars: Transparency, Inspection, Adaptation.</p>
          <div className="bg-slate-900 border border-indigo-500/20 rounded-xl p-4">
            <p className="text-xs font-black text-indigo-400 mb-3">Scrum Roles & Artifacts</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                {role:'Product Owner',desc:'Prioritizes Product Backlog; represents business',color:'purple'},
                {role:'Scrum Master',desc:'Removes blockers; enforces Scrum rules; coach',color:'blue'},
                {role:'Dev Team',desc:'Self-organizing; builds the product each sprint',color:'emerald'},
                {role:'Sprint (2 weeks)',desc:'Fixed iteration; no scope changes once started',color:'orange'},
              ].map(({role,desc,color})=>(
                <div key={role} className={`bg-${color}-950/30 border border-${color}-700/30 rounded-lg p-2`}>
                  <p className={`text-[10px] font-black text-${color}-400`}>{role}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-bold text-slate-400">Scrum Events: Sprint Planning → Daily Standup → Sprint Review → Retrospective</p>
          </div>
          <p><strong className="text-white">Kanban Framework:</strong> Continuous flow model with no fixed sprints. Work items are cards on a board. Key rule: <strong>WIP (Work-In-Progress) Limits</strong> — cap how many items can be in each column simultaneously to prevent bottlenecks.</p>
          <CompareTable
            headers={[
              {label:'Aspect',color:'text-slate-400'},
              {label:'Scrum',color:'text-blue-400'},
              {label:'Kanban',color:'text-purple-400'},
            ]}
            rows={[
              ['Iteration','Fixed 2-week sprints','Continuous flow (no sprints)'],
              ['Roles','PO, Scrum Master, Dev Team','No defined roles'],
              ['Board','Sprint Backlog board','Kanban board with WIP limits'],
              ['Change','No mid-sprint changes','Change priorities anytime'],
              ['Metric','Velocity (story points/sprint)','Cycle time & throughput'],
            ]}
          />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Scrum Board */}
            <div className="bg-slate-900 border border-indigo-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-indigo-400 mb-2">Scrum Sprint Board</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {col:'Sprint Backlog',items:['Login Feature','API Design','DB Schema'],color:'slate'},
                  {col:'In Progress',items:['User Auth','REST API'],color:'blue',wip:'2/3'},
                  {col:'Done ✓',items:['UI Mockup','DB Setup'],color:'emerald'},
                ].map(c=>(
                  <div key={c.col} className={`border border-${c.color}-700/30 rounded-lg p-2 bg-${c.color}-950/20`}>
                    <div className="flex justify-between items-center mb-2">
                      <p className={`text-[9px] font-black text-${c.color}-400`}>{c.col}</p>
                      {c.wip && <span className="text-[8px] font-bold text-orange-400 bg-orange-950/40 px-1 rounded">{c.wip}</span>}
                    </div>
                    {c.items.map(item=>(
                      <div key={item} className={`bg-${c.color}-950/40 text-[8px] text-slate-300 px-2 py-1 rounded mb-1 border border-${c.color}-800/20`}>{item}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Kanban Board */}
            <div className="bg-slate-900 border border-purple-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-purple-400 mb-2">Kanban Board — WIP Limits</p>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  {col:'To Do',items:['Task A','Task B','Task C'],color:'slate'},
                  {col:'In Progress',items:['Task D','Task E'],color:'indigo',limit:'WIP: 2/2',full:true},
                  {col:'Review',items:['Task F'],color:'yellow',limit:'WIP: 1/3'},
                  {col:'Done',items:['Task G','Task H'],color:'emerald'},
                ].map(c=>(
                  <div key={c.col} className={`border border-${c.color}-700/30 rounded-lg p-1.5 bg-${c.color}-950/10 min-h-20`}>
                    <div className="mb-1.5">
                      <p className={`text-[8px] font-black text-${c.color}-400 text-center`}>{c.col}</p>
                      {c.limit && <p className={`text-[7px] font-bold text-center ${c.full ? 'text-red-400' : 'text-slate-500'}`}>{c.limit}</p>}
                    </div>
                    {c.items.map(item=>(
                      <div key={item} className={`bg-slate-800 text-[7px] text-slate-300 px-1 py-0.5 rounded mb-1`}>{item}</div>
                    ))}
                    {c.full && <p className="text-[7px] text-red-400 text-center mt-1">🚫 Blocked!</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 4: Code Quality + Release Management ── */}
      <ConceptSection
        reverse
        title="Code Quality, Release Management & DevOps Culture"
        questions="Answers Q8, Q9, Q10"
        qNums={[8,9,10]}
        examTip="For Q8/Q10: List and define all 6 code quality metrics. Explain SonarQube's SAST role and Quality Gates. Draw the Quality Gate flow diagram. For Q9: Describe all 5 release strategies with a labeled diagram. Structure = marks."
        Theory={<>
          <p><strong className="text-white">Code Quality (Q8, Q10):</strong> Code quality measures how well code solves its problem while being maintainable, secure, and efficient.</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              {m:'Cyclomatic Complexity',d:'Number of independent paths. High = hard to test'},
              {m:'Code Coverage',d:'% of code executed by tests. Target: >80%'},
              {m:'Code Duplications',d:'Repeated code blocks — violates DRY principle'},
              {m:'Bugs',d:'Code errors that cause wrong behavior'},
              {m:'Vulnerabilities',d:'Security flaws (SQL injection, XSS, hardcoded passwords)'},
              {m:'Code Smells',d:'Maintainability issues — methods too long, poor naming'},
            ].map(({m,d})=>(
              <div key={m} className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                <p className="text-[10px] font-black text-indigo-400">{m}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{d}</p>
              </div>
            ))}
          </div>
          <p><strong className="text-white">Release Management Types (Q9):</strong></p>
          <div className="space-y-2">
            {[
              {t:'Blue-Green Deployment',d:'Two identical environments. Route traffic to new (green) when ready. Instant rollback by switching back to blue.',color:'blue'},
              {t:'Canary Release',d:'Deploy to 5% of users first. Monitor. Gradually roll out to 100%. Limits blast radius of bugs.',color:'yellow'},
              {t:'Rolling Release',d:'Replace one instance at a time. Zero downtime. Used with Kubernetes rolling updates.',color:'emerald'},
              {t:'Feature Flags',d:'Code deployed but feature hidden. Toggle on/off via config. A/B testing without redeployment.',color:'purple'},
              {t:'Continuous Deployment',d:'Every commit that passes all tests auto-deploys to production. Maximum speed.',color:'orange'},
            ].map(({t,d,color})=>(
              <div key={t} className={`bg-${color}-950/20 border border-${color}-700/30 rounded-lg p-2.5`}>
                <p className={`text-[10px] font-black text-${color}-400`}>{t}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{d}</p>
              </div>
            ))}
          </div>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* SonarQube Quality Gate Flow */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-purple-400 mb-3">SonarQube Quality Gate Flow</p>
              {[
                {label:'Developer commits code to Git',icon:'📝',color:'slate'},
                {label:'Jenkins triggers automated build',icon:'⚙️',color:'indigo'},
                {label:'JUnit / Selenium tests run',icon:'🧪',color:'blue'},
                {label:'Sonar Scanner analyzes code (SAST)',icon:'🔍',color:'purple'},
                {label:'Quality Gate evaluated',icon:'🛡️',color:'orange'},
              ].map((s,i)=>(
                <div key={i}>
                  <div className={`bg-slate-800 border border-slate-700 p-2.5 rounded-lg flex items-center gap-2`}>
                    <span className="text-base">{s.icon}</span>
                    <p className="text-[10px] font-bold text-slate-300">{s.label}</p>
                  </div>
                  {i < 4 && <FlowArrow />}
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <div className="flex-1 bg-red-950/40 border border-red-500/40 p-2 rounded-lg text-center">
                  <p className="text-[9px] font-black text-red-400">✗ FAIL</p>
                  <p className="text-[8px] text-slate-500">Pipeline Aborted</p>
                </div>
                <div className="flex-1 bg-emerald-950/40 border border-emerald-500/40 p-2 rounded-lg text-center">
                  <p className="text-[9px] font-black text-emerald-400">✓ PASS</p>
                  <p className="text-[8px] text-slate-500">Deploy to Staging</p>
                </div>
              </div>
            </div>
            {/* Release Strategies */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">Release Strategies Diagram</p>
              {/* Blue-Green */}
              <div className="mb-3">
                <p className="text-[9px] font-black text-blue-400 mb-1">Blue-Green Deployment</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-blue-950/40 border border-blue-700/40 p-1.5 rounded text-center text-[8px] text-blue-300 font-bold">BLUE<br/>(Current Live)</div>
                  <ArrowRight size={14} className="text-slate-600 shrink-0"/>
                  <div className="flex-1 bg-emerald-950/40 border border-emerald-700/40 p-1.5 rounded text-center text-[8px] text-emerald-300 font-bold">GREEN<br/>(New Version)</div>
                </div>
                <p className="text-[8px] text-slate-500 mt-1 text-center">Load balancer switches traffic instantly ↑</p>
              </div>
              {/* Canary */}
              <div>
                <p className="text-[9px] font-black text-yellow-400 mb-1">Canary Release</p>
                <div className="flex items-center gap-1">
                  {[['5%\nUsers','yellow'],['25%\nUsers','orange'],['100%\nUsers','emerald']].map(([l,c],i)=>(
                    <div key={i} className={`flex-1 bg-${c}-950/30 border border-${c}-700/30 p-1 rounded text-center text-[8px] font-bold text-${c}-400`}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
