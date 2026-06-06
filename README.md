# Trash Bank
## Turn Litter Into Social Capital

**Hackathon Submission: McClaw Integration Challenge**

---

## What is Trash Bank?

Trash Bank is a decentralized protocol that rewards individuals for community cleanup work. By combining proof-of-work verification, soulbound reputation tokens, and quadratic voting governance, Trash Bank creates an economic pathway for anyone to earn value through real work while governing the protocol they help build.

### Key Features
- **No pre-mine, no team allocation** — All tokens earned through real work
- **Two-tier token system** — Trash Coins (off-chain) + TTKN (on-chain) for crypto-native and non-crypto users
- **Garbage Cans (soulbound reputation)** — Governance through earned contribution, not token holdings
- **McClaw integration** — First task/escrow platform to integrate, more to follow

---

## McClaw Integration

Trash Bank integrates with McClaw as a task verification and payment layer:

1. **Task Creation:** Communities/DAOs post cleanup tasks on McClaw with escrow funding
2. **Worker Acceptance:** Workers (anyone, including unbanked/homeless) accept tasks via McClaw app
3. **Proof of Work:** 4-photo verification system (before, collected, after, disposal) with GPS + timestamps
4. **Validation:** McClaw agents or high-karma community members approve work
5. **Payment:** Escrow releases to Trash Bank smart contract → mints tokens to worker

### Why McClaw First?
- **Gasless transactions** via EIP-2612 (Permit) — workers don'tneed ETH
- **Agent-to-human marketplace** — perfect for AI-governed task creation
- **Real-time webhooks** — instant verification and payment
- **Base L2** — low fees, fast finality

---

## Demo

Live demo: **https://gitnjiiggy.github.io/trash-bank/**

### Run Backend Locally
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your McClaw credentials
npm start
```

### API Endpoints
- `GET /api/health` - Health check
- `POST /api/tasks` - Create cleanup task
- `GET /api/tasks` - List tasks
- `POST /api/tasks/:id/submit` - Submit proof of work
- `POST /api/proofs/:id/validate` - Validate proof

See [backend/README.md](./backend/README.md) for full API docs.

### Screenshots
- Task flow: Workers find, accept, complete, validate cleanup tasks
- DAO governance: Quadratic voting by Garbage Can holders
- Vending machine integration: Trash Coins redeemablefor basic needs

---

## Tokenomics

### Trash Coins (Off-Chain Database)
- Earned through completed tasks
- Redeemable at vending machines for basic needs
- No smartphone required (card/badge scan)
- One-way conversion to TTKN

### Trash Tokens (TTKN, On-Chain)
- ERC-20 on Base L2
- Minted when Trash Coins convert on-chain
- Tradeable, stakeable
- Burn mechanism on vending redemption

### Garbage Cans (Soulbound Reputation)
- Non-transferable governance tokens
- Earned through validated work + community contributions
- Determines voting weight in DAO
- Required to become a validator

**Full tokenomics:** [whitepaper.md](./whitepaper.md)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         TRASH BANK                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Task Layer  │◄──►│  McClaw.io   │◄──►│   Workers    │      │
│  │  (Tasks)     │    │  (Escrow)    │    │  (Humans)    │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│          │                    │                   │              │
│          ▼                    ▼                   ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Verification│    │  Payment     │    │  Reputation  │      │
│  │  (4-Photo)   │    │  (Escrow)    │    │  (Garbage    │      │
│  │              │    │              │    │   Cans)      │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│          │                    │                   │              │
│          ▼                    ▼                   ▼              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              BLOCKCHAIN LAYER (Base L2)                   │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │  │
│  │  │ TTKN    │  │ Escrow  │  │ Voting  │                  │  │
│  │  │ (ERC-20)│  │Contract │  │Contract │                  │  │
│  │  └─────────┘  └─────────┘  └─────────┘                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Anti-Gaming Measures

1. **EXIF timestamp verification** — Photos must match task timeline
2. **GPS geofencing** — Worker must be at task location
3. **Stake slashing** — Validators lose Garbage Cans for false approvals
4. **Proof chain** — 4 photos required, not just 1
5. **Reputation gates** — Higher rewards require higher Garbage Can count

---

## Roadmap

### Phase 1: Prototype (Current)
- Mockup demonstrations
- McClaw test task created
- Whitepaper and tokenomics

### Phase 2: MVP
- Smart contract deployment (Base L2)
- McClaw integration live
- First pilot city

### Phase 3: Community
- DAO governance launch
- Validator program
- Vending machine partnerships

### Phase 4: Scale
- Multi-city rollout
- Additional task platform integrations
- Mobile app

---

## Team

Built by **Sile** (AI agent) in collaboration with **Amber** (human).

---

## License

MIT

---

## Links

- [Whitepaper](./whitepaper.md)
- [Tokenomics](./tokenomics.md)
- [Pitch Deck](./pitch.md)
- [DAO Governance Mockup](./mockup/dao-governance.html)
- [Task Flow Mockup](./mockup/task-flow.html)
- [Vending Machine Mockup](./mockup/vending-machine.html)