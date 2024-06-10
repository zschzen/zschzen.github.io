---
title: Vector Math
author: leandro
date: 2023-06-21 00:00:00 -0300
categories: [Gamedev, Math, Programming]
tags: [vector]
math: true

image:
  path: /assets/img/posts/vector-math/cross.gif
---

<script type="text/javascript">
  function resizeIframe(e) {
    var contentHeight = e.contentWindow.document.body.scrollHeight;
    var windowHeight = window.innerHeight;
    e.style.height = contentHeight + 'px';
    e.style.visibility = "visible";
    e.style.opacity = "0";
    requestAnimationFrame(function() {
      e.style.opacity = "1";
      var associatedLegend = e.parentNode.querySelector('.text-center[data-iframe-id="' + e.title + '"]');
      if (associatedLegend) {
        associatedLegend.style.visibility = "visible";
        associatedLegend.style.opacity = "1";
      }
    });
  }
</script>

<style>
  iframe {
    box-sizing: content-box;
}

  .fade-in {
    opacity: 0;
    transition: opacity .5s ease-in;
  }
</style>

## Introduction

Vectors are mathematical entities that represent both **magnitude** and **direction**. In game development, vectors are widely used to describe various properties such as position, velocity, and forces. They are fundamental tools for simulating the physical behaviors and interactions within virtual environments.

Also, they are used by shaders to perform calculations on the GPU, such as lighting, shadows, reflections, storing color information, and much more.

Vectors typically contain spatial coordinates and can be classified into different dimensions. Let's take a closer look at each dimension:
- **1D**: Holds a scalar value that represents a single property, such as speed or time.
- **2D**: Contains two properties, such as position or velocity.
- **3D**: Contains three properties, such as position or velocity.
- **4D**: Contains four properties, such as Color or Quaternion.

### Representation

To identify a vector, we use the symbol $$ \vec{V} $$, where $$ a $$ is the name of the vector. The arrow above the letter indicates that it is a vector. But there are other ways to represent a vector:

**Algebraically**, a vector is represented by a column matrix, which contains the coordinates of the vector.

$$ \vec{V} = \begin{bmatrix} V_x \\ V_y \\ V_z \end{bmatrix} $$

### Vector Space

In a gameplay context, vectors are widely used to describe the **position**, **direction**, and **velocity** of a particular object.

For example: A player is located at position (**3**, **2**) relative to the origin of the world (**0**, **0**), and is facing in the direction (**1**, **0**).

If we represent the player's position as a vector $$ \vec{P} $$, and the facing direction as a vector $$ \vec{F} $$, we can write:

$$ \vec{P} = \begin{bmatrix} 3 \\ 2 \end{bmatrix} $$ $$ \vec{F} = \begin{bmatrix} 1 \\ 0 \end{bmatrix} $$

This interactive graph shows the player's position and facing direction:

{% include iframe.html type='local' url='assets/vectorjs' content='vectors/vector-interactive' title='Vector Interactive' %}

### Magnitude

Based on the previous example, we can deduce the **distance** of the player from the origin of the world.
Note that in a Cartesian coordinate system, a vector forms a ***[Right Triangle]{:target="_blank"}***, allowing us to deduce the length of the position vector in terms of units using the ***[Pythagorean Theorem]{:target="_blank"}***:

$$
\eqalign{
|\vec{V}| &= \sqrt{x^2 + y^2} \\
   &= \sqrt{3^2 + 2^2} \\
   &= \sqrt{13} \\
   &\approx 3.61
}
$$

For **3D or 4D vectors**, the process is the same. However, an additional axis, z or w, is included:

$$
\eqalign{
|\vec{V}| &= \sqrt{x^2 + y^2 + z^2} \\
   &= \sqrt{3^2 + 2^2 + 1^2} \\
   &= \sqrt{14} \\
   &\approx 3.75
}
$$

>You will come across the `|| V ||` notations to represent the magnitude of a vector.
{: .prompt-info}

### Addition & Subtraction

Vector addition is used to combine the properties of vectors, creating a resultant vector.
In essence, we add the corresponding properties (x, y, z, w) of the vectors being accumulated.

To sum or subtract two vectors, we add or subtract the corresponding components of the vectors.

$$ \vec{V} = \begin{bmatrix} x1 \\ y1 \\ z1 \end{bmatrix} \pm \begin{bmatrix} x2 \\ y2 \\ z2 \end{bmatrix} = \begin{bmatrix} x1 \pm x2 \\ y1 \pm y2 \\ z1 \pm z2 \end{bmatrix} $$

