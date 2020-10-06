import React, {ChangeEvent} from 'react';
import logo from '../../../../logo.svg';
import './app.css';
import {Tag} from '../../../../shared/enums/tag';
import {Language} from '../../../../shared/enums/language';
import {useQuestionStore} from '../../../questions/store/question.selector';
import {useObserver} from 'mobx-react-lite';
import {FormattedMessage} from 'react-intl';

function App() {
    const store = useQuestionStore();

    const load = () => {
        store.loadTags();
    };

    const setLanguageHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as Language;
        store.setLang(value);
    };

    const setTagHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as Tag;
        store.testTag(value);
    };

    return useObserver(() => (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <p>
                        <FormattedMessage id='app.titles.main'/>
                    </p>

                    <select
                        name='lang'
                        id='lang'
                        onChange={setLanguageHandler}
                        defaultValue={Language.En}
                    >
                        {Object.values(Language).map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>

                    <select
                        name='tag'
                        id='tag'
                        onChange={setTagHandler}
                        defaultValue={Tag.UI}
                    >
                        {Object.values(Tag).map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>

                    <button onClick={load}>load</button>
                    {JSON.stringify(store.list.map(item => item.toDto))}
                </header>
            </div>
        )
    );
}

export default App;
