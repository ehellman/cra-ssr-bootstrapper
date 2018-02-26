const path = require('path')
const fs = require('fs')
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import { StyletronProvider } from 'styletron-react'
import Styletron from 'styletron-server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { Provider } from 'react-redux'

import manifest from '../../../build/asset-manifest.json'

import App from '../../App'

const extractAssets = (assets, chunks) => 
  Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);
    
export default (store = {}) => (request, response, next) => {
  try {
    const styletronInstance = new Styletron()
    const filePath = path.resolve(__dirname, '..', '..', '..', 'build', 'index.html')

    fs.readFile(filePath, 'utf8', (error, htmlData) => {
      if (error) {
        console.error('Error in renderer', error)
        return response.status(404).end()
      }

      let modules = []
      
      const appString = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StyletronProvider styletron={styletronInstance}>
            <Loadable.Capture report={mod => modules.push(mod)}>
              <App />
            </Loadable.Capture>
          </StyletronProvider>
        </Provider>
      )

      const stylesForHead = styletronInstance.getStylesheetsHtml()

      const appChunks = extractAssets(manifest, modules)
        .map(chunk => `<script src="/${chunk}"></script>`);
      return response.send(
        htmlData
          .replace(
            '<style class="css"></style>',
            `<link rel="stylesheet" href="/${manifest['main.css']}">${stylesForHead}`
          )
          .replace(
            '<div id="root"></div>',
            `<div id="root">${appString}</div>`
          )
          .replace(
            '</body>',
            appChunks.join('') + '</body>'
          )
          .replace(
            '"__SERVER_STATE__"',
            JSON.stringify(store.getState())
          )
      )
    })
  }
  catch (err) {
    response.send(err)
  }

}