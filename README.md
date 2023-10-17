# C@E reverse proxy for real-time stats

This is a prototype that would allow fast-forward customers to display real-time stats on developer.fastly.com

It is a C@E service that does reverse proxying to the real-time stats API. It forwards requests to rt.fastly.com and injects a read-only token stored in secret store into the Fastly-Key header to make the data publicly accessible.
