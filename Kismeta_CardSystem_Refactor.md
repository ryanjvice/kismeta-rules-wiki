# KISMETA — THE STELLIUM SYSTEM

Design Document v4 — Working Draft

_Reference document only. Use this to guide edits to the Kismeta Game Guide and Kismeta Card Reference. This version resolves all outstanding open items from v3 — remaining flags below are new tuning/playtest questions only, not unresolved design decisions._

---

## 1. DESIGN GOALS

The current Minor Arcana carry roughly 60 unique bespoke effects across 112 cards, plus a Wildcard Link lookup table on every Card 2. This makes individual cards unreadable in isolation and gives the deck no internal grammar — a player can't predict what an unfamiliar card does, or what a familiar one implies about the board state.

This pivot replaces that bespoke-effect model with the **Stellium system**: Minor Arcana cards stop carrying unique text entirely. Instead, holding **three cards of the same Planet in your Spread** forms a Stellium — a single, printed, Codex-level effect. The goal is a system where:

- A player can read a rival's Spread and immediately understand their power state, with no card text required.
- Effects touch the game's existing core systems (Duels, Gambits, Oppositions, Harvest, Crafting, Bail) instead of introducing new bespoke ones.
- Adept cards remain a **separate, Sign-based** identity layer — untouched by the Minor Arcana rework — preserving their existing synergy with Astral Houses and the Zodiac Die.
- The system is small enough to fit on the existing Crucible Codex card: six Stellium lines, one Wild rule, and the Court/Ace Riders.

**Confirmed:** Spread limit is **5 cards**. A 3-charge Stellium therefore occupies 60% of a player's Spread — a genuinely significant commitment, not a casual side effect. Keep this ratio in mind for all future tuning.

---

## 2. CORE CONCEPTS & TERMINOLOGY

**Charge** — Each Minor Arcana card in your **Spread** (not Hand, not Arcanum) contributes 1 charge to its printed Planet. Charge is counted continuously and changes automatically as cards enter or leave your Spread.

**Stellium** — Holding **3 charge** of the same Planet in your Spread at once. (Named for the astrological term for three or more planets in close alignment — here, three cards of the same planet.) A Stellium is binary: you either have it or you don't. There is no tier ladder.

**Threshold** — The charge count required to form a Stellium. Baseline is **3**, for the six non-Sun Planets, printed once on the Crucible Codex. (See Section 6 for the one situational adjustment, tied to the Cosmic Age.)

**Wild Charge** — Sun cards (Aces) do not form their own Stellium. Instead, each Sun card in your Spread may count as 1 charge toward **any one other Planet you choose**, freely and at any time. **At most one Sun card may count toward any single Stellium** (confirmed — see Section 4A). A player holding multiple Aces may still apply each one to a _different_ Stellium simultaneously.

**Spread-only rule** — Only cards in your face-up, public Spread count as charge. Hand cards (hidden) and Arcanum cards (Major Arcana) never contribute charge. This keeps every player's power state fully public and legible, and keeps Duels meaningful (see Section 7).

**Adept cards are independent of the Stellium system.** They key to a **Zodiac Sign**, not a Planet, and are unaffected by Minor Arcana charge. See Section 8.

---

## 3. WHAT'S REMOVED FROM THE MINOR ARCANA

- **All bespoke Card 1 / Card 2 effect text is removed.** Every Minor Arcana card now shows only Rank, Suit, and Planet — no printed effect.
- **Wildcard Links are removed entirely.** The old Card 2 lookup table (e.g., "5 of Swords → The World") is gone. (Unrelated to the new Sun Wild Charge rule — the old Wildcard Links substituted for specific Major Arcana cards; the new rule lets Suns substitute for Planet charge only.)
- **Curse cards (Ranks 4, 5, 6) are removed as a category, final.** These ranks become ordinary charge-contributing cards like any other. No further mitigation is planned — if Aces end up the single most sought-after card in the deck as a result of the Wild Charge rule, that's an accepted and intended outcome, not a problem to solve.
- **The Nullify-for-curses mechanic is removed.** It existed solely to counteract Curse cards and has no remaining purpose. (This does _not_ affect the unrelated, pre-existing use of "Nullify" on The Star's Adept ability or "Wildcard" on The World's Adept ability — see Section 8.)

