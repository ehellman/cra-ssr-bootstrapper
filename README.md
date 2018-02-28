# cra-ssr-bootstrapper

A non-compromising way to enable server side rendering on `create-react-app` without ejecting.

Features that work out of the box include:
- [x] Code splitting
- [x] Server rendered CSS (`styletron`)
- [x] Preloaded server state
- [x] Routing (`react-router`)

## Up and running 

`npm run ssr` builds the app, transpiles server code and starts Node.

Fixes to do before 1.0
- [x] Create server bundle instead of transpiling to be able to include assets such as `PNG`.
- [ ] Documentation that describes which files to copy into a create-react-app directory and which dependencies to add.
- [ ] Increase example project to have several code split routes