import { Cloud, ArrowDown, ArrowRight } from 'lucide-react';
import { UnitHeader, ConceptSection, FlowArrow, CompareTable, FlowBox } from '../components/Shared.jsx';

export default function CloudUnit1() {
  return (
    <div className="flex flex-col">
      <UnitHeader
        title="Cloud Computing — Unit I"
        subtitle="CC Q1–Q25 • Virtualization, SOA, Service Models, AWS/Azure, Hypervisors, Live Migration"
        icon={<Cloud size={24} />}
        color="sky"
      />

      {/* ── CONCEPT 1: Virtualization ── */}
      <ConceptSection
        title="Virtualization — Types, Hypervisors & Live Migration"
        questions="Answers CC Q1, Q2, Q3, Q4, Q5, Q6, Q7"
        qNums={['CC1','CC2','CC3','CC4','CC5','CC6','CC7']}
        crossRef="Also DevOps Unit 4 (Docker)"
        examTip="Draw the Hypervisor stack: Type 1 (bare metal — VMware ESXi) vs Type 2 (hosted — VirtualBox). Then draw Live Migration diagram: VM state transfer from Host A to Host B while running. Must explain 5 types of virtualization (Full, Para, OS-level, Hardware, Memory). This topic appears in BOTH subjects."
        Theory={<>
          <p><strong className="text-white">Virtualization (CC Q1):</strong> Virtualization creates abstract versions of physical hardware, allowing multiple virtual machines (VMs) to run on a single physical server. Each VM has its own isolated OS, CPU, memory, and network stack.</p>
          <div className="bg-slate-900 border border-sky-500/20 rounded-xl p-4">
            <p className="text-xs font-black text-sky-400 mb-3">5 Types of Virtualization</p>
            <div className="space-y-2">
              {[
                {t:'Full Virtualization',d:'Complete simulation of hardware. Guest OS unchanged. Uses binary translation. Example: VMware Workstation.'},
                {t:'Para-Virtualization',d:'Guest OS modified to communicate directly with hypervisor via hypercalls. Faster than full. Example: Xen hypervisor.'},
                {t:'OS-Level Virtualization',d:'Single OS kernel creates isolated namespaces (containers). No separate OS per container. Example: Docker, LXC.'},
                {t:'Hardware Virtualization',d:'CPU has virtualization extensions (Intel VT-x, AMD-V). Allows VMs to run privileged instructions directly.'},
                {t:'Memory Virtualization',d:'Physical memory divided into pages. Virtual addresses mapped to physical via Memory Management Unit (MMU).'},
              ].map(({t,d})=>(
                <div key={t} className="flex gap-3 bg-slate-800/40 rounded-lg p-2.5">
                  <span className="text-sky-400 font-black text-[10px] w-36 shrink-0">{t}</span>
                  <span className="text-[10px] text-slate-400">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'Type 1 Hypervisor',color:'text-sky-400'},
              {label:'Type 2 Hypervisor',color:'text-purple-400'},
            ]}
            rows={[
              ['Install Location','Directly on hardware (bare metal)','On top of host OS'],
              ['Performance','High (no host OS overhead)','Lower (extra OS layer)'],
              ['Examples','VMware ESXi, Microsoft Hyper-V, KVM','VirtualBox, VMware Workstation'],
              ['Use Case','Production datacenters','Dev/test environments'],
            ]}
          />
          <p><strong className="text-white">Live Migration (CC Q6, Q7):</strong> Moving a running VM from one physical host to another <em>without downtime</em>. Process: Pre-copy memory pages → Transfer CPU state → Switch networking → Complete.</p>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Hypervisor Types */}
            <div className="bg-slate-900 border border-sky-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-sky-400 mb-3 text-center">Hypervisor Types — DRAW THIS</p>
              <div className="flex gap-3">
                {/* Type 1 */}
                <div className="flex-1">
                  <p className="text-[9px] font-black text-sky-400 text-center mb-1">Type 1 (Bare Metal)</p>
                  <div className="space-y-1">
                    {[{l:'VM1  |  VM2',c:'blue'},{l:'Hypervisor (ESXi)',c:'sky'},{l:'Hardware (Physical Server)',c:'slate'}].map(({l,c})=>(
                      <div key={l} className={`bg-${c}-950/40 border border-${c}-700/30 rounded px-2 py-1.5 text-center text-[9px] font-bold text-${c}-300`}>{l}</div>
                    ))}
                  </div>
                  <p className="text-[7px] text-emerald-400 text-center mt-1">✓ High Performance</p>
                </div>
                <div className="w-px bg-slate-700"></div>
                {/* Type 2 */}
                <div className="flex-1">
                  <p className="text-[9px] font-black text-purple-400 text-center mb-1">Type 2 (Hosted)</p>
                  <div className="space-y-1">
                    {[{l:'VM1  |  VM2',c:'purple'},{l:'Hypervisor (VirtualBox)',c:'violet'},{l:'Host OS (Windows/Linux)',c:'indigo'},{l:'Hardware',c:'slate'}].map(({l,c})=>(
                      <div key={l} className={`bg-${c}-950/40 border border-${c}-700/30 rounded px-2 py-1.5 text-center text-[9px] font-bold text-${c}-300`}>{l}</div>
                    ))}
                  </div>
                  <p className="text-[7px] text-yellow-400 text-center mt-1">⚠ Extra OS overhead</p>
                </div>
              </div>
            </div>
            {/* Live Migration Diagram */}
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-emerald-400 mb-3 text-center">VM Live Migration (Zero Downtime)</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-800 border border-slate-600 rounded-xl p-2">
                  <p className="text-[9px] font-black text-slate-300 text-center">Host A (Source)</p>
                  <div className="bg-sky-950/40 border border-sky-700/30 rounded px-2 py-1 mt-1 text-center">
                    <p className="text-[8px] font-bold text-sky-300">🔧 Running VM</p>
                    <p className="text-[7px] text-slate-500">Memory: 4GB<br/>CPU State<br/>Disk: NFS</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex gap-1">
                    {[1,2,3].map(i=>(
                      <div key={i} className="w-2 h-0.5 bg-emerald-500 animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>
                    ))}
                  </div>
                  <ArrowRight size={14} className="text-emerald-500"/>
                  <p className="text-[7px] text-emerald-400 text-center">Memory<br/>Copy</p>
                </div>
                <div className="flex-1 bg-emerald-950/10 border border-emerald-600/30 rounded-xl p-2">
                  <p className="text-[9px] font-black text-emerald-300 text-center">Host B (Target)</p>
                  <div className="bg-emerald-950/40 border border-emerald-700/30 rounded px-2 py-1 mt-1 text-center">
                    <p className="text-[8px] font-bold text-emerald-300">✅ VM Active Here</p>
                    <p className="text-[7px] text-slate-500">All state copied<br/>Shared NFS disk<br/>IP stays same</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 space-y-0.5 text-[8px]">
                {['1. Pre-copy: Copy memory pages to Host B while VM still runs on A','2. Suspend VM on A → Copy remaining dirty pages → Copy CPU state','3. Resume VM on Host B — total downtime: milliseconds'].map((s,i)=>(
                  <p key={i} className="text-slate-500">{s}</p>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 2: Cloud Service Models ── */}
      <ConceptSection
        reverse
        title="Cloud Service Models — IaaS, PaaS, SaaS"
        questions="Answers CC Q8, Q9, Q10, Q11, Q12, Q13"
        qNums={['CC8','CC9','CC10','CC11','CC12','CC13']}
        examTip="Draw the service model pyramid: IaaS at base (manage everything yourself), PaaS in middle (manage only app + data), SaaS at top (consume fully). Then list 5 cloud characteristics (NIST definition). List providers for each model. Know the responsibility model: who manages what."
        Theory={<>
          <p><strong className="text-white">NIST Definition of Cloud (CC Q8):</strong> Cloud Computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources. <strong>5 Essential Characteristics:</strong></p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              {c:'On-Demand Self-Service',d:'Provision resources without human intervention'},
              {c:'Broad Network Access',d:'Access over network via standard mechanisms'},
              {c:'Resource Pooling',d:'Multi-tenant model — shared physical resources'},
              {c:'Rapid Elasticity',d:'Scale up/down automatically with demand'},
              {c:'Measured Service',d:'Pay-per-use metering (compute hours, storage GB)'},
            ].map(({c,d})=>(
              <div key={c} className="bg-slate-800 border border-slate-700 rounded-lg p-2">
                <p className="text-[10px] font-black text-sky-400">{c}</p>
                <p className="text-[9px] text-slate-500 mt-0.5">{d}</p>
              </div>
            ))}
          </div>
          <CompareTable
            headers={[
              {label:'Layer',color:'text-slate-400'},
              {label:'IaaS',color:'text-orange-400'},
              {label:'PaaS',color:'text-blue-400'},
              {label:'SaaS',color:'text-emerald-400'},
            ]}
            rows={[
              ['You manage','OS, Runtime, Apps, Data','App + Data only','Nothing — just use it'],
              ['Provider manages','Hardware, Network, Storage','+ OS, Runtime, Middleware','Everything'],
              ['Examples','AWS EC2, Azure VM, GCP Compute','Heroku, Google App Engine','Gmail, Salesforce, Zoom'],
              ['Best for','Full control needed','Developers (no infra worry)','End users'],
            ]}
          />
          <p><strong className="text-white">Cloud Deployment Models (CC Q9):</strong></p>
          <div className="grid grid-cols-2 gap-2">
            {[
              {m:'Public Cloud',d:'Shared, owned by provider (AWS/Azure/GCP). Cost efficient.',c:'blue'},
              {m:'Private Cloud',d:'Dedicated to one organization. On-premises or hosted. High security.',c:'purple'},
              {m:'Hybrid Cloud',d:'Mix of public + private. Burst workloads to public. Best of both.',c:'emerald'},
              {m:'Multi-Cloud',d:'Using multiple cloud providers simultaneously. Avoid vendor lock-in.',c:'orange'},
            ].map(({m,d,c})=>(
              <div key={m} className={`bg-${c}-950/20 border border-${c}-700/30 rounded-lg p-2`}>
                <p className={`text-[10px] font-black text-${c}-400`}>{m}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{d}</p>
              </div>
            ))}
          </div>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Service Model Pyramid */}
            <div className="bg-slate-900 border border-sky-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-sky-400 mb-3 text-center">Cloud Service Model Stack</p>
              <div className="flex flex-col gap-1">
                {/* SaaS */}
                <div className="bg-emerald-950/30 border border-emerald-700/40 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-black text-emerald-400">SaaS</p>
                    <span className="text-[8px] text-slate-500">Gmail, Zoom, Salesforce</span>
                  </div>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {['Applications','(Fully Managed)'].map(t=>(
                      <span key={t} className="text-[7px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-bold">{t}</span>
                    ))}
                  </div>
                </div>
                {/* PaaS */}
                <div className="bg-blue-950/30 border border-blue-700/40 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-black text-blue-400">PaaS</p>
                    <span className="text-[8px] text-slate-500">Heroku, Google App Engine</span>
                  </div>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {['Your App','Your Data','Runtime ✓','OS ✓','Hardware ✓'].map((t,i)=>(
                      <span key={t} className={`text-[7px] px-1.5 py-0.5 rounded font-bold ${i<2 ? 'bg-blue-950 text-blue-300' : 'bg-slate-800 text-slate-500'}`}>{t}</span>
                    ))}
                  </div>
                </div>
                {/* IaaS */}
                <div className="bg-orange-950/30 border border-orange-700/40 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-black text-orange-400">IaaS</p>
                    <span className="text-[8px] text-slate-500">AWS EC2, Azure VM</span>
                  </div>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {['Your App','Your OS','Your Runtime','Storage ✓','Network ✓','Hardware ✓'].map((t,i)=>(
                      <span key={t} className={`text-[7px] px-1.5 py-0.5 rounded font-bold ${i<3 ? 'bg-orange-950 text-orange-300' : 'bg-slate-800 text-slate-500'}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[8px] text-slate-500 text-center mt-2">🔵 = You manage &nbsp; ⬜ = Provider manages</p>
            </div>
            {/* Hybrid Cloud Architecture */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">Hybrid Cloud Architecture</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-purple-950/30 border border-purple-700/40 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-purple-400">Private Cloud</p>
                  <p className="text-[7px] text-slate-500 mt-0.5">Sensitive data<br/>Core systems<br/>Full control</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <ArrowRight size={12} className="text-slate-600"/>
                  <p className="text-[7px] text-slate-600">VPN / Direct Connect</p>
                  <ArrowRight size={12} className="text-slate-600 rotate-180"/>
                </div>
                <div className="flex-1 bg-blue-950/20 border border-blue-700/30 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-blue-400">Public Cloud</p>
                  <p className="text-[7px] text-slate-500 mt-0.5">Burst workloads<br/>Dev/test envs<br/>Cost efficient</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 3: SOA & REST ── */}
      <ConceptSection
        title="SOA, Web Services & REST Architecture"
        questions="Answers CC Q14, Q15, Q16, Q17, Q18, Q19"
        qNums={['CC14','CC15','CC16','CC17','CC18','CC19']}
        examTip="Draw the SOA triangle: Service Provider (publishes WSDL to UDDI), Service Broker (UDDI registry), Service Consumer (binds to provider). For REST, draw the HTTP methods table (GET/POST/PUT/DELETE). Compare SOAP vs REST — this is a guaranteed 4-mark comparison in the exam."
        Theory={<>
          <p><strong className="text-white">SOA — Service Oriented Architecture (CC Q14):</strong> SOA is an architectural style where software components expose functionality as <em>interoperable services</em> over a network. Services communicate via standard protocols (SOAP, REST).</p>
          <div className="bg-slate-900 border border-violet-500/20 rounded-xl p-4 mb-3">
            <p className="text-xs font-black text-violet-400 mb-2">SOA Triangle — 3 Roles</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                {role:'Service Provider',desc:'Creates & publishes the service. Hosts WSDL (descriptor). Example: Weather Service API.',color:'blue'},
                {role:'Service Broker',desc:'UDDI Registry. Stores service descriptions. Like a yellow-pages directory.',color:'purple'},
                {role:'Service Consumer',desc:'Client application. Discovers service from broker, binds to provider, calls the service.',color:'emerald'},
              ].map(({role,desc,color})=>(
                <div key={role} className={`bg-${color}-950/20 border border-${color}-700/30 rounded-lg p-2 text-center`}>
                  <p className={`text-[9px] font-black text-${color}-400`}>{role}</p>
                  <p className="text-[7px] text-slate-500 mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'SOAP',color:'text-blue-400'},
              {label:'REST',color:'text-emerald-400'},
            ]}
            rows={[
              ['Protocol','SOAP (XML-based)','HTTP with JSON/XML'],
              ['Format','XML (verbose)','JSON (lightweight)'],
              ['State','Stateful or Stateless','Always Stateless'],
              ['Security','WS-Security (built-in)','HTTPS + OAuth2'],
              ['Performance','Slower (XML overhead)','Faster (JSON)'],
              ['Standard','W3C Standard','Architectural style'],
            ]}
          />
          <p><strong className="text-white">REST Principles (CC Q16, Q17):</strong> REST = Representational State Transfer. 6 constraints: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, Code on Demand (optional).</p>
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-3">
            <p className="text-[10px] font-black text-emerald-400 mb-2">HTTP Methods in REST</p>
            <div className="space-y-1">
              {[['GET','/users','Retrieve a resource — Safe, Idempotent'],['POST','/users','Create new resource — Not idempotent'],['PUT','/users/1','Update entire resource — Idempotent'],['PATCH','/users/1','Partial update'],['DELETE','/users/1','Remove resource — Idempotent']].map(([method,path,desc])=>(
                <div key={method} className="flex gap-2 items-center">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded w-12 text-center ${method==='GET'?'bg-emerald-950 text-emerald-400':method==='POST'?'bg-blue-950 text-blue-400':method==='PUT'?'bg-yellow-950 text-yellow-400':method==='PATCH'?'bg-orange-950 text-orange-400':'bg-red-950 text-red-400'}`}>{method}</span>
                  <code className="text-[8px] text-slate-400 font-mono w-20">{path}</code>
                  <span className="text-[8px] text-slate-500">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* SOA Triangle */}
            <div className="bg-slate-900 border border-violet-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-violet-400 mb-3 text-center">SOA Architecture Triangle</p>
              {/* Broker at top */}
              <div className="flex justify-center mb-3">
                <div className="bg-purple-950/40 border border-purple-600/50 rounded-xl px-4 py-2 text-center">
                  <p className="text-[10px] font-black text-purple-400">🗂️ Service Broker</p>
                  <p className="text-[7px] text-slate-500">UDDI Registry</p>
                </div>
              </div>
              {/* Arrows */}
              <div className="flex justify-between px-8 mb-1">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-px bg-violet-700/40"></div>
                  <ArrowDown size={10} className="text-violet-600 -mt-0.5"/>
                  <span className="text-[7px] text-violet-400">1. PUBLISH<br/>WSDL</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-px bg-violet-700/40"></div>
                  <ArrowDown size={10} className="text-violet-600 -mt-0.5"/>
                  <span className="text-[7px] text-violet-400">2. FIND<br/>Service</span>
                </div>
              </div>
              {/* Bottom row */}
              <div className="flex gap-2">
                <div className="flex-1 bg-blue-950/30 border border-blue-700/40 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-blue-400">Service Provider</p>
                  <p className="text-[7px] text-slate-500">Hosts service<br/>Exposes WSDL</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <ArrowRight size={10} className="text-emerald-600"/>
                  <span className="text-[6px] text-emerald-400">3. BIND<br/>& CALL</span>
                  <ArrowRight size={10} className="text-emerald-600 rotate-180"/>
                </div>
                <div className="flex-1 bg-emerald-950/20 border border-emerald-700/30 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-emerald-400">Service Consumer</p>
                  <p className="text-[7px] text-slate-500">Client app<br/>Uses service</p>
                </div>
              </div>
            </div>
            {/* REST Request Flow */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">REST API Call Flow</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-slate-300">Client</p>
                  <code className="text-[7px] text-blue-400 font-mono">GET /api/users/1<br/>Accept: application/json</code>
                </div>
                <div className="flex flex-col gap-0.5 items-center">
                  <div className="flex items-center gap-1">
                    <ArrowRight size={10} className="text-sky-500"/>
                    <span className="text-[7px] text-sky-400">HTTP Request</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[7px] text-emerald-400">HTTP Response</span>
                    <ArrowRight size={10} className="text-emerald-500 rotate-180"/>
                  </div>
                </div>
                <div className="flex-1 bg-sky-950/20 border border-sky-700/30 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-sky-300">REST API Server</p>
                  <code className="text-[7px] text-emerald-400 font-mono">200 OK<br/>&#123;"id":1,"name":"Ayaz"&#125;</code>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 4: AWS Architecture ── */}
      <ConceptSection
        reverse
        title="AWS & Azure Cloud Architecture"
        questions="Answers CC Q20, Q21, Q22, Q23, Q24, Q25"
        qNums={['CC20','CC21','CC22','CC23','CC24','CC25']}
        examTip="Know AWS core services by category (Compute: EC2, Lambda; Storage: S3, EBS; Database: RDS, DynamoDB; Network: VPC, Route53, CloudFront). Draw a 3-tier web architecture on AWS: Internet → Route53 → CloudFront → ALB → EC2 instances → RDS. This diagram is worth 6 marks."
        Theory={<>
          <p><strong className="text-white">AWS Core Services (CC Q20–Q22):</strong></p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              {cat:'Compute',services:'EC2, Lambda, ECS, EKS, Elastic Beanstalk',c:'orange'},
              {cat:'Storage',services:'S3 (object), EBS (block), EFS (file), Glacier (archive)',c:'blue'},
              {cat:'Database',services:'RDS (SQL), DynamoDB (NoSQL), ElastiCache (Redis), Redshift',c:'purple'},
              {cat:'Networking',services:'VPC, Route53 (DNS), CloudFront (CDN), ALB, API Gateway',c:'emerald'},
              {cat:'Security',services:'IAM, KMS, Shield, WAF, Security Groups, NACLs',c:'red'},
              {cat:'Monitoring',services:'CloudWatch, CloudTrail, Config, X-Ray, Trusted Advisor',c:'yellow'},
            ].map(({cat,services,c})=>(
              <div key={cat} className={`bg-${c}-950/20 border border-${c}-700/30 rounded-lg p-2`}>
                <p className={`text-[10px] font-black text-${c}-400`}>{cat}</p>
                <p className="text-[8px] text-slate-500 mt-0.5">{services}</p>
              </div>
            ))}
          </div>
          <p><strong className="text-white">Azure vs AWS (CC Q23, Q25):</strong></p>
          <CompareTable
            headers={[
              {label:'Service',color:'text-slate-400'},
              {label:'AWS',color:'text-orange-400'},
              {label:'Azure',color:'text-blue-400'},
            ]}
            rows={[
              ['VM Compute','EC2','Azure Virtual Machine'],
              ['Object Storage','S3','Azure Blob Storage'],
              ['Managed K8s','EKS','AKS (Azure K8s Service)'],
              ['Serverless','Lambda','Azure Functions'],
              ['DNS','Route53','Azure DNS'],
              ['CDN','CloudFront','Azure CDN'],
              ['Database','RDS','Azure SQL Database'],
            ]}
          />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* AWS 3-Tier Architecture */}
            <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-orange-400 mb-3 text-center">AWS 3-Tier Web Architecture — DRAW THIS</p>
              <div className="flex flex-col gap-1">
                {[
                  {layer:'Internet',services:['Users'],c:'slate'},
                  {layer:'DNS Layer',services:['Route53 (DNS routing)'],c:'blue',arrow:'↓'},
                  {layer:'CDN Layer',services:['CloudFront (CDN, Edge)'],c:'yellow',arrow:'↓'},
                  {layer:'Load Balancer',services:['ALB (Application Load Balancer)'],c:'orange',arrow:'↓'},
                  {layer:'Web Tier (AZ1 + AZ2)',services:['EC2 Auto Scaling Group','Nginx Servers'],c:'indigo',arrow:'↓'},
                  {layer:'App Tier (Private Subnet)',services:['EC2 App Servers','Spring Boot / Node.js'],c:'purple',arrow:'↓'},
                  {layer:'Data Tier (Private)',services:['RDS (primary)','RDS (standby) + ElastiCache'],c:'emerald'},
                ].map((l,i)=>(
                  <div key={l.layer}>
                    <div className={`bg-${l.c}-950/20 border border-${l.c}-700/30 rounded-xl p-2`}>
                      <p className={`text-[8px] font-black text-${l.c}-400 mb-1`}>{l.layer}</p>
                      <div className="flex flex-wrap gap-1">
                        {l.services.map(s=>(
                          <span key={s} className={`text-[7px] bg-${l.c}-950/50 text-${l.c}-300 px-1.5 py-0.5 rounded font-bold`}>{s}</span>
                        ))}
                      </div>
                    </div>
                    {i < 6 && <FlowArrow />}
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