Net result: **every Minor Arcana card is now visually and functionally identical in kind** — Rank + Suit + Planet, nothing else. All meaning lives in the Codex and in what a player chooses to hold in their Spread.

---

## 4. THE PLANET STELLIUM CODEX

All charge is read from **Spread only**, continuously. Forming a Stellium requires 3 charge of one Planet (Sun cards may fill in as capped Wild Charge — see 4A). There is no second tier — the effect below is the entirety of that Planet's Stellium bonus.

| Planet        | Cards in Deck | Stellium Effect (3 charge)                                             |
| ------------- | ------------- | ---------------------------------------------------------------------- |
| ☽ **Moon**    | 16            | Your Hand limit and Spread limit are each +1                           |
| ☿ **Mercury** | 16            | +1 to your dice rolls when attacking in Gambits                        |
| ♀ **Venus**   | 16            | +1 to your dice rolls when defending in Duels and Gambits              |
| ♂ **Mars**    | 16            | +1 to your dice rolls when attacking in Duels                          |
| ♃ **Jupiter** | 16            | Craft Salt, or any one Reagent type, for 2 matching cards instead of 3 |
| ♄ **Saturn**  | 24            | Bail costs on your Arrested cards are −1 Salt (minimum 1)              |

**Design note:** This preserves the core tension from earlier drafts: Jupiter cards _are_ your crafting discount, so crafting with them dims the very discount they granted; Mars cards are your weapons, and losing one in a Duel can break your Stellium outright. Duels remain about _reading and breaking Stelliums_, not just "steal the best card."

### 4A. The Sun — The Wild Planet & Ace Rider

Sun cards (Aces — 8 total in the deck) have **no dedicated Stellium of their own** (confirmed, no Solar Stellium). Instead:

- Each Sun card in your Spread may count as **1 charge toward any one of the six other Planets**, chosen freely and reassignable at any time — there is no cost or action required to reassign it, since Stelliums are read passively and continuously, exactly like ordinary charge.
- **Cap: at most one Sun card may count as Wild Charge toward any single Stellium.** A player holding two Aces could power two _different_ Stelliums this way (one Ace each), but cannot stack two Aces into a single Stellium.

> **Example:** You have 2 Moon cards and 1 Ace in your Spread. The Ace counts as Moon charge, giving you 3 total — your Moon Stellium is active. A second Ace in the same Spread cannot also count toward Moon (cap reached) but could instead help form, say, a Mars Stellium if you hold 2 Mars cards.

**Ace Rider (new — replaces the Court Card Riders' role for the Sun):** The Ace has no court card of its own, so instead of a court-style rider tied to a Sun Stellium (which doesn't exist), each Ace carries this rider whenever it is actively serving as Wild Charge for another Stellium:

> **While an Ace in your Spread is serving as Wild Charge for an active Stellium, draw 1 bonus Kismeta Card during that round's Harvest.**

This keeps every Ace meaningfully valuable in every game state (not just the near-impossible "3 Aces at once" scenario), gives the Sun a Harvest-facing identity consistent with its Fate card's abundance theme, and mirrors the Court Card Riders' structure — a small conditional bonus layered onto the core mechanic rather than a new standalone system.

_Numeric flag: "+1 card per Ace in active use" is a first-draft guess. With up to 4 Aces theoretically active across a player's Spread (Spread limit is only 5, so realistically 1–2 at most), this should stay modest. Watch closely in playtesting — see Section 12._

---

## 5. COURT CARD RIDERS

Court cards (Princess, Knight, Queen, King) do **not** count as extra charge — they remain worth 1 charge like any other card of their Planet. Instead, each court rank carries a **rider**: a bonus that activates only while its Planet's Stellium is already active (3+ charge in your Spread, including any capped Wild Charge from Suns).

