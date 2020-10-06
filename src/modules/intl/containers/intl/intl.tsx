import {useObserver} from 'mobx-react-lite';
import React, {PropsWithChildren} from 'react';
import {IntlProvider} from 'react-intl';

import {useIntlStore} from '../../store/intl.selector';

export function IntlProviderWrapper(props: PropsWithChildren<{}>): JSX.Element {
  const {children} = props;
  const store = useIntlStore();

  return useObserver(() => {
    return (
      <IntlProvider
        locale={store.locale}
        messages={store.messages}
        defaultLocale='en'
      >
        {children}
      </IntlProvider>
    );
  });
}
