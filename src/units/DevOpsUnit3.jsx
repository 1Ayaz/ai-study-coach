import { Settings, ArrowRight, ArrowDown } from 'lucide-react';
import { UnitHeader, ConceptSection, FlowArrow, CompareTable, CodeSnippet } from '../components/Shared.jsx';

export default function DevOpsUnit3() {
  return (
    <div className="flex flex-col">
      <UnitHeader
        title="Unit III — Jenkins & CI/CD Pipelines"
        subtitle="Q21–Q30 • Jenkins Architecture, Pipelines, Master-Slave, Automation"
        icon={<Settings size={24} />}
        color="orange"
      />

      {/* ── CONCEPT 1: Jenkins Architecture ── */}
      <ConceptSection
        title="Jenkins Architecture & Master-Slave Setup"
        questions="Answers Q21, Q22, Q23, Q28, Q29"
        qNums={[21,22,23,28,29]}
        examTip="Draw Jenkins Master-Slave architecture with 3 agents. Label: Master (schedules jobs, stores configs, UI), Agents (execute build jobs). Show JNLP / SSH connection. Then draw the Jenkins Pipeline stages: SCM Poll → Build → Test → SonarQube → Docker Build → Push → Deploy. This diagram alone = 6 marks."
        Theory={<>
          <p><strong className="text-white">Jenkins (Q21):</strong> Jenkins is an open-source automation server written in Java. It automates the CI/CD pipeline — from code commit to production deployment. Over 1800+ plugins make it the most widely used CI tool.</p>
          <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-4">
            <p className="text-xs font-black text-orange-400 mb-3">Jenkins Key Components</p>
            <div className="space-y-2">
              {[
                {c:'Master Node',d:'Controls build orchestration. Exposes web UI (:8080). Schedules jobs, monitors agents, records results. Does NOT run builds itself (best practice).'},
                {c:'Agent/Slave Nodes',d:'Execute the actual build, test, deploy steps. Connected via SSH or JNLP (Java Web Start). Supports Windows, Linux, Docker agents.'},
                {c:'Jenkins Job',d:'An automated task. Types: Freestyle Job, Pipeline Job, Multibranch Pipeline, Folder.'},
                {c:'Jenkinsfile',d:'Pipeline-as-Code. Defines stages in Groovy DSL. Stored IN the source code repository.'},
                {c:'Plugins',d:'Extend Jenkins: Git plugin, Maven plugin, Docker plugin, SonarQube Scanner plugin, Email Notification plugin.'},
              ].map(({c,d})=>(
                <div key={c} className="flex gap-3 bg-slate-800/40 rounded-lg p-2.5">
                  <span className="text-orange-400 font-black text-[10px] w-36 shrink-0">{c}</span>
                  <span className="text-[10px] text-slate-400">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <p><strong className="text-white">Master-Slave Architecture Benefits (Q22, Q23):</strong></p>
          <div className="grid grid-cols-2 gap-2">
            {[
              {t:'Parallel Execution',d:'Multiple jobs run simultaneously on different agents'},
              {t:'Platform Diversity',d:'Agent on Linux for builds, Windows for .NET, Mac for iOS'},
              {t:'Load Distribution',d:'Heavy builds delegated to powerful agent nodes'},
              {t:'Scalability',d:'Add agents as workload grows without changing master'},
            ].map(({t,d})=>(
              <div key={t} className="bg-slate-800 border border-slate-700 rounded-lg p-2">
                <p className="text-[10px] font-black text-orange-400">{t}</p>
                <p className="text-[9px] text-slate-500 mt-0.5">{d}</p>
              </div>
            ))}
          </div>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Master-Slave Architecture */}
            <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-orange-400 mb-3 text-center">Jenkins Master-Slave Architecture</p>
              {/* Master */}
              <div className="bg-orange-950/30 border border-orange-600/40 rounded-xl p-3 text-center mb-3">
                <p className="text-[11px] font-black text-orange-400">🏛️ JENKINS MASTER</p>
                <p className="text-[8px] text-slate-400 mt-1">Port 8080 | Schedules Jobs | Stores Configs</p>
                <div className="flex justify-center gap-3 mt-2">
                  <span className="text-[8px] bg-orange-950 px-1.5 py-0.5 rounded text-orange-300">Web UI</span>
                  <span className="text-[8px] bg-orange-950 px-1.5 py-0.5 rounded text-orange-300">Job Scheduler</span>
                  <span className="text-[8px] bg-orange-950 px-1.5 py-0.5 rounded text-orange-300">Build Reports</span>
                </div>
              </div>
              {/* SSH/JNLP lines */}
              <div className="flex justify-center gap-8 mb-2">
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-slate-600"></div>
                  <span className="text-[7px] text-slate-600">SSH</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-slate-600"></div>
                  <span className="text-[7px] text-slate-600">JNLP</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-slate-600"></div>
                  <span className="text-[7px] text-slate-600">SSH</span>
                </div>
              </div>
              {/* Agents */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  {name:'Agent 1',desc:'Linux Build Agent',jobs:['Build Java','Run Tests']},
                  {name:'Agent 2',desc:'Docker Agent',jobs:['Build Image','Push Registry']},
                  {name:'Agent 3',desc:'Deploy Agent',jobs:['SSH to EC2','kubectl apply']},
                ].map(a=>(
                  <div key={a.name} className="bg-slate-800 border border-slate-600 rounded-xl p-2 text-center">
                    <p className="text-[10px] font-black text-slate-300">{a.name}</p>
                    <p className="text-[7px] text-slate-500">{a.desc}</p>
                    <div className="mt-1 space-y-0.5">
                      {a.jobs.map(j=>(
                        <div key={j} className="text-[7px] bg-slate-700 rounded px-1 py-0.5 text-slate-400">{j}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jenkins Pipeline Stages */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">Full Jenkins Pipeline Stages</p>
              <div className="flex flex-col gap-0.5">
                {[
                  {s:'SCM Checkout',d:'git clone from GitHub (webhook trigger)',c:'blue'},
                  {s:'Maven Build',d:'mvn clean package -DskipTests',c:'indigo'},
                  {s:'Unit Tests',d:'mvn test (JUnit + JaCoCo coverage)',c:'purple'},
                  {s:'SonarQube Analysis',d:'mvn sonar:sonar → Quality Gate',c:'orange'},
                  {s:'Docker Build',d:'docker build -t user/app:tag .',c:'cyan'},
                  {s:'Docker Push',d:'docker push to Docker Hub / ECR',c:'blue'},
                  {s:'Deploy to EC2/K8s',d:'SSH + docker run / kubectl apply',c:'emerald'},
                ].map((stage,i)=>(
                  <div key={stage.s}>
                    <div className={`flex items-center gap-2 bg-${stage.c}-950/20 border border-${stage.c}-700/20 rounded-lg p-2`}>
                      <span className={`text-[9px] font-black text-${stage.c}-400 w-32 shrink-0`}>{stage.s}</span>
                      <span className="text-[9px] text-slate-500">{stage.d}</span>
                    </div>
                    {i < 6 && <FlowArrow />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 2: Jenkinsfile / Pipeline as Code ── */}
      <ConceptSection
        reverse
        title="Jenkinsfile — Pipeline as Code"
        questions="Answers Q24, Q25, Q26, Q27, Q30"
        qNums={[24,25,26,27,30]}
        examTip="Write the Declarative Jenkinsfile structure from memory: pipeline > agent > stages > stage > steps. Know: Scripted vs Declarative difference. Know all 5 types of Jenkins Jobs. The Jenkinsfile code snippet is worth 4+ marks if written correctly."
        Theory={<>
          <p><strong className="text-white">Pipeline as Code:</strong> Instead of configuring builds in the GUI, you define the entire CI/CD pipeline in a <code className="bg-slate-800 text-orange-300 text-[10px] px-1">Jenkinsfile</code> stored in your Git repository. Benefits: version-controlled, peer-reviewed, reproducible.</p>
          <CompareTable
            headers={[
              {label:'',color:'text-slate-400'},
              {label:'Declarative Pipeline',color:'text-orange-400'},
              {label:'Scripted Pipeline',color:'text-blue-400'},
            ]}
            rows={[
              ['Syntax','Structured, opinionated','Full Groovy DSL — flexible'],
              ['Learning','Easier for beginners','Requires Groovy knowledge'],
              ['Error Handling','Built-in post blocks','Try-catch blocks'],
              ['Best For','Standard CI/CD pipelines','Complex logic, conditions'],
            ]}
          />
          <CodeSnippet lines={[
            '<span class="text-slate-500">// Declarative Jenkinsfile</span>',
            "<span class='text-orange-400'>pipeline</span> {",
            "  <span class='text-blue-400'>agent</span> any",
            "  <span class='text-blue-400'>environment</span> { APP_NAME = <span class='text-emerald-400'>'myapp'</span> }",
            "  <span class='text-blue-400'>stages</span> {",
            "    <span class='text-orange-400'>stage</span>(<span class='text-emerald-400'>'Build'</span>) {",
            "      <span class='text-blue-400'>steps</span> { sh <span class='text-emerald-400'>'mvn clean package'</span> }",
            "    }",
            "    <span class='text-orange-400'>stage</span>(<span class='text-emerald-400'>'Test'</span>) {",
            "      <span class='text-blue-400'>steps</span> { sh <span class='text-emerald-400'>'mvn test'</span> }",
            "    }",
            "    <span class='text-orange-400'>stage</span>(<span class='text-emerald-400'>'Docker Build & Push'</span>) {",
            "      <span class='text-blue-400'>steps</span> {",
            "        sh <span class='text-emerald-400'>'docker build -t user/app .'</span>",
            "        sh <span class='text-emerald-400'>'docker push user/app'</span>",
            "      }",
            "    }",
            "  }",
            "  <span class='text-blue-400'>post</span> {",
            "    <span class='text-purple-400'>always</span> { <span class='text-orange-400'>cleanWs</span>() }",
            "    <span class='text-purple-400'>failure</span> { <span class='text-orange-400'>emailext</span> to: <span class='text-emerald-400'>'team@mail.com'</span> }",
            "  }",
            "}",
          ]} />
          <p><strong className="text-white">Jenkins Job Types:</strong> Freestyle (GUI config), Pipeline (Jenkinsfile), Multibranch Pipeline (auto-detects branches), Organization Folder (entire GitHub org), External Job (monitors external task).</p>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Declarative Syntax Tree */}
            <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-orange-400 mb-3">Declarative Pipeline Structure</p>
              <div className="space-y-1 font-mono text-[10px]">
                <div className="text-orange-400 font-bold">pipeline &#123;</div>
                <div className="ml-4 text-blue-400">agent any</div>
                <div className="ml-4 text-blue-400">environment &#123; KEY = 'value' &#125;</div>
                <div className="ml-4 text-blue-400">stages &#123;</div>
                <div className="ml-8 text-orange-400">stage('Build') &#123;</div>
                <div className="ml-12 text-emerald-400">steps &#123; sh 'mvn package' &#125;</div>
                <div className="ml-8 text-orange-400">&#125;</div>
                <div className="ml-8 text-orange-400">stage('Test') &#123; ... &#125;</div>
                <div className="ml-8 text-orange-400">stage('Deploy') &#123; ... &#125;</div>
                <div className="ml-4 text-blue-400">&#125;</div>
                <div className="ml-4 text-purple-400">post &#123;</div>
                <div className="ml-8 text-slate-400">always &#123; cleanWs() &#125;</div>
                <div className="ml-8 text-slate-400">failure &#123; emailext(...) &#125;</div>
                <div className="ml-4 text-purple-400">&#125;</div>
                <div className="text-orange-400 font-bold">&#125;</div>
              </div>
            </div>
            {/* Webhook Flow */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">Webhook Trigger Flow</p>
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {[
                  {l:'Dev git push',c:'slate'},
                  {l:'GitHub Webhook',c:'orange'},
                  {l:'Jenkins Job Triggered',c:'blue'},
                  {l:'Pipeline Executes',c:'indigo'},
                  {l:'Slack/Email Alert',c:'emerald'},
                ].map((s,i,arr)=>(
                  <div key={s.l} className="flex items-center gap-1">
                    <div className={`bg-${s.c}-950/40 border border-${s.c}-600/30 text-${s.c}-300 text-[8px] font-bold px-2 py-1.5 rounded text-center`}>{s.l}</div>
                    {i < arr.length - 1 && <ArrowRight size={10} className="text-slate-600 shrink-0"/>}
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
