#!/usr/bin/env node

import skale from 'skale-engine';
var sc = skale.context();

sc.parallelize(['Hello world']).collect().then(function(res: number) {
 console.log(sc.worker.length + ' workers, res:', res);
 sc.end();
});
