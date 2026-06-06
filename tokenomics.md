# Trash Bank Tokenomics — Detailed Framework

## Research: DAO Governance Models

### Alien Worlds Model (Planetary DAOs)
- **Structure:** 6 planets, each with2 DAOs (Syndicate + Union)
- **Voting:** Stake TLM tokens to participate
- **Budget:** 2% of treasury claimable weekly
- **Custodians:** Elected representatives manage treasury distribution
- **Problem:** Whale dominance — large holders control votes

### Key Learnings Applied to Trash Bank

| Alien Worlds Issue | Trash Bank Solution |
|-------------------|---------------------|
| Token-whale governance | **Garbage Cans cannot be bought** — earned only through work |
| Plutocratic (rich get richer) | **Meritocratic** — influence through contribution, not wealth |
| Low voter participation (5%) | **Direct impact** — local budgets affect your neighborhood |
| Staking for rewards only | **Staking for local influence** — Garbage Cans =DAO voting weight |

---

## Token Architecture v2

### Three-Token System

```
┌─────────────────────────────────────────────────────────────┐
│                    TRASH COINS (Database)                  │
│  Internal points, not on-chain                             │
│  Earned: completing cleanup tasks                           │
│  Used: vending machine redemption                           │
│  Transferable: No (soulbound to user account)              │
│  For: Non-crypto users, homeless participants              │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Convert (one-way)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    TRASH TOKENS (TTKN)                      │
│  ERC-20 on Base (with Permit)                              │
│  Earned: converting Trash Coins                            │
│  Used: staking, trading, governance fees                   │
│  Transferable: Yes (wallet-to-wallet)                      │
│  For: Crypto-native users                                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Stake for voting
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   GARBAGE CANS (Soulbound NFT)             │
│  Non-transferable reputation badge                         │
│  Earned: per completed task (1-5 Cans based on difficulty)  │
│  Used: DAO voting weight, validator eligibility            │
│  Transferable: No (soulbound)                               │
│  For: Governance participation                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Supply Mechanism

### Fair Launch Principles

| Principle | Implementation |
|-----------|----------------|
| **No pre-mine** | Zero tokens at genesis. All tokens minted through completed tasks. |
| **No team allocation** | No founder or investor allocation. Work = tokens. |
| **No private sale** | No VC, no presale, no insider discounts. |
| **Elastic supply** | Tokens minted when earned, burned when redeemed. |
| **Deflationary by design** | Vending redemption burns coins/tokens. |

### Mint-to-Earn Flow

```
Task Completed→ Validation → Trash Coins Minted (database)
                                      │
                                      ├── Garbage Cans awarded (soulbound)
                                      │
                                      └── (Optional) Convert Coins → TTKN (on-chain)
```

### Burn-on-Redemption Flow

```
Vending Machine Redemption → Trash Coins Burned (database)
                                    
Token Swap/DEX Sale → TTKN remains incirculation (market-determined)
```

---

## Governance Framework

### Quadratic Voting for Garbage Cans

**Why quadratic?** Prevents whale dominance while rewarding consistent contributors.

| Garbage Cans | Voting Power (Linear) | Voting Power (Quadratic) |
|--------------|----------------------|--------------------------|
| 1 | 1 | 1 |
| 10 | 10 | 3.16 |
| 100 | 100 | 10 |
| 1000 | 1000 | 31.6 |

**Formula:** `Voting Power = √(Garbage Cans earned)`

This means:
- New collector with10 Cans: 3.16 votes
- Veteran with 100 Cans: 10 votes
- **Ratio: 3.16×** not10×

**Result:** Influence scales with √(work), not work itself. Diminishing returns on accumulation, encouraging broad participation.

---

### DAO Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    TRASH MASTERS (7)                        │
│  Elected by community via quadratic voting                  │
│  Term: 6 months                                             │
│  Responsibilities:                                         │
│    - Distribute weekly budgets to sub-communities          │
│    - Approve high-impact cleanup locations                 │
│    - Sponsor new Trash Collectors                          │
│    - Manage vending machine partnerships                   │
│  Requirements:                                             │
│    - Minimum 100 Garbage Cans                              │
│    - Staked 50 TTKN for 30 days                           │
│    - Completed ≥50 tasks                                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUB-COMMUNITIES                          │
│  Neighborhood-level DAOsorganized by region               │
│  Members: All registered Trash Collectors                  │
│  Powers:                                                    │
│    - Vote on weekly cleanup priorities                     │
│    - Propose new locations                                 │
│    - Allocate local budgets                                │
│  Budget Allocation:                                         │
│    - Sub-community receives weekly MCLAW allocation        │
│    - Distribute via quadratic vote among proposed tasks   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    TRASH COLLECTORS                          │
│  All registered participants                               │
│  Earn:                                                      │
│    - Trash Coins per completed task                        │
│    - Garbage Cans per task (1-5 based on difficulty)        │
│    - Optional TTKN conversion                             │
│  Rights:                                                    │
│    - Vote on sub-community proposals                       │
│    - Rise to validator status (≥50 Garbage Cans)          │
│    - Run for Trash Master (≥100 Garbage Cans)             │
└─────────────────────────────────────────────────────────────┘
```

---

### Proposal Flow

```
1. Proposal Submitted
   └── Requires: 10 Garbage Cans staked
   
2. Discussion Period (7 days)
   └── Community discusses on forum/social
   
3. Voting Period (5 days)
   └── Quadratic voting by Garbage Can holders
   └── Quorum: 20% of total Garbage Cans must vote
   
4. Execution
   └── If passes → treasury executes
   └── If fails → staked Cans returned
```

---

