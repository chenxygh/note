---
title: C 语言结构体的初始化
date: 2019-04-15 20:28:33
categories: Study
tags: [C]
---

# C 语言结构体的初始化

* ## 字面量形式

```c
struct stu {
    int score;
    int age;
};

struct stu temp = {0, 1};
```



* ## 乱序版

```c
struct stu temp = {
    .age = 1,
    .score = 0
}
```

* ## C++

  ### 构造函数

  ```c
  // 来自算法笔记 p72
  struct stu {
  	int score;
      int age;
      stu () {}
  }
  
  struct stu {
  	int score;
      int age;
      stu () {}
      stu (int _score, int _age) {score = _score; age = _age;}
      stu (int _score) {score = _score;}
      stu (int _age) {age = _age;}
  }
  ```

  ### 乱序版（类似键值对）

  ```c
  struct stu {
  	int score;
      int age;
  }
  
  struct stu temp = {
      age: 1,
      score: 0
  }
  ```

  
