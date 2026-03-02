---
title: 'Onedata 25.0 is here!'
date: 2026-01-30
description: 'We are proud to announce the release of Onedata 25.0 — Faster workflows, richer metadata, stronger foundations.'
tags: ['announcement']
---

## Onedata 25.0 — Faster workflows, richer metadata, stronger foundations

We’re excited to introduce **Onedata 25.0**, a release focused on performance at scale, improved data-publishing capabilities, and continued evolution of the platform’s S3 ecosystem. Alongside numerous stability and security improvements, this version also marks the transition to calendar-based versioning.

Here’s what’s new at a glance.

---

### A clearer release cadence

Onedata now adopts **Calendar Versioning**, making releases easier to track and plan. Version 25.0 aligns functionally with 21.02.9 from the previous scheme and remains fully compatible with the 21.02 line.
---

### Empowering data publication workflows

This release strengthens Onedata’s role in research data ecosystems:

* “Open Data” has been redefined as **Public Data**, supporting a broader range of licensing scenarios.
* Added support for **DataCite** and **OpenAIRE** metadata formats across GUI, APIs, and OAI-PMH endpoints.
* Enhanced visibility and handling of JSON metadata in file workflows.

These improvements make publishing and exposing datasets more interoperable and standards-compliant.

---

### Advancing OneS3 integration

The **OneS3 service** (beta) continues to mature:

* Deployment during cluster setup or into existing clusters
* Configurable ports and management via GUI or API
* Improved certificate and configuration handling

This evolution expands flexibility for teams building S3-compatible data pipelines on top of Onedata.

---

### Faster, smoother Web GUI

Working with large-scale environments just got easier:

* Infinite scrolling, batching, and caching across lists and sidebars
* Better progress indicators and loading feedback
* Performance optimizations for large memberships, hierarchies, and token views

The result: a noticeably more responsive experience when operating at scale.

---

### Security, resilience, and observability

Under the hood, 25.0 delivers important platform hardening:

* Removal of unsafe TLS ciphers with flexible configuration options
* Backpressure mechanisms preventing request flooding between services
* Richer structured error reporting and diagnostics
* Numerous fixes improving reliability across storage, networking, and quota handling

---

### The takeaway

Onedata 25.0 is about momentum: enabling smoother user experience, stronger metadata interoperability, and more flexible object-storage integration — all while reinforcing system stability and security.

If you operate large deployments or publish data to external ecosystems, this release delivers tangible, day-to-day improvements that make workflows faster and more robust.

