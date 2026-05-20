# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: notificationBell.spec.ts >> Notification Functionality >> TC_NOTIF_Verify Bell icon unread badge display
- Location: tests\notificationBell.spec.ts:13:9

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - img
  - generic [ref=e2]:
    - navigation "Primary navigation" [ref=e4]:
      - generic [ref=e5]:
        - link "TurboCore" [ref=e7] [cursor=pointer]:
          - /url: /v3/client
          - img "TurboCore" [ref=e8]
        - generic [ref=e9]:
          - link "Dashboard" [ref=e10] [cursor=pointer]:
            - /url: /v3/client/dashboard
            - img [ref=e11]
            - generic [ref=e16]: Dashboard
          - link "BA" [ref=e17] [cursor=pointer]:
            - /url: /v3/client/ba
            - img [ref=e18]
            - generic [ref=e20]: BA
          - link "QA" [ref=e21] [cursor=pointer]:
            - /url: /v3/client/qa
            - img [ref=e22]
            - generic [ref=e24]: QA
          - link "Meetings" [ref=e25] [cursor=pointer]:
            - /url: /v3/client/meetings
            - img [ref=e26]
            - generic [ref=e28]: Meetings
          - link "Files" [ref=e29] [cursor=pointer]:
            - /url: /v3/client/km
            - img [ref=e30]
            - generic [ref=e32]: Files
      - generic [ref=e33]:
        - button "Notifications" [ref=e35] [cursor=pointer]:
          - img [ref=e37]
        - button "Account menu for User" [ref=e41] [cursor=pointer]: "?"
    - main [ref=e42]:
      - generic [ref=e44]:
        - complementary [ref=e45]:
          - generic [ref=e46]:
            - button "Collapse workstreams" [expanded] [ref=e47] [cursor=pointer]:
              - img
            - heading "QA Workstreams" [level=2] [ref=e48]
            - button "New QA Workstream" [active] [ref=e49] [cursor=pointer]:
              - img
          - generic [ref=e50]:
            - button "All" [ref=e51] [cursor=pointer]
            - button "Assigned to me" [ref=e52] [cursor=pointer]
            - button "Mentions" [ref=e53] [cursor=pointer]: "@"
            - button "Status" [ref=e54] [cursor=pointer]:
              - text: Status
              - img
        - paragraph [ref=e83]: Loading workstreams…
  - region "Notifications alt+T"
  - alert [ref=e84]
```