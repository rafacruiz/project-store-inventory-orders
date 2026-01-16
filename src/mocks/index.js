
import { setupWorker } from 'msw/browser';
import { handleList } from './products';

const worker = setupWorker(handleList);

export default worker;