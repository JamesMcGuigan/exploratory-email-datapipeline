#!/usr/bin/env node -r babel-register

import memoizee from 'memoizee-decorator';

class Sandbox {

    fibonacci_count = 0;
    @memoizee
    fibonacci(x) {
        this.fibonacci_count += 1;
        console.log("memoizee-decorator.js:4:fibonacci", "this.count, x", this.fibonacci_count, x);

        if( x == 0 ) {
            return x + 0;
        } else {
            return x + this.fibonacci(x-1)
        }
    }
}
const sandbox = new Sandbox();

console.log("memoizee-decorator.js:14:", "sandbox.fibonacci_count", sandbox.fibonacci_count);
console.log("memoizee-decorator.js:15:", "fibonacci(100)", sandbox.fibonacci(10));
console.log("memoizee-decorator.js:16:", "sandbox.fibonacci_count", sandbox.fibonacci_count);
console.log("memoizee-decorator.js:15:", "fibonacci(100)", sandbox.fibonacci(10));
console.log("memoizee-decorator.js:16:", "sandbox.fibonacci_count", sandbox.fibonacci_count);
