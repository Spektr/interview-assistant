import {useRootStore} from "../../../store/root.store";

export const useQuestionStore = () => useRootStore().questionStore;