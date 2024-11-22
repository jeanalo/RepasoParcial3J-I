import { RecordActions } from "../types/store";

export const reducer = (currentAction: any, currentState: any) => {
	// Extraer `action` y `payload` de la acción actual
	const { action, payload } = currentAction;

	switch (action) {
		// Navegar entre pantallas
		case 'navigate':
			return {
				...currentState,
				screen: payload,
			};

		// Actualizar la lista de registros
		case RecordActions.GET:
			return {
				...currentState,
				recordlist: payload,
			};

		// Seleccionar un registro para edición
		case 'SET_SELECTED_RECORD':
			return {
				...currentState,
				selectedRecord: payload,
			};

		// Actualizar un registro existente en la lista
		case 'UPDATE_RECORD_IN_LIST':
			return {
				...currentState,
				recordlist: currentState.recordlist.map((record: any) =>
					record.id === payload.id ? payload : record
				),
			};

			case 'SET_SELECTED_RECORD':
	return {
		...currentState,
		selectedRecord: payload,
	};

	case 'DELETE_RECORD':
  return {
    ...currentState,
    recordlist: currentState.recordlist.filter(
      (record: any) => record.id !== payload
    ),
  };



		default:
			return currentState;
	}
};
