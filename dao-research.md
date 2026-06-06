# Trash Bank Tokenomics — Comprehensive DAO Research

## DAO Governance Models Research

### 1. Yearn Finance (YFI) — Fair Launch Pioneer

**Key Innovation:** Zero pre-mine, zero team allocation

| Metric | Value |
|--------|-------|
| Launch | July 2020 |
| Pre-mine | **0 tokens** |
| Team allocation | **0 tokens** |
| Initial supply | 30,000 YFI |
| Distribution | Liquidity mining only |
| Governance | 1 YFI = 1 vote |

**What We Learn:**
- Andre Cronje could have allocated tokens to himself but chose zero
- All tokens earned by providing liquidity and staking
- "YFI has 0 financial value" — governance only
- Community earned tokens through participation, not investment
- Later expanded supply via governance vote (YIP-57)

**Applied to Trash Bank:**
- Zero pre-mine ✓
- Zero team allocation ✓
- All tokens earned through cleanup work (not liquidity mining)
- Governance token with real utility (voting on budget distribution)

---

### 2. Gitcoin — Quadratic Funding

**Key Innovation:** Voice credits with quadratic cost function

| Mechanism | Description |
|-----------|-------------|
| Voice Credits | Equal budget for all participants |
| Quadratic Cost | 1 vote = 1 credit, 2 votes = 4 credits, 3 votes = 9 credits |
| Sybil Resistance | Gitcoin Passport for identity verification |
| Matching Pool | Broad participation amplified over concentrated spending |

**Formula:** `Matching = (∑√contribution)²`

**What We Learn:**
- Amplifies many small contributions vs. few large ones
- Requires strong identity verification to prevent Sybil attacks
- Used by Colorado legislature, Taiwan presidential hackathon
- Gitcoin distributed $72M+ through QF

**Applied to Trash Bank:**
- Voice credits = Garbage Cans earned
- Quadratic voting: √(Garbage Cans) = voting power
- Sybil resistance: Garbage Cans are soulbound (cannot be transferred)
- Matching pool: Weekly MCLAW budget distributed via quadratic formula

---

### 3. Optimism RetroPGF — Reward Demonstrated Impact

**Key Innovation:** Fund past work, not future proposals

| Metric | Value |
|--------|-------|
| Total allocation | 850M OP (20% of supply) |
| Rounds | 6+ rounds to date |
| Evaluation | Badgeholder voting on demonstrated impact |
| Focus | Public goods, infrastructure, governance |

**What We Learn:**
- Retroactive funding reduces proposal risk
- Badgeholders evaluate actual outcomes
- Metrics-informed evaluation improving over time
- Protocol fees fund matching pool

**Applied to Trash Bank:**
- Trash Collectors earn after validation (retroactive)
- Garbage Cans = demonstrated impact proof
- Weekly budget distribution to neighborhoods (matching pool model)
- Protocol revenue → vending machine network

---

### 4. Alien Worlds — Planetary DAO Structure

**Key Innovation:** Regional governance with staked voting

| Mechanism | Description |
|-----------|-------------|
| Planets | 6 distinct planets, each with 2 DAOs |
| Voting | Stake TLM to participate |
| Custodians | Elected representatives manage treasury |
| Budget | 2% of treasury claimable weekly |
| Problem | Whale dominance (large holders control votes) |

**What We Learn:**
- Regional structure enables local autonomy
- Staking for governance creates plutocracy
- Low voter participation (~5%)
- Custodian model distributes management burden

**Applied to Trash Bank:**
- Sub-communities = neighborhoods (like planets)
- ** FIX: Garbage Cans are SOULBOUND, not stakeable **
- Trash Masters = custodians (elected)
- Weekly budget distribution (similar to Alien Worlds)
- Quadratic voting prevents whale dominance

---

### 5. OlympusDAO — Protocol-Owned Liquidity (Cautionary)

**Key Innovation:** Bonds for protocol-owned liquidity, high APY staking

| Mechanism | Description |
|-----------|-------------|
| Bonds | Buy OHM at discount, vest over 5 days |
| Staking | High APY (1000%-10,000%) via rebasing |
| POL | Protocol owns 99% of LP tokens |
| Risk | Highly speculative, volatile |

**What We Learn:**
- Protocol-owned liquidity provides stability
- Bonding creates alternative to liquidity rentals
- **High APY is unsustainable** — Olympus faced criticism
- Not a "fair launch" (Discord offering + IDO)

**Applied to Trash Bank:**
- ❌ NO high APY staking (caused speculation problems)
- ❌ NO bonding mechanism (not needed for utility token)
- ✓ Burn-on-redemption creates natural deflation
- ✓ Real-world utility first, speculation second

---

## Trash Bank Differentiation

### Why Other DAOs Have Problems

| DAO | Problem | Trash Bank Solution |
|-----|---------|---------------------|
| Alien Worlds | Whale dominance via token staking | Garbage Cans are **soulbound** — cannot be bought |
| YFI | 1 token = 1 vote (plutocratic) | Quadratic voting: √(Cans) = voting power |
| OlympusDAO | Speculative APY, not fair launch | Zero pre-mine, utility-first |
| Gitcoin | Grants for proposals, not work | Tasks completed = tokens earned |
| Optimism | Badgeholders evaluate proposals | Garbage Cans = work completed proof |

### Key Innovation: Earned Influence, Not Bought Influence

```
Traditional DAO:
Token Purchase (Wealth) → Tokens → Voting Power
Rich get richer, poor get excluded

Trash Bank DAO:
Cleanup Work → Garbage Cans (Soulbound) → √(Cans) = Voting Power
Influence through contribution, not wealth
```

---

## Comprehensive Tokenomics Framework

