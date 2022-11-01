# 数组排序

[[toc]]

### 1. 冒泡排序

**原理**

> 从左到右，相邻元素进行比较，如果前一个元素值大于后一个元素值（正序），则交换，这样一轮下来，将最大的数在最右边冒泡出来。这样一轮一轮下来，最后实现从小到大排序。

动图演示：

<div style="textAlign: center">
    <img src="https://mmbiz.qpic.cn/mmbiz_gif/bwG40XYiaOKkG2UVJzibXf4dzQ6N3DngUCVfXajmclLt1sP27fia8I0D0kS4MGzgOsPEtHvOTsjWBqEVEGgRIyD0g/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" width="400" style="margin: 0 auto">
</div>

代码实现
@[code{1-20}](@src/algorithms/bubbleSort.js)

### 2. 选择排序

**原理**

> 从未排序的序列中找到最大（或最小的）放在已排序序列的末尾（为空则放在起始位置），重复该操作，知道所有数据都已放入已排序序列中。

动图演示：

<div style="textAlign: center">
    <img src="https://mmbiz.qpic.cn/mmbiz_gif/bwG40XYiaOKkG2UVJzibXf4dzQ6N3DngUC25rq21zczpOibHXsst2Su7NricgoleeCWAEibibSSJ9XYkXuibHR45EttGw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1" width="400" style="margin: 0 auto">
</div>

代码实现
@[code{1-20}](@src/algorithms/selectionSort.js)

[九大排序策略](https://mp.weixin.qq.com/s/N_6vAyZYdD41yoe7-KYfnw)
