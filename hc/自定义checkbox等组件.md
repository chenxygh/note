# 自定义 checkbox 等组件，一般有两种思路
---

> ## 1. 使用 label <br>
使用 label 把 input 和自定义的盒子包起来，然后 input 的 `display`: none <br>
[checkbox1](20190107/01_customize_checkbox1.html)

> ## 2. 不使用 label <br>
不使用 label 的话，就使用 div 等盒子包起来，input 铺开，然后 `posa`（脱离文档流），`opacity`: 0  
[checkbox2](20190107/02_customize_checkbox2.html) <br>
[file](20190107/03_customize_file.html) <br>