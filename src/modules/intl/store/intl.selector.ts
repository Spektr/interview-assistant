import {useRootStore} from '../../../store/root.store';

export const useIntlStore = () => useRootStore().intlStore;
