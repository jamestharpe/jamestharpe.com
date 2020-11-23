export declare global {
	interface LunrResult {
		url: string;
		title: string;
		ref: string;
	}

	interface LunrStore {
		[ref: string]: LunrResult;
	}

	interface Window {
		__LUNR__: {
			[key: string]: {
				index: {
					search: { (query: string): LunrResult[] };
				};
				store: LunrStore;
			};
		};
	}
}
