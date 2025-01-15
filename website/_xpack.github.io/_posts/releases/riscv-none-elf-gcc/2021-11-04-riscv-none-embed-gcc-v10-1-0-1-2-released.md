---

title:  xPack GNU RISC-V Embedded GCC v10.1.0-1.2 released
sidebar: riscv-none-elf-gcc

summary: "Version **10.1.0-1.2** is a maintenance release; it fixes the missing multi-libs on Windows and updates to the latest build scripts."

sifive_version: v2020.08.0
sifive_date: December 19, 2020
version: 10.1.0-1.2
npm_subversion: 1

download_url: https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/tag/v10.1.0-1.2/

date: 2021-11-04 13:50:38 +0200

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

redirect_to: https://xpack-dev-tools.github.io/riscv-none-elf-gcc-xpack/blog/2021/11/04/riscv-none-embed-gcc-v10-1-0-1-2-released

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
SiFive RISC-V GCC [Releases](https://github.com/sifive/freedom-tools/releases),
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

- [[#10](https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/issues/10)]:
  due to a problem in the build scripts, the Windows archives did not include
  the proper multi-lib support, and the list of usable libraries was the
  default one, smaller than in the other platforms; fixed.

## Enhancements

- none

## Known problems

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
b69805483983cf5d3f2f54e8417b29b7eb95dc0981b26bff50cedfa75a7f1d03
xpack-riscv-none-embed-gcc-10.1.0-1.2-darwin-x64.tar.gz

addf51c9e73f0869ce6211969f21c51ad42743db86af9d9e0c201118f417d598
xpack-riscv-none-embed-gcc-10.1.0-1.2-linux-arm64.tar.gz

3f8d510a36e7a45ba60702e7fd165159967a8344d5662fe2b82e5e0cf1252f10
xpack-riscv-none-embed-gcc-10.1.0-1.2-linux-ia32.tar.gz

c60de8880cea9df207b2df820d37ceab8e02b48783e739c2c8cfe1f2a06fe310
xpack-riscv-none-embed-gcc-10.1.0-1.2-linux-x64.tar.gz

049336b548e33e374a27e1e8c1f63e621fc22b7140a2d5e2f5980dddafb397ed
xpack-riscv-none-embed-gcc-10.1.0-1.2-win32-ia32.zip

e2c88c768d0ef82265bb4a2dc59c80ae6f01788080f7999afbaa415103744e62
xpack-riscv-none-embed-gcc-10.1.0-1.2-win32-x64.zip

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
