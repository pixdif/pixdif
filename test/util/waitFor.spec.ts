import { test } from '@jest/globals';
import { EventEmitter } from 'events';

import waitFor from '../../src/util/waitFor';

test('Wait for an event', async () => {
	const emitter = new EventEmitter();
	setTimeout(() => {
		emitter.emit('fake');
	});
	await waitFor(emitter, 'fake');
});
