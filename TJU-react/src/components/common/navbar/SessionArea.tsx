/* eslint-disable react/prop-types, react/no-array-index-key */

import * as React from 'react'
import { Button, Icon, Menu, Popup, List, Modal, Embed } from 'semantic-ui-react'
import { defineMessages, FormattedMessage, InjectedIntlProps } from 'react-intl'
import { CHANGELOG } from '../../../constants'

const messages = defineMessages({
  support: {
    defaultMessage: 'Support',
    id: 'sessionArea.support',
  },
  whatsNew: {
    defaultMessage: 'Updates',
    id: 'sessionArea.whatsNew',
  },
})

interface Props extends InjectedIntlProps {
  sessionId?: string
}

const defaultProps = {
  sessionId: undefined,
}

const SessionArea: React.FunctionComponent<Props> = ({ intl, sessionId }): React.ReactElement<any> => (
  <>
    <Menu.Item button>
      <Button
        icon
        as="a"
        color={sessionId ? 'green' : undefined}
        disabled={!sessionId}
        href="/sessions/running"
        labelPosition="left"
      >
        <Icon name="play" />
        <FormattedMessage defaultMessage="Running Session" id="sessionArea.toRunningSession" />
      </Button>
    </Menu.Item>

    
   
    <style jsx>
      {`
        h3 {
          font-size: 1.2rem;
        }

        h4 {
          font-size: 1rem;
          margin: 0;
        }

        .popupContent {
          padding: 0;

          :global(.button) {
            width: 100%;
            margin-bottom: 0.5rem;
          }
        }

        .popupHelp {
          width: 20rem;
        }

        .popupChanges {
          overflow: auto;
          max-height: 40rem;
          width: 35rem;
        }
      `}
    </style>
  </>
)

SessionArea.defaultProps = defaultProps

export default SessionArea
