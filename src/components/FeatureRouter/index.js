import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { join } from 'path'
import Loadable from 'react-loadable'


const features = {
  Home: Loadable({
    loader: () => import(/* webpackChunkName: "Home" */'../Home'),
    loading: () => <div>Loading...</div>,
    modules: ['Home']
  }),
  List: Loadable({
    loader: () => import(/* webpackChunkName: "List" */'../List'),
    loading: () => <div>Loading...</div>,
    modules: ['List']
  }),
  Details: Loadable({
    loader: () => import(/* webpackChunkName: "Details" */'../Details'),
    loading: () => <div>Loading...</div>,
    modules: ['Details']
  }),
}

const mapStringToComponent = componentString => features[componentString]
export default function FeatureRuter({ pages }) {
  return (
    <Switch>
      {
        pages.map(({ 
          path, 
          children, 
          Component,
        }) => [
          children.map((child) =>
            <Route path={join(path, child.path)} component={mapStringToComponent(child.Component)} key={child.path} />
          ),
          <Route exact={!children.length > 0} path={path} component={mapStringToComponent(Component)} key={path} />
        ])
      }
    </Switch>
  )
}