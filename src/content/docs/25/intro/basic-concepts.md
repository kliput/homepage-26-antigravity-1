---
title: "Basic concepts"
---

# Basic concepts

The most important concepts in Onedata are:

<!-- TODO VFS-11766 links to different sections, consider being more concise or moving some information -->

* **Spaces** — distributed virtual volumes, where users can organize their data,
* **Providers** — entities who support user spaces with actual storage resources exposed via *Oneprovider* services,
* **Zones** — federations of providers that enable the creation of closed or
  interconnected communities, managed by *Onezone* services.

## Spaces

All data stored in Onedata is organized into [Spaces][]. Spaces can be seen as virtual
directories or volumes, which can contain an arbitrary directory and file hierarchy while
being distributed across multiple storage providers. Each space has to be supported by at
least one provider, which means that this provider reserved a certain storage quota for
this particular space. In case a space is supported by more providers, the total quota is
the sum of storage space provisioned by all providers supporting it.

![image-spaces-model][]

Each user can have any number of spaces. Spaces can be easily shared with other users
and even exposed to the public. If you want to create a space for a community of users,
Onedata supports user *groups*, which enable multiple users to access a single space
sharing common authorization rules.

The data in spaces can be accessed using a wide-range of [user interfaces][], including a
Web UI and a command-line client based on [Fuse][]. It enables mounting your spaces to a
local filesystem and accessing the data directly from a laptop, a cluster node, or a
virtual machine deployed in the cloud.

For more information, see the dedicated chapters for [Spaces][] and [Groups][].

## Providers

Each zone is composed of a network of providers who provision their storage resources to
users. Anyone can become a Onedata provider by installing the *Oneprovider* service,
attaching storage resources, and registering it in a particular Onezone service.

A user can use several providers simultaneously to manage his/her data. Onedata exposes
the combined storage space of all providers to the user and ensures that access to the
user's data is performant and transparent.

![image-overview-3d-map-with-users][]

Providers deploy *Oneprovider* services near physical storage resources, i.e. in computing
and data centers or even personal computers. Providers have full control over which users
can use their storage resources and in what amount.

Users use *Onezone* web interfaces (like the one at [demo.onedata.org][]) to authenticate
with Onedata and access the data located on the providers' storage resources.

## Zones

Onedata is a freely available software stack that can be used to build different
ecosystems, called *zones*. Each Onedata zone constitutes an independent data management
platform, bringing together multiple data centers (providers). At the heart of each
Onedata ecosystem lies a *Onezone* service that serves as a center of authority and an
entry point to the system, integrating with OIDC & SAML identity providers. While
typically it operates on the level of a federation (e.g. [EGI DataHub][]), in principle
the size of a zone and the administrative setup of the providers building up an
environment can be arbitrary.

![image-onezone][]

While currently each zone is an isolated, independent ecosystem, the future roadmap for
Onedata is to build a decentralized, peer-to-peer network of zones to allow (optional)
collaboration between different ecosystems.

<!-- references -->

[user interfaces]: #user-interfaces

[Spaces]: user-guide/spaces.md

[Groups]: user-guide/groups.md

[demo.onedata.org]: https://demo.onedata.org

[EGI DataHub]: https://datahub.egi.eu

[fuse]: https://github.com/libfuse/libfuse

[interfaces]: user-guide/interfaces/overview.md

[image-onezone]: ../images/intro/onezone.png

[image-spaces-model]: ../images/intro/spaces-model.svg

[image-overview-3d-map-with-users]: ../images/intro/overview-3d-map-with-users.png