### Supply Model

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Initial Supply | **0** | Fair launch, no pre-mine |
| Max Supply | 1B TTKN | Hard cap for scarcity |
| Mint Mechanism | Work-based | Tokens minted only when cleanup validated |
| Burn Mechanism | Vending redemption | Coins/tokens burned when redeemed |
| Inflation Cap | 10% annually | Prevents dilution, adjusts rewards |

### Three-Tier System

**Tier 1: Trash Coins (Database)**
- Soulbound to user account
- Earned: per validated task
- Used: vending machine redemption
- Not on-chain, no speculation possible
- For: non-crypto users, homeless participants

**Tier 2: Trash Tokens (TTKN)**
- ERC-20 on Base
- Earned: converting Trash Coins (one-way)
- Used: trading, staking, governance fees
- On-chain, tradeable
- For: crypto-native users

**Tier 3: Garbage Cans (NFT)**
- Soulbound (non-transferable)
- Earned: per validated task (1-5 Cans)
- Used: quadratic voting weight, validator eligibility
- Cannot be bought or transferred
- For: governance participation

### Governance Flow

```
1. TaskCompleted → 2. Validation → 3. Proof Minted
                                    │
                                    ├── Trash Coins (database)
                                    ├── Garbage Cans (soulbound NFT)
                                    │
                                    └── (Optional) Convert Coins → TTKN
```

### Voting Mechanism

**Quadratic Voting Formula:**
```
Voting Power = √(Garbage Cans Earned)
```

**Example:**
| Collector | Garbage Cans | Linear Votes | QuadraticVotes |
|-----------|--------------|--------------|----------------|
| New (10 tasks) | 10 | 10 | 3.16 |
| Active (50 tasks) | 50 | 50 | 7.07 |
| Veteran (200 tasks) | 200 | 200 | 14.14 |
| Whale attempt | 0 (can't buy) | 0 | 0 |

**Result:** Influence scales with √(work), not work itself. Diminishing returns prevent accumulation dominance.

---

## Budget Distribution Model

### Weekly Treasury Allocation

| Source | Amount | Flow |
|--------|--------|------|
| MCLAW escrow | Variable | McClaw task rewards |
| Protocol fees | 1% conversion | Trash Bank treasury |
| Corporate sponsors | Variable | Vending machine network |
| DEX trading fees | 0.3% | If liquidity pool launched |

### Quadratic Distribution to Sub-Communities

```
CommunityA Allocation = (√(CommunityA Garbage Cans) / √(Total All Communities Garbage Cans))² × Budget
```

**Example:**
- Total budget: 1000 MCLAW/week
- Downtown: 1000 Garbage Cans total → √1000 = 31.6 → (31.6/100)² × 1000 = 10.0%
- Riverside: 500 Garbage Cans total → √500 = 22.4 → (22.4/100)² × 1000 = 5.0%
- East Side: 250 Garbage Cans total → √250 = 15.8 → (15.8/100)² × 1000 = 2.5%

(Numbers illustrative — actual formula uses sum of square roots)

---

## Comparison Matrix

| Feature | Trash Bank | Yearn | Gitcoin | Optimism | Alien Worlds |
|---------|------------|-------|---------|----------|--------------|
| Fair Launch | ✓ | ✓ | ✗ | ✗ | ✗ |
| NoPre-mine | ✓ | ✓ | ✗ | ✗ | ✗ |
| No Team Allocation | ✓ | ✓ | ✗ | ✗ | ✗ |
| Quadratic Voting | ✓ | ✗ | ✓ | ✓ (some) | ✗ |
| Soulbound Reputation | ✓ | ✗ | ✗ | ✗ | ✗ |
| Work-Based Earning | ✓ | Liquidity | Grants | Retro | Staking |
| Real-World Utility | ✓ | ✗ | ✗ | ✗ | Gaming |
| Homeless Inclusion | ✓ | ✗ | ✗ | ✗ | ✗ |
| Burn Mechanism | ✓ | ✗ | ✗ | ✗ | ✗ |
| Regional DAOs | ✓ | ✗ | ✗ | ✗ | ✓ |

---

## Risk Mitigation

### Sybil Attacks
- **Problem:** One person creates multiple accounts to earn Garbage Cans
- **Solution:** 
  - Account age gate (>7 days before tasks)
  - McClaw agent verification
  - Photo hash prevents reuse
  - GPS geofencing
  - High-karma validators can flag suspicious patterns

### Whale Buying
- **Problem:** Wealthy person buys tokens to gain influence
- **Solution:**
  - Garbage Cans are soulbound (cannot be bought)
  - TTKN trading doesn't affect governance (only Garbage Cans vote)
  - Quadratic voting diminishes marginal influence

### Inflation Runaway
- **Problem:** Too many tasks completed, supply explodes
- **Solution:**
  - 10% annual inflation cap
  - Dynamic reward adjustment (if cap approached, reduce per-task reward)
  - Burn-on-redemption creates deflationary pressure

### Low Participation
- **Problem:** Only 5% of token holders vote (like Alien Worlds)
- **Solution:**
  - Local impact: neighborhood budgets affect you directly
  - Quadratic voting amplifies small holders
  - Garbage Cans incentivize ongoing participation

---

## Timeline Comparison

| DAO | Launch | Tokens Since | Governance Since |
|-----|--------|--------------|-----------------|
| Yearn | July 2020 | Day1 | Day 1 |
| Gitcoin | 2017 | Gradual | 2021 |
| Optimism | 2021 | Gradual | RetroPGF rounds |
| Alien Worlds | 2020 | Day 1 | Gradual |
| **Trash Bank** | **MVP Now** | **Work-based** | **Phase 3** |

---

*Research compiled: 2026-06-05*