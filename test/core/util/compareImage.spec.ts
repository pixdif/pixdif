import {
	expect,
	test,
} from '@jest/globals';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

import compareImage from '@pixdif/core/util/compareImage.js';

const a = path.resolve('test/sample/shapes-a.png');
const b = path.resolve('test/sample/shapes-b.png');
const c = path.resolve('test/sample/circle.png');

test('Compare the same image', async () => {
	const expected = fs.createReadStream(a);
	const actual = fs.createReadStream(a);
	const res = await compareImage(expected, actual);
	expect(res.diff).toBe(0);
	expect(res.dimension).toBe(81060);
});

test('Compare 2 images', async () => {
	const expected = fs.createReadStream(a);
	const actual = fs.createReadStream(b);
	const res = await compareImage(expected, actual);
	expect(res.diff).toBe(10782);
	expect(res.dimension).toBe(81060);

	if (!fs.existsSync('output')) {
		await fsp.mkdir('output');
	}
	const to = fs.createWriteStream('output/diff-a-b.png');
	res.image.pack().pipe(to);
});

test('Compare images of different width and height', async () => {
	const expected = fs.createReadStream(a);
	const actual = fs.createReadStream(c);
	const res = await compareImage(expected, actual);
	expect(res.diff).toBe(107712);
	expect(res.dimension).toBe(300 * 420);

	if (!fs.existsSync('output')) {
		await fsp.mkdir('output');
	}
	const to = fs.createWriteStream('output/diff-a-c.png');
	res.image.pack().pipe(to);
});
