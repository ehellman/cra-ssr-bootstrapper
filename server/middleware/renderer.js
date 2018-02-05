import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
const path = require('path')
const fs = require('fs')

import manifest from '../../build/asset-manifest.json'

import App from '../../src/App'



export default (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (error, htmlData) => {
    if (error) {
      console.error('Error in renderer', error)
      return res.status(404).end()
    }

    let modules = []

    const extractAssets = (assets, chunks) => 
      Object.keys(assets)
        .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
        .map(k => assets[k]);
    
    // render app as String
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={mod => modules.push(mod)}>
        <App />
      </Loadable.Capture>
    )

    const extraChunks = extractAssets(manifest, modules)
      .map(chunk => `<script type="text/javascript" src="/${chunk}"></script>`);

    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `${html}`
      )
      .replace(
        '</body>',
        extraChunks.join('') + '</body>'
      )
    )
  })

}