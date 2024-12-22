---

title: The xPack GNU RISC-V Embedded GCC releases
permalink: /dev-tools/riscv-none-elf-gcc/releases/

search: exclude
github_editme: false

comments: false
toc: false

date: 2019-07-10 17:53:00 +0300

redirect_from:
  - /riscv-none-embed-gcc/releases/

redirect_to: https://xpack-dev-tools.github.io/riscv-none-elf-gcc-xpack/docs/releases/

---

___
{% for post in site.posts %}{% if post.categories contains "releases" %}{% if post.categories contains "riscv-none-elf-gcc" %}
* [{{ post.title }}]({{ site.baseurl }}{{ post.url }}) [(download)]({{ post.download_url }}){% endif %}{% endif %}{% endfor %}
{% for post in site.posts %}{% if post.categories contains "releases" %}{% if post.categories contains "riscv-none-embed-gcc" %}
* [{{ post.title }}]({{ site.baseurl }}{{ post.url }}) [(download)]({{ post.download_url }}){% endif %}{% endif %}{% endfor %}
