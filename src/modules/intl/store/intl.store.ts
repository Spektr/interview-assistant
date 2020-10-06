import {createMuiTheme, Theme} from '@material-ui/core';
import {enUS, ruRU} from '@material-ui/core/locale';
import {enUS as pickerEnUS, ru} from 'date-fns/locale';
import {computed, observable} from 'mobx';

import {RootStore} from '../../../store/root.store';
import enTranslation from '../locale/en.json';
import ruTranslation from '../locale/ru.json';

export class IntlStore {
  rootStore: RootStore;

  @observable locale = 'ru';
  @observable messages = ruTranslation;

  @computed get theme(): Theme {
    return createMuiTheme({}, this.themeMap[this.locale]);
  }

  @computed get pickersLocale(): Theme {
    return createMuiTheme({}, this.currentLocale);
  }

  @computed get currentLocale(): Locale {
    return this.pickersLocaleMap[this.locale];
  }

  private themeMap: { [key: string]: object } = {
    ru: ruRU,
    en: enUS,
  };

  private pickersLocaleMap: { [key: string]: Locale } = {
    ru,
    en: pickerEnUS,
  };

  constructor(root: RootStore) {
    this.rootStore = root;
  }

  switchToEnglish(): void {
    this.locale = 'en';
    this.messages = enTranslation;
  }

  switchToRussian(): void {
    this.locale = 'ru';
    this.messages = ruTranslation;
  }
}
