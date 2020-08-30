import React from 'react';
import {QuestionStore} from "../modules/questions/store/question.store";

export class RootStore {
    questionStore = new QuestionStore(this);
}

export const rootStoreInstance = new RootStore();
export const RootStoreContext = React.createContext<RootStore>(rootStoreInstance);
export const useRootStore = () => React.useContext(RootStoreContext);