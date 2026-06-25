---
title: 数学公式与流程图测试
date: 2024-01-15T10:00:00+08:00
tags:
  - test
  - math
  - mermaid
math: true
mermaid: true
---

这篇文章测试数学公式和流程图的渲染功能。

<!--more-->

## 数学公式 (KaTeX)

### 行内公式

质能方程 $E = mc^2$ 是物理学中最著名的公式之一。

欧拉公式 $e^{i\pi} + 1 = 0$ 将五个最重要的数学常数联系在一起。

### 块级公式

高斯积分：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

麦克斯韦方程组（微分形式）：

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
$$

$$
\nabla \cdot \mathbf{B} = 0
$$

$$
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}
$$

$$
\nabla \times \mathbf{B} = \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
$$

矩阵表示：

$$
\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

## 流程图 (Mermaid)

### 基本流程图

```mermaid
graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作1]
    B -->|否| D[执行操作2]
    C --> E[结束]
    D --> E
```

### 序列图

```mermaid
sequenceDiagram
    participant 用户
    participant 前端
    participant 后端
    participant 数据库
    
    用户->>前端: 点击登录
    前端->>后端: 发送请求
    后端->>数据库: 查询用户
    数据库-->>后端: 返回结果
    后端-->>前端: 返回Token
    前端-->>用户: 登录成功
```

### 类图

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

### 甘特图

```mermaid
gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    section 设计阶段
    需求分析     :a1, 2024-01-01, 7d
    UI设计       :a2, after a1, 5d
    section 开发阶段
    前端开发     :b1, after a2, 14d
    后端开发     :b2, after a2, 14d
    section 测试阶段
    集成测试     :c1, after b1, 7d
```

## 代码示例

```python
def fibonacci(n: int) -> int:
    """计算斐波那契数列第n项"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```
