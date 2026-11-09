import test from 'node:test'
import assert from 'node:assert/strict'
import { getStoryFrame, getStoryTransition } from '../lib/scroll-story.ts'

test('each photograph owns a complete scroll interval, including the last', () => {
  for (const count of [1, 5, 6, 10]) {
    for (let frame = 0; frame < count; frame++) {
      assert.equal(getStoryFrame(frame * 720, 720, count), frame)
      assert.equal(getStoryFrame((frame + 1) * 720 - 1, 720, count), frame)
    }
    assert.equal(getStoryFrame((count + 2) * 720, 720, count), count - 1)
  }
})

test('native reverse scrolling, track entry and resizing keep valid frames', () => {
  assert.deepEqual([4000, 3000, 2000, 1000, 0, -1000].map(offset => getStoryFrame(offset, 1000, 5)), [4, 3, 2, 1, 0, 0])
  assert.equal(getStoryFrame(1500, 750, 6), 2)
  assert.equal(getStoryFrame(1500, 500, 6), 3)
})

test('unmeasured and invalid geometry cannot produce an invalid image index', () => {
  assert.equal(getStoryFrame(200, 0, 6), 0)
  assert.equal(getStoryFrame(NaN, 700, 6), 0)
  assert.equal(getStoryFrame(200, Infinity, 6), 0)
  assert.equal(getStoryFrame(200, 700, 0), 0)
})

test('photos overlap continuously during the latter part of each scroll interval', () => {
  const held = getStoryTransition(500, 1000, 6)
  assert.equal(held.blend, 0)
  const middle = getStoryTransition(760, 1000, 6)
  assert.equal(middle.from, 0)
  assert.equal(middle.to, 1)
  assert.ok(Math.abs(middle.blend - 0.5) < 1e-9)
  assert.ok(Math.abs(middle.fill - 0.25) < 1e-9)
  const before = getStoryTransition(999.999, 1000, 6)
  const after = getStoryTransition(1000, 1000, 6)
  assert.ok(before.blend > 0.999999)
  assert.equal(before.to, after.from)
  assert.ok(Math.abs(before.fill - after.fill) < 1e-8)
})

test('blending reverses without changing its mapping and leaves the last image readable', () => {
  const offsets = [520, 600, 760, 900, 1000]
  const forward = offsets.map(offset => getStoryTransition(offset, 1000, 6).fill)
  const reverse = [...offsets].reverse().map(offset => getStoryTransition(offset, 1000, 6).fill)
  assert.deepEqual(reverse, [...forward].reverse())
  for (const count of [1, 5, 6, 10]) {
    const last = getStoryTransition((count - 1) * 1000 + 900, 1000, count)
    assert.equal(last.from, count - 1)
    assert.equal(last.to, count - 1)
    assert.equal(last.blend, 0)
    assert.equal(last.fill, 1)
  }
})
