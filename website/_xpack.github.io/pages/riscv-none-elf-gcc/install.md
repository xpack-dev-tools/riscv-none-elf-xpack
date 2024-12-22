---

title: How to install the xPack GNU RISC-V Embedded GCC binaries
permalink: /dev-tools/riscv-none-elf-gcc/install/

summary: "The recommended method is via xpm."

version: "12.1.0"
xpack-subversion: "2"

comments: true
toc: false

date: 2019-07-10 17:53:00 +0300

redirect_from:
  - /riscv-none-embed-gcc/install/

redirect_to: https://xpack-dev-tools.github.io/riscv-none-elf-gcc-xpack/docs/install/

---

## Overview

The **xPack GNU RISC-V Embedded GCC** can be installed automatically, via `xpm` (the
recommended method), or manually, by downloading and unpacking one of the
portable archives.

{% capture easy_install %}

## Easy install

The easiest way to install GNU RISC-V Embedded GCC is by using the
**binary xPack**, available as
[`@xpack-dev-tools/riscv-none-elf-gcc`](https://www.npmjs.com/package/@xpack-dev-tools/riscv-none-elf-gcc)
from the [`npmjs.com`](https://www.npmjs.com) registry.

### Prerequisites

The only requirement is a recent
`xpm`, which is a portable
[Node.js](https://nodejs.org) command line application. To install it,
follow the instructions from the
[xpm install]({{ site.baseurl }}/xpm/install/) page.

### Install

With xpm available, installing
the latest version of the package is quite easy:

```sh
cd my-project
xpm init # Only at first use.

xpm install @xpack-dev-tools/riscv-none-elf-gcc@latest --verbose
```

This command will always install the latest available version,
in the global xPacks store, which is a platform dependent folder
(check the output of the `xpm` command for the actual folder used on
your platform).

{% capture include_1 %}
The install location can be configured using the
`XPACKS_STORE_FOLDER` environment variable; for more details please check the
[xpm folders]({{ site.baseurl }}/xpm/folders/) page.
{% endcapture %}

{% include tip.html content=include_1 %}

{% include tip.html content="The archive content is unpacked into a folder
named `.content`. On some platforms
this might be hidden for normal browsing, and require
separate options (like `ls -A`) or, in file browsers, to enable
settings like **Show Hidden Files**." %}

xPacks aware tools, like the **Eclipse Embedded CDT plug-ins** automatically
identify binaries installed with
xpm and provide a convenient method to manage paths.

{% include important.html content="Automatic
path discovery for the packages from the new `@xpack-dev-tools` scope was
added to **GNU MCU Eclipse plug-ins** with v4.6.1 in 2019-09-23; update
older versions or configure the path manually." %}

### Uninstall

To remove the links from the current project:

```sh
cd my-project

xpm uninstall @xpack-dev-tools/riscv-none-elf-gcc
```

To completely remove the package from the central xPacks store:

```sh
xpm uninstall --global @xpack-dev-tools/riscv-none-elf-gcc --verbose
```

{% endcapture %}

{% capture manual_install %}

## Manual install

For all platforms, the **xPack GNU RISC-V Embedded GCC** binaries are
released as portable
archives that can be installed in any location.

The archives can be downloaded from the
GitHub [releases](https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/releases/) page.

{% endcapture %}

{% capture windows %}

{{ easy_install }}

### Test

To check if the xpm installed GCC starts, use something like:

```doscon
C:\>%USERPROFILE%\AppData\Roaming\xPacks\@xpack-dev-tools\riscv-none-elf-gcc\{{ page.version }}-{{ page.xpack-subversion }}.1\.content\bin\riscv-none-elf-gcc.exe" --version
riscv-none-elf-gcc.exe (xPack GNU RISC-V Embedded GCC x86_64) {{ page.version }}
```

{{ manual_install }}

### Download

The Windows versions of **xPack GNU RISC-V Embedded GCC**
are packed as ZIP files.
Download the latest version named like:

- `xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}-win32-x64.zip`

{% include note.html content="In case you wonder where the suffix comes
from, it is exactly the Node.js `process.platform` and `process.arch`.
The `win32` part is confusing, but we have to live with it." %}

### Unpack

To manually install the xPack GNU RISC-V Embedded GCC,
unpack the archive and copy it into the
`%USERPROFILE%\AppData\Roaming\xPacks\riscv-none-elf-gcc`
(for example `C:\Users\ilg\AppData\Roaming\xPacks\riscv-none-elf-gcc`) folder;
according to Microsoft, `AppData\Roaming` is the recommended location for
installing user specific packages.

{% include note.html content="For manual installs, the recommended
install location is slightly different from the xpm install folders,
which use the scope (like `@xpack-dev-tools`) to group different tools,
and `.content` to store the unpacked archive." %}

{% include important.html content="Although perfectly possible to
install GNU RISC-V Embedded GCC in any folder, it is highly recommended
to use this path, since by default the Eclipse Embedded CDT debug plug-ins search
for the executable in this location." %}

### Test

To check if the manually installed GCC starts, use something like:

```dos
C:\>%USERPROFILE%\AppData\Roaming\xPacks\riscv-none-elf-gcc\xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}\bin\riscv-none-elf-gcc.exe" --version
riscv-none-elf-gcc.exe (xPack GNU RISC-V Embedded GCC x86_64) {{ page.version }}
```

{% include tip.html content="Since Windows does not provide the GNU make
binaries, it is recommended to also install the **Windows Build Tools**." %}

{% endcapture %}

{% capture macos %}

{{ easy_install }}

### Test

To check if the xpm installed GCC starts, use something like:

```console
$ ~/.local/xPacks/@xpack-dev-tools/riscv-none-elf-gcc/{{ page.version }}-{{ page.xpack-subversion }}.1/.content/bin/riscv-none-elf-gcc --version
riscv-none-elf-gcc (xPack GNU RISC-V Embedded GCC x86_64) {{ page.version }}
```

{{ manual_install }}

### Download

The macOS versions of **xPack GNU RISC-V Embedded GCC**
are packed as `.tar.gz` archives.
Download the latest version named like:

- `xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}-darwin-x64.tar.gz`
- `xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}-darwin-arm64.tar.gz`

### Unpack

To manually install the xPack GNU RISC-V Embedded GCC,
unpack the archive and copy it to
`~/.local/xPacks/riscv-none-elf-gcc/<version>`:

```sh
mkdir -p ~/.local/xPacks/riscv-none-elf-gcc
cd ~/.local/xPacks/riscv-none-elf-gcc

tar xvf ~/Downloads/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}-darwin-x64.tar.gz
chmod -R -w xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}
```

{% include note.html content="For manual installs, the recommended
install location is different from the xpm install folders." %}

{% include important.html content="Although perfectly possible to
install GNU RISC-V Embedded GCC in any folder, it is highly recommended
to use this path, since by default the Eclipse Embedded CDT debug plug-ins search
for the executable in this location." %}

The result is a structure like:

```console
$ tree -L 2 /Users/ilg/.local/xPacks/riscv-none-elf-gcc/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}
/Users/ilg/.local/xPacks/riscv-none-elf-gcc/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}/
├── README.md
├── bin
│   ├── riscv-none-elf-addr2line
│   ├── riscv-none-elf-ar
│   ├── riscv-none-elf-as
│   ├── riscv-none-elf-c++
│   ├── riscv-none-elf-c++filt
│   ├── riscv-none-elf-cpp
│   ├── riscv-none-elf-elfedit
│   ├── riscv-none-elf-g++
│   ├── riscv-none-elf-gcc
│   ├── riscv-none-elf-gcc-12.1.0
│   ├── riscv-none-elf-gcc-ar
│   ├── riscv-none-elf-gcc-nm
│   ├── riscv-none-elf-gcc-ranlib
│   ├── riscv-none-elf-gcov
│   ├── riscv-none-elf-gcov-dump
│   ├── riscv-none-elf-gcov-tool
│   ├── riscv-none-elf-gdb
│   ├── riscv-none-elf-gdb-add-index
│   ├── riscv-none-elf-gdb-add-index-py3
│   ├── riscv-none-elf-gdb-py3
│   ├── riscv-none-elf-gfortran
│   ├── riscv-none-elf-gprof
│   ├── riscv-none-elf-ld
│   ├── riscv-none-elf-ld.bfd
│   ├── riscv-none-elf-lto-dump
│   ├── riscv-none-elf-nm
│   ├── riscv-none-elf-objcopy
│   ├── riscv-none-elf-objdump
│   ├── riscv-none-elf-ranlib
│   ├── riscv-none-elf-readelf
│   ├── riscv-none-elf-size
│   ├── riscv-none-elf-strings
│   └── riscv-none-elf-strip
├── distro-info
│   ├── CHANGELOG.md
│   ├── licenses
│   ├── patches
│   └── scripts
├── include
│   └── gdb
├── lib
│   ├── bfd-plugins
│   ├── gcc
│   ├── libcc1.0.so
│   ├── libcc1.so -> libcc1.0.so
│   └── python3.10
├── libexec
│   ├── gcc
│   ├── libcrypt.2.dylib
│   ├── libcrypto.1.1.dylib
│   ├── libffi.8.dylib
│   ├── libgcc_s.1.dylib
│   ├── libgmp.10.dylib
│   ├── libiconv.2.dylib
│   ├── libisl.23.dylib
│   ├── liblzma.5.dylib
│   ├── libmpc.3.dylib
│   ├── libmpfr.6.dylib
│   ├── libncurses.6.dylib
│   ├── libpanel.6.dylib
│   ├── libpython3.10.dylib
│   ├── libreadline.8.1.dylib
│   ├── libreadline.8.dylib -> libreadline.8.1.dylib
│   ├── libsqlite3.0.dylib
│   ├── libssl.1.1.dylib
│   ├── libstdc++.6.dylib
│   ├── libz.1.2.12.dylib
│   └── libz.1.dylib -> libz.1.2.12.dylib
├── riscv-none-elf
│   ├── bin
│   ├── include
│   ├── lib
│   └── share
└── share
    ├── doc
    └── gcc-12.1.0

21 directories, 57 files
```

### Test

To check if the manually installed GCC starts, use something like:

```console
$ ~/.local/xPacks/riscv-none-elf-gcc/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}/bin/riscv-none-elf-gcc --version
riscv-none-elf-gcc (xPack GNU RISC-V Embedded GCC x86_64) {{ page.version }}
```

{% endcapture %}

{% capture linux %}

{{ easy_install }}

### Test

To check if the xpm installed GCC starts, use something like:

```console
$ ~/.local/xPacks/@xpack-dev-tools/riscv-none-elf-gcc/{{ page.version }}-{{ page.xpack-subversion }}.1/.content/bin/riscv-none-elf-gcc --version
riscv-none-elf-gcc (xPack GNU RISC-V Embedded GCC x86_64) {{ page.version }}
```

{{ manual_install }}

### Download

The GNU/Linux versions of **xPack GNU RISC-V Embedded GCC**
are packed as `.tar.gz` archives.
Download the latest version named like:

- `xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}-linux-x64.tar.gz`
- `xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}-linux-arm.tar.gz`
- `xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}-linux-arm64.tar.gz`

As the name implies, these are GNU/Linux `tar.gz` archives; they were build on
Ubuntu, but can be executed on most recent GNU/Linux distributions.

### Unpack

To manually install the xPack GNU RISC-V Embedded GCC,
unpack the archive and move it to
`~/.local/xPacks/riscv-none-elf-gcc/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}`:

```sh
mkdir -p ~/.local/xPacks/riscv-none-elf-gcc
cd ~/.local/xPacks/riscv-none-elf-gcc

tar xvf ~/Downloads/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}-linux-x64.tar.gz
chmod -R -w xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}
```

{% include note.html content="For manual installs, the recommended
install location is slightly different from the xpm install folders,
which use the scope (like `@xpack-dev-tools`) to group different tools,
and `.content` to store the unpacked archive." %}

{% include important.html content="Although perfectly possible to
install GNU RISC-V Embedded GCC in any folder, it is highly recommended
to use this path, since by default the Eclipse Embedded CDT debug plug-ins search
for the executable in this location." %}

The result is a structure like:

```console
$ tree -L 2 /home/ilg/.local/xPacks/riscv-none-elf-gcc/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}/
/home/ilg/.local/xPacks/riscv-none-elf-gcc/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}/
├── bin
│   ├── libgpm.so.2 -> libgpm.so.2.1.0
│   ├── libgpm.so.2.1.0
│   ├── riscv-none-elf-addr2line
│   ├── riscv-none-elf-ar
│   ├── riscv-none-elf-as
│   ├── riscv-none-elf-c++
│   ├── riscv-none-elf-c++filt
│   ├── riscv-none-elf-cpp
│   ├── riscv-none-elf-elfedit
│   ├── riscv-none-elf-g++
│   ├── riscv-none-elf-gcc
│   ├── riscv-none-elf-gcc-12.1.0
│   ├── riscv-none-elf-gcc-ar
│   ├── riscv-none-elf-gcc-nm
│   ├── riscv-none-elf-gcc-ranlib
│   ├── riscv-none-elf-gcov
│   ├── riscv-none-elf-gcov-dump
│   ├── riscv-none-elf-gcov-tool
│   ├── riscv-none-elf-gdb
│   ├── riscv-none-elf-gdb-add-index
│   ├── riscv-none-elf-gdb-add-index-py3
│   ├── riscv-none-elf-gdb-py3
│   ├── riscv-none-elf-gfortran
│   ├── riscv-none-elf-gprof
│   ├── riscv-none-elf-ld
│   ├── riscv-none-elf-ld.bfd
│   ├── riscv-none-elf-lto-dump
│   ├── riscv-none-elf-nm
│   ├── riscv-none-elf-objcopy
│   ├── riscv-none-elf-objdump
│   ├── riscv-none-elf-ranlib
│   ├── riscv-none-elf-readelf
│   ├── riscv-none-elf-size
│   ├── riscv-none-elf-strings
│   └── riscv-none-elf-strip
├── distro-info
│   ├── CHANGELOG.md
│   ├── licenses
│   ├── patches
│   └── scripts
├── include
│   └── gdb
├── lib
│   ├── bfd-plugins
│   ├── gcc
│   └── python3.10
├── lib64
│   ├── libcc1.so -> libcc1.so.0.0.0
│   ├── libcc1.so.0 -> libcc1.so.0.0.0
│   └── libcc1.so.0.0.0
├── libexec
│   ├── gcc
│   ├── libcrypto.so.1.1
│   ├── libcrypt.so.1 -> libcrypt.so.1.1.0
│   ├── libcrypt.so.1.1.0
│   ├── libffi.so.8 -> libffi.so.8.1.0
│   ├── libffi.so.8.1.0
│   ├── libfl.so.2 -> libfl.so.2.0.0
│   ├── libfl.so.2.0.0
│   ├── libgcc_s.so.1
│   ├── libgmp.so.10 -> libgmp.so.10.4.1
│   ├── libgmp.so.10.4.1
│   ├── libiconv.so.2 -> libiconv.so.2.6.1
│   ├── libiconv.so.2.6.1
│   ├── libisl.so.23 -> libisl.so.23.1.0
│   ├── libisl.so.23.1.0
│   ├── liblzma.so.5 -> liblzma.so.5.2.5
│   ├── liblzma.so.5.2.5
│   ├── libmpc.so.3 -> libmpc.so.3.2.1
│   ├── libmpc.so.3.2.1
│   ├── libmpfr.so.6 -> libmpfr.so.6.1.0
│   ├── libmpfr.so.6.1.0
│   ├── libncurses.so.6 -> libncurses.so.6.3
│   ├── libncurses.so.6.3
│   ├── libpanel.so.6 -> libpanel.so.6.3
│   ├── libpanel.so.6.3
│   ├── libpython3.10.so.1.0
│   ├── libreadline.so.8 -> libreadline.so.8.1
│   ├── libreadline.so.8.1
│   ├── libsqlite3.so.0 -> libsqlite3.so.0.8.6
│   ├── libsqlite3.so.0.8.6
│   ├── libssl.so.1.1
│   ├── libstdc++.so.6 -> libstdc++.so.6.0.29
│   ├── libstdc++.so.6.0.29
│   ├── libz.so.1 -> libz.so.1.2.12
│   └── libz.so.1.2.12
├── README.md
├── riscv-none-elf
│   ├── bin
│   ├── include
│   ├── lib
│   └── share
└── share
    ├── doc
    └── gcc-12.1.0

22 directories, 74 files
```

### Test

To check if the manually installed GCC starts, use something like:

```console
$ ~/.local/xPacks/riscv-none-elf-gcc/xpack-riscv-none-elf-gcc-{{ page.version }}-{{ page.xpack-subversion }}/bin/riscv-none-elf-gcc --version
riscv-none-elf-gcc (xPack GNU RISC-V Embedded GCC x86_64) {{ page.version }}
```

{% endcapture %}

{% include platform-tabs.html %}

{% include warning.html content="**DO NOT** add the toolchain path to
the user or system path!" %}
