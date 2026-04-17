import { Box, ArrowDown, ArrowRight } from 'lucide-react';
import { UnitHeader, ConceptSection, FlowArrow, CompareTable, CodeSnippet } from '../components/Shared.jsx';

export default function DevOpsUnit4() {
  return (
    <div className="flex flex-col">
      <UnitHeader
        title="Unit IV — Docker, Selenium & Testing"
        subtitle="Q31–Q45 • Containers, Docker Architecture, Selenium, TestNG, JUnit"
        icon={<Box size={24} />}
        color="cyan"
      />

      {/* ── CONCEPT 1: Docker Architecture ── */}
      <ConceptSection
        title="Docker Architecture — Containers vs VMs"
        questions="Answers Q31, Q32, Q33, Q34, Q37, Q39"
        qNums={[31,32,33,34,37,39]}
        crossRef="Also covers CC Virtualization concepts"
        examTip="Draw Docker Architecture: Docker Client → Docker Daemon (dockerd) → Registry. Also draw Containers vs VMs comparison diagram (two columns). Key: Container = OS-level isolation using namespaces + cgroups. VM = full OS per instance via Hypervisor. Must explain Dockerfile and image layering."
        Theory={<>
          <p><strong className="text-white">What is Docker? (Q31):</strong> Docker is an open-source containerization platform. It packages applications with ALL their dependencies (code, runtime, libraries, config) into a lightweight, portable <strong>container</strong> that runs identically everywhere.</p>
          <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-4">
            <p className="text-xs font-black text-cyan-400 mb-3">Docker Architecture Components</p>
            <div className="space-y-2">
              {[
                {c:'Docker Client',d:'CLI tool (docker build, docker run, docker push). Sends API requests to Docker Daemon.'},
                {c:'Docker Daemon (dockerd)',d:'Background service. Listens on Unix socket. Manages images, containers, volumes, networks.'},
                {c:'Docker Image',d:'Read-only template with layered filesystem (Union FS). Built from Dockerfile instructions.'},
                {c:'Docker Container',d:'Running instance of an image. Isolated process (namespace) with resource limits (cgroups).'},
                {c:'Docker Registry',d:'Image storage. Docker Hub (public) or AWS ECR, Harbor (private). Push/pull images.'},
                {c:'Docker Compose',d:'Multi-container orchestration using docker-compose.yml. Defines services, networks, volumes.'},
              ].map(({c,d})=>(
                <div key={c} className="flex gap-3 bg-slate-800/40 rounded-lg p-2.5">
                  <span className="text-cyan-400 font-black text-[10px] w-36 shrink-0">{c}</span>
                  <span className="text-[10px] text-slate-400">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'Containers (Docker)',color:'text-cyan-400'},
              {label:'Virtual Machines',color:'text-purple-400'},
            ]}
            rows={[
              ['OS','Shares host OS kernel','Full OS per VM'],
              ['Boot time','Milliseconds','Minutes'],
              ['Size','MBs (lightweight)','GBs (heavy)'],
              ['Isolation','Process-level (namespaces)','Hardware-level (hypervisor)'],
              ['Performance','Near-native','10-15% overhead'],
              ['Portability','Image runs anywhere','VM image is host specific'],
            ]}
          />
          <p><strong className="text-white">Dockerfile — Layers:</strong> Each Dockerfile instruction creates a new read-only layer stacked on top of previous ones. Layers are cached for speed.</p>
          <CodeSnippet lines={[
            '<span class="text-slate-500"># Dockerfile for Spring Boot App</span>',
            '<span class="text-blue-400">FROM</span> openjdk:17-slim <span class="text-slate-500">     # Base image (layer 1)</span>',
            '<span class="text-blue-400">WORKDIR</span> /app <span class="text-slate-500">              # Set working dir (layer 2)</span>',
            '<span class="text-blue-400">COPY</span> target/app.jar app.jar <span class="text-slate-500"> # Copy jar (layer 3)</span>',
            '<span class="text-blue-400">EXPOSE</span> 8080 <span class="text-slate-500">               # Document port</span>',
            '<span class="text-blue-400">ENTRYPOINT</span> ["java","-jar","app.jar"] <span class="text-slate-500"># Run command</span>',
          ]} />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Docker Architecture Diagram */}
            <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-cyan-400 mb-3 text-center">Docker Architecture</p>
              {/* Client */}
              <div className="bg-slate-800 border border-slate-600 rounded-xl p-2.5 text-center mb-2">
                <p className="text-[10px] font-black text-slate-300">🖥️ Docker Client (CLI)</p>
                <div className="flex justify-center gap-2 mt-1 flex-wrap">
                  {['docker build','docker run','docker push','docker pull'].map(cmd=>(
                    <code key={cmd} className="text-[7px] bg-slate-900 text-cyan-400 px-1.5 py-0.5 rounded font-mono">{cmd}</code>
                  ))}
                </div>
              </div>
              <FlowArrow label="REST API" />
              {/* Daemon */}
              <div className="bg-cyan-950/30 border border-cyan-600/40 rounded-xl p-3 mb-2">
                <p className="text-[10px] font-black text-cyan-400 text-center mb-2">⚙️ Docker Daemon (dockerd)</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Images','Containers','Volumes','Networks','Build Cache','Compose'].map(t=>(
                    <div key={t} className="bg-cyan-950/50 border border-cyan-800/30 rounded px-1.5 py-1 text-center text-[8px] text-cyan-300 font-bold">{t}</div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <ArrowDown size={12} className="text-slate-600 mx-auto"/>
                <ArrowRight size={12} className="text-slate-600 mx-auto"/>
              </div>
              <div className="flex gap-2">
                {/* Local Images */}
                <div className="flex-1 bg-blue-950/30 border border-blue-600/30 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-blue-400">Local Images</p>
                  <p className="text-[8px] text-slate-500">Cached layers on disk</p>
                </div>
                {/* Registry */}
                <div className="flex-1 bg-emerald-950/30 border border-emerald-600/30 rounded-xl p-2 text-center">
                  <p className="text-[9px] font-black text-emerald-400">Docker Hub / ECR</p>
                  <p className="text-[8px] text-slate-500">Remote image registry</p>
                </div>
              </div>
            </div>

            {/* Container vs VM */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-3">Container vs VM Stack — Draw This!</p>
              <div className="flex gap-3">
                {/* Container Stack */}
                <div className="flex-1">
                  <p className="text-[9px] font-black text-cyan-400 text-center mb-1.5">Docker Containers</p>
                  <div className="space-y-1">
                    {[{l:'App A',c:'cyan'},{l:'App B',c:'cyan'},{l:'Container Runtime (dockerd)',c:'blue'},{l:'Host OS (Linux)',c:'indigo'},{l:'Hardware',c:'slate'}].map(({l,c})=>(
                      <div key={l} className={`bg-${c}-950/40 border border-${c}-700/30 rounded px-2 py-1 text-center text-[8px] font-bold text-${c}-300`}>{l}</div>
                    ))}
                  </div>
                </div>
                {/* VM Stack */}
                <div className="flex-1">
                  <p className="text-[9px] font-black text-purple-400 text-center mb-1.5">Virtual Machines</p>
                  <div className="space-y-1">
                    {[{l:'App A',c:'purple'},{l:'Guest OS (full)',c:'red'},{l:'App B',c:'purple'},{l:'Guest OS (full)',c:'red'},{l:'Hypervisor (VMware)',c:'orange'},{l:'Hardware',c:'slate'}].map(({l,c})=>(
                      <div key={l} className={`bg-${c}-950/40 border border-${c}-700/30 rounded px-2 py-1 text-center text-[8px] font-bold text-${c}-300`}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ── CONCEPT 2: Selenium & Testing ── */}
      <ConceptSection
        reverse
        title="Selenium, JUnit & TestNG — Automated Testing"
        questions="Answers Q35, Q36, Q38, Q40, Q41, Q42, Q43, Q44, Q45"
        qNums={[35,36,38,40,41,42,43,44,45]}
        examTip="For Selenium: Draw the Selenium WebDriver Architecture (Test Script → WebDriver API → Browser Driver → Browser). Explain TestNG annotations in order: @BeforeSuite → @BeforeTest → @BeforeClass → @BeforeMethod → @Test → @AfterMethod → @AfterClass → @AfterTest → @AfterSuite. Know the difference: JUnit (unit testing) vs TestNG (full test suite management)."
        Theory={<>
          <p><strong className="text-white">Selenium (Q35, Q36):</strong> Selenium is an open-source browser automation framework. Used for <strong>Functional Testing</strong> and <strong>Regression Testing</strong> of web applications across multiple browsers (Chrome, Firefox, Edge).</p>
          <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4 mb-3">
            <p className="text-xs font-black text-emerald-400 mb-2">Selenium Suite Components</p>
            <div className="space-y-1.5">
              {[
                {c:'Selenium IDE',d:'Record-and-replay Firefox plugin. No coding needed. Good for quick tests.'},
                {c:'Selenium WebDriver',d:'Programmatic browser control. Direct browser communication. Most used.'},
                {c:'Selenium Grid',d:'Parallel test execution across multiple machines, browsers, and OS.'},
                {c:'Selenium RC (deprecated)',d:'Old server-based approach. Replaced by WebDriver.'},
              ].map(({c,d})=>(
                <div key={c} className="flex gap-3 bg-slate-800/40 rounded-lg p-2">
                  <span className="text-emerald-400 font-black text-[10px] w-32 shrink-0">{c}</span>
                  <span className="text-[9px] text-slate-400">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <p><strong className="text-white">TestNG Annotations (Q42 onwards):</strong></p>
          <div className="bg-slate-900 border border-purple-500/20 rounded-xl p-3">
            <div className="space-y-1">
              {[
                ['@BeforeSuite','Runs once before entire test suite'],
                ['@BeforeTest','Runs before each &lt;test&gt; tag in XML'],
                ['@BeforeClass','Runs before first method in a test class'],
                ['@BeforeMethod','Runs before EACH @Test method'],
                ['@Test','The actual test method — main annotation'],
                ['@AfterMethod','Cleanup after each test method'],
                ['@AfterClass','Cleanup after all methods in class'],
                ['@AfterSuite','Final cleanup after everything'],
              ].map(([ann,desc])=>(
                <div key={ann} className="flex gap-3 items-start">
                  <code className="text-purple-400 text-[9px] font-mono w-28 shrink-0">{ann}</code>
                  <span className="text-[9px] text-slate-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <CompareTable
            headers={[
              {label:'Feature',color:'text-slate-400'},
              {label:'JUnit',color:'text-orange-400'},
              {label:'TestNG',color:'text-purple-400'},
            ]}
            rows={[
              ['Purpose','Unit Testing (small scope)','Full suite management'],
              ['Annotations','@Test, @Before, @After','@Test, @BeforeSuite, @DataProvider'],
              ['Parallel Tests','Limited','Built-in parallel support'],
              ['Data-Driven','JUnit Parameterized','@DataProvider annotation'],
              ['Reports','No built-in','Detailed HTML reports'],
            ]}
          />
        </>}
        Diagram={
          <div className="flex flex-col gap-4">
            {/* Selenium WebDriver Architecture */}
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-[10px] font-black text-emerald-400 mb-3 text-center">Selenium WebDriver Architecture</p>
              <div className="flex flex-col gap-1">
                {[
                  {l:'Test Script (Java/Python)',d:'Test logic written by QA engineer',c:'emerald'},
                  {l:'WebDriver API',d:'Standard interface for browser control',c:'blue'},
                  {l:'Browser Driver (ChromeDriver)',d:'Translates commands to browser actions',c:'indigo'},
                  {l:'Browser (Chrome/Firefox)',d:'Actually clicks, types, navigates',c:'purple'},
                ].map((s,i)=>(
                  <div key={s.l}>
                    <div className={`bg-${s.c}-950/30 border border-${s.c}-600/30 rounded-xl p-2.5`}>
                      <p className={`text-[10px] font-black text-${s.c}-400`}>{s.l}</p>
                      <p className="text-[8px] text-slate-500 mt-0.5">{s.d}</p>
                    </div>
                    {i < 3 && <FlowArrow label={i===0?'W3C WebDriver Protocol':i===1?'JSON Wire Protocol':undefined}/>}
                  </div>
                ))}
              </div>
            </div>
            {/* Selenium Grid */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <p className="text-[10px] font-black text-slate-400 mb-2">Selenium Grid — Parallel Testing</p>
              <div className="text-center mb-2">
                <div className="inline-block bg-orange-950/40 border border-orange-600/40 rounded-xl px-4 py-2">
                  <p className="text-[10px] font-black text-orange-400">Hub (Central Controller)</p>
                  <p className="text-[8px] text-slate-500">Receives test requests, routes to nodes</p>
                </div>
              </div>
              <div className="flex justify-center mb-2 gap-8">
                {['│','│','│'].map((_, i) => <div key={i} className="w-px h-4 bg-slate-700"></div>)}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {n:'Node 1',b:'Chrome on Win',c:'blue'},
                  {n:'Node 2',b:'Firefox on Mac',c:'purple'},
                  {n:'Node 3',b:'Edge on Linux',c:'emerald'},
                ].map(node=>(
                  <div key={node.n} className={`bg-${node.c}-950/20 border border-${node.c}-700/30 rounded-lg p-2 text-center`}>
                    <p className={`text-[9px] font-black text-${node.c}-400`}>{node.n}</p>
                    <p className="text-[8px] text-slate-500">{node.b}</p>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-slate-600 text-center mt-2">All 3 nodes run tests simultaneously</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
