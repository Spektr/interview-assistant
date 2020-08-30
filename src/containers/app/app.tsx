import React, {ChangeEvent, useState} from 'react';
import logo from '../../logo.svg';
import './app.css';
import {Language} from "../../shared/enums/language";
import {Tag} from "../../shared/enums/tag";

function App() {

    const [question, setQuestion] = useState(null);
    const [language, setLanguage] = useState(Language.En);
    const [tag, setTag] = useState(Tag.UI);

    const load = () => {
        import(`../../questions/${language.toLowerCase()}/${tag.toLowerCase()}`)
            .then(widget => {
                setQuestion(widget);
            })
            .catch((e) => {
                console.log(e);
                setQuestion(null);
            });
    };

    const setLanguageHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as Language;
        setLanguage(value);
    };

    const setTagHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as Tag;
        setTag(value);
    };


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>

                <select
                    name="lang"
                    id="lang"
                    onChange={setLanguageHandler}
                    defaultValue={Language.En}
                >
                    {Object.values(Language).map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>

                <select
                    name="tag"
                    id="tag"
                    onChange={setTagHandler}
                    defaultValue={Tag.UI}
                >
                    {Object.values(Tag).map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>

                <button onClick={load}>load</button>
                {JSON.stringify(question)}
                {tag}
                {language}
            </header>
        </div>
    );
}

export default App;
