// import { parentPort } from 'worker_threads';
import { fib } from './fibonacci.algorithm';

// parentPort?.on('message', ({ n, id }: { n: number; id: string }) => {
//   const result = fib(n);

//   parentPort?.postMessage({ result, id });
// });

export default fib;
