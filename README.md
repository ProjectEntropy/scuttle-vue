# ScuttleVue

> A VueJS based scuttlebutt client based on Minbay and depject


`ssb://%8vv8XCSh/Xbq1iEiJ0Kucl746jltMGPOduqOE3CYQ3Q=.sha256`


A scuttlebutt decentralised network browser client designed to be easy to change the templates for, while trying to abstract away the raw data stuff.


## Important bits

- [x] Depject API
- [ ] POST MESSAGES
- [ ] Use latest patchcore (does not currently browserify)
- [x] Public feed
- [x] Profile feed
- [ ] Threaded replies
- [ ] Notifications
- [ ] Cache expensive sbot lookups - webworker?

- [ ] Invite UI
- [x] Settings page
- [ ] Multiple pub connections
- [ ] Browser -> Browser direct gossip


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production
npm run build

```

## Scuttlebutt Setup

``` bash
# install scuttlebutt
npm i scuttlebot@latest -g

# spin up sbot (allowing localhost invite generation)
sbot server --allowPrivate
```

## Web setup

Navigate to: http://localhost:8080/#/settings

*Get your key JSON*
``` bash
cat ~/.ssb/secret
```


*Your localhost "Remote" address*

``` bash
sbot invite.create --modern
```