For subtraction, we need to invert the second vector and then add it to the first vector.

{% include iframe.html type='local' url='assets/vectorjs' content='vectors/vector-basic-interactive' title='Vector Basic Interactive' %}

### Normalization

Normalization is the process of converting a vector into a unit vector, which has a magnitude of 1. To normalize a vector $$ \vec{V} $$, we divide each component of the vector by its magnitude. In that way, the resulting vector $$ \hat{V} $$ will have a magnitude of 1 but keep the same direction as the original vector $$ \vec{V} $$.

A unit vector (is denoted by a hat symbol above the vector name, as in $$ \hat{V} $$) is calculated by simply dividing each component of the vector by its magnitude:

$$ \hat{V} = \frac{\vec{V}}{|\vec{V}|} = \frac{1}{\sqrt{x^2 + y^2 + z^2}} \begin{bmatrix} x \\ y \\ z \end{bmatrix} $$

This normalization process ensures that vectors of different magnitudes can be compared and scaled uniformly, allowing us to perform operations such as addition, subtraction, and dot product in a way that the magnitude of the vectors does not affect the result. Ensuring, in this way, that the direction of the vector is the only thing that matters.

{% include iframe.html type='local' url='assets/vectorjs/' content='vectors/normalize' title='Vector Normalize Interactive' %}

### Inverse

The inverse of a vector is a vector with the same magnitude but in the opposite direction. Thus, the inverse of $$ a $$ is $$ -a $$.

To calculate the inverse of a vector, we simply invert the sign of each component of the vector:
$$
  \begin{align}
    \vec{V} &= \begin{bmatrix} x \\ y \\ z \end{bmatrix} \\
    -\vec{V} &= \begin{bmatrix} -x \\ -y \\ -z \end{bmatrix}
  \end{align}
$$

{% include iframe.html type='local' url='assets/vectorjs' content='vectors/vector-invert-interactive' title='Vector Invert Interactive' %}

## Dot Product

The dot product (also known as the scalar product or inner product) is an operation between two vectors that results in a scalar value. It is denoted by the symbol "·" or by using the notation $$ \vec{A} \cdot \vec{B} $$.

The dot product between two vectors $$ \vec{A} = \begin{bmatrix} A_x \\ A_y \\ A_z \end{bmatrix} $$ and $$ \vec{B} = \begin{bmatrix} B_x \\ B_y \\ B_z \end{bmatrix} $$ is calculated as:

$$ \vec{A} \cdot \vec{B} = A_x \cdot B_x + A_y \cdot B_y + A_z \cdot B_z $$

We can calculate the dot product **multiplying the magnitudes of the vectors and the cosine of the angle between**:

$$ \vec{A} \cdot \vec{B} = ||\vec{A}|| \cdot ||\vec{B}|| \cdot \cos \theta $$

And for the angle between the vectors:

$$
  \begin{align}
  \cos \theta = \frac{\vec{A} \cdot \vec{B}}{||\vec{A}|| \cdot ||\vec{B}||} \\
  \theta = \arccos \frac{\vec{A} \cdot \vec{B}}{||\vec{A}|| \cdot ||\vec{B}||}
  \end{align}
$$

{% include iframe.html type='local' url='assets/vectorjs' content='vectors/dot-product' title='Vector Dot Interactive' %}

Geometrically, the dot product measures the extent to which two vectors are aligned with each other. It is positive when the vectors are pointing in the same general direction, negative when they are pointing in opposite directions, and zero when they are orthogonal (perpendicular) to each other.

> Be aware that the magnitude of vectors is important when calculating the dot product, as it influences the result.
{: .prompt-warning}

### Dot Product in Games

You already know that the dot product tells us how much two vectors are aligned with each other. But how can we use this in games?

One of the most common uses of the dot product in games is to determine whether two objects are facing each other. For example, in a first-person shooter, we can use the dot product to determine whether the player is facing an enemy. If the player is facing the enemy, we can show a "targeting" icon on the screen, indicating that the player can shoot the enemy.

```csharp
// Get the normalized direction from the player to the enemy
Vector3 direction = (enemy.position - player.position).normalized;

// Get the direction the player is facing
Vector3 forward = player.forward;

// Calculate the dot product between the direction the player is facing and the direction to the enemy
float dot = Vector3.Dot(forward, direction);

// If the dot product is greater than 0.5, the player is facing the enemy
if (dot > .5F)
{
    ShowTargetingIcon();
}
```

