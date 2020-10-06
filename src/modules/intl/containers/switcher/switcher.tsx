import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Mail as MailIcon} from '@material-ui/icons';
import {useObserver} from 'mobx-react-lite';
import React from 'react';

import {useIntlStore} from '../../store/intl.selector';

export function LanguageSwitcher() {
  const store = useIntlStore();

  return useObserver(() =>
    (
      <List>
        <ListItem onClick={store.switchToEnglish.bind(store)} button={true} key='switchToEnglish'>
          <ListItemIcon><MailIcon/></ListItemIcon>
          <ListItemText primary='English'/>
        </ListItem>
        <ListItem onClick={store.switchToRussian.bind(store)} button={true} key='switchToRussian'>
          <ListItemIcon><MailIcon/></ListItemIcon>
          <ListItemText primary='Русский'/>
        </ListItem>
      </List>
    ),
  );
}
