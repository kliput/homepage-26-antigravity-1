---
title: 'Storage import'
---

## Storage import

A feature dedicated to importing files located on a storage by registering them in a
[space][] supported by the [storage backend][], without copying the data. Learn more
[here][docs-storage-import].

<!-- references -->

[access token]: /docs/25/glossary/access-token

[archives]: /docs/25/glossary/archive

[auto-cleaning]: /docs/25/glossary/auto-cleaning

[automation inventory]: /docs/25/glossary/automation-inventory

[CDMI]: /docs/25/glossary/cloud-data-management-interface

[Cluster Manager]: /docs/25/glossary/cluster-manager

[Cluster Worker]: /docs/25/glossary/cluster-worker

[cluster]: /docs/25/glossary/cluster

[Couchbase]: /docs/25/glossary/couchbase

[data discovery]: /docs/25/glossary/data-discovery

[data distribution]: /docs/25/glossary/data-distribution

[data transfer]: /docs/25/glossary/data-transfer

[dataset]: /docs/25/glossary/dataset

[direct member]: /docs/25/glossary/direct-member

[DOI]: /docs/25/glossary/digital-object-identifier

[eviction]: /docs/25/glossary/eviction

[extended attributes]: /docs/25/glossary/extended-attributes

[file metadata]: /docs/25/glossary/file-metadata

[file popularity]: /docs/25/glossary/file-popularity

[group]: /docs/25/glossary/group

[handle service]: /docs/25/glossary/handle-service

[handle]: /docs/25/glossary/handle

[harvester]: /docs/25/glossary/harvester

[identity provider]: /docs/25/glossary/identity-provider

[identity token]: /docs/25/glossary/identity-token

[imported storage]: /docs/25/glossary/imported-storage

[invite token]: /docs/25/glossary/invite-token

[lambda]: /docs/25/glossary/lambda

[lane]: /docs/25/glossary/lane

[member]: /docs/25/glossary/member

[metadata]: /docs/25/glossary/file-metadata

[migration]: /docs/25/glossary/migration

[on-the-fly transfer]: /docs/25/glossary/on-the-fly-transfer

[Oneclient]: /docs/25/glossary/oneclient

[Onepanel]: /docs/25/glossary/onepanel

[Oneprovider panel]: /docs/25/glossary/oneprovider-panel

[Oneprovider]: /docs/25/glossary/oneprovider

[Onezone]: /docs/25/glossary/onezone

[Open Access]: /docs/25/glossary/open-access

[persistent identifier]: /docs/25/glossary/persistent-identifier

[provider]: /docs/25/glossary/provider

[Public Data]: /docs/25/glossary/public-data

[replication]: /docs/25/glossary/replication

[REST API]: /docs/25/glossary/rest-api

[service]: /docs/25/glossary/service

[share]: /docs/25/glossary/share

[space]: /docs/25/glossary/space

[storage backend]: /docs/25/glossary/storage-backend

[storage import]: /docs/25/glossary/storage-import

[store]: /docs/25/glossary/store

[support]: /docs/25/glossary/support

[token]: /docs/25/glossary/token

[transfer]: /docs/25/glossary/transfer

[user]: /docs/25/glossary/user

[Web GUI]: /docs/25/glossary/web-gui

[workflow schema]: /docs/25/glossary/workflow-schema

[workflow]: /docs/25/glossary/workflow

[zone]: /docs/25/glossary/zone

[docs-acl]: user-guide/data.md#access-control-lists

[docs-architecture-services]: admin-guide/architecture.md#services

[docs-archives]: user-guide/archives.md

[docs-auto-cleaning]: admin-guide/oneprovider/configuration/auto-cleaning.md

[docs-automation]: user-guide/automation.md

[docs-cdmi]: user-guide/interfaces/cdmi.md

[docs-data-access-control]: user-guide/data.md#data-access-control

[docs-data-discovery]: user-guide/data-discovery.md

[docs-data-distribution]: user-guide/data-distribution-and-metrics.md

[docs-data-transfers]: user-guide/data-transfers.md#overview

[docs-datasets]: user-guide/datasets.md

[docs-file-metadata]: user-guide/metadata.md

[docs-file-path-and-id]: user-guide/data.md#file-path-and-id

[docs-file-popularity]: admin-guide/oneprovider/configuration/file-popularity.md

[docs-file-registration]: user-guide/file-registration.md

[docs-groups]: user-guide/groups.md

[docs-imported-storage]: admin-guide/oneprovider/configuration/storage-backends.md#imported-storage

[docs-interfaces]: user-guide/interfaces/overview.md

[docs-intro-onezone]: user-guide/quickstart.md#introduction--onezone-service

[docs-intro-provider]: intro.md#providers

[docs-intro-zone]: intro.md#zones

[docs-luma]: admin-guide/oneprovider/configuration/luma.md

[docs-metadata-xattrs]: user-guide/metadata.md#extended-attributes

[docs-oidc-saml]: admin-guide/onezone/configuration/oidc-saml.md

[docs-oneclient]: user-guide/interfaces/oneclient.md

[docs-onedata-file-rest-client]: user-guide/interfaces/onedata-file-rest-client.md

[docs-onedata-rest-fs]: user-guide/interfaces/onedata-rest-fs.md

[docs-onedatafs]: user-guide/interfaces/onedata-fs.md

[docs-oneprovider-administration-panel]: admin-guide/oneprovider/administration-panel.md

[docs-oneprovider-cluster-nodes]: admin-guide/oneprovider/configuration/cluster-nodes.md

[docs-oneprovider-emergency-panel]: admin-guide/oneprovider/administration-panel.md#access-via-emergency-interface

[docs-oneprovider-web-certificate]: admin-guide/oneprovider/configuration/web-certificate.md

[docs-onezone-administration-panel]: admin-guide/onezone/administration-panel.md

[docs-onezone-cluster-nodes]: admin-guide/onezone/configuration/cluster-nodes.md

[docs-onezone-web-certificate]: admin-guide/onezone/configuration/web-certificate.md

[docs-public-data]: user-guide/public-data.md

[docs-qos]: user-guide/rule-based-replication-qos.md

[docs-shares]: user-guide/shares.md

[docs-space-members]: user-guide/spaces.md#space-members

[docs-space-owner]: user-guide/spaces.md#space-owner

[docs-space-support]: user-guide/spaces.md#space-support

[docs-spaces]: user-guide/spaces.md

[docs-storage-backends]: admin-guide/oneprovider/configuration/storage-backends.md

[docs-storage-import]: admin-guide/oneprovider/configuration/storage-import.md

[docs-token-caveats]: user-guide/tokens.md#token-caveats

[docs-tokens]: user-guide/tokens.md

[docs-views]: user-guide/views.md

[docs-web-gui]: intro.md#web-gui

[website-couchbase]: https://www.couchbase.com/

[website-fuse]: https://github.com/libfuse/libfuse

[website-onedata-api]: https://onedata.org/#/home/api

[website-pyfilesystem2]: https://github.com/PyFilesystem/pyfilesystem2