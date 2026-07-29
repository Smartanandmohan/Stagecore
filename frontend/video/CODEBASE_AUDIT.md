# StageCore source audit for the launch film

This film was derived from the current React/Vite frontend and Spring Boot backend. The composition recreates the product language programmatically; it does not import, capture, or display any StageCore screenshot or raster UI.

## Product surfaces found

- Public experience: cinematic home hero, live matches, tournament discovery, rankings, news, sponsors, anti-cheat, community, support, FAQ, contact, legal, and authentication.
- Player shell: persistent navigation, universal search, unread message/notification state, responsive mobile navigation, and contextual views.
- Player command center: current rank, match/win/KD/tournament stats, upcoming match, registered tournaments, team health, quick actions, recent activity, and alerts.
- Player identity: editable gamer identity, avatar/banner, verification, follower graph, achievements, match record, publishing, polls, scheduled posts, GIF/media, comments, follow/mute/block/report, and post analytics.
- Tournament and match operations: discovery, filters, registration state, tournament detail, bracket/team/rule sections, match filters, live maps, result submission, scheduling, and activity synchronization.
- Team operations: team creation/disbanding, invitations, roster roles, recruitment state, member removal, team rank, and performance summaries.
- Ranking and analytics: global/regional filters, player/team/MVP tables, seasonal positioning, win/KD/score trends, map performance, and game-specific views.
- Communication: channels and DMs, attachments, emoji, typing state, message pin/delete, member presence, mute controls, voice/video calls, WebRTC peer connections, WebSocket signaling, and client-side E2EE key exchange/encryption.
- Notifications and rewards: tournament/match/team/security notifications, read state, cash-prize wallet, transaction history, withdrawal validation, and UPI-oriented payout UI.
- Organizer/admin: overview analytics, tournament CRUD, registration/payment-proof review, bracket seeding and publishing, match management, team approval/suspension, player bans, news/sponsor/site content, moderation reports, anti-cheat cases, permanent bans, permissions, 2FA settings, and exports/reports.

## Backend capabilities found

- Spring Security with JWT authentication and a rate-limit filter.
- Public tournament, match, ranking, and news APIs.
- Authenticated tournament squad registration.
- JPA entities/repositories for users, tournaments, registrations, matches, player rankings, team rankings, and news.
- WebSocket signaling and room coordination for chat/WebRTC communication.
- Seeded tournaments, matches, users, rankings, and news.
- A payment webhook endpoint is present, but its provider-specific processing remains a stub.

## Claim discipline

The launch film presents implemented user-facing workflows and the intended connected product model. Several rich dashboard/admin flows currently persist in browser storage rather than through complete server CRUD APIs. Anti-cheat case management exists as an operations UI, not as a finished automated detection engine. Wallet/UPI interactions are implemented in the frontend, while payment settlement integration is not complete. The film therefore uses language such as “operations,” “verification,” and “payout workflow,” and avoids claiming a finished payment rail or proprietary cheat-detection model.

## Film mapping

- 00:00–00:15: fragmentation problem.
- 00:15–00:27: StageCore identity and platform promise.
- 00:27–01:39: eight code-rendered player dashboard modules (60% of the full runtime).
- 01:39–01:50: organizer control, security, moderation, seeding, and growth.
- 01:50–01:56: connected player/team/event/rank/community graph.
- 01:56–02:00: brand close and CTA.
