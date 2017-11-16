# ScuttleVue

`ssb://%8vv8XCSh/Xbq1iEiJ0Kucl746jltMGPOduqOE3CYQ3Q=.sha256`

> A VueJS based scuttlebutt client based on Minbay and depject

A scuttlebutt decentralised network browser client designed to be easy to change the templates for, while trying to abstract away the raw data stuff.


## Important bits

- [x] Depject API
- [ ] Use latest patchcore (does not currently browserify)
- [x] Public feed
- [x] Profile feed
- [ ] Threaded replies
- [ ] Notifications
- [ ] Cache expensive sbot lookups - webworker?
- [ ] POST MESSAGES
- [ ] Invite UI
- [ ] Settings page
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

# spin up sbot
sbot server

# in another process, accept an invite and sync to the scuttleverse
sbot invite.accept "ws://the_pub_you_got_an_invite_from~shs:TXKFQehlyoS_invite_code_blah_blah="

# get your local sbot websocket address
sbot getAddress

# get your public/private key
cat ~/.ssb/private

# place these in browser storage (until this part is built in the app)

localStorage.setItem("/.ssb/secret", '{"curve":"ed25519","public":"IZckcDcgB....."}')

localStorage.setItem("browser/.ssb/secret", '{"curve":"ed25519","public":"IZckcDcgB....."}')

localStorage.setItem("remote", 'ws://localhost:8989~shs:TXKFQ.....=')
```

```
