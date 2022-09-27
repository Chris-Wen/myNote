## 前端监控

> 指的是通过一定的手段来获取用户行为以及跟踪产品在用户端的使用情况，并以监控数据为基础，为产品优化指明方向，为用户提供更加精确、完善的服务。

分为三大类
- 数据监控(监控用户行为)
    - PV/UV: PV(page view)：即页面浏览量或点击量；UV：指访问某个站点或点击某条新闻的不同 IP 地址的人数
    - 用户在每一个页面的停留时间
    - 用户通过什么入口来访问该网页
    - 用户在相应的页面中触发的行为
<br/>
- 性能监控（监控页面性能）
    - 不同用户，不同机型和不同系统下的首屏加载时间
    - 白屏时间
    - http 等请求的响应时间
    - 静态资源整体下载时间
    - 页面渲染时间
    - 页面交互动画完成时间，等... 
<br/>
- 异常监控（监控产品、系统异常）
及时的上报异常情况，可以避免线上故障的发上。虽然大部分异常可以通过 try catch 的方式捕获，但是比如内存泄漏以及其他偶现的异常难以捕获。常见的需要监控的异常包括：

    - Javascript 的异常监控
    - 样式丢失的异常监控
-----
#### 埋点上报

埋点上报方法有三种：
- 手动埋点 
    - 手动写代码，调用埋点 SDK 的函数(友盟、百度统计等第三方数据统计服务商)
    - 需要自定义属性、事件
    - 工程量大，成本高，易出现差错
    <br/>
- 可视化埋点
    - 通过可视化交互的手段，代替上述的代码埋点。将业务代码和埋点代码分离，提供一个可视化交互的页面，输入为业务代码，通过这个可视化系统，可以在业务代码中自定义的增加埋点事件等等，最后输出的代码耦合了业务代码和埋点代码。
    - 可视化埋点的缺陷就是可以埋点的控件有限，不能手动定制。
    <br/>
- 无埋点
    - 前端自动采集全部事件，上报埋点数据，由后端来过滤和计算出有用的数据。优点是前端只要一次加载埋点脚本，缺点是流量和采集的数据过于庞大，服务器性能压力山大。

**采用GIF来埋点**
向服务器端上报数据，可以通过请求接口，请求普通文件，或者请求图片资源的方式进行

优点：
- 无跨域限制
- 防止阻塞页面加载，影响用户体验 （gif比其他类型图片小,并且大多采用的是1*1像素的透明GIF来上报）


**场景案例**
[多页面/单页面应用如何获取用户停留时长](https://juejin.cn/post/7087789244600549384)

- 多页面
    - onbeforeunload、onload、onpageshow（页面显示）、onpagehide（页面隐藏）
    - 使用onpagehide - onpageshow计算时长
    - 可以使用localStorage做数据存储上报：利用空闲上报/new GIF 上报
- 单页面
    - browserHistory - history路由
        - popstate, pushState, replaceState - onload计算时长
            ```
            // 对原函数做一个拓展
            let rewriteHis = function(type){
            let origin = window.history[type] // 先将原函数存放起来
            return function(){ // 当window.history[type]函数被执行时，这个函数就会被执行
                let rs = origin.apply(this, arguments) // 执行原函数
                let e = new Event(type.toLocaleLowerCase()) // 定义一个自定义事假
                e.arguments = arguments // 把默认参数，绑定到自定义事件上，new Event返回的结果，自身上市没有arguments的
                window.dispatchEvent(e) // 触发自定义事件，把载荷传给自定义事件
                return rs
            }
            }
            ```
            拓展覆盖原来的pushState、replaceState方法
            ```
            window.history.pushState = rewriteHis('pushState') // 覆盖原来的pushState方法

            window.history.replaceState = rewriteHis('replaceState') // 覆盖原来的replaceState方法

            window.addEventListener('onload',(e)=>{
            timeStr = new Date().getTime()
            })

            window.addEventListener('popstate',()=>{
            let t = new Date().getTime() - timeStr
            timeStr = new Date().getTime()
            console.log('待了时长popstate：'+ t)
            })

            window.addEventListener('pushstate',()=>{
            let t = new Date().getTime() - timeStr
            timeStr = new Date().getTime()
            console.log('待了时长pushstate：'+ t)
            })

            window.addEventListener('replacestate',()=>{
            let t = new Date().getTime() - timeStr
            timeStr = new Date().getTime()
            console.log('待了时长replacestate：'+ t)
            })

            ```
        - hash路由
            - hashchange

### 浏览器新特性：navigator.sendBeacon

Beacon API 允许开发者发送少量错误分析和上报的信息，它的特点很明显：
        
- 在空闲的时候异步发送统计，不影响页面诸如 JS、CSS Animation 等执行
- 即使页面在 unload 状态下，也会异步发送统计，不影响页面过渡/跳转到下跳页
- 能够被客户端优化发送，尤其在 Mobile 环境下，可以将 Beacon 请求合并到其他请求上，一同处理
