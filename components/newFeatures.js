/**
 * Created by root on 17-2-14.
 */
import React from 'react'

const NewFeature = function() {
    return (
        <div className="thumbnail">
            <img src="/img/sloth.jpg"
                 alt="通用的占位符缩略图" />
            <div className="caption">
                <h4>开启新鲜之旅~</h4>
                <br/>
                <h5><a>1.南向适配</a></h5>
                <p>SAL（南向适配层）可以快捷的接入未来的新元，并为应用提供在线的设备访问接口。
                </p>
                <br/>
                <h5><a>2.模型驱动</a></h5>
                <p>所有的应用都由模型驱动，您不用再紧张设备的计数器或者告警码的变化，不会因为这些变更而升级版本。
                </p>
                <br/>
                <h5><a>3.可视化</a></h5>
                <p>您可以通过可视化界面来规划网络配置。
                </p>
                <br/>
                <h5><a>4.更多新的发现...</a></h5>
                <marquee direction="right"><a><div style={{color: 'red'}}>广告位！！！</div></a></marquee>
            </div>
        </div>
    )
}

export default NewFeature
