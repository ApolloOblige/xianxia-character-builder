# Source extraction and unresolved rules

Sources read September 11, 2026:

- [RPG design conversation](https://chatgpt.com/share/6aa37e7a-0b14-83ea-8bc7-f8ccdf31d25b), “Design Xianxia Solo RPG.” The visible share contains an initial assistant proposal and a later correction directing the system to use the user's existing world. It does not contain user ratification of the proposed numerical rules.
- [Linked world reference](https://chatgpt.com/share/6aa24e27-77c4-83ea-aeea-aadd966af79b). Visible content includes character art discussion and descriptions of Nascent Soul, Spirit Transformation and Dao Integration. A complete canonical rank/root/physique table is not present in the visible share.
- [Existing project](https://github.com/ApolloOblige/xianxia-character-builder): index.html and style.css on main. Preserved its parchment #eee7d5, jade #2f463b, paper #f7f1e4, gold #9d8956 and Georgia type. Preserved its four cultivation-path suggestions.

## Creation structure — RPG proposal §20–21

Origin; Spiritual Root; Discipline; Dao Seed; Flaw. Reference sheet also includes Name, Cultivation, Attributes, Resources, Techniques, Equipment, Relationships, Karma and Advancement.

Origin examples: Sect Disciple, Rogue Cultivator, Clan Heir, Wandering Doctor, Spirit Beast in Human Form, Demonic Cultivator, Mortal Scholar, Fallen Young Master.

Discipline examples: Sword Cultivator, Body Cultivator, Formation Master, Alchemist, Talisman Master, Beast Tamer, Gu Cultivator, Demonic Cultivator, Music Cultivator, Ghost Cultivator.

Flaw examples: unstable meridians, arrogant, heavenly curse, demonic qi, weak constitution, karmic debt, damaged spiritual root. No penalties are defined.

The six-page grouping is an interface decision, not a new game rule. Special Heritage now uses the original beast-wheel catalogue through dependent dropdowns. Purity, physique and trades remain free text with no inferred mechanics. Special Heritage appears only for the Beast / Plant Spirit Path.

## Attributes — proposal §1

| Attribute | Governs |
|---|---|
| Body | Strength, endurance, weapons, physical resistance |
| Flow | Qi control, movement arts, spiritual techniques |
| Mind | Investigation, formations, medicine, knowledge |
| Heart | Willpower, emotion, Dao conviction, corruption resistance |
| Presence | Intimidation, persuasion, sect etiquette, commanding spirits |

Proposed starting array: +2, +1, +1, 0, −1. It is not assigned automatically or enforced. No D&D ability-score conversion is used.

## Modifiers and formulas

- §20 Fire Root: proposed +1 when aggressively manipulating fire qi. Conditional roll effect, not +1 Flow or a general stat increase. Selecting the example records this effect on the review sheet; changing away removes it.
- Wood Root: improved healing and plant techniques; no number.
- Dual Water/Ice Root: greater versatility and slower cultivation; no numbers.
- Heavenly Spiritual Root: rapid cultivation and attention; no numbers.
- Mutated Root: unique advantages/problems; unspecified.
- §2 roll: 2d6 + Attribute; 10+ success, 7–9 success with consequence, 6− failure. Difficulty proposals: trivial +1, equal 0, dangerous −1, superior −2, overwhelming −3. These are situational, not permanent attributes.
- §8 Vitality example: 6 + Body + Realm bonus. No realm bonus table exists. UI only calculates an estimate after the user supplies both Body and a bonus (including an explicit 0).
- §9 Qi proposal: 3 + Flow + cultivation bonuses. Same unresolved-bonus treatment. The example “Foundation Establishment: 8 Qi” does not define a universal table.
- §13 Bonds: −2 to +3; at +2 or above, once per session +1 while directly protecting/supporting that NPC. Kept as reference, never added permanently.
- §14 Reputation: −3 hated, −2 hostile, −1 distrusted, 0 unknown, +1 recognized, +2 respected, +3 revered. Faction-specific, not an attribute bonus.
- Manual modifiers are explicitly user-entered agreements, not sourced canon. A source is required. Conditional entries are shown separately. Unconditional entries add to the chosen base attribute; unknown bases remain unknown. Totals are recomputed rather than accumulated each render.

## Techniques — examples, not starting grants (§10–11)

Flowing Moon Sword: Sword Art; Mortal High Grade; 1 Qi; +Body. 10+: 3 damage and choose one; 7–9: 2 damage and choose one with enemy retaliation. Choices: reposition enemy, expose weakness, disarm, conserve Qi spent, prevent reaction.

Ghost-Walking Step: Movement Art; 1 Qi; +Flow. 10+: move anywhere in immediate battlefield without interception. 7–9: reach destination and choose extra Qi, exposure, lost carried item or unwanted attention.

Technique grades proposed: Mortal / Earth / Heaven / Dao / Immortal, with Low / Middle / High / Supreme. The over-realm +2 Qi and 1 Deviation example is not a universal scaling rule. No techniques or inventory are granted automatically.

## Superseded and unresolved

The initial generic Mortal → Body Tempering → Qi Gathering → Foundation Establishment → Core Formation → Nascent Soul → Spirit Transformation → Dao Integration ladder and Early/Middle/Late/Peak stages were explicitly superseded by the conversation's follow-up. They are NOT used as canonical options.

The linked world reference describes Nascent Soul First Soul Emergence at Stage 5, Spirit Transformation Threefold Convergence at Stage 4, and Dao Integration Dao Manifestation at Stage 3. These fragments do not establish the full ladder. The proposed labels Dao Comprehension / Dao Embodiment / Dao Manifestation are assistant suggestions, not verified final choices.

Decisions still needed:

1. Confirm the proposed five attributes, array and root effects.
2. Supply the canonical rank/stage table, permitted starting realm and per-realm resource bonuses.
3. Supply root catalogue, combination/purity constraints, physiques and heritage effects.
4. Define starting techniques, equipment, trades and numerical modifiers, stacking/caps and prerequisites.
5. Resolve Heaven's Thread: §19 says “begins each session with 3” and also “does not automatically refresh.” No automatic refresh implemented.
6. Define Wound effects, Deviation limits, XP costs, cultivation and Insight thresholds. The §21 sample counters are examples, not defaults.

## Saving and compatibility

Buildless static site, with relative asset paths for GitHub Pages subdirectory hosting. One current character auto-saves in this browser under xianxia-character-builder.v1. Download/open JSON supports backups and device transfer. Opening a save asks before replacement. Invalid saves are rejected; an unreadable stored save is not silently overwritten. Unknown numerical values remain blank, not zero. Browser storage failures display a download reminder.

## Identity rules confirmed by the user — September 11, 2026

Source: the project owner's follow-up in this task, superseding the earlier Identity draft.

- Cultivation path changes story context only and gives no numerical modifiers. Demonic cultivators are more likely to fall into qi deviation or face harsher heavenly tribulations; no numerical chance or penalty is defined.
- Origins affect only starting supplies or money appropriate to the origin. The owner subsequently authorized genre research and creative design; the implemented packages are documented in [ORIGINS.md](ORIGINS.md).
- Rename Species / beast heritage to Special Heritage. Show it only when Beast / Plant Spirit Path is selected, including on the review sheet.
- A previously entered heritage is retained in the save when switching paths, so switching back restores it. It is hidden and inactive on other paths. The existing save key remains compatible.

## Authorized Identity expansion

See [Origin packages and heritage catalogue](ORIGINS.md) for the researched house-rule allocations, online sources, exact catalogue provenance, and compatible saved-character behavior. Origin grants are kept separate from attribute modifiers and manually entered equipment. All 550 unique names in the original beast wheel are present. No new beast entries were invented.
