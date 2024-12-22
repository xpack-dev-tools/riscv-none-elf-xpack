---

title: The xPack GNU RISC-V Embedded GCC
permalink: /dev-tools/riscv-none-elf-gcc/

summary: "A binary distribution of GNU RISC-V Embedded GCC."

keywords:
  - riscv-none-elf-gcc
  - riscv
  - gcc
  - embedded

comments: true

date: 2019-07-10 17:53:00 +0300

redirect_from:
  - /riscv-none-embed-gcc/

redirect_to: https://xpack-dev-tools.github.io/riscv-none-elf-gcc-xpack/

---

## Quicklinks

If you already know the general facts about the xPack GNU RISC-V Embedded GCC,
you can directly skip to the desired pages.

User pages:

- [install]({{ site.baseurl }}/riscv-none-elf-gcc/install/)
- [support]({{ site.baseurl }}/riscv-none-elf-gcc/support/)
- [releases]({{ site.baseurl }}/riscv-none-elf-gcc/releases/)

Developer & maintainer pages:

- [GitHub](https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/)
- [README-MAINTAINER](https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/blob/xpack/README-MAINTAINER.md)

## Overview

The **xPack GNU RISC-V Embedded GCC**
is a binary distribution of the GNU RISC-V Embedded GCC toolchain.

{% include note.html content="_embedded_ means bare-metal only, not Linux." %}

## Benefits

The main advantages of using the **xPack GNU RISC-V Embedded GCC** are:

- a convenient, uniform and portable install/uninstall/upgrade procedure,
  the same procedure is used for all major
  platforms (Intel Windows 64-bit, Intel GNU/Linux 64-bit, Arm GNU/Linux
  64/32-bit, Intel macOS 64-bit, Apple Silicon macOS 64-bit)
- a convenient integration with Continuous Integration environments,
  like GitHub Actions
- a better integration with development environments
  like **Eclipse Embedded CDT** (formerly GNU MCU/ARM Eclipse).

All binaries are self-contained, they include all required libraries,
and can be installed in any location.

## Compatibility

The **xPack GNU RISC-V Embedded GCC** is fully compatible with the
GNU toolchain.

## Install

The details of installing the **xPack GNU RISC-V Embedded GCC** on various
platforms are presented in the separate
[install]({{ site.baseurl }}/riscv-none-elf-gcc/install/) page.

## Documentation

The original documentation is available
[online](https://gcc.gnu.org/onlinedocs/).

## riscv-none-elf-gcc

After installing the toolchain, you'll end up with lots of programs
prefixed by `riscv-none-elf-`. For those used to the RISC-V original
toolchains, there is no `riscv64-` or `riscv32-` prefix since it is
actually not needed, the toolchain produces both 32/64-bit binaries,
based on `-march` and `-mabi`.

## `-march` and `-mabi`

The RISC-V design is not a single architecture, but a family of
architectures, with optional components, identified by letters.

RISC-V ISA strings begin with either RV32I, RV32E, RV64I, or RV128I
indicating the supported address space size in bits for the base integer ISA.

- RV32I: A load-store ISA with 32, 32-bit general-purpose integer registers.
- RV32E: An embedded flavour of RV32I with only 16 integer registers.
- RV64I: A 64-bit flavour of RV32I where the general-purpose integer registers
  are 64-bit wide.

In addition to these base ISAs, a handful of extensions have been
specified. The extensions that have both been specified and are supported
by the toolchain are:

- M - Integer Multiplication and Division
- A - Atomics
- F - Single-Precision Floating-Point
- D - Double-Precision Floating-Point
- C - 16-bit Compressed Instructions

- G - General, a shortcut to IMAFD

RISC-V ISA strings are defined by appending the supported extensions to the
base ISA in the order listed above. For example, the RISC-V ISA with 32,
32-bit integer registers and the instructions to for multiplication would
be denoted as "RV32IM". Users can control the set of instructions that GCC
uses when generating assembly code by passing the lower-case ISA string to
the `-march` GCC option: for example `-march=rv32im`.

For more details, please see
[The RISC-V ISA Specification, Volume I: Unprivileged Spec](https://riscv.org/specifications/).

In addition to controlling the instructions available to GCC during code
generating (which defines the set of implementations the generated code
will run on), users can select from various ABIs to target (which defines
the calling convention and layout of objects in memory). Objects and
libraries may only be linked together if they follow the same ABI.

RISC-V defines two integer ABIs and three floating-point ABIs, which
together are treated as a single ABI string. The integer ABIs follow the
standard ABI naming scheme:

- `ilp32`: "int", "long", and pointers are all 32-bit long. "long long" is
  a 64-bit type, "char" is 8-bit, and "short" is 16-bit.
- `lp64`: "long" and pointers are 64-bit long, while "int" is a 32-bit type.
  The other types remain the same as ilp32.

while the floating-point ABIs are a RISC-V specific addition:

- "" (the empty string): No floating-point arguments are passed in registers.
- `f`: 32-bit and smaller floating-point arguments are passed in registers.
  This ABI requires the F extension, as without F there are no
  floating-point registers.
- `d`: 64-bit and smaller floating-point arguments are passed in registers.
  This ABI requires the D extension.

Just like ISA strings, ABI strings are concatenated together and passed via
the `-mabi` argument to GCC. For example:

- `-march=rv32imafdc -mabi=ilp32d`: Hardware floating-point instructions can
  be generated and floating-point arguments are passed in registers. This
  is like the `-mfloat-abi=hard` option to Arm's GCC.
- `-march=rv32imac -mabi=ilp32`: No floating-point instructions can be
  generated and no floating-point arguments are passed in registers. This
  is like the `-mfloat-abi=soft` argument to Arm's GCC.
- `-march=rv32imafdc -mabi=ilp32`: Hardware floating-point instructions can
  be generated, but no floating-point arguments will be passed in
  registers. This is like the `-mfloat-abi=softfp` argument to Arm's GCC,
  and is usually used when interfacing with soft-float binaries on a
  hard-float system.
- `-march=rv32imac -mabi=ilp32d`: Illegal, as the ABI requires floating-point
  arguments are passed in registers but the ISA defines no floating-point
  registers to pass them in.

## Multiple libraries

Due to the large number of architectures and ABIs defined for RISC-V, not all
possible combinations are actually available.

Please check the release for the actual list.

## Support

For the various support options, please read the separate
[support]({{ site.baseurl }}/riscv-none-elf-gcc/support/) page.

## Change log

The release and change log is available in the repository
[`CHANGELOG.md`](https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/blob/xpack/CHANGELOG.md) file.

## Build details

For those interested in building the binaries, please read the
[README-MAINTAINER](https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/blob/xpack/README-MAINTAINER.md)
page.
However, the ultimate source for details are the build scripts themselves,
all available from the
[`riscv-none-elf-gcc-xpack.git/scripts`](https://github.com/xpack-dev-tools/riscv-none-elf-gcc-xpack/tree/xpack/scripts/)
folder.

## Releases

See the [releases]({{ site.baseurl }}/riscv-none-elf-gcc/releases/) pages.
