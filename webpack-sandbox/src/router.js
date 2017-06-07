import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Home from './components/Home'
import ArtistMain from './components/artists/ArtistMain'

// Modules below are being dynamically loaded
// import ArtistDetail from './components/artists/ArtistDetail'
// import ArtistCreate from './components/artists/ArtistCreate'
// import ArtistEdit from './components/artists/ArtistEdit'

// React Router codesplitting.
// Converting JSX routes to an object.
const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, callback) {
        // When Webpack reads System.import(), it will modify the bundle
        // generated to split off a second/sub bundle that can be fetched
        // dynamically to load all the code inside of it.
        System.import('./components/artists/ArtistCreate')
          // Callback takes two arguments (error, module.default)
          .then(module => callback(null, module.default))
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, callback) {
        System.import('./components/artists/ArtistDetail')
          .then(module => callback(null, module.default))
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, callback) {
        System.import('./components/artists/ArtistEdit')
          .then(module => callback(null, module.default))
      }
    }
  ]
}

const Routes = () => {
  return <Router history={hashHistory} routes={componentRoutes} />
}

export default Routes

// Previous Routes
{/*<Route path="/" component={Home}>
  <IndexRoute component={ArtistMain} />
  <Route path="artists/new" component={ArtistCreate} />
  <Route path="artists/:id" component={ArtistDetail} />
  <Route path="artists/:id/edit" component={ArtistEdit} />
</Route>*/}