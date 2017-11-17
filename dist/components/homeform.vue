<template>
    <view class="home-form">
        <view class="lable-control">
            <text>租售类型: </text>
            <view class="label-picker">
                <image src="../images/arrow.png"></image>
                <picker @change="typeChange" value="{{typeIndex}}" range="{{typeArr}}">
                    <view class="picker">{{typeArr[typeIndex]}}</view>
                </picker>
            </view>
        </view>
        <view class="lable-control">
            <text>房屋户型: </text>
            <view class="label-picker">
                <image src="../images/arrow.png"></image>
                <picker @change="homeChange" value="{{homeIndex}}" range="{{homeJson}}" range-key="name">
                    <view class="picker">{{homeJson[homeIndex]['name']}}</view>
                </picker>
            </view>
        </view>
        <view class="lable-control">
            <text>房屋价格: </text>
            <input hidden="{{typeIndex== 0 ? true:false}}" type="text" placeholder="请输价格单位(万元)" maxlength="20" placeholder-class="input-placeholder" value="{{price}}">
            <input hidden="{{typeIndex== 1 ? true:false}}" type="text" placeholder="请输价格单位(元/月)" maxlength="20" placeholder-class="input-placeholder" value="{{price}}">
        </view>
    </view>
</template>

<script>
import wepy from 'wepy';

export default class HomeForm  extends wepy.component{
    data = {
        'typeIndex' : 0, // 0 表示出租 1表示出售
        'typeArr' : ['出租','出售'],
        'price' : '',
        'homeIndex' : 1,
        'homeJson' : [
            {'id':'001','name':'一室一厅'},
            {'id':'002','name':'两室一厅'},
            {'id':'003','name':'三室一厅'},
            {'id':'004','name':'三室两厅'},
            {'id':'005','name':'四室一厅'},
            {'id':'006','name':'四室两厅'},
            {'id':'007','name':'平房'},
            {'id':'008','name':'其他'}
        ],
    }
    methods = {
        typeChange(evt){
            this.typeIndex = evt.detail.value;
        }
        homeChange(evt){
            this.homeIndex = evt.detail.value;
        }
    }
}
</script>

<style lang="scss">
</style>
