import { Server, ArrowDown, ArrowRight } from 'lucide-react';
import { UnitHeader, ConceptSection, FlowArrow, CompareTable, CodeSnippet } from '../components/Shared.jsx';

export default function DevOpsUnit5() {
  return (
    <div className="flex flex-col">
      <UnitHeader
        title="Unit V — Ansible & Kubernetes"
        subtitle="Q46–Q55 • Configuration Management, Infrastructure as Code, Container Orchestration"
        icon={<Server size={24} />}
        color="green"
      />

      {/* ── CONCEPT 1: Ansible ── */}
      <ConceptSection
        title="Ansible — Configuration Management & IaC"
        questions="Answers Q46, Q47, Q48, Q49, Q50"
        qNums={[46,47,48,49,50]}
        examTip="Draw Ansible architecture: Control Node → (SSH) → Managed Nodes (no agent needed!). Then write a sample Playbook YAML — say 6 marks for drawing + explaining. Key advantage to mention: Agentless (uses SSH, not daemon). Know: Inventory, Playbook, Roles, Modules, Ad-hoc commands."
        Theory={<>
          <p><strong className="text-white">What is Ansible? (Q46):</strong> Ansible is an open-source <strong>Configuration Management</strong> and <strong>Infrastructure as Code (IaC)</strong> tool. It automates server provisioning, software installation, and configuration — without requiring any agent on managed nodes. It uses <strong>SSH</strong> for communication.</p>
          <div className="bg-slate-900 border border-green-500/20 rounded-xl p-4">
            <p className="text-xs font-black text-green-400 mb-3">Ansible Key Concepts</p>
            <div className="space-y-2">
              {[
                {c:'Inventory',d:'List of managed hosts (IP/hostnames) in /etc/ansible/hosts or custom inventory file. Supports groups: [webservers], [dbservers].'},
                {c:'Playbook',d:'YAML file containing ordered list of plays. Each play targets hosts and defines tasks. Human-readable format.'},
                {c:'Play',d:'Maps a group of hosts to roles/tasks. Multiple plays in one playbook is possible.'},
                {c:'Task',d:'A single unit of action (install nginx, start service, copy file). Uses Ansible Modules.'},
                {c:'Module',d:'Pre-built action: apt (install packages), copy (transfer files), service (manage services), template (Jinja2 files).'},
                {c:'Roles',d:'Reusable, organized set of tasks/variables/handlers. Best practice for large deployments.'},
                {c:'Handler',d:'Action triggered by notify keyword — runs only when notified (e.g., restart nginx only when config changes).'},
              ].map(({c,d})=>(
                <div key={c} className="flex gap-3 bg-slate-800/40 rounded-lg p-2">
                  <span className="text-green-400 font-black text-[10px] w-24 shrink-0">{c}</span>
                  <span className="text-[9px] text-slate-400">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <CodeSnippet lines={[
            '<span class="text-slate-500"># Ansible Playbook — Install & Start Nginx</span>',
            '<span class="text-orange-400">---</span>',
            '<span class="text-blue-400">- name</span>: Setup Webserver',
            '  <span class="text-blue-400">hosts</span>: webservers',
            '  <span class="text-blue-400">become</span>: yes   <span class="text-slate-500"># sudo privileges</span>',
            '  <span class="text-blue-400">tasks</span>:',
            '    - <span class="text-blue-400">name</span>: Install Nginx',
            '      <span class="text-emerald-400">apt</span>:',
            '        <span class="text-blue-400">name</span>: nginx',
            '        <span class="text-blue-400">state</span>: present',
            '      <span class="text-purple-400">notify</span>: Restart Nginx',
            '',
            '    - <span class="text-blue-400">name</span>: Copy config',
            '      <span class="text-emerald-400">template</span>:',
            '        <span class="text-blue-400">src</span>: nginx.conf.j2',
            '        <span class="text-blue-400">dest</span>: /etc/nginx/nginx.conf',
            '',
            '  <span class="text-blue-400">handlers</span>:',
            '    - <span class="text-blue-400">name</span>: Restart Nginx',
            '      <span class="text-emerald-400">service</span>: name=nginx state=restarted',
          ]} />
          <p><strong className="text-white">Ansible vs Chef vs Puppet (Q48):</strong></p>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'Ansible',color:'text-green-400'},
              {label:'Chef',color:'text-orange-400'},
              {label:'Puppet',color:'text-purple-400'},
            ]}
            rows={[
              ['Agent','Agentless (SSH)','Requires Chef client','Requires Puppet agent'],
              ['Language','YAML','Ruby DSL','Puppet DSL'],
              ['Architecture','Push model','Pull model','Pull model'],
              ['Learning','Simple','Complex','Medium'],
            ]}
          />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Ansible Architecture */}
            <div className="bg-slate-900 border border-green-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-green-400 mb-3 text-center">Ansible Architecture — No Agent Needed!</p>
              {/* Control Node */}
              <div className="bg-green-950/30 border border-green-600/40 rounded-xl p-3 text-center mb-2">
                <p className="text-[11px] font-black text-green-400">🎛️ Control Node</p>
                <p className="text-[8px] text-slate-400 mt-0.5">Where Ansible is installed | Runs playbooks</p>
                <div className="flex justify-center gap-2 mt-1.5 flex-wrap">
                  {['Inventory','Playbooks','Roles','Modules'].map(t=>(
                    <span key={t} className="text-[7px] bg-green-950 px-1.5 py-0.5 rounded text-green-400 font-bold">{t}</span>
                  ))}
                </div>
              </div>
              {/* SSH arrows */}
              <div className="flex justify-center gap-12 my-2 text-[8px] text-slate-500">
                <span>SSH</span>
                <span>SSH</span>
                <span>SSH</span>
              </div>
              <div className="flex items-start justify-center gap-1 mb-2">
                <div className="w-px h-4 bg-slate-700 mx-3"></div>
                <div className="w-px h-4 bg-slate-700 mx-3"></div>
                <div className="w-px h-4 bg-slate-700 mx-3"></div>
              </div>
              {/* Managed Nodes */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  {n:'Web Server 1',ip:'192.168.1.10',c:'blue'},
                  {n:'DB Server',ip:'192.168.1.11',c:'emerald'},
                  {n:'App Server',ip:'192.168.1.12',c:'purple'},
                ].map(node=>(
                  <div key={node.n} className={`bg-${node.c}-950/20 border border-${node.c}-700/30 rounded-xl p-2 text-center`}>
                    <p className={`text-[9px] font-black text-${node.c}-400`}>{node.n}</p>
                    <p className="text-[7px] text-slate-500">{node.ip}</p>
                    <p className="text-[7px] text-slate-600 mt-1">No Agent ✓</p>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-emerald-400 text-center mt-2">✓ Agentless: Uses SSH + Python (no daemon required)</p>
            </div>
            {/* Playbook Execution Flow */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">Playbook Execution Flow</p>
              {[
                'ansible-playbook deploy.yml',
                'Read inventory file → get target hosts',
                'Parse playbook → identify plays & tasks',
                'SSH into each managed node',
                'Execute tasks in order (idempotent)',
                'Report: OK / Changed / Failed / Skipped',
              ].map((s,i)=>(
                <div key={i}>
                  <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5">
                    <span className="text-green-400 font-black text-[9px] w-4">{i+1}.</span>
                    <code className="text-[9px] text-slate-300 font-mono">{s}</code>
                  </div>
                  {i < 5 && <FlowArrow />}
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 2: Kubernetes ── */}
      <ConceptSection
        reverse
        title="Kubernetes — Container Orchestration at Scale"
        questions="Answers Q51, Q52, Q53, Q54, Q55"
        qNums={[51,52,53,54,55]}
        examTip="K8s is the most important topic for Unit 5. MUST DRAW: Master-Worker architecture with: Master (API Server, etcd, Scheduler, Controller Manager) and Worker (kubelet, kube-proxy, container runtime). Then explain: Pod, Deployment, Service, ConfigMap, HPA (Horizontal Pod Autoscaler). Know kubectl commands."
        Theory={<>
          <p><strong className="text-white">What is Kubernetes? (Q51):</strong> Kubernetes (K8s) is an open-source container orchestration platform originally developed by Google. It automates deployment, scaling, load balancing, and self-healing of containerized applications across a cluster of machines.</p>
          <div className="bg-slate-900 border border-blue-500/20 rounded-xl p-4">
            <p className="text-xs font-black text-blue-400 mb-2">Kubernetes Architecture</p>
            <div className="mb-3">
              <p className="text-[10px] font-black text-purple-400 mb-2">Master Node (Control Plane)</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {c:'API Server',d:'Front door to K8s. All communication goes through it. RESTful interface.'},
                  {c:'etcd',d:'Distributed key-value store. Stores entire cluster state/config.'},
                  {c:'Scheduler',d:'Decides WHICH node a new Pod should run on (based on resources).'},
                  {c:'Controller Manager',d:'Runs controllers: ReplicaSet, Deployment, Node, Endpoint controllers.'},
                ].map(({c,d})=>(
                  <div key={c} className="bg-purple-950/20 border border-purple-700/30 rounded-lg p-2">
                    <p className="text-[10px] font-black text-purple-400">{c}</p>
                    <p className="text-[8px] text-slate-500 mt-0.5">{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-indigo-400 mb-2">Worker Node</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {c:'kubelet',d:'Agent on each worker node. Ensures containers are running per Pod spec.'},
                  {c:'kube-proxy',d:'Network proxy. Manages Service routing and load balancing between Pods.'},
                  {c:'Container Runtime',d:'Docker / containerd / CRI-O — actually runs containers.'},
                ].map(({c,d})=>(
                  <div key={c} className="bg-indigo-950/20 border border-indigo-700/30 rounded-lg p-2">
                    <p className="text-[10px] font-black text-indigo-400">{c}</p>
                    <p className="text-[8px] text-slate-500 mt-0.5">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p><strong className="text-white">Core K8s Objects (Q52, Q53):</strong></p>
          <div className="space-y-1.5">
            {[
              {o:'Pod',d:'Smallest deployable unit. 1 or more containers sharing network + storage.'},
              {o:'ReplicaSet',d:'Ensures N replicas of a Pod always run. Self-healing.'},
              {o:'Deployment',d:'Manages ReplicaSets. Enables rolling updates and rollbacks.'},
              {o:'Service',d:'Stable network endpoint (ClusterIP/NodePort/LoadBalancer) for Pods.'},
              {o:'ConfigMap',d:'Stores non-sensitive configuration data (env vars, config files).'},
              {o:'Secret',d:'Stores sensitive data (passwords, API keys) in base64-encoded form.'},
              {o:'HPA',d:'Horizontal Pod Autoscaler — scales Pod count based on CPU/memory metrics.'},
              {o:'Ingress',d:'HTTP/HTTPS routing rules. Exposes services externally with one load balancer.'},
            ].map(({o,d})=>(
              <div key={o} className="flex gap-3 bg-slate-800/40 rounded-lg p-2">
                <span className="text-blue-400 font-black text-[10px] w-24 shrink-0">{o}</span>
                <span className="text-[9px] text-slate-400">{d}</span>
              </div>
            ))}
          </div>
          <CodeSnippet lines={[
            '<span class="text-slate-500"># Key kubectl Commands</span>',
            '<span class="text-blue-400">kubectl get pods</span>             <span class="text-slate-500"># List all pods</span>',
            '<span class="text-blue-400">kubectl get nodes</span>            <span class="text-slate-500"># List cluster nodes</span>',
            '<span class="text-blue-400">kubectl apply -f deploy.yaml</span> <span class="text-slate-500"># Apply config</span>',
            '<span class="text-blue-400">kubectl scale deploy app --replicas=5</span>',
            '<span class="text-blue-400">kubectl logs pod-name</span>        <span class="text-slate-500"># View pod logs</span>',
            '<span class="text-blue-400">kubectl describe pod pod-name</span>',
            '<span class="text-blue-400">kubectl rollout undo deployment/app</span>',
          ]} />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* K8s Cluster Architecture */}
            <div className="bg-slate-900 border border-purple-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-purple-400 mb-3 text-center">Kubernetes Cluster Architecture — DRAW THIS</p>
              {/* Master */}
              <div className="bg-purple-950/30 border border-purple-600/40 rounded-xl p-3 mb-3">
                <p className="text-[10px] font-black text-purple-400 text-center mb-2">🏛️ Master Node (Control Plane)</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[['API Server','All requests here'],['etcd','Cluster state DB'],['Scheduler','Assign Pods to nodes'],['Controller Mgr','Desired state enforcement']].map(([k,v])=>(
                    <div key={k} className="bg-purple-950/50 border border-purple-800/30 rounded px-2 py-1">
                      <p className="text-[8px] font-bold text-purple-300">{k}</p>
                      <p className="text-[7px] text-slate-500">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Worker Nodes */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  {n:'Worker Node 1',pods:['Pod: App v2','Pod: App v2'],c:'indigo'},
                  {n:'Worker Node 2',pods:['Pod: App v2','Pod: DB'],c:'blue'},
                ].map(node=>(
                  <div key={node.n} className={`bg-${node.c}-950/20 border border-${node.c}-600/30 rounded-xl p-2.5`}>
                    <p className={`text-[9px] font-black text-${node.c}-400 mb-2`}>{node.n}</p>
                    {node.pods.map(p=>(
                      <div key={p} className={`bg-${node.c}-950/40 border border-${node.c}-800/30 text-[8px] text-${node.c}-300 px-1.5 py-0.5 rounded mb-1`}>{p}</div>
                    ))}
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {['kubelet','kube-proxy','containerd'].map(t=>(
                        <span key={t} className="text-[6px] bg-slate-800 text-slate-500 px-1 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* K8s Deployment Flow */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">K8s Rolling Update Flow</p>
              <div className="flex gap-2 items-start">
                <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-slate-300">Old Pods (v1)</p>
                  <div className="space-y-1 mt-1">
                    <div className="bg-blue-950/40 text-[7px] text-blue-300 rounded px-1 py-0.5">Pod v1</div>
                    <div className="bg-blue-950/40 text-[7px] text-blue-300 rounded px-1 py-0.5">Pod v1</div>
                    <div className="bg-blue-950/40 text-[7px] text-blue-300 rounded px-1 py-0.5">Pod v1</div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-1">
                  <ArrowRight size={14} className="text-emerald-500"/>
                  <p className="text-[7px] text-emerald-400">Rolling<br/>Update</p>
                </div>
                <div className="flex-1 bg-emerald-950/10 border border-emerald-700/30 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-emerald-300">New Pods (v2)</p>
                  <div className="space-y-1 mt-1">
                    <div className="bg-emerald-950/40 text-[7px] text-emerald-300 rounded px-1 py-0.5">Pod v2 ✓</div>
                    <div className="bg-emerald-950/40 text-[7px] text-emerald-300 rounded px-1 py-0.5">Pod v2 ✓</div>
                    <div className="bg-yellow-950/40 text-[7px] text-yellow-300 rounded px-1 py-0.5">Starting...</div>
                  </div>
                </div>
              </div>
              <p className="text-[7px] text-slate-500 text-center mt-2">Zero downtime — old pods removed only after new pods are healthy</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
