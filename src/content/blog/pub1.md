---
title: "Onedata: A Global Data Management System for Science"
date: 2024-09-15
description: "Our latest peer-reviewed article published in Future Generation Computer Systems describes Onedata's architecture, federation model, and benchmark results across 40+ data providers."
tags: ["Publication"]
image: "/images/blog/publication-default.jpg"
journalAbbreviation: "FGCS"
impactFactor: "7.5"
year: 2024
externalDoiLink: "https://doi.org/10.1016/j.future.2024.05.001"
authors: ["Łukasz Dutka", "Michał Wrzeszcz", "Tomasz Lichoń", "Rafał Słota", "Konrad Zemek", "Jakub Liput", "Bartosz Kryza", "Renata Słota", "Jacek Kitowski"]
journalFullName: "Future Generation Computer Systems"
issueDetails: "Volume 160, Pages 388–404"
abstract: "Modern scientific workflows require access to massive datasets spread across geographically distributed storage resources. This paper presents Onedata — a global data management system that provides a uniform, virtual filesystem view over heterogeneous storage backends located at research computing centres, cloud providers and HPC clusters. We describe the architecture of its three main components (Onezone, Oneprovider and Oneclient), the federated identity model, and the data-access mechanisms including POSIX-compatible mounting and S3-compatible APIs. Benchmark results demonstrate near-native local I/O performance for sequential read workloads and latency competitive with direct object-storage access for random reads. We discuss deployment experiences within the EGI DataHub and PLGrid infrastructure, covering over 40 data providers in 15 countries."
pdfUrl: "https://www.w3.org/WAI/WCAG21/wcag21.pdf"
citationBibtex: |
  @article{dutka2024onedata,
    title     = {Onedata: A Global Data Management System for Science},
    author    = {Dutka, Łukasz and Wrzeszcz, Michał and Lichoń, Tomasz and Słota, Rafał and Zemek, Konrad and Liput, Jakub and Kryza, Bartosz and Słota, Renata and Kitowski, Jacek},
    journal   = {Future Generation Computer Systems},
    volume    = {160},
    pages     = {388--404},
    year      = {2024},
    publisher = {Elsevier},
    doi       = {10.1016/j.future.2024.05.001}
  }
citationPlain: "Dutka Ł., Wrzeszcz M., Lichoń T., Słota R., Zemek K., Liput J., Kryza B., Słota R., Kitowski J. (2024). Onedata: A Global Data Management System for Science. Future Generation Computer Systems, 160, 388–404. https://doi.org/10.1016/j.future.2024.05.001"
---

# What the Paper Is About

Modern scientific workflows require access to massive datasets spread across geographically distributed storage resources. This article presents Onedata — a global data management system that provides a uniform, virtual filesystem view over heterogeneous storage backends located at research computing centres, cloud providers and HPC clusters.

## Key contributions

- Architecture of the three main components: Onezone, Oneprovider, and Oneclient
- Federated identity model supporting OpenID Connect and SAML
- Data-access mechanisms including POSIX-compatible mounting and S3-compatible APIs
- Benchmark results demonstrating near-native local I/O for sequential reads
- Deployment experiences in EGI DataHub and PLGrid, covering 40+ providers in 15 countries

## Why it matters

This is the first comprehensive, peer-reviewed treatment of Onedata's full stack. It provides an authoritative reference for researchers evaluating federated storage solutions and for teams planning large-scale deployments.