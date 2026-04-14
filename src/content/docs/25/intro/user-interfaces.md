---
title: "User interfaces"
---

# User interfaces

Onedata offers multiple interfaces to manage and access user data: Web GUI, REST API, CDMI
API, fuse-based POSIX mount, Python libraries, or S3. Regardless of the interface, the
user gets the same, unified view of all his data.

## Web GUI

This [rich graphical interface][] can be used for all data management tasks and is designed
to be intuitive for non-computer-savvy users with basic needs, while offering advanced
features for skilled personnel, such as data stewards, developers, or administrators.

![screen-web-gui-example][]

<!-- TODO VFS-6805: refresh this screenshot -->

## Oneclient — native POSIX mount

The [Oneclient][] application allows mounting your Onedata Spaces in a Linux filesystem,
so that the data can be accessed as if it resided in the local filesystem. Oneclient is
based on the [Fuse][] (Filesystem in Userspace) library and proves useful in many
scenarios:

* convenient access using a personal laptop from any place with Internet connection,
* high-performance access in computing environments — the filesystem can be mounted on
  a worker node and processed interactively or using jobs,
* accessing the data via the command-line interface (terminal),
* accessing and processing the data using specialized software.

![screen-oneclient-mount][]

<!-- TODO VFS-6805: refresh this screenshot, 
maybe show only the CLI with the same data as in Web GUI -->

## Administrator Web interface

Dedicated web interface for installation and management of [Oneprovider][op-panel-gui] and
[Onezone][oz-panel-gui] services.

## API

Onedata offers a [RESTful interface][REST interface], which can be used for integration
with other services, creating middleware, and automating repetitive processes.

## Other interfaces

All available interfaces, including Python libraries, S3 endpoint, and CDMI API, are
described in a [dedicated chapter][interfaces].

<!-- ## Architecture

<!-- TODO VFS-6805: description of architecture: Onezones, Oneproviders, Onepanels, glossary -->

<!-- TODO VFS-6805: describe the concept of Oneprovider being a service deployed in a data provider institution 
                    and offering storage space for users -->

<!-- references -->

[REST interface]: https://onedata.org/#/home/api

[Fuse]: https://github.com/libfuse/libfuse

[rich graphical interface]: ../user-guide/interfaces/web-file-browser.md

[Oneclient]: ../user-guide/interfaces/oneclient.md

[op-panel-gui]: ../admin-guide/oneprovider/administration-panel.md

[oz-panel-gui]: ../admin-guide/onezone/administration-panel.md

[interfaces]: ../user-guide/interfaces

[screen-web-gui-example]: ../images/intro/web-gui-example.png

[screen-oneclient-mount]: ../images/user-guide/interfaces/oneclient/oneclient-mount.png
