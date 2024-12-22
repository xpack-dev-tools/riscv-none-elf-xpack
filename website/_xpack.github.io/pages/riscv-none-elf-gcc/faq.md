---

title: The xPack GNU RISC-V Embedded GCC Frequently Asked Questions
permalink: /dev-tools/riscv-none-elf-gcc/faq/

comments: true
toc: false

date: 2019-07-10 17:53:00 +0300

redirect_from:
  - /riscv-none-embed-gcc/faq/

redirect_to: https://xpack-dev-tools.github.io/riscv-none-elf-gcc-xpack/docs/faq/

---

<br/>

{% capture question_1 %}
There are two RISC-V toolchains, `riscv64-unknown-elf-gcc` and
`riscv32-unknown-elf-gcc` (or `riscv64-none-elf-gcc` and
`riscv32-none-elf-gcc`); you have only one. How can you generate
32 and 64-bit code?
{% endcapture %}

{% capture answer_1 %}
All RISC-V GCC toolchains, if built correctly, are able to generate
both 32/64-bit code, based on `-march` and `-mabi`. Thus a single
version is enough for all use cases.
{% endcapture %}

{% capture question_3 %}
Why `riscv-none-elf-gcc` and not `riscv-none-eabi-gcc`, as Arm uses?
{% endcapture %}

{% capture answer_3 %}
For the moment RISC-V does not define an EABI (Embedded ABI) and uses the
same Unix ABI for embedded applications too, thus `-eabi-` would not be
accurate.
{% endcapture %}

{% include div-panel-group.html %}
{% include faq-panel.html id="collapse-1" question=question_1 answer=answer_1 %}
{% include faq-panel.html id="collapse-3" question=question_3 answer=answer_3 %}
{% include div-end.html %}
