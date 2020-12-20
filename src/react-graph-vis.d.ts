// Found at https://gist.github.com/ChadJPetersen/2e2587bbd753c6a384c02519183e2031
// You must first install the vis types 'npm install --save-dev @types/vis'

declare module "react-graph-vis" {
	import { Component } from "react";
	import { DataSet, Edge, Network, NetworkEvents, Node, Options } from "vis";

	export { DataSet, Edge, Network, NetworkEvents, Node, Options } from "vis";

	export interface graphEvents {
		[event: NetworkEvents]: (params?: unknown) => void;
	}

	//Doesn't appear that this module supports passing in a vis.DataSet directly. Once it does graph can just use the Data object from vis.
	export interface GraphData {
		nodes: Node[];
		edges: Edge[];
	}

	export interface NetworkGraphProps {
		graph: GraphData;
		options?: Options;
		events?: graphEvents;
		getNetwork?: (network: Network) => void;
		identifier?: string;
		style?: React.CSSProperties;
		getNodes?: (nodes: DataSet) => void;
		getEdges?: (edges: DataSet) => void;
	}

	export interface NetworkGraphState {
		identifier: string;
	}

	export default class NetworkGraph extends Component<
		NetworkGraphProps,
		NetworkGraphState
	> {
		render();
	}
}
