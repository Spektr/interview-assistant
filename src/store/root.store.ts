import React from 'react';
import {QuestionStore} from '../modules/questions/store/question.store';
import {IntlStore} from '../modules/intl/store/intl.store';

export class RootStore {
    questionStore = new QuestionStore(this);
    intlStore = new IntlStore(this);
}

export const rootStoreInstance = new RootStore();
export const RootStoreContext = React.createContext<RootStore>(rootStoreInstance);
export const useRootStore = () => React.useContext(RootStoreContext);
