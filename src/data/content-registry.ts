/**
 * Lookup for game tables and action flows (Guided embeds + static reference).
 */
import alchemistTools from './tables/alchemist-tools.json';
import harvestOrder from './tables/harvest-order.json';
import roundAtAGlance from './tables/round-at-a-glance.json';
import engineBuilding from './tables/engine-building.json';
import transmutationProcess from './tables/transmutation-process.json';
import summerFlow from './flows/summer-flow.json';
import autumnFlow from './flows/autumn-flow.json';
import winterFlow from './flows/winter-flow.json';

export type LocalizedString = string | Record<string, string>;

export type FlowNodeKind = 'required' | 'optional' | 'choice' | 'group' | 'sequence';

/** Which autumn stone picker highlights this step (omit = all). */
export type StoneState = 'stasis' | 'forgingNew' | 'forgingReady' | 'notInForge' | 'all';

export type AutumnPassId = 'pass1' | 'pass2';

export type FlowNode = {
	id: string;
	label: LocalizedString;
	kind: FlowNodeKind;
	body?: LocalizedString;
	condition?: LocalizedString;
	stoneStates?: StoneState[];
	/** Autumn: pass-1 / pass-2 group or step membership */
	passId?: AutumnPassId;
	children?: FlowNode[];
	learnMoreHash?: string;
	gameModeNote?: Partial<Record<'quickplay' | 'standard' | 'magnus', string | null>>;
};

export type ActionFlow = {
	id: string;
	mode: 'playerTurn' | 'fixedSequence' | 'sequentialHybrid';
	intro?: LocalizedString;
	learnMoreHash?: string;
	root: FlowNode;
};

export type StepListTable = {
	intro?: LocalizedString;
	steps: Array<{
		id: string;
		label: LocalizedString;
		body: LocalizedString;
	}>;
};

export type SeasonCardsTable = {
	intro?: LocalizedString;
	seasons: Array<{
		id: string;
		icon: string;
		title: LocalizedString;
		subtitle: LocalizedString;
		summary: LocalizedString;
	}>;
};

export type TableId =
	| 'alchemist-tools'
	| 'harvest-order'
	| 'round-at-a-glance'
	| 'engine-building'
	| 'transmutation-process';
export type FlowId = 'summer-flow' | 'autumn-flow' | 'winter-flow';

const TABLES: Record<TableId, StepListTable | SeasonCardsTable> = {
	'alchemist-tools': alchemistTools as StepListTable,
	'harvest-order': harvestOrder as StepListTable,
	'round-at-a-glance': roundAtAGlance as SeasonCardsTable,
	'engine-building': engineBuilding as SeasonCardsTable,
	'transmutation-process': transmutationProcess as SeasonCardsTable,
};

const FLOWS: Record<FlowId, ActionFlow> = {
	'summer-flow': summerFlow as ActionFlow,
	'autumn-flow': autumnFlow as ActionFlow,
	'winter-flow': winterFlow as ActionFlow,
};

export function getTable(id: TableId): StepListTable | SeasonCardsTable {
	return TABLES[id];
}

export function getFlow(id: FlowId): ActionFlow {
	return FLOWS[id];
}

export function localize(value: LocalizedString | undefined, locale: string): string {
	if (!value) return '';
	if (typeof value === 'string') return value;
	return value[locale] ?? value.en ?? Object.values(value)[0] ?? '';
}
