import { useState } from "react";
import TreeDiagram, { TreeDiagramProvider } from "./TreeDiagram";

const jsondd = {
  "company": {
    "name": "TechCorp",
    "founded": 2010,
    "isPublic": true,
    "employees": [
      {
        "id": 1,
        "name": "Alice",
        "role": "Developer",
        "skills": ["JavaScript", "React", "Node.js"],
        "projects": [
          {
            "name": "Project Alpha",
            "status": "completed",
            "budget": 120000
          },
          {
            "name": "Project Beta",
            "status": "in progress",
            "budget": 90000
          }
        ]
      },
      {
        "id": 2,
        "name": "Bob",
        "role": "Designer",
        "skills": ["Figma", "Adobe XD"],
        "projects": [
          {
            "name": "Project Alpha",
            "status": "completed",
            "budget": 120000
          }
        ]
      }
    ],
    "departments": {
      "development": {
        "head": "Alice",
        "teams": ["frontend", "backend", "QA"]
      },
      "design": {
        "head": "Bob",
        "teams": ["UI", "UX"]
      }
    },
    "headquarters": {
      "city": "San Francisco",
      "state": "CA",
      "address": {
        "street": "123 Tech St",
        "zip": "94107"
      }
    }
  }
}
;





export default function JsonTreeVisualizer() {
  const [json, setjson] = useState({})
  const setJsonhandler = (json)=>{
    console.log(json)
  setjson(json)
  }


 
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <TreeDiagramProvider>
        <TreeDiagram setJsonhandler={setJsonhandler} json={json} />
      </TreeDiagramProvider>
    </div>
  );
}