| Court        | Planet  | Rider (active while that Planet's Stellium is active)                               |
| ------------ | ------- | ----------------------------------------------------------------------------------- |
| **Princess** | Mercury | Your Mercury Stellium bonus also applies when _defending_ Gambits                   |
| **Knight**   | Mars    | Your Mars Stellium bonus also applies when _defending_ Duels                        |
| **Queen**    | Moon    | That Suit's Reagent becomes Wild for Alchemical Formulas                            |
| **King**     | Saturn  | Cards of that Suit cannot be targeted in Duels (the King itself remains vulnerable) |

_The Ace's equivalent rider is defined separately in Section 4A, since the Sun has no Stellium of its own for a court-style rider to attach to._

---

## 6. COSMIC AGE INTEGRATION

**Rule (six non-Sun Planets):** During a Cosmic Age, its ruling Planet's Stellium threshold is reduced to **2** (instead of 3) for all players, for the duration of the round. This gives every Age a distinct mechanical feel with a single sentence of rules, and reinforces the existing Aspect/Alignment logic already core to Harvest scoring.

**Rule (Sun-ruled Ages — Leo):** Since the Sun has no dedicated Stellium of its own to reduce, a Leo/Sun-ruled Age instead reduces **every other Planet's threshold by 1** for the round (i.e., all six Stelliums require only 2 charge). This keeps Leo's Age mechanically meaningful and fits its "universal generosity" flavor.

Confirm both rules can be read directly off the existing Sign/Planet/Element table used for Harvest Aspects — no new data should be required.

---

## 7. WHY SPREAD-ONLY MATTERS (DESIGN RATIONALE)

Keeping charge Spread-only (never Hand) does three things at once:

1. **Full public legibility** — a rival can always see your Stelliums (and how many Wild Aces you're holding in reserve) and plan around them.
2. **Duels gain a new purpose** — stealing a card is no longer just "take their best asset," it can _break_ a Stellium, which is a bigger and more readable strategic hit. Stealing an opponent's Ace is now a distinct, high-value target: it removes a flexible resource and its attached Rider, not just fixed Planet progress.
3. **Stelliums compete directly with crafting and Alignments** for the same limited Spread slots (only 5 total), which is the core tension this system is meant to create.

---

## 8. ADEPT CARDS — REMAIN INDEPENDENT & SIGN-KEYED

**Adept cards are not part of the Stellium system.** They keep their existing structure exactly as designed: each Adept is tied to a single **Zodiac Sign**, has a **Base effect** (active on purchase), and a **Resonant/Attuned effect** (unlocked when that Sign is matched via your Zodiac Die roll or an Astral House you've built). This preserves the loop between Adepts, Astral Houses, and the Zodiac Die untouched, rather than routing Adepts through Minor Arcana charge.

Practically, this means **no Adept rework is required for this pivot** — their existing Base/Resonant text in the Card Reference stands as-is, with one exception:

- **Magician — Resonant effect needs replacing.** Its current text ("Nullify 'Reversed' effects in your Spread") refers to the Reversed/Curse mechanic being removed in Section 3, and no longer has anything to act on. Suggested replacement, keeping Gemini/Mercury's information-and-duality flavor: **"Once per round, look at any one rival's Hand."**

All other Adepts (High Priestess, Empress, Emperor, Hierophant, Devil, Chariot, Strength, Hermit, Temperance, The Star, The World) keep their existing Base/Resonant text unchanged. Two notes carried over from earlier drafts still apply and are unrelated to this section's simplification:

- The Star's "Nullify an Adept or Fate card effect in play" and The World's "Wildcard for any Crucible card" are pre-existing, unrelated uses of similar-sounding words — neither depends on the removed Curse/Nullify or Wildcard Link mechanics, so both stand as-is.
- **Hermit's Arcanum limit is confirmed:** Hermit's Base effect ("Hold up to 3 Adept cards") is the correct, official source of the 3-card Arcanum exception. When updating the Game Guide, remove the parenthetical "(3 with Hierophant, if confirmed)" from the Arcanum Limit reference table and attribute the exception to Hermit only.

---

## 9. FATE CARDS — NO CHANGES REQUIRED

Reviewed all 10 Fate cards against the removed mechanics (Curse ranks, Nullify-for-curses, Wildcard Links). **None of the ten reference these mechanics directly** — Tower, Death, Sun, Judgement, Justice, Moon, Fool, Wheel of Fortune, Hanged Man, and The Lovers all key off Arrest/Bail, Crucible state, Hand/Spread, dice, or direct card draw/discard, all of which remain fully intact. **No Fate card text needs to change for this pivot.**

The Fate card "The Sun" (grants a Reagent to all players) and the new Wild Planet both being called "Sun" was flagged in v3 as a possible point of confusion — **confirmed no action needed.** No rename, no rules callout required.

_(Held for later, not part of this version: The Moon and Wheel of Fortune were discussed as possible homes for an "Eclipse"-style curse-on-a-Planet effect. Parked per Section 3.)_

---

## 10. OPEN ITEMS — STATUS

All items from v3 are now resolved:

1. ✅ **Spread limit confirmed at 5.**
2. ✅ **Hermit confirmed** as the source of the 3-card Arcanum exception; Hierophant reference to be removed from the Game Guide's Arcanum Limit table.
3. ✅ **Sun keeps no standalone Stellium; instead, Aces carry an Ace Rider** (Section 4A) — chosen over a Solar Stellium because, at only 8 cards in the deck and a confirmed 5-card Spread limit, a standalone 3-Ace Stellium would be so rare as to be nearly theoretical, whereas a Rider rewards every Ace's normal use.
4. ✅ **Wild Charge capped at 1 Sun card per Stellium**, confirmed.
5. ✅ **Curse removal finalized**, no further mitigation planned; Aces being the most sought-after card in the deck is an accepted outcome.
6. ✅ **Fate/Wild Sun naming collision — no action needed.**

No unresolved design decisions remain from this list. Remaining flags below are tuning questions for playtesting only.

---

## 11. DESIGN LOG

```
## v4 (Open Items Resolved) — Draft, [date pending]
**Changes from v3:** Confirmed Spread limit at 5 (informs all threshold math).
Confirmed Hermit as sole source of the 3-Adept Arcanum exception; flagged
removal of the erroneous Hierophant reference in the Game Guide. Resolved
Sun's identity: no Solar Stellium — instead, Aces gain an Ace Rider (+1
Harvest card while serving as Wild Charge), giving every Ace ongoing value
without requiring a near-impossible 3-Ace hand. Capped Wild Charge at 1 Sun
card per Stellium (previously uncapped in v3). Finalized Curse removal with
no compensating mechanic — Aces being the most valuable card in the deck is
accepted as intended. Confirmed no action needed on the Fate-card/Wild-Planet
naming overlap.
**Design hypothesis:** With Wild Charge capped and Spread limit confirmed at
5, Stelliums should require genuine commitment (3 of 5 slots) without being
either trivially easy (uncapped Wild) or impossible (no Wild at all). The Ace
Rider should make every Ace draw feel good regardless of what Stellium a
player is building toward.
**Playtest focus:** See Section 12.
**Next version will:** Incorporate playtest findings, particularly around
the Ace Rider's bonus size and whether the 1-Wild-per-Stellium cap feels
right in practice.
```

---

## 12. PLAYTEST FOCUS LIST

- Given a 5-card Spread, does committing 3 slots to a single Stellium feel like a meaningful, deliberate choice rather than an automatic default?
- Does the 1-Sun-per-Stellium cap create interesting decisions about which Stellium to complete with a scarce Ace, without making Wild Charge feel too weak to matter?
- Is the Ace Rider's "+1 Harvest card" bonus appropriately sized — does it make Aces feel like a genuine prize without single-handedly deciding the game?
- Do Duels/Gambits targeting Stellium-breaking cards feel more meaningful than the old "steal the best card" logic? Does stealing an Ace specifically feel like a premium, sought-after target?
- Does Saturn (24 cards) form Stelliums too easily relative to the mid-tier Planets (16 cards each)?
- Do the Cosmic Age rules (3→2 threshold; Leo's all-Planet 2-threshold) meaningfully change how each round feels, or go unnoticed?
- Does keeping Adepts fully separate from the Stellium system feel like two disconnected systems at the table, or does it read as intentional (Major Arcana = Sign identity, Minor Arcana = Planet charge)?
