import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Router from 'next/router'
import { compose, withStateHandlers } from 'recompose'
import { Button, List, Input } from 'semantic-ui-react'

import { StaticLayout } from '../components/layouts'
import { withLogging } from '../lib'

const links = [
  {
    href: '/user/login',
    label: 'Login',
  },
  {
    href: '/user/registration',
    label: 'Sign Up',
  },
]

const propTypes = {
  redirectToJoin: PropTypes.func.isRequired,
  shortname: PropTypes.string,
  updateShortname: PropTypes.func.isRequired,
}

const defaultProps = {
  shortname: '',
}

const Index = ({ shortname, updateShortname, redirectToJoin }) => (
  // TODO: internationalization
  <StaticLayout pageTitle="TJUer">
    <div className="TJUer">
      <h1>
        TJUer
        <span>UZH</span>
      </h1>

      <p className="description">Welcome to the open source instant audience response system.</p>

      <div className="participation">
        <p>Want to participate in a poll?</p>
        <Input
          fluid
          label="app.TJUer.uzh.ch/join/"
          placeholder="account id"
          value={shortname}
          onChange={e => updateShortname(e.target.value)}
        />
        <Button primary disabled={!shortname || shortname === ''} onClick={redirectToJoin}>
          Participate
        </Button>
      </div>

     
       

      <List className="userLinks">
        {links.map(link => (
          <List.Item>
            <Link href={link.href}>
              <Button primary>{link.label}</Button>
            </Link>
          </List.Item>
        ))}
      </List>
    </div>

    <style jsx>
      {`
        @import 'src/theme';
        .TJUer {
          padding: 0.5rem;
          h1 {
            text-align: center;
            font-size: 2rem;
            line-height: 2rem;
            margin-top: 1rem;
            span {
              vertical-align: top;
              font-size: 1rem;
              line-height: 1rem;
            }
          }
          h2 {
            font-size: 1.15rem;
          }
          .description {
            font-style: italic;
            text-align: center;
          }

          .participation {
            display: flex;
            flex-direction: column;

            border: 1px solid $color-primary;
            background-color: $color-primary-10p;
            padding: 1rem;
            width: 100%;
            margin-bottom: 1rem;

            p {
              margin-bottom: 0.5rem;
            }

            :global(.input) {
              flex: 1;
            }

            :global(button) {
              flex: 0 0 auto;
              margin-top: 0.5rem;
              margin-right: 0;
            }
          }

          .boxes {
            display: flex;
            flex-direction: column;
            .box {
              color: black;
              display: block;
              padding: 1rem;
              margin-bottom: 0.3rem;
              border: 1px solid $color-primary;
              background-color: $color-primary-10p;
              &:last-child {
                margin-bottom: 0;
              }
            }
            .hoverable:hover {
              background-color: $color-primary-20p;
              box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
            }
          }
          > :global(.list.userLinks) {
            margin-bottom: 1rem;
            :global(.item) {
              display: inline-block;
              margin-right: 0.5rem;
              :global(a:hover) {
                color: $color-primary;
              }
              &:last-child {
                margin-right: 0;
              }
            }
          }
          @media all and (min-width: 71.5rem) {
            h1 {
              margin-top: 0;
            }
            .participation {
              flex-flow: row wrap;
              align-items: center;
              justify-content: space-between;

              p {
                flex: 0 0 100%;
              }

              :global(input) {
                margin-right: 1rem;
              }

              :global(button) {
                margin-top: 0;
              }
            }
            .boxes {
              flex-direction: row;
              .box {
                padding: 1rem;
                height: 17rem;
                width: 17rem;
                margin-right: 0.5rem;
                &:last-child {
                  margin-right: 0;
                }
                &.hoverable {
                  cursor: pointer;
                }
              }
            }
          }
        }
      `}
    </style>
  </StaticLayout>
)

Index.propTypes = propTypes
Index.defaultProps = defaultProps

export default compose(
  withLogging({
    logRocket: false,
  }),
  withStateHandlers(
    {
      shortname: null,
    },
    {
      redirectToJoin: ({ shortname }) => () => {
        Router.replace(`/join/${shortname}`)
      },
      updateShortname: () => shortname => ({ shortname }),
    }
  )
)(Index)
