"use client";

import { useCallback, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  Handle,
  Position,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

type RFNode = Node<{ title: string; icon?: string }>;

function NodeCard({ data }: { data: { title: string; icon?: string } }) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-[#0e0a1b]/90 px-4 py-3 text-white shadow-[0_18px_60px_-35px_rgba(124,58,237,0.7)] backdrop-blur">
      <Handle type="target" position={Position.Left} className="!h-2.5 !w-2.5 !bg-emerald-400" />
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[radial-gradient(circle_at_top_left,rgba(255,107,44,0.6),rgba(124,58,237,0.5))] text-xs">
          {data.icon ?? "⚙️"}
        </div>
        <div className="text-sm font-medium leading-none text-white/90">{data.title}</div>
      </div>
      <Handle type="source" position={Position.Right} className="!h-2.5 !w-2.5 !bg-sky-400" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(80%_80%_at_50%_0%,rgba(124,58,237,0.12),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export default function WorkflowBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const initialNodes = useMemo<RFNode[]>(
    () => [
      { id: "1", type: "nodeCard", position: { x: 50, y: 80 }, data: { title: "Trigger • HTTP In" } },
      { id: "2", type: "nodeCard", position: { x: 320, y: 200 }, data: { title: "Action • Transform" } },
      { id: "3", type: "nodeCard", position: { x: 620, y: 320 }, data: { title: "Action • Slack" } },
    ],
    [],
  );
  const initialEdges = useMemo<Edge[]>(() => [{ id: "e1-2", source: "1", target: "2" }], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge({ ...connection }, eds)), [setEdges]);

  const addNode = () => {
    const nid = String(Date.now());
    setNodes((nds) => [
      ...nds,
      {
        id: nid,
        type: "nodeCard",
        position: { x: 200 + (nds.length % 4) * 120, y: 120 + nds.length * 20 },
        data: { title: `Action • Node ${nds.length + 1}` },
      },
    ]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080413] text-white">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.3),transparent_65%)] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,44,0.25),transparent_60%)] blur-[160px]" />
      </div>

      {/* top bar */}
      <header className="sticky top-0 z-20 h-14 border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-6">
          <Link
            href="/dashboard"
            className="text-sm font-semibold bg-[linear-gradient(120deg,#7C3AED_0%,#FF6B2C_50%,#FACC15_100%)] bg-clip-text text-transparent"
          >
            ← Back to Dashboard
          </Link>
          <div className="text-xs text-white/60">Workflow ID: {id}</div>
        </div>
      </header>

      {/* canvas area */}
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[56px_minmax(0,1fr)] gap-4 px-4 py-6 sm:px-6">
        {/* left toolbar */}
        <div className="sticky top-20 h-[520px] self-start rounded-xl border border-white/10 bg-white/[0.04] p-2">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={addNode}
              className="w-full rounded-lg px-2 py-2 text-xs font-semibold text-white transition hover:scale-[1.02]"
              style={{ backgroundImage: "linear-gradient(120deg,#7C3AED 0%,#FF6B2C 50%,#FACC15 100%)" }}
            >
              + Node
            </button>
            <button
              onClick={() => router.refresh()}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-2 py-2 text-xs text-white/80 transition hover:border-white/20 hover:bg-white/20"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="relative h-[70vh] min-h-[520px] rounded-xl border border-white/10 bg-[#0b0716]">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              className="reactflow-dark"
              nodeTypes={{ nodeCard: NodeCard as any }}
            >
              <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="#ffffff1a" />
              <MiniMap maskColor="#0b0716" nodeStrokeColor="#7c3aed" nodeColor="#1f1633" />
            </ReactFlow>
          </ReactFlowProvider>

          {/* execute bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center">
            <button
              className="pointer-events-auto rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_25px_70px_-35px_rgba(255,107,44,0.8)] transition hover:scale-[1.02]"
              style={{ backgroundImage: "linear-gradient(120deg,#7C3AED 0%,#FF6B2C 50%,#FACC15 100%)" }}
            >
              Execute Workflow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
