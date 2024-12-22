---

title:  xPack GNU RISC-V Embedded GCC v10.2.0-1.1 released
sidebar: riscv-none-elf-gcc

summary: "Version **10.2.0-1.1** is a new release; it follows the upstream Sifive release v2020.12.0 from April 7, 2021."

sifive_version: v2020.12.0
sifive_date: April 7, 2021
version: 10.2.0-1.1
npm_subversion: 1

download_url: https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/tag/v10.2.0-1.1/

date: 2021-11-06 12:12:10 +0200

comments: true

categories:
  - releases
  - riscv-none-embed-gcc

tags:
  - releases
  - riscv
  - riscv-none-embed-gcc
  - gcc
  - binaries
  - c++

redirect_to: https://xpack-dev-tools.github.io/riscv-none-elf-gcc-xpack/blog/2021/11/06/riscv-none-embed-gcc-v10-2-0-1-1-released

---

The [xPack GNU RISC-V Embedded GCC](https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack)
is a standalone cross-platform binary distribution of the
[SiFive RISC-V GCC](https://github.com/sifive/freedom-tools/releases).

There are separate binaries for **Windows** (Intel 32/64-bit),
**macOS** (Intel 64-bit) and **GNU/Linux** (Intel 32/64-bit, Arm 64-bit).

{% include note.html content="The main targets for the GNU/Linux Arm
binaries are the **Raspberry Pi** class devices (armv7l and aarch64;
armv6 is not supported)." %}

{% include note.html content="Due to memory limitations during the build, there is no Arm 32-bit image." %}

## Download

The binary files are available from [GitHub Releases]({{ page.download_url }}).

## Prerequisites

- x86/x64 GNU/Linux: any system with **GLIBC 2.15** or higher
  (like Ubuntu 12 or later, Debian 8 or later, RedHat/CentOS 7 later,
  Fedora 20 or later, etc)
- Arm GNU/Linux 64-bit: any system with **GLIBC 2.23** or higher
  (like Ubuntu 16 or later, Debian 9 or later, RedHat/CentOS 8 or later,
  Fedora 24 or later, etc); (there is no Arm 32-bit image!);
- x86/x64 Windows: Windows 7 with the Universal C Runtime
  ([UCRT](https://support.microsoft.com/en-us/topic/update-for-universal-c-runtime-in-windows-c0514201-7fe6-95a3-b0a5-287930f3560c)),
  Windows 8, Windows 10
- x64 macOS: 10.13 or later

## Install

The full details of installing the **xPack GNU RISC-V Embedded GCC** on various platforms
are presented in the separate [Install]({{ site.baseurl }}/riscv-none-embed-gcc/install/) page.

### Easy install

The easiest way to install GNU RISC-V Embedded GCC is with
[`xpm`]({{ site.baseurl }}/xpm/)
by using the **binary xPack**, available as
[`@xpack-dev-tools/riscv-none-embed-gcc`](https://www.npmjs.com/package/@xpack-dev-tools/riscv-none-embed-gcc)
from the [`npmjs.com`](https://www.npmjs.com) registry.

With the `xpm` tool available, installing
the latest version of the package and adding it as
a dependency for a project is quite easy:

```sh
cd my-project
xpm init # Only at first use.

xpm install @xpack-dev-tools/riscv-none-embed-gcc@latest

ls -l xpacks/.bin
```

To install this specific version, use:

```sh
xpm install @xpack-dev-tools/riscv-none-embed-gcc@{{ page.version }}.{{ page.npm_subversion }}
```

{% include warning.html content="In certain cases, on 32-bit platforms, this
command might fail with _RangeError: Array buffer allocation failed_." %}

For xPacks aware tools, like the **Eclipse Embedded C/C++ plug-ins**,
it is also possible to install GNU RISC-V Embedded GCC globally, in the user home folder.

```sh
xpm install --global @xpack-dev-tools/riscv-none-embed-gcc@latest --verbose
```

Eclipse will automatically
identify binaries installed with
`xpm` and provide a convenient method to manage paths.

### Uninstall

To remove the links from the current project:

```sh
cd my-project

xpm uninstall @xpack-dev-tools/riscv-none-embed-gcc
```

To completely remove the package from the central xPacks store:

```sh
xpm uninstall --global @xpack-dev-tools/riscv-none-embed-gcc
```

## Compliance

The xPack GNU RISC-V Embedded GCC generally follows the official
SiFive RISC-V GCC [releases](https://github.com/sifive/freedom-tools/releases)),
with as little differences as possible.

The current version is based on:

- SiFive RISC-V GCC release **{{ page.sifive_version }}** from {{ page.sifive_date }},
and includes the SiFive extensions, including the RVV vector support.

## Changes

There are no functional changes.

### Improvements

Compared to the original SiFive version, the **same architecture and API**
options are supported, and there are minimal functional changes

- `libgloss` was removed from the list of libraries always linked to the
  application, since it issues `ECALL`
  instructions that fail in bare metal environments

### newlib-nano

Support for **newlib-nano** is available using the
`--specs=nano.specs` option. For better results, this option must be
added to both compile and link time.

### nosys.specs

If no syscalls are needed, `--specs=nosys.specs` can be used at link
time to provide empty implementations for the POSIX system calls.

### Compile options

The libraries are compiled with `-O2 -mcmodel=medany`. The nano version is
compiled with `-Os -mcmodel=medany`.

{% include important.html content="It is mandatory for the applications to
be compiled with
`-mcmodel=medany`, otherwise the link will fail." %}

### Python

Support for Python scripting was added to GDB. This distribution provides
a separate binary, `riscv-none-embed-gdb-py3` with
support for **Python 3.7**.

The Python 3 run-time is included, so GDB does not need any version of
Python to be installed, and is insensitive to the presence of other
versions.

Support for Python 2 was discontinued.

### Text User Interface (TUI)

Support for TUI was added to GDB. The `ncurses` library (v6.2) was added to
the distribution.

{% include note.html content="TUI is not available on Windows." %}

## Bug fixes

- none

## Enhancements

- none

## Known problems

- the SiFive v2020.12.0 release no longer includes libraries without
  the C (compressed) instructions; the list of multi-libs was expanded with
  28 more libraries in v10.2.0-1.2
- due to the very large number of instructions added by the vector support
  (~70K), the compiler sources became too large and it was not possible to build the Arm 32-bit image
  ([#229](https://github.com/riscv/riscv-gcc/issues/229))
- the archive size got too big for the Windows 32-bit node to handle, and
  `xpm install` may fail with _RangeError: Array buffer allocation failed_;
  the 64-bit systems are not affected.

## Shared libraries

On all platforms the packages are standalone, and expect only the standard
runtime to be present on the host.

All dependencies that are build as shared libraries are copied locally
in the `libexec` folder (or in the same folder as the executable for Windows).

### `DT_RPATH` and `LD_LIBRARY_PATH`

On GNU/Linux the binaries are adjusted to use a relative path:

```console
$ readelf -d library.so | grep runpath
 0x000000000000001d (RPATH)            Library rpath: [$ORIGIN]
```

In the GNU ld.so search strategy, the `DT_RPATH` has
the highest priority, higher than `LD_LIBRARY_PATH`, so if this later one
is set in the environment, it should not interfere with the xPack binaries.

Please note that previous versions, up to mid-2020, used `DT_RUNPATH`, which
has a priority lower than `LD_LIBRARY_PATH`, and does not tolerate setting
it in the environment.

### `@executable_path`

Similarly, on macOS, the binaries are adjusted with `otool` to use a
relative path.

## Documentation

The original documentation is available in the `share/doc` folder.

## Build

The binaries for all supported platforms
(Windows, macOS and Intel & Arm GNU/Linux) were built using the
[xPack Build Box (XBB)](https://xpack.github.io/xbb/), a set
of build environments based on slightly older distributions, that should be
compatible with most recent systems.

The scripts used to build this distribution are in:

- `distro-info/scripts`

For the prerequisites and more details on the build procedure, please see the
[README-MAINTAINER](https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/blob/xpack/README-MAINTAINER.md) page.

## CI tests

Before publishing, a set of simple tests were performed on an exhaustive
set of platforms. The results are available from:

- [GitHub Actions](https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/actions/)
- [Travis CI](https://app.travis-ci.com/github/xpack-dev-tools/riscv-none-embed-gcc-xpack/builds/)

## Tests

The binaries were tested on a variety of platforms,
but mainly to check the integrity of the
build, not the compiler functionality.

## Checksums

The SHA-256 hashes for the files are:

```txt
361eddbb7e5af900a49d1de8e2be37e8bdbb82acf1ca7729a4c8a967d110a95d
xpack-riscv-none-embed-gcc-10.2.0-1.1-darwin-x64.tar.gz

26a7bca59b93eab7c9adef485660c46cbfa24099ff7ca3aec0da50b621802973
xpack-riscv-none-embed-gcc-10.2.0-1.1-linux-arm64.tar.gz

f11eebf0761b1c054ec8ba88bde5398cc6ca2ded6f540c77c5859a52928a3524
xpack-riscv-none-embed-gcc-10.2.0-1.1-linux-ia32.tar.gz

9596a0cca454384d5ec7d56250ca2e91c435941f10ff54ebdaf60e63421d85eb
xpack-riscv-none-embed-gcc-10.2.0-1.1-linux-x64.tar.gz

6b026ba05dd3c8123a03014df47f13e3b1a17005a6f825569b587c1ad0462330
xpack-riscv-none-embed-gcc-10.2.0-1.1-win32-ia32.zip

e95cf9075dd03dd15d9020d0ae05542bd8079c41f990e4d29519c1fea7b32f03
xpack-riscv-none-embed-gcc-10.2.0-1.1-win32-x64.zip

```

## Deprecation notices

### 32-bit support

Support for 32-bit Intel Linux and Intel Windows will most probably
be dropped in 2022. Support for 32-bit Arm Linux will be preserved
for a while, due to the large user base of 32-bit Raspberry Pi systems.

### Linux minimum requirements

Support for RedHat 7 will most probably be dropped in 2022, and the
minimum requirement will be raised to GLIBC 2.27, available starting
with Ubuntu 18 and RedHat 8.

## Download analytics

- GitHub [xpack-dev-tools/riscv-none-embed-gcc-xpack](https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/)
  - this release [![Github All Releases](https://img.shields.io/github/downloads/xpack-dev-tools/riscv-none-embed-gcc-xpack/v{{ page.version }}/total.svg)](https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/v{{ page.version }}/)
  - all xPack releases [![Github All Releases](https://img.shields.io/github/downloads/xpack-dev-tools/riscv-none-embed-gcc-xpack/total.svg)](https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/)
  - all GNU MCU Eclipse releases [![Github All Releases](https://img.shields.io/github/downloads/gnu-mcu-eclipse/riscv-none-gcc/total.svg)](https://github.com/gnu-mcu-eclipse/riscv-none-gcc/releases/)
  - [individual file counters](https://somsubhra.github.io/github-release-stats/?username=xpack-dev-tools&repository=riscv-none-embed-gcc-xpack) (grouped per release)
- npmjs.com [@xpack-dev-tools/riscv-none-embed-gcc](https://www.npmjs.com/package/@xpack-dev-tools/riscv-none-embed-gcc)
  - latest releases [![npm](https://img.shields.io/npm/dw/@xpack-dev-tools/riscv-none-embed-gcc.svg)](https://www.npmjs.com/package/@xpack-dev-tools/riscv-none-embed-gcc/)
  - all @xpack-dev-tools releases [![npm](https://img.shields.io/npm/dt/@xpack-dev-tools/riscv-none-embed-gcc.svg)](https://www.npmjs.com/package/@xpack-dev-tools/riscv-none-embed-gcc/)
  - all @gnu-mcu-eclipse releases [![npm](https://img.shields.io/npm/dt/@gnu-mcu-eclipse/riscv-none-gcc.svg)](https://www.npmjs.com/package/@gnu-mcu-eclipse/riscv-none-gcc/)

Credit to [Shields IO](https://shields.io) for the badges and to
[Somsubhra/github-release-stats](https://github.com/Somsubhra/github-release-stats)
for the individual file counters.
