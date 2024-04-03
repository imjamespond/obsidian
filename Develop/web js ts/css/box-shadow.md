你几乎可以在任何元素上使用`box-shadow`来添加阴影效果。如果元素同时设置了 [`border-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius)属性，那么阴影也会有圆角效果。多个阴影在 z 轴上的顺序和多个 [text shadows](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow) 规则相同 (第一个阴影在最上面)。

[Box-shadow generator](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_backgrounds_and_borders/Box-shadow_generator) 是一个允许你生成 `box-shadow` 的交互式工具。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#%E8%AF%AD%E6%B3%95)

```
/* x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow:
  3px 3px red,
  -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
```

向元素添加单个 box-shadow 效果时使用以下规则：

- 当给出两个、三个或四个 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)值时。
    - 如果只给出两个值，那么这两个值将会被当作 `<offset-x><offset-y>` 来解释。
    - 如果给出了第三个值，那么第三个值将会被当作`<blur-radius>`解释。
    - 如果给出了第四个值，那么第四个值将会被当作`<spread-radius>`来解释。
- 可选，`inset`关键字。
- 可选，`<color>`值。

若要对同一个元素添加多个阴影效果，请使用逗号将每个阴影规则分隔开。

### [取值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#%E5%8F%96%E5%80%BC)

[`inset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#inset)

如果没有指定`inset`，默认阴影在边框外，即阴影向外扩散。 使用 `inset` 关键字会使得==阴影落在盒子内部==，这样看起来就像是内容被压低了。此时阴影会在边框之内 (即使是透明边框）、背景之上、内容之下。

[`<offset-x>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#offset-x) `<offset-y>`

这是头两个 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 值，用来设置阴影偏移量。x,y 是按照数学二维坐标系来计算的，只不过 y 垂直方向向下。 `<offset-x>` 设置水平偏移量，正值阴影则位于元素右边，负值阴影则位于元素左边。 `<offset-y>` 设置垂直偏移量，正值阴影则位于元素下方，负值阴影则位于元素上方。可用单位请查看 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 。 如果两者都是 0，那么阴影位于元素后面。这时如果设置了`<blur-radius>` 或`<spread-radius>` 则有模糊效果。需要考虑 `inset`

[`<blur-radius>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#blur-radius)

这是第三个 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 值。值越大，模糊面积越大，阴影就越大越淡。不能为负值。默认为 0，此时阴影边缘锐利。本规范不包括如何计算模糊半径的精确算法，但是，它详细说明如下：

> 对于长而直的阴影边缘，它会创建一个过渡颜色用于模糊 以阴影边缘为中心、模糊半径为半径的局域，过渡颜色的范围在完整的阴影颜色到它最外面的终点的透明之间。 （译者注：对此有兴趣的可以了解下数字图像处理的模糊算法。）

[`<spread-radius>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#spread-radius)

这是第四个 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 值。取正值时，阴影扩大；取负值时，阴影收缩。默认为 0，此时阴影与元素同样大。需要考虑 `inset`

[`<color>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#color)

相关事项查看 [`<color>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value) 。如果没有指定，则由浏览器决定——通常是[`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)的值，不过目前 Safari 取透明。

### [合成](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#%E5%90%88%E6%88%90)

将 none 看做是长度为 0 的列表。

列表中的每个阴影通过`color`组件（作为颜色），以及 x，y，blur，（合适的时候）加上 spread 组件（作为长度）进行合成。对于每个阴影，如果两个输入的阴影都是 inset 或者都不是 inset，那么要添加的阴影必须考虑已存在的阴影。如果任何一对输入阴影中，一个是 inset，另一个不是 inset，那么整个阴影列表就是不可合成的。如果阴影列表有不同的长度，那么较短的列表会在尾部补上这类阴影：颜色透明，所有长度为 0，inset 还是非 inset 同较长的列表。

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#%E4%BE%8B%E5%AD%90)

### [设置三种阴影](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#%E8%AE%BE%E7%BD%AE%E4%B8%89%E7%A7%8D%E9%98%B4%E5%BD%B1)

第一个例子中，包括了三种 shadow，内置的阴影，常规的下沉阴影，和一个 2 个像素宽度的 border 式的阴影 (可以用 [`outline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline) 来替代第三种)。
#### HTML

HTMLPlayCopy to Clipboard

```html
<blockquote>
  <q
    >You may shoot me with your words,<br />
    You may cut me with your eyes,<br />
    You may kill me with your hatefulness,<br />
    But still, like air, I'll rise.</q
  >
  <p>&mdash; Maya Angelou</p>
</blockquote>
```

#### CSS

```css
blockquote {
  padding: 20px;
  box-shadow:
    inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
}
```