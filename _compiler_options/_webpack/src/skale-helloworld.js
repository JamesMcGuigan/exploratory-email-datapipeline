#!/usr/bin/env ./node_modules/.bin/babel-node
// @flow

import skale from 'skale-engine';
var sc = skale.context();

sc.parallelize(['Hello world']).collect().then(function(res) {
  console.log(sc.worker.length + ' workers, res:', res);
  sc.end();
});
