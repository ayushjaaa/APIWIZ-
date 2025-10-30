import { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import { generateTreeData, TREE_CONFIG } from "./utils";
import "reactflow/dist/style.css";

export const TreeDiagramProvider = ReactFlowProvider;

export default function TreeDiagram({ json, setJsonhandler }) {
  const { fitView } = useReactFlow();
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");


  const [textarea, setTextarea] = useState("");
  const [error, setError] = useState("");


  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setTextarea(value);

    try {
      JSON.parse(value);
      setError(""); 
    } catch (err) {
      setError("⚠️ Invalid JSON format — please check your syntax");
    }
  };


  const handleSubmit = () => {
    try {
      const parsed = JSON.parse(textarea);
      setError("");
      setJsonhandler(parsed);
    } catch (err) {
      setError("⚠️ Invalid JSON — cannot generate tree");
    }
  };


  const { nodes, edges } = useMemo(() => {
    const { nodes, edges } = generateTreeData({ json });

    const matchingNodeIndex = nodes.findIndex(
      (node) => node.data.path === search
    );

    if (matchingNodeIndex !== -1) {
      nodes[matchingNodeIndex].style = {
        ...nodes[matchingNodeIndex].style,
        ...TREE_CONFIG.selected,
      };
      fitView({ nodes: [{ id: nodes[matchingNodeIndex].id }], duration: 500 });
    }

    return { nodes, edges };
  }, [search, json, fitView]);


  const themeClasses = {
    light: {
      bg: "bg-white",
      text: "text-gray-900",
      border: "border-gray-300",
      placeholder: "placeholder-gray-400",
      inputBg: "bg-gray-50",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
      reactFlowBg: "bg-gray-50",
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-gray-100",
      border: "border-gray-600",
      placeholder: "placeholder-gray-500",
      inputBg: "bg-gray-800",
      button: "bg-blue-700 hover:bg-blue-800 text-white",
      reactFlowBg: "bg-gray-800",
    },
  };

  const current = themeClasses[theme];

  return (
    <div
      className={`flex flex-col w-full h-screen p-4 gap-4 ${current.bg} ${current.text}`}
    >
      <header className="flex flex-col sm:flex-row justify-between items-center w-full mb-4">
        <h1 className="text-2xl sm:text-4xl font-bold">JSON Tree Visualizer</h1>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`px-4 py-2 rounded-lg border ${current.border} ${current.button} transition`}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <div className="flex flex-col lg:flex-row w-full h-full gap-4">
 
        <div className="flex flex-col w-full lg:w-1/2 gap-4">
          <label htmlFor="json" className="text-sm lg:text-lg font-medium">
            JSON Input
          </label>

          <textarea
            onChange={handleTextareaChange}
            id="json"
            rows={12}
            placeholder={`{
  "user": {
    "id": 123,
    "name": "Alice",
    "roles": ["admin", "editor"]
  }
}`}
            className={`w-full h-72 sm:h-96 p-4 text-sm lg:text-base font-mono rounded-xl shadow-sm outline-none resize-none
              ${current.inputBg} ${current.text} border ${
              error ? "border-red-500" : current.border
            } ${current.placeholder}
              focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition`}
          />


          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={!!error || !textarea.trim()} 
            className={`self-start px-4 py-2 rounded-lg font-semibold transition ${
              error || !textarea.trim()
                ? "bg-gray-400 cursor-not-allowed text-white"
                : current.button
            }`}
          >
            Generate Tree
          </button>

          <h1 className="font-semibold mt-4">Node Colors:</h1>
          <div>
            <button className="bg-[#0000FF] w-30 p-2 text-white rounded">
              Object NODE
            </button>{" "}
            — object
          </div>
          <div>
            <button className="bg-[#0000FF] w-30 p-2 text-white rounded">
              Array NODE
            </button>{" "}
            — Array
          </div>
          <div>
            <button className="bg-[#FDA406] w-30 p-2 text-white rounded">
              Primitive NODE
            </button>{" "}
            — Primitive
          </div>
          <div>
            <button className="bg-[#800080] w-30 p-2 text-white rounded">
              Search
            </button>{" "}
            — search
          </div>
        </div>

  
        <div className="flex flex-col w-full lg:w-1/2 gap-4 h-full">
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="$.user.address.city"
              className={`flex-1 p-2 rounded-lg border outline-none text-sm lg:text-base
                ${current.inputBg} ${current.text} border ${current.border} ${current.placeholder}
                focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition`}
            />
            <button
              className={`px-4 py-2 rounded-lg text-sm lg:text-base ${current.button} transition`}
            >
              Search
            </button>
          </div>

          <div
            className={`flex-1 w-full rounded-xl overflow-hidden border ${current.border} ${current.reactFlowBg}`}
          >
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}
