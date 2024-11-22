import { getDataRecord } from "../services/getDataRecord";
import { GetRecordsAction, RecordActions } from "../types/store";
import { DataShapeRecord } from "../types/record"; // Importa la estructura del tipo de datos `record`

export const navigate = (screen: string) => {
	return {
		action: 'navigate',
		payload: screen,
	};
};

export const GetRecords = async (): Promise<GetRecordsAction> => {
	const datarecord = await getDataRecord();
	return {
		action: RecordActions.GET,
		payload: datarecord,
	};
};

export const setSelectedRecord = (record: DataShapeRecord) => {
	return {
		type: 'SET_SELECTED_RECORD',
		payload: record,
	};
};

export const deleteRecordFromState = (recordId: string) => ({
	type: 'DELETE_RECORD',
	payload: recordId,
  });
  