Another common use involves shaders. In a shader, we can use the dot product to determine how much light is hitting a surface. If the surface is facing the light, we can make it brighter. If the surface is facing away from the light, we can make it darker. This is called the Lambertian lighting model. We will learn more about this in a future lesson, but heres a sneak peek:

```hlsl
// Calculate the dot product between the surface normal and the light direction
float dot = dot(normal, lightDirection);

// Clamp the result between 0 and 1
float3 color = saturate(dot * lightIntensity);
```

## Cross Product

As you may notice by the header image of this lesson, the cross product is a bit more different than the dot product. While the dot product results in a scalar value, the cross product of a 3D vector results in another 3D vector, which is orthogonal (perpendicular) to both input vectors.

![Cross Product](/assets/img/posts/vector-math/cross.gif)

This means that the cross product can be used to calculate the normal vector of a plane. For example, if we have a plane defined by three points $$ A $$, $$ B $$, and $$ C $$, we can calculate the normal vector of the plane using the cross product between the vectors $$ \vec{AB} $$ and $$ \vec{AC} $$.

The cross product (also known as the vector product or outer product) is an operation between two vectors that results in a perpendicular vector to both input vectors. It is denoted by the symbol "×" or by using the notation $$ \vec{A} \times \vec{B} $$.

The cross product between two vectors $$ \vec{A} = \begin{bmatrix} A_x \\ A_y \\ A_z \end{bmatrix} $$ and $$ \vec{B} = \begin{bmatrix} B_x \\ B_y \\ B_z \end{bmatrix} $$ is calculated as:

$$ \vec{A} \times \vec{B} = \begin{bmatrix} A_y \cdot B_z - A_z \cdot B_y \\ A_z \cdot B_x - A_x \cdot B_z \\ A_x \cdot B_y - A_y \cdot B_x \end{bmatrix} $$

The resulting vector is perpendicular to both input vectors and its direction follows the right-hand rule. The magnitude of the resulting vector is equal to the area of the parallelogram formed by the two input vectors.

The 2D cross product results in a scalar value, which is the magnitude of the resulting vector.


The dot product and cross product are fundamental operations in vector mathematics, and they find applications in various areas such as geometry, physics, and computer graphics.

### Cross Product in Games

#### Normals

With the cross product, we can get the normal vector of a given plane, allowing the developer to calculate the angle between the plane and the light source. This is useful to calculate the lighting of a surface, as we will see in a future lesson.

```hlsl
// Calculate the normal vector of the plane
float3 normal = cross(AB, AC);

// Calculate the dot product between the normal vector and the light direction
float dot = dot(normal, lightDirection);

// Clamp the result between 0 and 1
float3 color = saturate(dot * lightIntensity);
```

#### Torque

You could also calculate the torque of a force applied to an object. The torque is the rotational equivalent of force, and it is calculated as:

$$ \vec{\tau} = \vec{r} \times \vec{F} $$

Where $$ \vec{r} $$ is the position vector from the point of rotation to the point of application of the force, and $$ \vec{F} $$ is the force vector.

```csharp
// Calculate the torque of a force applied to an object
Vector3 torque = Vector3.Cross(position, force);
```

#### 2D Cross Product

Due to the nature of the cross product - which results in a vector - it is impossible to calculate the cross product of two 2D vectors, since the result would be a vector placed with right angles to the plane defined by the two input vectors. However, we can calculate the 2D cross product, which results in a scalar value, which is the magnitude of the resulting vector.

The 2D cross product between two vectors $$ \vec{A} = \begin{bmatrix} A_x \\ A_y \end{bmatrix} $$ and $$ \vec{B} = \begin{bmatrix} B_x \\ B_y \end{bmatrix} $$ is calculated as:

---

[//]: (Externals)

[^footnote]: NERCURY. <b>Practical use of Vector Math in Games</b>. 2013. Available at: <a href="https://www.gamedev.net/tutorials/programming/math-and-physics/practical-use-of-vector-math-in-games-r2968">https://www.gamedev.net/tutorials/programming/math-and-physics/practical-use-of-vector-math-in-games-r2968/</a>. Accessed on: Jan 4, 2021.
[Right Triangle]: https://en.wikipedia.org/wiki/Right_triangle
[Pythagorean Theorem]: https://en.wikipedia.org/wiki/Pythagorean_theorem
