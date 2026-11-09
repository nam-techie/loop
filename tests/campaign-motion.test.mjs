import test from 'node:test'
import assert from 'node:assert/strict'
import { getCampaignFrame } from '../lib/campaign-motion.ts'

test('opening, gathered photos and horizontal gallery form a reversible sequence', () => {
  const opening = getCampaignFrame(0, 1440, 822, 8)
  assert.equal(opening.heroOpacity, 1)
  assert.equal(opening.galleryOpacity, 0)
  const gathered = getCampaignFrame(.21, 1440, 822, 8)
  assert.ok(Math.max(...gathered.cards.map(card => card.x)) - Math.min(...gathered.cards.map(card => card.x)) < 100)
  const row = getCampaignFrame(.5, 1440, 822, 8)
  assert.equal(row.heroOpacity, 0)
  assert.equal(row.galleryOpacity, 1)
  assert.ok(row.cards.every((card, index) => index === 0 || card.x > row.cards[index - 1].x + row.cardWidth))
  assert.ok(row.cards.every(card => card.rotateY === 0 && card.rotateX === 0))
  const positions = [0, .2, .4, .6, .8, 1]
  assert.deepEqual(positions.map(p => getCampaignFrame(p, 1440, 822, 8)), positions.toReversed().map(p => getCampaignFrame(p, 1440, 822, 8)).toReversed())
})

test('every photo passes through the viewport with room to read the final image', () => {
  for (const [width, height] of [[320, 648], [390, 748], [768, 946], [1024, 690], [1440, 572], [1440, 822]]) {
    for (const count of [1, 5, 8, 10]) {
      const first = getCampaignFrame(.5, width, height, count)
      const last = getCampaignFrame(.91, width, height, count)
      assert.equal(first.active, 0)
      assert.equal(last.active, count - 1)
      assert.ok(first.cards[0].x - first.cardWidth / 2 >= 0)
      assert.ok(last.cards[count - 1].x + last.cardWidth / 2 <= width)
      assert.deepEqual(last.cards, getCampaignFrame(1, width, height, count).cards)
      for (let i = 0; i < count; i++) {
        assert.ok(first.cards[i].x >= first.cards[0].x)
        assert.ok(last.cards[i].x <= last.cards[count - 1].x)
        assert.ok(first.cards[i].y - first.cardHeight / 2 >= height * .16)
        assert.ok(first.cards[i].y + first.cardHeight / 2 + 32 <= height * .91)
      }
    }
  }
})

test('phase boundaries are continuous and invalid geometry remains finite', () => {
  for (const p of [.025, .055, .12, .17, .21, .25, .265, .275, .34, .39, .48, .5, .91]) {
    const a = getCampaignFrame(p - .00001, 1440, 822, 8)
    const b = getCampaignFrame(p + .00001, 1440, 822, 8)
    assert.ok(Math.abs(a.heroOpacity - b.heroOpacity) < .001)
    assert.ok(Math.abs(a.galleryOpacity - b.galleryOpacity) < .001)
    a.cards.forEach((card, i) => assert.ok(Math.abs(card.x - b.cards[i].x) < 1))
  }
  const safe = getCampaignFrame(NaN, 0, Infinity, NaN)
  assert.equal(safe.cards.length, 1)
  Object.values(safe.cards[0]).forEach(value => assert.ok(Number.isFinite(value)))
})
