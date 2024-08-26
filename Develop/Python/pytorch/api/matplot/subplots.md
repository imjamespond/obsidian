```python
def show_images(imgs, num_rows, num_cols, titles=None, scale=1.5):
    """Plot a list of images."""
    figsize = (num_cols * scale, num_rows * scale)
    #  取得多个xy轴图
    _, axes = plt.subplots(num_rows, num_cols, figsize=figsize)
    axes = axes.flatten() 
    for i, (ax, img) in enumerate(zip(axes, imgs)):
        if torch.is_tensor(img):
            # Tensor Image
            ax.imshow(img.numpy()) # 显示图
        else:
            # PIL Image
            ax.imshow(img)
        ax.axes.get_xaxis().set_visible(False) # 轴不可见
        ax.axes.get_yaxis().set_visible(False)
        if titles:
            ax.set_title(titles[i]) # 设置title
    return axes
```