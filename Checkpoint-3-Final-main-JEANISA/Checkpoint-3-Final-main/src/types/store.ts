import { DataShapeRecord } from "../types/record";

export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
  something: {};
  recordlist:DataShapeRecord[],
  selectedRecord?: DataShapeRecord; 
};

export enum SomeActions {
  "X" = "X",
}

export interface XAction {
  action: SomeActions.X;
  payload: Pick<AppState, "something">;
}

export enum RecordActions {
	'GET' = 'GET',
}

export interface GetRecordsAction {
	action: RecordActions.GET;
	payload: DataShapeRecord[] | undefined;
}





export type Actions = XAction| GetRecordsAction;