## Inflation Control

### Annual Cap Mechanism

- **Max annual inflation:** 10% of current supply
- **Dynamic reward adjustment:** If inflation cap approached, reward per task decreases
- **Burn offsets:** Vending redemptions burn tokens, offsetting inflation

### Example:

```
Year 1:
- Starting supply: 0
- Tasks completed: 100,000
- Average reward: 10 coins/task
- Total minted: 1,000,000 coins
- Redemptions: 300,000 coins burned
- Net supply: 700,000 coins

Year 2:
- Starting supply: 700,000
- Max inflation: 70,000 coins (10%)
- If tasks would mint >70,000 → adjust reward per task
```

---

## Vending Machine Integration

### Specific Use Case: Homeless Outreach

**Problem:** Homeless individuals often lack smartphones, crypto wallets, or bank accounts.

**Solution:** Physical Trash Bank Cards work like transit cards.

```
┌─────────────────────────────────────────────────────────────┐
│                    TRASH BANK CARD                          │
│  NFC-enabled card withQR code                            │
│  No smartphone required                                     │
│  Scans at:                                                  │
│    - Shelters                                              │
│    - Community centers                                      │
│    - Vending machines (partner locations)                 │
│                                                              │
│  Balances stored in Trash Bank database (not on-chain)    │
│  Card linked to phone number for SMS verification         │
└─────────────────────────────────────────────────────────────┘
```

### Vending Machine Locations

- Homeless shelters
- Community centers
- Partner cafes/stores
- Public libraries

### Redemption Items

| Item | Cost | Category |
|------|------|----------|
| Bottled water | 3 coins | Hydration |
| Hot coffee | 5 coins | Warmth |
| Instant noodles | 8 coins | Nutrition |
| Sandwich | 12 coins | Nutrition |
| Hygiene kit | 15 coins | Hygiene |
| Warm socks | 20 coins | Clothing |
| Transit pass | 50 coins | Transport |

### Corporate Sponsorship Model

```
Corporate Partner → Funds vending machines → Tax write-off + CSR credit
                          │
                          └──> Trash Bank handles operations
                                   │
                                   └──> Homeless earn coins → Redeem at machines
```

---

## McClaw Integration (Independent but Compatible)

### Independence Statement

Trash Bank is a **standalone protocol** that can integrate with any task/escrow system. McClaw is the first integration, not the only possible one.

### Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│                        MCCLAW                                │
│  Provides:                                                  │
│    - Task escrow system                                    │
│    - Agent verification                                    │
│    - On-chain token distribution (MCLAW)                   │
│    - Reputation infrastructure                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ API/Webhook integration
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      TRASH BANK                              │
│  Provides:                                                  │
│    - Task validation (photos, GPS, timestamps)            │
│    - Trash Coin distribution                               │
│    - Garbage Can reputation tracking                       │
│    - Vending machine network                               │
│    - DAO governance layer                                  │
│                                                              │
│  Independent: Can integrate with other platforms           │
│               (TaskRabbit, Fiverr, custom systems)        │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
McClaw Task Created→ Trash Bank mirrors task metadata
       │
       └──> Worker accepts on McClaw
       │
            └──> Worker submits proof via Trash Bank app
                    │
                    └──> Trash Bank validates (or McClaw agent validates)
                            │
                            ├──> McClaw releases MCLAW escrow
                            │
                            └──> Trash Bank mints Trash Coins + Garbage Cans
```

---

## Token Distribution Timeline

### Phase 1: MVP (Now - Q3 2026)
- Database coins only (no on-chain)
- Manual validation
- Local vending machines

### Phase 2: Token Launch (Q3 2026)
- Deploy TTKN contract on Base
- Enable Coins → Tokens conversion
- Begin DEX liquidity

### Phase 3: DAO Governance (Q4 2026)
- Deploy Garbage Cans NFT contract
- Enable quadratic voting
- First Trash Master election

### Phase 4: PublicScale (2027)
- Multi-city expansion
- Corporate partnerships
- Public IDO (community decision)

---

## Comparison: Trash Bank vs. Other DAOs

| Feature | Trash Bank | Alien Worlds | Yearn | OlympusDAO |
|---------|------------|--------------|-------|-------------|
| Fair launch | ✓ | ✗ | ✓ | ✗ |
| No pre-mine | ✓ | ✗ | ✓ | ✗ |
| Reputation-based voting | ✓ | ✗ | ✗ | ✗ |
| Real-world utility | ✓ | ✗ | ✗ | ✗ |
| Homeless inclusion | ✓ | ✗ | ✗ | ✗ |
| Quadratic voting | ✓ | ✗ | ✓ (some forks) | ✗ |
| Burn mechanism | ✓ | ✗ | ✗ | ✓ |

---

## Financial Projections (Examples)

### Task Volume Assumptions

| Metric| Month 1 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| Active Trash Collectors | 100 | 500 | 2,000 |
| Tasks completed/month | 500 | 5,000 | 30,000 |
| Avg coins per task | 10 | 10 | 8 (inflation adjust) |
| Coins minted/month | 5,000 | 50,000 | 240,000 |
| Coins burned/month | 1,500 | 15,000 | 72,000 |
| Net new coins/month | 3,500 | 35,000 | 168,000 |

### Treasury Flow

| Source | Flow |
|--------|------|
| Task escrow (MCLAW) | McClaw handles |
| Vending machines | Corporate sponsors → Trash Bank treasury |
| Token conversion fees | 1% fee on Coins → Tokens conversion |
| Optional: DEX trading fees | 0.3% swap fee (if DAO launches liquidity pool) |

---

*Last updated: 2026-06-05*