import FloorNode from "./FloorNode.tsx";
import lowerLevel1 from "../assets/00_thelowerlevel1.png";
//import {useEffect, useState} from "react";
import { Graph } from "../objects/Graph.ts";
import { Node } from "../objects/Node.ts";

export interface InputNode {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}

export interface Edge {
  startNodeID: string;
  endNodeID: string;
}

function FloorMap() {
  //const [nodes, setNodes] = useState<InputNode[]>([]);
  //const [edges, setEdges] = useState<Edge[]>([]);
  const edges = [
    ["CCONF002L1", "WELEV00HL1"],
    ["CCONF003L1", "CHALL002L1"],
    ["CDEPT002L1", "CDEPT003L1"],
    ["CDEPT003L1", "CHALL014L1"],
    ["CDEPT004L1", "CHALL002L1"],
    ["CHALL001L1", "CREST001L1"],
    ["CHALL002L1", "CSERV001L1"],
    ["CHALL003L1", "CCONF003L1"],
    ["CHALL003L1", "CLABS004L1"],
    ["CHALL004L1", "CREST004L1"],
    ["CHALL005L1", "WELEV00ML1"],
    ["CHALL006L1", "CHALL007L1"],
    ["CHALL007L1", "CHALL008L1"],
    ["CHALL008L1", "CDEPT004L1"],
    ["CHALL008L1", "WELEV00KL1"],
    ["CHALL009L1", "CHALL010L1"],
    ["CHALL009L1", "CRETL001L1"],
    ["CHALL010L1", "CREST003L1"],
    ["CHALL011L1", "WELEV00JL1"],
    ["CHALL012L1", "CHALL013L1"],
    ["CHALL013L1", "CDEPT002L1"],
    ["CHALL014L1", "WELEV00LL1"],
    ["CHALL015L1", "CCONF001L1"],
    ["CHALL015L1", "CHALL011L1"],
    ["CLABS001L1", "CREST002L1"],
    ["CLABS002L1", "CHALL005L1"],
    ["CLABS002L1", "CREST001L1"],
    ["CLABS003L1", "CHALL006L1"],
    ["CLABS004L1", "CLABS003L1"],
    ["CLABS005L1", "CHALL003L1"],
    ["CREST002L1", "CHALL006L1"],
    ["CREST003L1", "CHALL015L1"],
    ["CREST004L1", "CLABS005L1"],
    ["CRETL001L1", "CHALL012L1"],
    ["CSERV001L1", "CCONF002L1"],
    ["WELEV00HL1", "CHALL004L1"],
    ["WELEV00KL1", "CHALL009L1"],
    ["WELEV00LL1", "CHALL001L1"],
    ["WELEV00ML1", "CLABS001L1"],
    ["GEXIT001L1", "GHALL002L1"],
    ["GHALL002L1", "GHALL003L1"],
    ["GHALL003L1", "GHALL004L1"],
    ["GHALL003L1", "GHALL005L1"],
    ["GHALL005L1", "GSTAI008L1"],
    ["GHALL005L1", "GHALL006L1"],
    ["GHALL006L1", "GELEV00QL1"],
  ];

  const nodes = [
    [
      "CCONF001L1",
      "2255",
      "849",
      "L1",
      "45 Francis",
      "CONF",
      "Anesthesia Conf Floor L1",
      "Conf C001L1",
    ],
    [
      "CCONF002L1",
      "2665",
      "1043",
      "L1",
      "45 Francis",
      "CONF",
      "Medical Records Conference Room Floor L1",
      "Conf C002L1",
    ],
    [
      "CCONF003L1",
      "2445",
      "1245",
      "L1",
      "45 Francis",
      "CONF",
      "Abrams Conference Room",
      "Conf C003L1",
    ],
    [
      "CDEPT002L1",
      "1980",
      "844",
      "L1",
      "Tower",
      "DEPT",
      "Day Surgery Family Waiting Floor L1",
      "Department C002L1",
    ],
    [
      "CDEPT003L1",
      "1845",
      "844",
      "L1",
      "Tower",
      "DEPT",
      "Day Surgery Family Waiting Exit Floor L1",
      "Department C003L1",
    ],
    [
      "CDEPT004L1",
      "2310",
      "1043",
      "L1",
      "45 Francis",
      "DEPT",
      "Medical Records Film Library Floor L1",
      "Department C004L1",
    ],
    [
      "CHALL001L1",
      "1732",
      "924",
      "L1",
      "Tower",
      "HALL",
      "Hallway 1 Floor L1",
      "Hallway C001L1",
    ],
    [
      "CHALL002L1",
      "2445",
      "1043",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 2 Floor L1",
      "Hallway C002L1",
    ],
    [
      "CHALL003L1",
      "2445",
      "1284",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 3 Floor L1",
      "Hallway C003L1",
    ],
    [
      "CHALL004L1",
      "2770",
      "1070",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 4 Floor L1",
      "Hallway C004L1",
    ],
    [
      "CHALL005L1",
      "1750",
      "1284",
      "L1",
      "Tower",
      "HALL",
      "Hallway 5 Floor L1",
      "Hallway C005L1",
    ],
    [
      "CHALL006L1",
      "2130",
      "1284",
      "L1",
      "Tower",
      "HALL",
      "Hallway 6 Floor L1",
      "Hallway C006L1",
    ],
    [
      "CHALL007L1",
      "2130",
      "1045",
      "L1",
      "Tower",
      "HALL",
      "Hallway 7 Floor L1",
      "Hallway C007L1",
    ],
    [
      "CHALL008L1",
      "2215",
      "1045",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 8 Floor L1",
      "Hallway C008L1",
    ],
    [
      "CHALL009L1",
      "2220",
      "904",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 9 Floor L1",
      "Hallway C009L1",
    ],
    [
      "CHALL010L1",
      "2265",
      "904",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 10 Floor L1",
      "Hallway C010L1",
    ],
    [
      "CHALL011L1",
      "2360",
      "849",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 11 Floor L1",
      "Hallway C011L1",
    ],
    [
      "CHALL012L1",
      "2130",
      "904",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 12 Floor L1",
      "Hallway C012L1",
    ],
    [
      "CHALL013L1",
      "2130",
      "844",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 13 Floor L1",
      "Hallway C013L1",
    ],
    [
      "CHALL014L1",
      "1845",
      "924",
      "L1",
      "Tower",
      "HALL",
      "Hallway 14 Floor L1",
      "Hallway C014L1",
    ],
    [
      "CHALL015L1",
      "2300",
      "849",
      "L1",
      "45 Francis",
      "HALL",
      "Hallway 15 Floor L1",
      "Hallway C015L1",
    ],
    [
      "CLABS001L1",
      "1965",
      "1284",
      "L1",
      "Tower",
      "LABS",
      "Outpatient Fluoroscopy Floor L1",
      "Lab C001L1",
    ],
    [
      "CLABS002L1",
      "1750",
      "1090",
      "L1",
      "Tower",
      "LABS",
      "Pre-Op PACU Floor L1",
      "Lab C002L1",
    ],
    [
      "CLABS003L1",
      "2290",
      "1284",
      "L1",
      "45 Francis",
      "LABS",
      "Nuclear Medicine Floor L1",
      "Lab C003L1",
    ],
    [
      "CLABS004L1",
      "2320",
      "1284",
      "L1",
      "45 Francis",
      "LABS",
      "Ultrasound Floor L1",
      "Lab C004L1",
    ],
    [
      "CLABS005L1",
      "2770",
      "1284",
      "L1",
      "45 Francis",
      "LABS",
      "CSIR MRI Floor L1",
      "Lab C005L1",
    ],
    [
      "CREST001L1",
      "1732",
      "1019",
      "L1",
      "Tower",
      "REST",
      "Restroom L Elevator Floor L1",
      "Restroom C001L1",
    ],
    [
      "CREST002L1",
      "2065",
      "1284",
      "L1",
      "Tower",
      "REST",
      "Restroom M Elevator Floor L1",
      "Restroom C002L1",
    ],
    [
      "CREST003L1",
      "2300",
      "879",
      "L1",
      "45 Francis",
      "REST",
      "Restroom K Elevator Floor L1",
      "Restroom C003L1",
    ],
    [
      "CREST004L1",
      "2770",
      "1160",
      "L1",
      "45 Francis",
      "REST",
      "Restroom H Elevator Floor L1",
      "Restroom C004L1",
    ],
    [
      "CRETL001L1",
      "2185",
      "904",
      "L1",
      "45 Francis",
      "RETL",
      "Vending Machine 1 L1",
      "Retail C001L1",
    ],
    [
      "CSERV001L1",
      "2490",
      "1043",
      "L1",
      "45 Francis",
      "SERV",
      "Volunteers Floor L1",
      "Service C001L1",
    ],
    [
      "CSERV001L2",
      "2015",
      "1280",
      "L2",
      "45 Francis",
      "SERV",
      "Interpreter Services Floor L2",
      "Service C001L2",
    ],
    [
      "GELEV00QL1",
      "1637",
      "2116",
      "L1",
      "Shapiro",
      "ELEV",
      "Elevator Q MapNode 7 Floor L1",
      "Elevator Q L1",
    ],
    [
      "GEXIT001L1",
      "1702",
      "2260",
      "L1",
      "Shapiro",
      "EXIT",
      "Fenwood Road Exit MapNode 1 Floor L1",
      "Fenwood Road EntranceExit L1",
    ],
    [
      "GHALL002L1",
      "1702",
      "2167",
      "L1",
      "Shapiro",
      "HALL",
      "Hallway MapNode 2 Floor L1",
      "Hall",
    ],
    [
      "GHALL003L1",
      "1688",
      "2167",
      "L1",
      "Shapiro",
      "HALL",
      "Hallway MapNode 3 Floor L1",
      "Hall",
    ],
    [
      "GHALL004L1",
      "1666",
      "2167",
      "L1",
      "Shapiro",
      "HALL",
      "Hallway MapNode 4 Floor L1",
      "Hall",
    ],
    [
      "GHALL005L1",
      "1688",
      "2131",
      "L1",
      "Shapiro",
      "HALL",
      "Hallway MapNode 5 Floor L1",
      "Hall",
    ],
    [
      "GHALL006L1",
      "1665",
      "2116",
      "L1",
      "Shapiro",
      "HALL",
      "Hallway MapNode 6 Floor L1",
      "Hall",
    ],
    [
      "GSTAI008L1",
      "1720",
      "2131",
      "L1",
      "Shapiro",
      "STAI",
      "Stairs MapNode 8 Floor L1",
      "L1 Stairs",
    ],
    [
      "WELEV00HL1",
      "2715",
      "1070",
      "L1",
      "45 Francis",
      "ELEV",
      "Elevator H Floor L1",
      "Elevator HL1",
    ],
    [
      "WELEV00JL1",
      "2360",
      "799",
      "L1",
      "45 Francis",
      "ELEV",
      "Elevator J Floor L1",
      "Elevator JL1",
    ],
    [
      "WELEV00KL1",
      "2220",
      "974",
      "L1",
      "45 Francis",
      "ELEV",
      "Elevator K Floor L1",
      "Elevator KL1",
    ],
    [
      "WELEV00LL1",
      "1785",
      "924",
      "L1",
      "Tower",
      "ELEV",
      "Elevator L Floor L1",
      "Elevator LL1",
    ],
    [
      "WELEV00ML1",
      "1820",
      "1284",
      "L1",
      "Tower",
      "ELEV",
      "Elevator M Floor L1",
      "Elevator ML1",
    ],
  ];

  //create graph based

  const graphMap = () => {
    const graph: Graph = new Graph(new Map<string, Node>());

    // Parses out each node and adds it to the graph
    nodes.forEach(function (inputNode) {
      const nodeID = inputNode[0];
      const xcoord = parseInt(inputNode[1]);
      const ycoord = parseInt(inputNode[2]);
      const floor = inputNode[3];
      const building = inputNode[4];
      const nodeType = inputNode[5];
      const longName = inputNode[6];
      const shortName = inputNode[7].replace("\r", "");
      // Remove return character from the last element

      //shortName = shortName.replace("", "")
      graph.addNode(
        new Node(
          nodeID,
          xcoord,
          ycoord,
          floor,
          building,
          nodeType,
          longName,
          shortName,
        ),
      );
    });

    // Goes through each edge given and adds them to nodes adjacencies.
    edges.forEach(function (edge) {
      graph.addEdge(edge[0], edge[1]);
    });
    return graph;
  };

  return (
    <>
      <FloorNode
        imageSrc={lowerLevel1}
        nodes={nodes}
        edges={edges}
        graph={graphMap()}
      />
    </>
  );
}

export default FloorMap;
