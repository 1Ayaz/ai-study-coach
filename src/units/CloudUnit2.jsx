import { Database, ArrowDown, ArrowRight } from 'lucide-react';
import { UnitHeader, ConceptSection, FlowArrow, CompareTable } from '../components/Shared.jsx';

export default function CloudUnit2() {
  return (
    <div className="flex flex-col">
      <UnitHeader
        title="Cloud Computing — Unit II"
        subtitle="CC Q26–Q42 • GFS, AFS, GPFS, MapReduce, Cloud Storage, Pervasive Computing, Multicore"
        icon={<Database size={24} />}
        color="violet"
      />

      {/* ── CONCEPT 1: Distributed File Systems ── */}
      <ConceptSection
        title="GFS, AFS & GPFS — Distributed File Systems"
        questions="Answers CC Q26, Q27, Q28, Q29, Q30"
        qNums={['CC26','CC27','CC28','CC29','CC30']}
        examTip="GFS is THE most important CC topic. Draw GFS architecture: 1 Master + multiple ChunkServers + Clients. Label: chunks (64MB), heartbeat checks, 3-replica placement, write-ahead log in master. Then compare GFS vs HDFS (Hadoop's implementation). 3 diagrams possible here."
        Theory={<>
          <p><strong className="text-white">Google File System — GFS (CC Q26):</strong> GFS is a distributed file system designed by Google for large-scale data-intensive applications. Optimized for append-heavy workloads (search indexing, MapReduce jobs).</p>
          <div className="bg-slate-900 border border-violet-500/20 rounded-xl p-4">
            <p className="text-xs font-black text-violet-400 mb-3">GFS Architecture Components</p>
            <div className="space-y-2">
              {[
                {c:'GFS Master',d:'Single master node. Stores file namespace, access control, chunk-to-chunkserver mapping. Uses write-ahead logging & checkpointing. Master does NOT store file data.'},
                {c:'ChunkServers',d:'Linux servers that store actual data chunks. Each chunk = 64MB. Each chunk replicated 3 times across different chunkservers/racks.'},
                {c:'Clients',d:'Application libraries that communicate with master for metadata, then directly with ChunkServers for data. No caching (data too large).'},
                {c:'Chunks (64MB)',d:'Files split into fixed 64MB chunks. Larger than typical FS blocks to reduce master load. Each identified by 64-bit chunk handle.'},
                {c:'Replication (3x)',d:'Each chunk stored on 3 different chunkservers. At least 1 replica on different rack for rack failure tolerance.'},
              ].map(({c,d})=>(
                <div key={c} className="flex gap-3 bg-slate-800/40 rounded-lg p-2.5">
                  <span className="text-violet-400 font-black text-[10px] w-32 shrink-0">{c}</span>
                  <span className="text-[10px] text-slate-400">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <p><strong className="text-white">AFS — Andrew File System (CC Q28):</strong> Client-server distributed FS from Carnegie Mellon. Key feature: <strong>Client-side caching</strong> (Venus cache manager caches entire files locally). Uses <em>callbacks</em> — server notifies clients when file changes (cache invalidation). Designed for campus-wide file sharing.</p>
          <p><strong className="text-white">GPFS — General Parallel File System (CC Q29, Q30):</strong> IBM's high-performance parallel DFS. Designed for HPC (High Performance Computing) clusters. Key features: Simultaneous read/write from multiple nodes (true parallel I/O), journaling for crash recovery, support for petabyte-scale storage.</p>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'GFS',color:'text-violet-400'},
              {label:'AFS',color:'text-blue-400'},
              {label:'GPFS',color:'text-orange-400'},
            ]}
            rows={[
              ['Origin','Google','Carnegie Mellon','IBM'],
              ['Chunk/Block Size','64MB','Whole-file caching','256KB - 1MB'],
              ['Caching','No client cache','Client caches whole file','Distributed buffer cache'],
              ['Metadata','Single master','Volume DB + Fileserver','Distributed (all nodes)'],
              ['Use Case','Web-scale big data','Campus file sharing','HPC clusters'],
              ['Open Source?','No (HDFS is clone)','Yes (OpenAFS)','Commercial (IBM)'],
            ]}
          />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* GFS Architecture — main diagram */}
            <div className="bg-slate-900 border border-violet-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-violet-400 mb-3 text-center">GFS Architecture — MUST DRAW THIS</p>
              {/* Client */}
              <div className="bg-slate-800 border border-slate-600 rounded-xl p-2 text-center mb-2">
                <p className="text-[10px] font-black text-slate-300">📱 Client (GFS Library)</p>
                <p className="text-[7px] text-slate-500">Sends file requests → gets chunk locations from Master</p>
              </div>
              {/* Two arrows: to master and to chunkservers */}
              <div className="flex justify-center gap-12 text-[7px] text-slate-600 mb-1">
                <span>① Metadata Request</span>
                <span>③ Direct Data Access</span>
              </div>
              <div className="flex gap-3 mb-2">
                {/* Master */}
                <div className="flex-1 bg-violet-950/40 border border-violet-600/40 rounded-xl p-2">
                  <p className="text-[10px] font-black text-violet-400 text-center">🏛️ GFS Master</p>
                  <div className="mt-1 space-y-0.5 text-[7px]">
                    <div className="bg-violet-950/50 text-violet-300 px-1.5 py-0.5 rounded">File Namespace</div>
                    <div className="bg-violet-950/50 text-violet-300 px-1.5 py-0.5 rounded">Chunk Mapping</div>
                    <div className="bg-violet-950/50 text-violet-300 px-1.5 py-0.5 rounded">Access Control</div>
                    <div className="bg-violet-950/50 text-violet-300 px-1.5 py-0.5 rounded">Write-Ahead Log</div>
                  </div>
                  <p className="text-[6px] text-slate-500 mt-1 text-center">② Returns: ChunkID + location</p>
                </div>
                {/* ChunkServers */}
                <div className="flex-1">
                  <div className="space-y-1.5">
                    {['Chunk Server 1\n(Chunks A,B,C)','Chunk Server 2\n(Chunks A,B,D)','Chunk Server 3\n(Chunks C,D,E)'].map((cs,i)=>(
                      <div key={i} className="bg-indigo-950/30 border border-indigo-700/30 rounded-lg p-1.5 text-center">
                        <p className="text-[8px] font-bold text-indigo-400 whitespace-pre-line leading-tight">{cs}</p>
                        <p className="text-[6px] text-slate-600">64MB chunks • 3x replicated</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-[7px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded">Heartbeat every 60s</span>
                  </div>
                </div>
              </div>
              <p className="text-[7px] text-slate-600 text-center">Each 64MB chunk replicated 3× for fault tolerance</p>
            </div>

            {/* GFS Write Flow */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-2">GFS Write Operation Flow</p>
              {['Client requests write lease from Master','Master grants lease to Primary Replica','Client sends data to ALL chunk replicas (pipelined)','Primary orders mutations → Secondary replicas apply','Primary replies to Client: Write Complete'].map((s,i)=>(
                <div key={i}>
                  <div className="flex gap-2 items-center bg-slate-800 border border-slate-700 rounded px-2 py-1.5">
                    <span className="text-violet-400 text-[9px] font-black w-4">{i+1}.</span>
                    <p className="text-[9px] text-slate-400">{s}</p>
                  </div>
                  {i < 4 && <FlowArrow />}
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 2: MapReduce ── */}
      <ConceptSection
        reverse
        title="MapReduce — Distributed Data Processing"
        questions="Answers CC Q31, Q32, Q33"
        qNums={['CC31','CC32','CC33']}
        examTip="MapReduce is simple but must be drawn correctly: Input → Split → Map (process locally) → Shuffle/Sort (group by key) → Reduce (aggregate) → Output. Use word count as the example. Know: Mapper writes to local disk, Reducer reads from ALL mappers. This flow diagram = 5 marks."
        Theory={<>
          <p><strong className="text-white">MapReduce (CC Q31):</strong> MapReduce is a programming model for processing large datasets in parallel across a cluster. Developed by Google. Two phases:</p>
          <div className="bg-slate-900 border border-yellow-500/20 rounded-xl p-4">
            <div className="space-y-3">
              {[
                {phase:'Map Phase',icon:'🗺️',color:'yellow',desc:'Each Mapper processes a split of input data and emits (key, value) pairs. Map tasks run in parallel across cluster nodes — data locality: process data where it lives.',ex:'Input: "hello world hello" → Map emits: (hello,1), (world,1), (hello,1)'},
                {phase:'Shuffle & Sort',icon:'🔄',color:'orange',desc:'Framework automatically groups all values for the same key together. Transfers data from mappers to reducers. Most network-intensive phase.',ex:'Group: (hello,[1,1]), (world,[1])'},
                {phase:'Reduce Phase',icon:'📊',color:'emerald',desc:'Each Reducer aggregates values for its assigned keys. Produces final output written to HDFS. Reducers run in parallel (one per key group).',ex:'Reduce: (hello,2), (world,1) → Final output'},
              ].map(({phase,icon,color,desc,ex})=>(
                <div key={phase} className={`bg-${color}-950/20 border border-${color}-700/30 rounded-xl p-3`}>
                  <p className={`text-[11px] font-black text-${color}-400 mb-1`}>{icon} {phase}</p>
                  <p className="text-[10px] text-slate-400">{desc}</p>
                  <p className={`text-[9px] font-mono text-${color}-300 mt-1.5 bg-${color}-950/30 px-2 py-1 rounded`}>{ex}</p>
                </div>
              ))}
            </div>
          </div>
          <p><strong className="text-white">Word Count Example — Classic MapReduce:</strong></p>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-3">
            <div className="font-mono text-[9px] space-y-2">
              <div className="text-slate-400"><span className="text-yellow-400">Input:</span> "the cat sat on the mat the cat"</div>
              <div>
                <p className="text-yellow-400">Map Output (per word):</p>
                <p className="text-slate-400 ml-2">(the,1),(cat,1),(sat,1),(on,1),(the,1),(mat,1),(the,1),(cat,1)</p>
              </div>
              <div>
                <p className="text-orange-400">After Shuffle/Sort:</p>
                <p className="text-slate-400 ml-2">(cat,[1,1]) (mat,[1]) (on,[1]) (sat,[1]) (the,[1,1,1])</p>
              </div>
              <div>
                <p className="text-emerald-400">Reduce Output:</p>
                <p className="text-slate-400 ml-2">(cat,2) (mat,1) (on,1) (sat,1) (the,3)</p>
              </div>
            </div>
          </div>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* MapReduce Flow Diagram */}
            <div className="bg-slate-900 border border-yellow-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-yellow-400 mb-3 text-center">MapReduce Pipeline — DRAW THIS</p>
              <div className="flex flex-col gap-1">
                <div className="bg-slate-800 border border-slate-600 rounded-xl p-2 text-center">
                  <p className="text-[10px] font-black text-slate-300">📄 Input File (HDFS)</p>
                  <p className="text-[8px] text-slate-500">"the cat sat on the mat the cat"</p>
                </div>
                <FlowArrow label="Split into blocks" />
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {name:'Mapper 1',input:'"the cat sat"',output:'(the,1)(cat,1)(sat,1)'},
                    {name:'Mapper 2',input:'"on the mat"',output:'(on,1)(the,1)(mat,1)'},
                  ].map(m=>(
                    <div key={m.name} className="bg-yellow-950/20 border border-yellow-700/30 rounded-xl p-2 text-center">
                      <p className="text-[9px] font-black text-yellow-400">{m.name}</p>
                      <p className="text-[7px] text-slate-500">{m.input}</p>
                      <div className="font-mono text-[7px] text-yellow-300 mt-0.5">{m.output}</div>
                    </div>
                  ))}
                </div>
                <FlowArrow label="Shuffle & Sort (group by key)" />
                <div className="bg-orange-950/20 border border-orange-700/30 rounded-xl p-2">
                  <p className="text-[9px] font-black text-orange-400 text-center">Sorted & Grouped</p>
                  <p className="text-[8px] text-slate-500 font-mono text-center">(cat,[1]) (mat,[1]) (the,[1,1]) ...</p>
                </div>
                <FlowArrow label="Reduce" />
                <div className="bg-emerald-950/20 border border-emerald-700/30 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-emerald-400">Reducer Output</p>
                  <p className="text-[8px] font-mono text-emerald-300">(cat,1) (mat,1) (the,2) (sat,1) (on,1)</p>
                </div>
                <FlowArrow />
                <div className="bg-slate-800 border border-slate-600 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-slate-300">📁 Output to HDFS</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 3: Pervasive & Multicore Computing ── */}
      <ConceptSection
        title="Pervasive Computing, Multicore & GPU Architecture"
        questions="Answers CC Q34, Q35, Q36, Q37, Q38, Q39, Q40, Q41, Q42"
        qNums={['CC34','CC35','CC36','CC37','CC38','CC39','CC40','CC41','CC42']}
        examTip="Pervasive Computing = computing everywhere (IoT before it was called IoT). Multicore: Draw a quad-core processor with shared L3 cache and private L1/L2 caches. GPU answer: CPU vs GPU comparison is key (CPU: few powerful cores for serial tasks; GPU: thousands of simple cores for parallel tasks — NVIDIA CUDA). Know Flynn's taxonomy: SISD, SIMD, MISD, MIMD."
        Theory={<>
          <p><strong className="text-white">Pervasive / Ubiquitous Computing (CC Q34, Q35):</strong> Computing embedded into everyday objects and environments — invisible, always-on. Mark Weiser's vision (1991). Examples: Smart home (Alexa), wearables (Apple Watch), smart cities, RFID tracking. Key properties: availability everywhere, context-aware, network-connected, transparent use.</p>
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4 mb-3">
            <p className="text-xs font-black text-emerald-400 mb-2">Pervasive Computing Characteristics</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {c:'Context-Aware',d:'Adapts behavior based on user location, time, identity'},
                {c:'Always On/Connected',d:'24/7 internet connectivity via 4G/5G/WiFi'},
                {c:'Embedded',d:'Invisible to user — built into everyday objects'},
                {c:'Adaptive',d:'Self-configuring based on environment changes'},
                {c:'Interoperable',d:'Different devices communicate seamlessly'},
                {c:'Scalable',d:'From individual sensors to city-scale deployments'},
              ].map(({c,d})=>(
                <div key={c} className="bg-slate-800 border border-slate-700 rounded-lg p-2">
                  <p className="text-[10px] font-black text-emerald-400">{c}</p>
                  <p className="text-[8px] text-slate-500 mt-0.5">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <p><strong className="text-white">Multicore Processors (CC Q36, Q37):</strong> A multicore processor contains multiple CPU cores on a single chip. Each core can execute independent instruction streams simultaneously (parallel processing). Cache hierarchy: each core has private L1 (fastest, smallest) and L2 cache; all cores share L3 cache.</p>
          <p><strong className="text-white">Flynn's Taxonomy — Parallel Computer Architecture:</strong></p>
          <CompareTable
            headers={[
              {label:'Category',color:'text-slate-400'},
              {label:'Description',color:'text-sky-400'},
              {label:'Example',color:'text-purple-400'},
            ]}
            rows={[
              ['SISD','Single Instruction, Single Data — one instruction, one data','Traditional single-core CPU'],
              ['SIMD','Single Instruction, Multiple Data — same op on multiple data','GPU, Intel SSE/AVX, vector processing'],
              ['MISD','Multiple Instruction, Single Data (rare)','Fault-tolerant flight computers'],
              ['MIMD','Multiple Instruction, Multiple Data — true parallel','Multicore CPUs, clusters, distributed systems'],
            ]}
          />
          <p><strong className="text-white">CPU vs GPU (CC Q39, Q40):</strong></p>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'CPU',color:'text-blue-400'},
              {label:'GPU',color:'text-green-400'},
            ]}
            rows={[
              ['Core Count','4–64 cores','Thousands (NVIDIA A100: 6912 CUDA cores)'],
              ['Per-Core Speed','Very fast (5GHz)','Slower per core (1-2GHz)'],
              ['Task Type','Serial, complex logic','Parallel, repetitive tasks'],
              ['Cache','Large L1/L2/L3','Smaller, optimized for throughput'],
              ['Best For','OS, apps, databases','ML training, graphics, simulations'],
            ]}
          />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Multicore Processor Diagram */}
            <div className="bg-slate-900 border border-sky-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-sky-400 mb-3 text-center">Quad-Core Processor Architecture</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {['Core 0','Core 1','Core 2','Core 3'].map((c,i)=>(
                  <div key={c} className="bg-blue-950/30 border border-blue-700/40 rounded-xl p-2 text-center">
                    <p className="text-[9px] font-black text-blue-400">{c}</p>
                    <div className="space-y-0.5 mt-1 text-[7px]">
                      <div className="bg-blue-950/50 text-blue-300 rounded px-1">L1 Cache (32KB)</div>
                      <div className="bg-indigo-950/50 text-indigo-300 rounded px-1">L2 Cache (256KB)</div>
                      <div className="bg-slate-800 text-slate-400 rounded px-1">ALU | FPU | Registers</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-purple-950/30 border border-purple-600/40 rounded-xl p-2 text-center">
                <p className="text-[9px] font-black text-purple-400">Shared L3 Cache (8MB) — All Cores Access</p>
              </div>
              <div className="flex gap-2 mt-1.5">
                <ArrowDown size={12} className="text-slate-600 mx-auto"/>
              </div>
              <div className="bg-slate-800 border border-slate-600 rounded-xl p-1.5 text-center">
                <p className="text-[8px] font-bold text-slate-400">Memory Controller → DDR5 RAM</p>
              </div>
              <div className="flex gap-2 mt-1.5">
                <ArrowDown size={12} className="text-slate-600 mx-auto"/>
              </div>
              <div className="bg-slate-800 border border-slate-600 rounded-xl p-1.5 text-center">
                <p className="text-[8px] font-bold text-slate-400">PCIe Bus → GPU, NVMe SSD, Network Card</p>
              </div>
            </div>

            {/* CPU vs GPU Comparison */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">CPU vs GPU Architecture</p>
              <div className="flex gap-3">
                {/* CPU */}
                <div className="flex-1">
                  <p className="text-[9px] font-black text-blue-400 text-center mb-2">CPU (Intel i9)</p>
                  <div className="grid grid-cols-2 gap-1">
                    {[1,2,3,4,5,6,7,8].map(n=>(
                      <div key={n} className="bg-blue-950/40 border border-blue-700/30 rounded p-1.5 text-center">
                        <p className="text-[7px] font-bold text-blue-300">Core {n}</p>
                        <p className="text-[6px] text-slate-500">Complex</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[7px] text-blue-400 text-center mt-1">8 powerful cores</p>
                </div>
                <div className="w-px bg-slate-700"></div>
                {/* GPU */}
                <div className="flex-1">
                  <p className="text-[9px] font-black text-green-400 text-center mb-2">GPU (NVIDIA A100)</p>
                  <div className="grid grid-cols-6 gap-0.5">
                    {Array.from({length: 36}).map((_,n)=>(
                      <div key={n} className="bg-green-950/40 border border-green-800/20 rounded p-0.5 text-center">
                        <p className="text-[5px] text-green-400">█</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[7px] text-green-400 text-center mt-1">6912 CUDA cores</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="flex-1 bg-blue-950/20 rounded-lg p-1.5 text-center">
                  <p className="text-[8px] font-bold text-blue-400">Best: Serial Logic</p>
                  <p className="text-[7px] text-slate-500">OS scheduling, DB queries, web servers</p>
                </div>
                <div className="flex-1 bg-green-950/20 rounded-lg p-1.5 text-center">
                  <p className="text-[8px] font-bold text-green-400">Best: Parallel Math</p>
                  <p className="text-[7px] text-slate-500">ML training, matrix ops, graphics rendering</p>
                </div>
              </div>
            </div>

            {/* Pervasive Computing Ecosystem */}
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-emerald-400 mb-3">Pervasive Computing Ecosystem</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {icon:'⌚',label:'Wearables',ex:'Apple Watch, Fitbit'},
                  {icon:'🏠',label:'Smart Home',ex:'Alexa, Nest, SmartTV'},
                  {icon:'🚗',label:'Smart Vehicle',ex:'GPS, V2X comms'},
                  {icon:'📡',label:'RFID/NFC',ex:'Contactless pay, tracking'},
                  {icon:'🏥',label:'Healthcare IoT',ex:'Patient monitors, implants'},
                  {icon:'🌆',label:'Smart City',ex:'Traffic, air quality, energy'},
                ].map(({icon,label,ex})=>(
                  <div key={label} className="bg-slate-800 border border-emerald-700/20 rounded-xl p-2 text-center">
                    <p className="text-xl">{icon}</p>
                    <p className="text-[9px] font-black text-emerald-400 mt-0.5">{label}</p>
                    <p className="text-[7px] text-slate-500">{ex}</p>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-slate-600 text-center mt-2">All connected via Internet → Cloud → Big Data Analytics</p>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 4: Cloud Storage Systems ── */}
      <ConceptSection
        reverse
        title="Cloud Storage Architecture & Data Management"
        questions="Answers CC Q38, Q40, Q41, Q42 (Storage)"
        qNums={['CC38','CC40','CC41','CC42']}
        examTip="Draw the cloud storage layers: Object Storage (S3 — flat namespace, REST API) vs Block Storage (EBS — like a disk, used by EC2) vs File Storage (EFS — NFS shared). Then draw the HDFS architecture (mirroring GFS). Know: CAP Theorem — Consistency, Availability, Partition Tolerance — can only guarantee 2 of 3."
        Theory={<>
          <p><strong className="text-white">Cloud Storage Types (CC Q40, Q41):</strong></p>
          <div className="space-y-2 mb-4">
            {[
              {t:'Object Storage',d:'Flat namespace. Files stored as objects with metadata + unique ID. REST API access. Infinite scale. Examples: AWS S3, Azure Blob Storage, Google Cloud Storage. Used for: backups, media files, static websites.',c:'blue'},
              {t:'Block Storage',d:"Raw volumes attached to VMs. Behaves like a physical hard drive. File system created by user. Low latency. Examples: AWS EBS, Azure Managed Disks. Used for: OS boot volumes, databases, high-performance workloads.",c:'orange'},
              {t:'File Storage (NFS)',d:'Hierarchical directory structure. Multiple VMs can mount simultaneously (shared filesystem). Examples: AWS EFS, Azure Files. Used for: shared code directories, content management.',c:'emerald'},
            ].map(({t,d,c})=>(
              <div key={t} className={`bg-${c}-950/20 border border-${c}-700/30 rounded-xl p-3`}>
                <p className={`text-[10px] font-black text-${c}-400`}>{t}</p>
                <p className="text-[10px] text-slate-400 mt-1">{d}</p>
              </div>
            ))}
          </div>
          <p><strong className="text-white">CAP Theorem (CC Q42):</strong> In a distributed system, you can only guarantee 2 out of 3 properties:</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              {p:'Consistency',d:'Every read gets the most recent write',c:'blue'},
              {p:'Availability',d:'Every request gets a response (may not be latest)',c:'emerald'},
              {p:'Partition Tolerance',d:'System continues despite network partitions',c:'orange'},
            ].map(({p,d,c})=>(
              <div key={p} className={`bg-${c}-950/20 border border-${c}-700/40 rounded-xl p-2 text-center`}>
                <p className={`text-[10px] font-black text-${c}-400`}>{p}</p>
                <p className="text-[8px] text-slate-500 mt-0.5">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 bg-slate-900 border border-slate-700 rounded-xl p-3">
            <p className="text-[9px] font-black text-slate-400 mb-2">CAP Trade-offs in Popular Systems</p>
            <CompareTable
              headers={[{label:'System'},{label:'C'},{label:'A'},{label:'P'}]}
              rows={[
                ['MySQL/PostgreSQL (primary)','✓','✓ (locally)','✗'],
                ['Cassandra (NoSQL)','✗','✓','✓'],
                ['HBase','✓','✗','✓'],
                ['DynamoDB','Tunable','Tunable','✓'],
              ]}
            />
          </div>
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900 border border-blue-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-blue-400 mb-3 text-center">Storage Type Comparison</p>
              <div className="space-y-3">
                {[
                  {t:'Object Storage (S3)',icon:'🗂️',model:'Flat — Objects with unique keys',access:'REST API (GET/PUT/DELETE)',scale:'Exabytes',c:'blue',ex:'s3://bucket/photo.jpg'},
                  {t:'Block Storage (EBS)',icon:'💾',model:'Raw blocks — Attached as volume',access:'OS filesystem (ext4, NTFS)',scale:'Up to 64TB per volume',c:'orange',ex:'/dev/sda1 → mounted at /data'},
                  {t:'File Storage (EFS)',icon:'📁',model:'Hierarchical directory tree',access:'NFS protocol — multi-VM mount',scale:'Petabyte auto-scale',c:'emerald',ex:'mount -t nfs4 efs.aws.com:/'},
                ].map(({t,icon,model,access,scale,c,ex})=>(
                  <div key={t} className={`bg-${c}-950/20 border border-${c}-700/30 rounded-xl p-3`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{icon}</span>
                      <p className={`text-[10px] font-black text-${c}-400`}>{t}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[8px]">
                      <div><span className="text-slate-500">Model: </span><span className="text-slate-400">{model}</span></div>
                      <div><span className="text-slate-500">Access: </span><span className="text-slate-400">{access}</span></div>
                      <div><span className="text-slate-500">Scale: </span><span className={`text-${c}-400 font-bold`}>{scale}</span></div>
                      <div><span className="text-slate-500">URL: </span><code className={`text-${c}-300 font-mono text-[7px]`}>{ex}</code></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* CAP Theorem Visual */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3 text-center">CAP Theorem — Pick 2 of 3</p>
              <div className="flex justify-center">
                <div className="relative w-44 h-44">
                  {/* Triangle vertices */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-center">
                    <div className="bg-blue-950 border border-blue-600 rounded-lg px-2 py-1">
                      <p className="text-[9px] font-black text-blue-400">Consistency</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 text-center">
                    <div className="bg-emerald-950 border border-emerald-600 rounded-lg px-1.5 py-1">
                      <p className="text-[8px] font-black text-emerald-400">Availability</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 text-center">
                    <div className="bg-orange-950 border border-orange-600 rounded-lg px-1.5 py-1">
                      <p className="text-[8px] font-black text-orange-400">Partition<br/>Tolerance</p>
                    </div>
                  </div>
                  {/* Labels */}
                  <div className="absolute top-12 left-4 text-[7px] text-slate-600">CA: MySQL</div>
                  <div className="absolute top-12 right-4 text-[7px] text-slate-600">CP: HBase</div>
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[7px] text-slate-600">AP: Cassandra</div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
