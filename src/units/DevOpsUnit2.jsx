import { GitBranch, ArrowDown, ArrowRight } from 'lucide-react';
import { UnitHeader, ConceptSection, FlowArrow, CompareTable, CodeSnippet, FlowBox } from '../components/Shared.jsx';

export default function DevOpsUnit2() {
  return (
    <div className="flex flex-col">
      <UnitHeader
        title="Unit II — Version Control, Git & SonarQube"
        subtitle="Q11–Q20 • Git, SonarQube, Branching, Merging, GitHub Actions"
        icon={<GitBranch size={24} />}
        color="blue"
      />

      {/* ── CONCEPT 1: Git & Version Control ── */}
      <ConceptSection
        title="Git & Distributed Version Control System (DVCS)"
        questions="Answers Q11, Q13, Q14, Q15, Q16, Q19, Q20"
        qNums={[11,13,14,15,16,19,20]}
        examTip="Draw the Git 3-Tree Architecture: Working Directory → (git add) → Staging Area → (git commit) → Local Repository → (git push) → Remote Repository. Then list and explain 5 Git features: distributed, branching, SHA-1 hashing, staging area, non-linear workflow. Must include all key Git commands."
        Theory={<>
          <p><strong className="text-white">What is Version Control? (Q11):</strong> VCS tracks changes to source code over time — who changed what, when, and why. It enables collaboration, rollback, and branching without overwriting each other's work.</p>
          <div className="bg-slate-900 border border-blue-500/20 rounded-xl p-4">
            <p className="text-xs font-black text-blue-400 mb-3">5 Key Features of Git</p>
            <div className="space-y-2">
              {[
                {f:'1. Distributed',d:'Every developer has a FULL copy of the repo. Work offline. No single point of failure.'},
                {f:'2. Branching & Merging',d:'Create lightweight branches in milliseconds. Merge strategies: Fast-forward, 3-way merge.'},
                {f:'3. SHA-1 Integrity',d:'Every commit has a 40-char SHA-1 hash. Impossible to alter history undetected.'},
                {f:'4. Staging Area (Index)',d:'Intermediate zone. Choose WHICH changes to commit. Fine-grained control.'},
                {f:'5. Non-linear Workflow',d:'Multiple branches in parallel. Feature branches, hotfix branches, release branches.'},
              ].map(({f,d})=>(
                <div key={f} className="flex gap-3 bg-slate-800/40 rounded-lg p-2.5">
                  <span className="text-blue-400 font-black text-[10px] w-40 shrink-0">{f}</span>
                  <span className="text-[10px] text-slate-400">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <p><strong className="text-white">Centralized vs Distributed VCS (Q13):</strong></p>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'CVCS (SVN)',color:'text-orange-400'},
              {label:'DVCS (Git)',color:'text-blue-400'},
            ]}
            rows={[
              ['Repository','Single central server','Every dev has full copy'],
              ['Offline Work','Not possible','Yes — commit, branch offline'],
              ['Performance','Slow (network required)','Fast (local operations)'],
              ['Failure Risk','Server down = no work','Distributed — no SPOF'],
              ['Examples','SVN, CVS, Perforce','Git, Mercurial, Bazaar'],
            ]}
          />
          <p><strong className="text-white">Key Git Commands (Q16, Q19, Q20):</strong></p>
          <CodeSnippet lines={[
            '<span class="text-blue-400"># Initialize and connect</span>',
            '<span class="text-emerald-400">git init</span>           <span class="text-slate-500"># Create local repo</span>',
            '<span class="text-emerald-400">git clone &lt;url&gt;</span>    <span class="text-slate-500"># Copy remote repo locally</span>',
            '<span class="text-emerald-400">git remote add origin &lt;url&gt;</span>',
            '',
            '<span class="text-blue-400"># Stage, Commit, Push</span>',
            '<span class="text-emerald-400">git add .</span>           <span class="text-slate-500"># Stage all changes</span>',
            '<span class="text-emerald-400">git commit -m "msg"</span> <span class="text-slate-500"># Save snapshot</span>',
            '<span class="text-emerald-400">git push origin main</span> <span class="text-slate-500"># Push to remote</span>',
            '',
            '<span class="text-blue-400"># Branching</span>',
            '<span class="text-emerald-400">git branch feature-x</span> <span class="text-slate-500"># Create branch</span>',
            '<span class="text-emerald-400">git checkout -b hotfix</span>',
            '<span class="text-emerald-400">git merge feature-x</span>  <span class="text-slate-500"># Merge branch</span>',
            '',
            '<span class="text-blue-400"># Inspection</span>',
            '<span class="text-emerald-400">git log --oneline --graph</span>',
            '<span class="text-emerald-400">git diff HEAD~1 HEAD</span>',
            '<span class="text-emerald-400">git stash</span>           <span class="text-slate-500"># Temporarily save work</span>',
          ]} />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Git 3-Tree Architecture */}
            <div className="bg-slate-900 border border-blue-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-blue-400 mb-3 text-center">Git 3-Tree Architecture — MUST DRAW THIS</p>
              <div className="flex flex-col gap-0.5">
                {[
                  {name:'Working Directory',desc:'Your actual files on disk',cmd:'git add .',color:'slate',arrow:true},
                  {name:'Staging Area (Index)',desc:'Snapshot of what will be committed',cmd:'git commit -m',color:'indigo',arrow:true},
                  {name:'Local Repository',desc:'.git folder — all commits stored',cmd:'git push',color:'blue',arrow:true},
                  {name:'Remote Repository',desc:'GitHub / GitLab / Bitbucket',cmd:'git pull / fetch',color:'emerald',arrow:false},
                ].map((t,i)=>(
                  <div key={t.name}>
                    <div className={`bg-slate-800 border border-${t.color}-500/30 rounded-xl p-3 flex justify-between items-center`}>
                      <div>
                        <p className={`text-[11px] font-black text-${t.color}-300`}>{t.name}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{t.desc}</p>
                      </div>
                      <code className={`text-[8px] font-mono bg-${t.color}-950/60 text-${t.color}-400 px-2 py-1 rounded`}>{t.cmd}</code>
                    </div>
                    {t.arrow && (
                      <div className="flex flex-col items-center my-1">
                        <ArrowDown size={14} className="text-slate-600"/>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Git Branching Visual */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">Git Branching Model (GitFlow)</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></div>
                  <div className="flex-1 h-0.5 bg-emerald-700/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></div>
                  <span className="text-[9px] font-bold text-emerald-400 w-12 shrink-0">main</span>
                </div>
                <div className="ml-8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                  <div className="flex-1 h-0.5 bg-blue-700/50 border-dashed"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                  <span className="text-[9px] font-bold text-blue-400 w-16 shrink-0">develop</span>
                </div>
                <div className="ml-16 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></div>
                  <div className="flex-1 h-0.5 bg-purple-700/50"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></div>
                  <span className="text-[9px] font-bold text-purple-400 w-20 shrink-0">feature/login</span>
                </div>
                <div className="ml-8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                  <div className="flex-1 h-0.5 bg-red-700/50"></div>
                  <div className="w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                  <span className="text-[9px] font-bold text-red-400 w-16 shrink-0">hotfix/bug</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 text-[8px]">
                {[['main','Prod-ready code'],['develop','Integration branch'],['feature/*','New features'],['hotfix/*','Urgent prod fixes'],['release/*','Pre-release stabilize']].map(([b,d])=>(
                  <div key={b} className="bg-slate-800 rounded px-2 py-1">
                    <span className="text-blue-400 font-mono">{b}</span>
                    <span className="text-slate-500 ml-1">— {d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 2: SonarQube ── */}
      <ConceptSection
        reverse
        title="SonarQube Integration in CI/CD Pipeline"
        questions="Answers Q12, Q17, Q18"
        qNums={[12,17,18]}
        examTip="Draw the SonarQube in CI/CD pipeline flow. Key terms to define: SAST (Static Application Security Testing), Quality Gate, Code Smells, Technical Debt, Coverage Report. The examiner wants to see the pipeline diagram WITH SonarQube positioned between test and deploy stages."
        Theory={<>
          <p><strong className="text-white">What is SonarQube? (Q12)</strong> SonarQube is an open-source platform for <em>continuous inspection</em> of code quality. It performs <strong>SAST (Static Application Security Testing)</strong> — analyzing source code WITHOUT executing it — to detect bugs, vulnerabilities, and maintainability issues.</p>
          <div className="space-y-2">
            {[
              {term:'Quality Gate',desc:'Pass/fail threshold. If code coverage <80% or critical bugs >0, the gate FAILS and pipeline stops.'},
              {term:'Code Smell',desc:'Maintainability issue — overly complex methods, dead code, magic numbers. Leads to Technical Debt.'},
              {term:'Technical Debt',desc:'Time needed to fix all code smells. SonarQube shows this in hours/days.'},
              {term:'Coverage Report',desc:'Integrates with JaCoCo/Istanbul to show % lines covered by unit tests.'},
              {term:'Vulnerability',desc:'Security flaw: SQL injection, hardcoded passwords, insecure randomness, XSS.'},
              {term:'Duplications',desc:'% of code copy-pasted. High duplication = maintainability risk.'},
            ].map(({term,desc})=>(
              <div key={term} className="flex gap-3 bg-slate-800/40 rounded-lg p-2.5">
                <span className="text-orange-400 font-black text-[10px] w-32 shrink-0">{term}</span>
                <span className="text-[10px] text-slate-400">{desc}</span>
              </div>
            ))}
          </div>
          <p><strong className="text-white">SonarQube CI/CD Integration (Q17, Q18):</strong> SonarQube integrates via the <code className="bg-slate-800 px-1 text-orange-300 text-[10px]">sonar-maven-plugin</code> or Sonar Scanner CLI.</p>
          <CodeSnippet lines={[
            '<span class="text-slate-500"># jenkins pipeline stage</span>',
            "<span class='text-orange-400'>stage</span>(<span class='text-emerald-400'>'SonarQube Analysis'</span>) {",
            "  <span class='text-orange-400'>steps</span> {",
            "    <span class='text-blue-400'>withSonarQubeEnv</span>(<span class='text-emerald-400'>'SonarQube'</span>) {",
            "      <span class='text-purple-400'>sh</span> <span class='text-emerald-400'>'mvn sonar:sonar \\'</span>",
            "        <span class='text-emerald-400'>-Dsonar.projectKey=myapp \\'</span>",
            "        <span class='text-emerald-400'>-Dsonar.host.url=http://sonar:9000'</span>",
            "    }",
            "  }",
            "}",
          ]} />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-orange-400 mb-4 text-center">SonarQube in CI/CD — Full Pipeline</p>
              {[
                {l:'1. Developer pushes code → GitHub',icon:'📤',c:'slate'},
                {l:'2. Jenkins detects webhook trigger',icon:'⚙️',c:'indigo'},
                {l:'3. Maven Build (mvn clean install)',icon:'🔨',c:'blue'},
                {l:'4. JUnit Tests (unit test suite)',icon:'🧪',c:'purple'},
                {l:'5. SonarQube SAST Analysis runs',icon:'🔍',c:'orange'},
                {l:'6. Quality Gate Evaluated',icon:'🛡️',c:'yellow'},
              ].map((s,i)=>(
                <div key={i}>
                  <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg p-2">
                    <span>{s.icon}</span>
                    <p className="text-[10px] text-slate-300">{s.l}</p>
                  </div>
                  {i < 5 && <FlowArrow />}
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <div className="flex-1 bg-red-950/40 border border-red-500/40 p-2 rounded text-center">
                  <p className="text-[9px] font-black text-red-400">✗ FAIL → Block Deploy</p>
                  <p className="text-[8px] text-slate-500">Notify developer</p>
                </div>
                <div className="flex-1 bg-emerald-950/40 border border-emerald-500/40 p-2 rounded text-center">
                  <p className="text-[9px] font-black text-emerald-400">✓ PASS → Deploy</p>
                  <p className="text-[8px] text-slate-500">Docker + K8s</p>
                </div>
              </div>
            </div>
            {/* SonarQube Dashboard Summary */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">SonarQube Dashboard (5 Metrics)</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {m:'Reliability',v:'A',c:'emerald',d:'0 Bugs'},
                  {m:'Security',v:'B',c:'yellow',d:'2 Vulns'},
                  {m:'Maintainability',v:'A',c:'emerald',d:'0 Smells'},
                  {m:'Coverage',v:'72%',c:'orange',d:'Target: 80%'},
                  {m:'Duplications',v:'3.2%',c:'blue',d:'Acceptable'},
                  {m:'Gate Status',v:'FAIL',c:'red',d:'Coverage too low'},
                ].map(({m,v,c,d})=>(
                  <div key={m} className={`bg-${c}-950/20 border border-${c}-700/30 rounded-lg p-2`}>
                    <p className="text-[9px] text-slate-400">{m}</p>
                    <p className={`text-sm font-black text-${c}-400 mt-0.5`}>{v}</p>
                    <p className="text-[8px] text-slate-500">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
