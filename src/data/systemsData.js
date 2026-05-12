export const systems = [
  {
    id: 'netflix-recommendation',
    title: 'Netflix Recommendation System',
    icon: '🎬',
    color: '#E50914',
    tagline: 'Personalized content delivery using ML + caching',
    highlight: 'Designed a system combining collaborative filtering with caching to deliver low-latency personalized recommendations.',
    githubLink: 'https://github.com/just-rsr/Netflix-Recommendation-System.git',
    live: null,
    components: ['Recommendation Engine (ML)', 'User Data Service', 'Cache Layer', 'Content DB'],
    challenges: ['Cold start problem', 'Accuracy vs latency tradeoff', 'Scale to millions of users'],
    images: [
      { src: '/derivations/netflix-hld.jpg', caption: 'High-level architecture', insight: 'This diagram helped me identify where caching is needed to reduce ML inference latency.' },
      { src: '/derivations/netflix-ml-pipeline.jpg', caption: 'ML pipeline & data flow', insight: null },
      { src: '/derivations/netflix-cache-strategy.jpg', caption: 'Caching strategy', insight: 'Mapping out the cache layer revealed that precomputed recommendations with TTL was the right tradeoff over real-time inference.' },
      { src: '/derivations/netflix-data-model.jpg', caption: 'Data model & schema design', insight: null },
    ],
    sections: [
      {
        label: '📌 Problem Statement',
        content: 'Personalize content for each user based on their watch history, ratings, and behavior to maximize engagement.'
      },
      {
        label: '1️⃣ Requirements',
        content: 'Functional: Recommend movies/shows per user, update recommendations based on new activity, support browsing by category.\n\nNon-functional: Low latency (<200ms), high availability, eventual consistency acceptable for recommendations.'
      },
      {
        label: '2️⃣ High-Level Design',
        content: 'User → API Gateway → Recommendation Service → Cache (Redis)\n                                        ↓\n                              ML Model + User History DB\n                                        ↓\n                              Precomputed Recommendations'
      },
      {
        label: '3️⃣ Core Components',
        content: 'API Gateway: Routes requests, handles auth.\nRecommendation Engine: ML model (collaborative filtering + content-based).\nUser Data Service: Stores watch history, ratings, preferences.\nCache (Redis): Precomputed recommendations per user for fast reads.\nContent DB: Metadata for all movies/shows.'
      },
      {
        label: '4️⃣ API Design',
        content: 'GET /recommendations/{userId} — fetch personalized list\nGET /trending — global trending content\nPOST /feedback — user interaction (watch, skip, rate)'
      },
      {
        label: '5️⃣ Data Model',
        content: 'Users: userId, preferences, region\nWatchHistory: userId, contentId, watchedAt, completionRate\nContent: contentId, genre, tags, embeddings\nRecommendations: userId, contentIds[], generatedAt (cached)'
      },
      {
        label: '6️⃣ Data Flow',
        content: 'User opens app → API hits cache for precomputed recs → If cache miss, call Recommendation Engine → Engine queries user history + runs ML model → Returns ranked list → Store in cache → Serve to user.\n\nBackground job: Recompute recommendations every few hours using latest activity.'
      },
      {
        label: '7️⃣ Scaling Strategy',
        content: 'Precompute recommendations offline (batch ML jobs) to avoid real-time ML inference latency.\nRedis cache per user with TTL.\nHorizontal scaling of API and recommendation services.\nCDN for content metadata.'
      },
      {
        label: '8️⃣ Bottlenecks',
        content: 'Cold start: New users have no history → use popularity-based fallback + onboarding preferences.\nML inference latency: Solved by precomputation.\nCache invalidation: Use TTL + event-driven updates on new activity.'
      },
      {
        label: '9️⃣ Reliability',
        content: 'Cache fallback to popularity-based recommendations if ML service is down.\nReplication for user history DB.\nAsync updates — user activity queued via Kafka, processed by ML pipeline.'
      },
      {
        label: '🔟 Trade-offs',
        content: 'Precomputed vs real-time: Precomputed is faster but slightly stale. Acceptable for recommendations.\nCollaborative filtering vs content-based: Hybrid gives best results but adds complexity.\nConsistency vs availability: Chose availability — slightly stale recs are fine.'
      },
      {
        label: '1️⃣1️⃣ Future Improvements',
        content: 'Real-time session-based recommendations (what you just watched influences next suggestion).\nA/B testing framework for recommendation algorithms.\nMulti-armed bandit for exploration vs exploitation.'
      },
    ]
  },
  {
    id: 'uber-ride-matching',
    title: 'Ride Matching System (Uber)',
    icon: '🚗',
    color: '#000000',
    tagline: 'Real-time geo-spatial driver matching under strict latency',
    highlight: 'Used geo-spatial indexing to efficiently match riders with nearby drivers in real time under strict latency constraints.',
    githubLink: 'https://github.com/just-rsr/Ride-Matching-System-Uber-.git',
    live: null,
    components: ['Matching Engine', 'Location Service', 'Geo Index (Redis)', 'Trip Service'],
    challenges: ['Real-time location updates at scale', 'Fast nearest-driver queries', 'High availability matching'],
    images: [
      { src: '/derivations/uber-hld.jpg', caption: 'High-level architecture', insight: 'Drawing this out showed me that the geo index needs to be completely separate from the main DB — it has a totally different access pattern.' },
      { src: '/derivations/uber-geo-index.jpg', caption: 'Geo-spatial indexing with GeoHash', insight: null },
      { src: '/derivations/uber-data-flow.jpg', caption: 'End-to-end data flow', insight: 'Tracing the full flow revealed a hidden race condition — two drivers could accept the same ride simultaneously without proper locking.' },
      { src: '/derivations/uber-matching-engine.jpg', caption: 'Matching engine design', insight: null },
      { src: '/derivations/uber-scaling.jpg', caption: 'Scaling & partitioning strategy', insight: null },
    ],
    sections: [
      {
        label: '📌 Problem Statement',
        content: 'Match riders with nearby available drivers in real-time with minimal latency (<100ms matching).'
      },
      {
        label: '1️⃣ Requirements',
        content: 'Functional: Request ride, match nearest driver, track location in real-time, complete trip.\n\nNon-functional: Matching latency <100ms, high availability, real-time location updates every 5 seconds.'
      },
      {
        label: '2️⃣ High-Level Design',
        content: 'Rider App → API Gateway → Matching Service → Driver Service → DB\n                                      ↓\n                              Geo Index (Redis GeoHash)'
      },
      {
        label: '3️⃣ Core Components',
        content: 'API Gateway: Auth, rate limiting, routing.\nMatching Engine: Finds nearest available drivers using geo queries.\nLocation Service: Receives real-time driver location updates.\nGeo Index (Redis): Stores driver locations using GeoHash for fast spatial queries.\nTrip Service: Creates and manages trip lifecycle.'
      },
      {
        label: '4️⃣ API Design',
        content: 'POST /request-ride — rider requests a ride\nGET /nearby-drivers — find drivers within radius\nPOST /accept-ride — driver accepts\nPOST /update-location — driver sends location update\nGET /trip/{id} — trip status'
      },
      {
        label: '5️⃣ Data Model',
        content: 'Users: userId, name, rating\nDrivers: driverId, status (available/busy), vehicleType, rating\nTrips: tripId, riderId, driverId, status, startTime, endTime\nLocations: driverId, lat, lng, updatedAt (stored in Redis, not DB)'
      },
      {
        label: '6️⃣ Data Flow',
        content: 'Rider requests ride → Matching Engine queries Redis GeoHash for nearby drivers → Sends request to top 3 drivers → First to accept gets matched → Trip created in DB → Both apps notified via WebSocket → Location updates stream in real-time until trip ends.'
      },
      {
        label: '7️⃣ Scaling Strategy',
        content: 'Redis GeoHash for O(log n) spatial queries.\nPartition matching service by city/region.\nHorizontal scaling of location service.\nWebSockets for real-time updates instead of polling.\nKafka for location update stream processing.'
      },
      {
        label: '8️⃣ Bottlenecks',
        content: 'Geo queries at scale: Redis GeoHash handles millions of driver locations efficiently.\nHigh-frequency location updates: Batch updates every 5s, use Kafka to decouple ingestion from processing.\nMatching under load: Stateless matching service scales horizontally.'
      },
      {
        label: '9️⃣ Reliability',
        content: 'Retry matching if driver rejects — move to next driver in queue.\nFallback: If matching service is slow, increase search radius.\nTrip state machine: Ensures consistent state transitions (requested → matched → in-progress → completed).'
      },
      {
        label: '🔟 Trade-offs',
        content: 'Accuracy vs speed: GeoHash approximates distance but is fast. Acceptable for initial matching.\nReal-time vs batched location: Real-time gives better UX but higher infra cost.\nSQL vs NoSQL for trips: SQL for strong consistency on financial records (trips/payments).'
      },
      {
        label: '1️⃣1️⃣ Future Improvements',
        content: 'ML-based ETA prediction for smarter matching.\nSurge pricing engine based on supply/demand.\nRoute optimization using graph algorithms.'
      },
    ]
  },
  {
    id: 'payment-system',
    title: 'Payment Processing System',
    icon: '💳',
    color: '#635BFF',
    tagline: 'Reliable, idempotent transactions with zero duplication',
    highlight: 'Used idempotency keys to ensure no duplicate payments even under network failures and retries.',
    githubLink: 'https://github.com/just-rsr/Payment-Processing-System.git',
    live: null,
    components: ['Payment Service', 'Transaction DB', 'Ledger', 'Bank Gateway'],
    challenges: ['Duplicate payments on retry', 'Network failures mid-transaction', 'Strong consistency guarantees'],
    images: [
      { src: '/derivations/payment-hld.jpg', caption: 'High-level architecture', insight: 'This diagram made it clear that the ledger must be a separate append-only store — mixing it with the transactions table would risk data corruption.' },
      { src: '/derivations/payment-idempotency.jpg', caption: 'Idempotency key flow', insight: 'Mapping the idempotency flow was the key insight — without this, retries on network failure would cause duplicate charges.' },
      { src: '/derivations/payment-data-flow.jpg', caption: 'Transaction state machine', insight: null },
      { src: '/derivations/payment-ledger.jpg', caption: 'Ledger & consistency model', insight: null },
    ],
    sections: [
      {
        label: '📌 Problem Statement',
        content: 'Process payments reliably with no duplicate transactions, strong consistency, and fault tolerance under network failures.'
      },
      {
        label: '1️⃣ Requirements',
        content: 'Functional: Initiate payment, process transaction, handle success/failure, query payment status.\n\nNon-functional: Strong consistency (no duplicate charges), high reliability, secure transactions, audit trail.'
      },
      {
        label: '2️⃣ High-Level Design',
        content: 'Client → API → Payment Service → Bank Gateway\n                      ↓\n              Transaction DB + Ledger'
      },
      {
        label: '3️⃣ Core Components',
        content: 'Payment Service: Orchestrates payment flow, handles idempotency.\nTransaction Service: Creates and tracks transaction state.\nLedger DB: Immutable record of all financial movements.\nExternal Bank API: Processes actual money movement.\nIdempotency Store: Prevents duplicate processing of same request.'
      },
      {
        label: '4️⃣ API Design',
        content: 'POST /pay — initiate payment (with idempotency key in header)\nGET /payment-status/{id} — check payment status\nPOST /refund/{id} — initiate refund\nGET /transactions/{userId} — transaction history'
      },
      {
        label: '5️⃣ Data Model',
        content: 'Payments: paymentId, userId, amount, currency, status, idempotencyKey, createdAt\nTransactions: txnId, paymentId, type, amount, status\nLedger: entryId, txnId, debit, credit, balance, timestamp (append-only)\nIdempotencyKeys: key, paymentId, createdAt (TTL 24h)'
      },
      {
        label: '6️⃣ Data Flow',
        content: 'User sends payment request with idempotency key → Check if key already processed (return cached result if yes) → Create transaction record (PENDING) → Call bank API → On success: update to COMPLETED + write to ledger → On failure: update to FAILED + trigger retry.\n\nCritical: Ledger writes are append-only and never updated.'
      },
      {
        label: '7️⃣ Scaling Strategy',
        content: 'Queue-based processing via Kafka for async payment handling.\nHorizontal scaling of payment service (stateless).\nRead replicas for transaction history queries.\nSharding by userId for transaction DB.'
      },
      {
        label: '8️⃣ Bottlenecks',
        content: 'External bank latency: Use async processing + webhooks instead of synchronous calls.\nDB write contention: Use optimistic locking for transaction state updates.\nIdempotency store: Redis with TTL for fast key lookups.'
      },
      {
        label: '9️⃣ Reliability',
        content: 'Idempotency keys: Same request always returns same result — no double charges.\nRetry with exponential backoff for bank API failures.\nTwo-phase commit for ledger + transaction DB consistency.\nDead letter queue for failed payments requiring manual review.'
      },
      {
        label: '🔟 Trade-offs',
        content: 'Consistency vs availability: Chose strong consistency — money cannot be eventually consistent.\nSync vs async: Async gives better throughput but complicates status tracking. Used async with webhooks.\nSQL vs NoSQL: SQL for transactions (ACID), Redis for idempotency store (speed).'
      },
      {
        label: '1️⃣1️⃣ Future Improvements',
        content: 'ML-based fraud detection on transaction patterns.\nMulti-currency support with real-time FX rates.\nPCI-DSS compliance layer for card data handling.'
      },
    ]
  },
];
