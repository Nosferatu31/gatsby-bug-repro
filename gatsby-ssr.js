import React from 'react'

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="/cookie-notice.js" src="/cookie-notice.js" defer />,
  ])
}
