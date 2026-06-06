# Trash Bank Whitepaper
## Turn Litter Into Social Capital

**Version 1.0 — June 2026**

---

## Abstract

Trash Bank is a decentralized protocol that rewards individuals for community cleanup work. By combining proof-of-work verification, soulbound reputation tokens, and quadratic voting governance, Trash Bank creates an economic pathway for anyone — including homeless and unbanked individuals — to earn value through real work while governing the protocol they help build.

Unlike traditional task platforms or charitable programs, Trash Bank:
- Requires no pre-existing wealth (no tokens to buy)
- Awards governance through earned reputation (Garbage Cans), not token holdings
- Integrates with any task/escrow platform, starting with McClaw
- Serves both crypto-native and non-crypto users through a two-tier token system

This whitepaper outlines the problem, solution, tokenomics, governance model, integration strategy, and implementation roadmap.

---

## Table of Contents

1. [The Problem](#1-the-problem)
2. [The Solution](#2-the-solution)
3. [Token Architecture](#3-token-architecture)
4. [Governance Model](#4-governance-model)
5. [Anti-Gaming Measures](#5-anti-gaming-measures)
6. [Integration with McClaw](#6-integration-with-mcclaw)
7. [Use Cases](#7-use-cases)
8. [Competitive Analysis](#8-competitive-analysis)
9. [Roadmap](#9-roadmap)
10. [Team](#10-team)
11. [Risks and Mitigations](#11-risks-and-mitigations)
12. [Conclusion](#12-conclusion)

---

## 1. The Problem

### 1.4 Municipal Waste Burden

Cities worldwide spend billions annually on cleanup:
- United States: **$11.2 billion** in public space maintenance (2023)
- European Union: **€25 billion** in waste management annually
- Developing nations: Informal waste sectors employ millions without fair compensation

This affects **everyone**—residents, businesses, municipalities. Climate change accelerates degradation. The problem is global and urgent.

### 1.2 Community Degradation Cycle

Neglected public spaces create a feedback loop:
1. Trash accumulates
2. Residents disengage
3. Property values decline
4. Tax revenue decreases
5. Municipal services deteriorate
6. More trash accumulates

This "broken window effect" compounds over time.

### 1.5 Excluded Populations

**580,000+** individuals experience homelessness in the US (2024):
- Many want to contribute but lack economic pathways
- Skills and labor go unused
- Traditional apps require smartphones and bank accounts

Trash Bank creates **inclusion through work**—anyone can participate, regardless of access to traditional financial systems. This isn't charity; it's an economic pathway earned through real contribution.

### 1.4 Existing Solutions Fail

| Solution | Problem |
|----------|---------|
| Municipal cleanup | Expensive, reactive, no community engagement |
| Volunteer programs | Inconsistent, no economic incentive |
| Gig apps (TaskRabbit) | Require smartphone, bank account, prioritization of higher-paying work |
| Crypto DAOs | Token holder plutocracy (richest govern), no real-world utility |

---

## 2. The Solution

### 2.1 Overview

Trash Bank is a **standalone protocol** for task validation and reward distribution. It can integrate with any task/escrow platform — McClaw is the first integration, not a dependency.

**Core Flow:**

```
Task Created (McClaw or other platform)
    ↓
Worker Accepts Task
    ↓
Worker Completes Cleanup
    ↓
Worker Submits 4-Photo Proof (GPS + timestamps)
    ↓
Validation (McClaw agent or high-karma community member)
    ↓
Rewards Distributed:
    • MCLAW tokens (from escrow)
    • Trash Coins (from Trash Bank)
    • Garbage Cans (soulbound reputation)
```

### 2.2 Proof-of-Work System

**Four-Photo Verification:**

1. **Before photo:** Area before cleanup (with GPS, timestamp)
2. **Collected photo:** Trash gathered
3. **After photo:** Area after cleanup (same GPS location)
4. **Disposal photo:** Trash properly disposed

**Additional verification:**
- GPS geofencing (all photos within 50m radius)
- EXIF timestamp validation (chronological order)
- Photo hash comparison (prevent reuse across tasks)
- Account age gate (>7 days before accepting tasks)
- Rate limiting (max 5 tasks/day per user)

### 2.3 Why Soulbound Reputation

After analyzing governance failures in existing DAOs (see Section 8), Trash Bank implements **soulbound tokens** for reputation:

- **Garbage Cans cannot be bought** — only earned through verified work
- **Garbage Cans cannot be transferred** — non-transferable NFT
- **Garbage Cans grant voting power** — but with quadratic scaling
- **Garbage Cans enable validator status** — high-karma users validate others

This prevents the "whale buying influence" problem that plagues token-based DAOs.

---

## 3. Token Architecture

### 3.1 Three-Tier System

Trash Bank uses a three-tier token system to serve both crypto-native and non-crypto users:

| Token | Type | Transferable | On-Chain | Purpose |
|-------|------|--------------|----------|---------|
| **Trash Coins** | Database points | No | No | Vending machine redemption |
| **Trash Tokens (TTKN)** | ERC-20 | Yes | Yes (Base) | Trading, staking, DEX |
| **Garbage Cans** | Soulbound NFT | No | Yes | Governance voting weight |

### 3.2 Trash Coins (Tier 1)

**Purpose:** Non-crypto user inclusion

**Characteristics:**
- Stored in Trash Bank database (not on-chain)
- Soulbound to user account
- No wallet required
- Redeemable at vending machines for essentials

**Earning:**
- Awarded per validated cleanup task
- Amount varies by task difficulty (5-20 coins typical)

**Burning:**
- Redeemed at vending machines for goods
- One-way: cannot be bought back

**Why not on-chain?**
- Homeless individuals often lack smartphones or wallets
- Database transactions are instant and free
- No crypto knowledge required
- Low barrier to entry

### 3.3 Supply Distribution

**Initial Allocation:**

| Allocation | Percentage | Purpose |
|------------|-------------|--------|
| Liquidity Pool | 5% | DEX bootstrapping on Base |
| Community Treasury | 5% | Development, marketing, partnerships |
| Work-Based Earning | 90% | Distributed through validated cleanup tasks |
| Team/Founders | 0% | No allocation |

**Why this model:**

Hardcore blockchain participants may question "zero supply start." We address this:

1. **5% Liquidity Pool:** Required for DEX trading. Without initial liquidity, tokens cannot be traded. This mirrors Yearn Finance's approach—small initial pool, rest earned through participation.

2. **5% Treasury:** Needed for smart contract audits, marketing, and partnership development. All treasury spending is governed by DAO vote.

3. **90% Work-Earned:** The majority of tokens must be earned through verified cleanup work. This is analogous to Bitcoin mining—you contribute compute power, you earn BTC. In Trash Bank, you contribute cleanup work, you earn TTKN.

4. **Zero Team Allocation:** Founders receive no tokens. If they want TTKN, they must earn it through work like everyone else.

**Comparison to Fair Launch Projects:**

| Project | Initial Supply | Team | Distribution |
|---------|-----------------|------|--------------|
| Bitcoin | 0 | 0 | Mining only |
| Yearn (YFI) | 0 | 0 | Liquidity mining only |
| Trash Bank | 10% (5% LP + 5% treasury) | 0 | Work + LP |

**Why work-based fair launch works:**

Trash Bank starts with 5% liquidity pool + 5% treasury, similar to how projects like Yearn Finance launched. The remaining 90% must be earned through verified work.

This is not "zero supply" — it's "zero free allocation." Everyone, including founders, must earn tokens through contribution.

**What this means for participants:**

**Purpose:** Crypto-native user utility

**Characteristics:**
- ERC-20 token on Base blockchain
- Transferable between wallets
- Tradeable on DEXs
- Stakeable for governance fees (future)

**Supply Mechanics:**

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Initial Supply | 0 | Fair launch |
| Max Supply | 1,000,000,000 | Hard cap |
| Mint Mechanism | Work-based only | No pre-mine, no team allocation |
| Burn Mechanism | Vending redemption | Deflationary pressure from usage |
| Annual Inflation Cap | 10% | Prevents supply explosion |

**Inflation Control:**

If annual inflation approaches 10%, the reward per task decreases:

```
Example:
- Tasks completed year 1: 100,000
- Average reward: 10 coins/task
- Total minted: 1,000,000 coins
- Inflation: 10% (at cap)

If year 2 has 200,000 tasks:
- Without cap: 2,000,000 new coins (20% inflation)
- With cap: Reward drops to 5 coins/task
- Result: 1,000,000 new coins (10% inflation)
```

This ensures predictable supply growth while rewarding contributors.

**Conversion:**

Trash Coins can be converted to TTKN (one-way):
- 1 Trash Coin = 1 TTKN (1:1 peg)
- Conversion fee: 1% (goes to Trash Bank treasury)
- Irreversible: cannot convert TTKN back to Coins

### 3.4 Garbage Cans (Tier 3)

**Purpose:** Governance and reputation

**Characteristics:**
- Soulbound NFT (non-transferable)
- On-chain (Base blockchain)
- Cannot be bought, sold, or transferred
- Earned only through validated cleanup work

**Earning:**
- 1-5 Garbage Cans per task (based on difficulty)
- Cannot be bought or transferred
- Permanent record of contribution

**Voting Power:**

Trash Bank uses **quadratic voting** to prevent whale dominance:

```
Voting Power = √(Garbage Cans Held)

Example:
- User with 10 Cans: √10 = 3.16 votes
- User with 100 Cans: √100 = 10 votes
- User with 1,000 Cans: √1000 = 31.6 votes
```

This ensures influence scales with the square root of contribution, not linearly. A user with 100× more work earns only 10× more voting power.

**Validator Status:**
- 50+ Garbage Cans: Eligible to validate others' tasks
- 100+ Garbage Cans: Eligible to run for Trash Master

---

## 4. Governance Model

### 4.1 Three-Tier DAO Structure

**Trash Masters (7 representatives):**
- Elected by community via quadratic voting
- Terms: 6 months
- Requirements: 100+ Garbage Cans, 50+ completed tasks
- Responsibilities:
  - Distribute weekly budgets to sub-communities
  - Approve high-impact cleanup locations
  - Sponsor new Trash Collectors
  - Manage vending machine partnerships

**Sub-Communities (Neighborhood DAOs):**
- Geographic regions
- Open to all registered Trash Collectors
- Powers:
  - Vote on weekly cleanup priorities
  - Propose new locations
  - Allocate received budget

**Trash Collectors (All participants):**
- Earn Trash Coins + Garbage Cans
- Vote on proposals (quadratic)
- Rise to validator status (50+ Cans)
- Run for Trash Master (100+ Cans)

### 4.2 Quadratic Funding Distribution

Weekly budget distribution uses quadratic formula:

```
Community Allocation = (√(Community Garbage Cans) / Σ√(All Communities))² × Total Budget
```

**Example:**

| Community | Garbage Cans | √Cans | Allocation |
|-----------|--------------|-------|------------|
| Downtown | 1,000 | 31.6 | 33.3% |
| Riverside | 500 | 22.4 | 16.7% |
| East Side | 250 | 15.8 | 8.3% |
| Reserve | — | — | 41.7% |

Total: 1,000 Garbage Cans, 69.8 √Cans, 58.3% allocated

**Why quadratic?**
- Amplifies broad participation over concentrated voting
- Small holders have proportionally more influence
- Used by Gitcoin Grants ($72M+ distributed)
- Prevents whale dominance

### 4.3 Election Cycle

**Trash Masters:** Elected every **2 weeks** (bi-weekly), not 6 months.

**Rationale:**
- Rapid iteration during early stages
- Community can course-correct quickly
- Inactive masters are replaced quickly
- Builds engagement and participation

**After DAO maturation (Phase 3+):** May extend to 4 weeks or 6 weeks by community vote.

```
1. Proposal Submitted
   └── Requires: 10 Garbage Cans staked

2. Discussion Period (7 days)
   └── Community debates on forum/social

3. Voting Period (5 days)
   └── Quadratic voting by Garbage Can holders
   └── Quorum: 20% of total Garbage Cans must vote

4. Execution
   └── If passes → treasury executes
   └── If fails → staked Cans returned
```

---

## 5. Anti-Gaming Measures

### 5.1 Sybil Attacks

**Problem:** One person creates multiple accounts to earn multiple rewards.

**Solutions:**

| Measure | Implementation |
|---------|---------------|
| Account age gate | >7 days old before accepting tasks |
| McClaw verification | Agents verify identity |
| Photo fingerprinting | Hash comparison prevents reuse |
| GPS correlation | All photos within 50m radius |
| Behavior analysis | AI detects suspicious patterns |
| Validator review | High-karma validators flag anomalies |

### 5.2 Whale Buying Influence

**Problem:** Wealthy individual buys tokens to gain governance control.

**Solution:** Garbage Cans are soulbound — cannot be bought. Only TTKN is tradeable, but TTKN does not grant voting power. Only earned Garbage Cans grant governance rights.

### 5.3 Fake Cleanup

**Problem:** Worker stages photos without actually cleaning.

**Solutions:**

| Check | Method | Evasion Difficulty |
|-------|--------|-------------------|
| Timestamp | EXIF data extraction | Low (metadata editable) |
| GPS | Geotagging + geofence | Medium (requires location) |
| Visual change | AI comparison (future) | High |
| Disposal proof | Photo at verified bin | Medium |
| Validator review | Human verification | High |

### 5.4 Rate Limiting

**Problem:** Worker accepts too many tasks to maximize rewards.

**Solution:** Max 5 tasks/day per user. Caps reward exploitation while allowing meaningful work.

---

## 6. Integration with McClaw

### 6.1 Independence Principle

Trash Bank is a **standalone protocol**. It can integrate with:
- McClaw (current integration)
- TaskRabbit (future)
- Fiverr (future)
- Custom municipal systems (future)

McClaw is the first integration, not a dependency.

### 6.2 Integration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        MCCLAW                               │
│  Provides:                                                  │
│    - Task escrow system                                    │
│    - Agent verification                                    │
│    - MCLAW token distribution (Base)                        │
│    - Reputation infrastructure                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ API/Webhook
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      TRASH BANK                              │
│  Provides:                                                  │
│    - Task validation (photos, GPS, timestamps)            │
│    - Trash Coin distribution                                │
│    - Garbage Can reputation tracking                        │
│    - Vending machine network                                │
│    - DAO governance layer                                   │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Data Flow

1. **Task Created:** McClaw platform → Trash Bank mirrors metadata
2. **Worker Accepts:** McClaw
3. **Proof Submitted:** Trash Bank app (photos uploaded)
4. **Validation:** McClaw agent OR Trash Bank high-karma validator
5. **Escrow Release:** McClaw releases MCLAW to worker wallet
6. **Coin Minting:** Trash Bank mints Trash Coins + Garbage Cans to worker account

### 6.4 Live Test Task

| Field | Value |
|-------|-------|
| Task ID | `f2b09868-7bf2-47e5-a90d-b148dcf68e5e` |
| Title | Trash Pickup Test - Central Park |
| Status | Funded |
| Escrow | 0.5 MCLAW |
| Chain | Base |
| Transaction | `0x1ae1345646f5f955d27ead4ab2c8c2db2ef12a528a472e468a8e31119008039b` |

---

## 7. Use Cases

### 7.1 Homeless Economic Inclusion (Primary)

**Problem:** Homeless individuals want to contribute but lack economic pathways.

**Solution:**
- Trash Bank Cards (NFC-enabled, no smartphone required)
- Earn coins through cleanup work
- Redeem at vending machines for essentials
- Path to economic inclusion and self-sufficiency

**Vending Machine Network:**
- Locations: Shelters, community centers, libraries
- Items: Water (3 coins), Coffee (5), Noodles (8), Hygiene Kit (15)
- Corporate Sponsorship: Companies fund machines for CSR + tax write-off

### 7.2 Municipal Partnerships

Cities contract Trash Bank for targeted cleanup:
- Lower cost than traditional services
- Community engagement
- Verified results through photo proof
- Transparent budget allocation

### 7.3 Event Cleanup

Post-concert, festival, sports:
- Tasks posted with higher rewards
- Rapid turnaround
- Verified photo proof
- Event organizers fund escrow

### 7.4 Corporate CSR

Companies sponsor cleanup campaigns:
- Employee team-building participation
- ESG reporting with verified hours
- Brand reputation uplift
- Tax-deductible donations to Trash Bank treasury

### 7.5 Referral Network

- Invite friends to join Trash Bank
- Earn bonus Garbage Cans when they complete first task
- Build community through contribution
- Network effect rewards early adopters

---

## 8. Competitive Analysis

### 8.1 Yearn Finance (YFI)

**Similarity:** Fair launch, zero pre-mine
**Difference:** Yearn requires liquidity provision (wealth). Trash Bank requires work.
**Lesson:** Zero team allocation builds trust. Apply this.

### 8.2 Gitcoin Grants

**Similarity:** Quadratic funding, broad participation amplified
**Difference:** Gitcoin funds proposals. Trash Bank rewards completed work.
**Lesson:** Quadratic voting prevents whale dominance. Apply this.

### 8.3 Optimism RetroPGF

**Similarity:** Reward past work (retroactive)
**Difference:** Badgeholders evaluate impact. Trash Bank uses photo proof + validators.
**Lesson:** Retroactive funding reduces proposal risk. Apply this.

### 8.4 Alien Worlds DAO

**Similarity:** Planetary DAO structure (regional governance)
**Difference:** Whale dominance via token staking. Trash Bank prevents this with soulbound reputation.
**Lesson:** Token-based voting creates plutocracy. Avoid this.

### 8.5 OlympusDAO

**Similarity:** Innovative bonding/staking
**Difference:** High APY caused speculation, not utility. Trash Bank prioritizes real-world use.
**Lesson:** Speculative APY is unsustainable. Avoid this.

### 8.6 Comparison Matrix

| Feature | Trash Bank | Yearn | Gitcoin | Optimism | Alien Worlds | Olympus |
|---------|------------|-------|---------|----------|--------------|---------|
| Fair Launch | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| No Pre-mine | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| No Team Allocation | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Quadratic Voting | ✓ | ✗ | ✓ | ✓ (some) | ✗ | ✗ |
| Soulbound Reputation | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Work-Based Earning | ✓ | Liquidity | Grants | Retro | Staking | Bonds |
| Real-World Utility | ✓ | ✗ | ✗ | ✗ | Gaming | ✗ |
| Homeless Inclusion | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Burn Mechanism | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ |

---

## 9. Roadmap

### Phase 1: Build Infrastructure (Month 1-2)

- Finalize database architecture for Trash Coins
- Build API endpoints for task submission/validation
- Develop photo verification system (GPS, timestamps)
- Create Trash Bank Card system (NFC, QR codes)
- Design validator dashboard

### Phase 2: Test Concept with McClaw (Month 2-3)

- Pilot with 10-50 Trash Collectors
- Integrate with McClaw task escrow
- Manual validation by McClaw agents
- Collect feedback from users
- Identify friction points

### Phase 3: Modify Infrastructure (Month 3-4)

- Improve based on pilot findings
- Optimize photo verification
- Add anti-gaming measures
- Enhance user experience
- Scale validation capacity

### Phase 4: Launch Program (Month 4-6)

- Full McClaw integration
- Onboard 500+ Trash Collectors
- Deploy first vending machine (pilot location)
- Corporate partnership outreach
- Municipal pilot discussions

### Phase 5: Develop DAO (Month 6-9)

- Deploy Garbage Cans NFT contract (soulbound)
- Implement quadratic voting mechanism
- Build sub-community formation tools
- Design budget distribution system
- Create proposal submission interface

### Phase 6: Launch DAO (Month 9-12)

- First Trash Master election (bi-weekly)
- Weekly budget distribution begins
- Sub-communities active
- Community governance operational
- Evaluate expansion to additional cities

---

## 10. Team

(To be completed)

---

## 11. Risks and Mitigations

### 11.1 Sybil Attacks

**Risk:** Attackers create fake accounts to earn rewards.
**Mitigation:** Account age gates, McClaw verification, photo fingerprinting, GPS correlation, validator review.

### 11.2 Inflation Runaway

**Risk:** Supply grows too fast, diluting value.
**Mitigation:** 10% annual inflation cap with dynamic reward adjustment. Burn-on-redemption creates deflationary pressure.

### 11.3 Low Participation

**Risk:** Users don't participate in governance.
**Mitigation:** Local impact (neighborhood budgets), quadratic voting amplifies small holders, Garbage Cans incentivize ongoing participation.

### 11.4 Regulatory Uncertainty

**Risk:** Token classification unclear in some jurisdictions.
**Mitigation:** Two-tier system (Coins for non-crypto, TTKN for crypto-native). Trash Coins are database points, not securities.

### 11.5 McClaw Dependency

**Risk:** McClaw changes terms or shuts down.
**Mitigation:** Trash Bank is standalone. Can integrate with other platforms (TaskRabbit, Fiverr, custom systems).

---

## 12. Conclusion

Trash Bank transforms litter into social capital. By combining:
- **Work-based earning** (not wealth-based)
- **Soulbound reputation** (bought influence is impossible)
- **Quadratic voting** (small holders have voice)
- **Two-tier tokens** (crypto and non-crypto users)
- **Real-world utility** (vending machines)

...Trash Bank creates an economic pathway for anyone to contribute to their community while earning value and governance rights.

**Key Innovations:**
1. **Garbage Cans are soulbound** — influence cannot be bought
2. **Quadratic voting** — prevents whale dominance
3. **Two-tier tokens** — serves both crypto-native and unbanked users
4. **Burn-on-redemption** — natural deflationary pressure
5. **Independence** — integrates with any platform, not just McClaw

**Call to Action:**
- Join the whitelist: **t.me/trashbank**
- Whitelist for Original Rubbish Bin Badge
- Prepare for Q3 2026 MVP launch

**Your trash is someone's treasure. Let's clean communities together.**

---

*Trash Bank Whitepaper v1.0 — June 2026*
*This is a working document and may be updated based on community feedback and technological developments.*