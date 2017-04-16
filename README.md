# vue-bingo

![](https://media.giphy.com/media/xUA7bcxN0d1P2B8sz6/giphy.gif)

90 Ball Bing Application.

## Dependencies

* Vue.js is being used, along with the Vue CLI (with Vue Webpack template)
  * The Vue CLI setup a lot of the boilerplate. Include Webpack, Karma, Mocha, Sinon, Chai.
* The only other library pulled in was Lodash, just so I could utilise its helper functions.

## Running The Application

I'm working against Node v7.4.0. I haven't tested other versions but they should be fine.

To build the application simply install the dependencies using `npm install` and
run the dev server using `npm run dev`.

You can also run the unit tests with `npm run unit`. Running the unit
tests will generate a coverage report within the 'test/unit' folder as well.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
