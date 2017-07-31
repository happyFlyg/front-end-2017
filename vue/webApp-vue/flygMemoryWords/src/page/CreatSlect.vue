<template>
    <div id="CreatSelect">
        <div class="padding-lg">
            <p class="text-size-lg text-size-lg-marginBm">请选择考试时间</p>
            <p class="text-size-lg-note">CET考试时间定于每年6月和12月的第三个星期六</p>
            <p class="text-size-md mar-top-50">2018年</p>
            <p class="text-size-md-note mar-btm-20">选择其他的考试时间<span @click="showDataSelectMore" class="text-green text-bold">选择更多时间</span></p>
            <ul class="flex mar-btm-10">
                <li @click="dateSelect('data-2018-6-17')" id="data-2018-6-17" class="radio-lg-wrap radio-active">
                    <div class="radio-lg font-size-lg">6月17日</div>
                </li>
                <li @click="dateSelect('data-2018-12-15')" id="data-2018-12-15" class="radio-lg-wrap radio-noactive">
                    <div class="radio-lg font-size-lg">12月15日</div>
                </li>
            </ul>
            <div class="radioLgMore" v-show="radioLgMore">
                <p class="text-size-md">2019年</p>
                <ul class="flex mar-btm-10">
                    <li @click="dateSelect('data-2019-6-18')" id="data-2019-6-18" class="radio-lg-wrap radio-active">
                        <div class="radio-lg font-size-lg">6月18日</div>
                    </li>
                    <li @click="dateSelect('data-2019-12-18')" id="data-2019-12-18" class="radio-lg-wrap radio-noactive">
                        <div class="radio-lg font-size-lg">12月18日</div>
                    </li>
                </ul>
            </div>
            <ul class="flex mar-btm-10">
                <li @click="selectPreExamDay('data-90')" id="data-90" class="radio-md-wrap radio-noactive">
                    <div class="radio-md font-size-lg">90天</div>
                </li>
                <li @click="selectPreExamDay('data-60')" id="data-60" class="radio-md-wrap radio-noactive">
                    <div class="radio-md font-size-lg">60天</div>
                </li>
                <li @click="selectPreExamDay('data-30')" id="data-30" class="radio-md-wrap  radio-active">
                    <div class="radio-md font-size-lg">30天</div>
                </li>
            </ul>
        </div>
        <btn-bottom @click.native="toCreatFinish" class="mar-top-20" value="开始吧" color="orange"></btn-bottom>
    </div>
</template>
<script type="text/javascript">
import btnBottom from '../components/btn-bottom.vue';
export default {
    name: 'CreatSelect',
    components: {
        btnBottom
    },
    data: function() {
        return {
            radioLgMore: false
        }
    },
    methods: {
        toCreatFinish: function() {
            this.$router.push({
                path: '/CreatFinish'
            })
        },
        dateSelect: function(id) {
            var obj = document.getElementsByClassName('radio-lg-wrap');
            for (var i = 0; i < obj.length; i++) {
                obj[i].setAttribute('class', 'radio-lg-wrap radio-noactive')
            }
            document.getElementById(id).setAttribute('class', 'radio-lg-wrap radio-active');
            this.$parent.examTime = id.replace(/data-/g, '');
        },
        selectPreExamDay: function(id) {
            var obj = document.getElementsByClassName('radio-md-wrap');
            for (var i = 0; i < obj.length; i++) {
                obj[i].setAttribute('class', 'radio-md-wrap radio-noactive')
            }
            document.getElementById(id).setAttribute('class', 'radio-md-wrap radio-active');
            this.$parent.preExamDay = id.replace(/data-/g, '');
        },
        showDataSelectMore: function() {
            if (this.radioLgMore == true) {
                this.radioLgMore = false;
            } else {
                this.radioLgMore = true;
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/variables.less';
#CreatSelect {
    height: 100%;
    background-image: url('../assets/images/tartan.png');
}

.radio-lg-wrap,
.radio-md-wrap {
    box-sizing: border-box;
    width: 100%;
    padding: 6px
}

.radio-lg {
    width: 100%;
    height: 118px;
    line-height: 118px;
    text-align: center
}

.radio-md {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center
}

.radio-noactive div {
    background: @gray-lighter;
    color: @black;
    border: 1px solid #ddd
}

.radio-active {
    border: 1px solid @green; 
    div {
        background: @green;
        color: @white
    }
}

ul {
    li {
        margin-right: 10px;
    }
    li:last-child {
        margin-right: 0
    }
}

</style>
