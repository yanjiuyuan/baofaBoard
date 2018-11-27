var host = 'http://localhost:8086/'
var hostName = 'localhost:8086'




//监控界面配置参数-旧-华宝
var SPRAY = {
    '雾化压': 'AtomizationPressure',
    '物料压': 'MaterialPressure',
    '胶重': 'GlueWeight',
    '流量计': 'FlowMeter',
    //'烤箱实时温度': 'OvenTemperatureNow',
    '机器人状态号': 'StateN',
    '机器人报警号': 'ErrorN'
}
var ROSTER = {
    '烤箱温度':'OvenTemperatureNow'
}
var TENP = {
    '状态': 'TENP',
    '左十字压': 'LOilPressure',
    '右十字压': 'ROilPressure',
    '左右脚': 'LRFoot',
    '鞋长': 'ShoeL'
}
var SOLEP = {
    '总油压': 'BOilPressure'
}
var VIEWONE = {
    '状态':'V1',
    '状态号': 'VisualOneState',
    '报警号': 'VisualOneError'
}
var VIEWTWO = {
    '状态': 'V2',
    '状态号': 'VisualTwoState',
    '报警号': 'VisualTwoError'
}
var EMPY = {}
//监控界面配置参数-新-华昂
var TENP_L = {
    '左十字压': 'LOilPressure'
}
var TENP_R = {
    '右十字压': 'ROilPressure'
}

var DETAILRANGE = {

    OvenTemperatureNow: {
        min: 0,
        max: 150
    }//烤箱温度
}
var DEVICES = [
    [
        {
            num: 1,
            name: '鞋楦信息',
            stationstate: 0,
            detail: _cloneObj(EMPY),
            tooltip: {
                disabled: true,
                placement: 'top'
            },
            tips: {},
            position: {
                top: '44.3%',
                left: '84.6%'
            }
        },
        {
            num: 2,
            name: '视觉1号',
            stationstate: 0,
            detail: _cloneObj(EMPY),
            tooltip: {
                disabled: true,
                placement: 'right'
            },
            //tips: {
            //    '1234': '4321',
            //    '666':'888'
            //},
            tips: {

            },
            position: {
                top: '53.0%',
                left: '84.6%'
            }
        },
        {
            num: 3,
            name: '一次喷胶',
            stationstate: 0,
            detail: _cloneObj(SPRAY),
            tooltip: {
                disabled: true,
                placement: 'top'
            },
            tips: {},
            position: {
                top: '61.2%',
                left: '84.6%'
            }
        },
        {
            num: 4,
            name: '压底',
            stationstate: 0,
            detail: _cloneObj(SOLEP),
            tooltip: {
                disabled: true,
                placement: 'right'
            },
            tips: {},
            position: {
                top: '67.2%',
                left: '70%'
            }
        },
        {
            num: 5,
            name: '视觉2号',
            stationstate: 0,
            detail: _cloneObj(EMPY),
            tooltip: {
                disabled: true,
                placement: 'right'
            },
            tips: {},
            position: {
                top: '76.2%',
                left: '70%'
            }
        },
        {
            num: 6,
            name: '喷处理剂',
            stationstate: 0,
            detail: _cloneObj(SPRAY),
            tooltip: {
                disabled: true,
                placement: 'right'
            },
            tips: {},
            position: {
                top: '80.2%',
                left: '1%'
            }
        },
        {
            num: 7,
            name: '二次喷胶',
            stationstate: 0,
            detail: _cloneObj(SPRAY),
            tooltip: {
                disabled: true,
                placement: 'left'
            },
            tips: {},
            position: {
                top: '49%',
                left: '1%'
            }
        },
        {
            num: 8,
            name: '三次喷胶',
            stationstate: 0,
            detail: _cloneObj(SPRAY),
            tooltip: {
                disabled: true,
                placement: 'left'
            },
            tips: {},
            position: {
                top: '40.2%',
                left: '1%'
            }
        },
        {
            num: 9,
            name: '贴围条1',
            stationstate: 0,
            detail: _cloneObj(EMPY),
            tooltip: {
                disabled: true,
                placement: 'left'
            },
            tips: {},
            position: {
                top: '34.97%',
                left: '16.56%'
            }
        },
        {
            num: 10,
            name: '贴围条2',
            stationstate: 0,
            detail: _cloneObj(EMPY),
            tooltip: {
                disabled: true,
                placement: 'left'
            },
            tips: {},
            position: {
                top: '25.97%',
                left: '16.56%'
            }
        },
        {
            num: 11,
            name: '护齿喷胶',
            stationstate: 0,
            detail: _cloneObj(SPRAY),
            tooltip: {
                disabled: true,
                placement: 'left'
            },
            tips: {},
            position: {
                top: '21.5%',
                left: '31.56%'
            }
        },
        {
            num: 12,
            name: '左十字压',
            stationstate: 0,
            detail: _cloneObj(TENP_L),
            tooltip: {
                disabled: true,
                placement: 'left'
            },
            tips: {},
            position: {
                top: '1.2%',
                left: '84.6%'
            }
        },
        {
            num: 13,
            name: '右十字压',
            stationstate: 0,
            detail: _cloneObj(TENP_R),
            tooltip: {
                disabled: true,
                placement: 'left'
            },
            tips: {},
            position: {
                top: '9.3%',
                left: '84.6%'
            }
        }
    ]
]

//批次质量配置参数
var QUALITY_RADAR = {
    'AppearanceQualified': '硫化外观合格率',
    'AppearanceAfterQualified': '硫化后外观合格率',
    'VampPullQualified': '鞋面拉力合格点占比',
    'DaDiPullQualified': '大底拉力合格点占比',
    'ZheWangQualified': '折弯疲劳合格率'
}
var QUALITY_PIE = {
    'Goods': 'A等',
    'Bads': 'B等',
    'Inferior': 'C等'
}

//vue组件-设备按钮显示
    Vue.component('sam-devicebtn', {
        props: ['param', 'index'],
        template: '<el-tooltip :placement="param.tooltip.placement" :disabled="param.tooltip.disabled" effect="light" class="tips">'+
                        '<div slot="content" :style="{fontSize:param.tooltip.font_size}">' +
                            '<template v-for="t in param.tips">' +
                                '{{t}} : {{param.tips[t]}}' +
                                '<br />' +
                            '</template>' +
                        '</div>' +
                         '<div v-on:mouseover="showMore=true" v-on:mouseout="showMore=false" v-on:click="showDetail(param.num)"' +
                        'class="device-button" :class="theme.mainClass"' +
                        ':style="{left:param.position.left,top:param.position.top}">' +
                        '<span>{{param.name}}</span>' +
                        '<el-button :type="theme.warnType" round class="device-status">{{theme.text}}</el-button>' +
                            '<el-collapse-transition>' +
                                '<div v-show="showMore">' +
                                '<hr :style="{color:theme.color}" />' +
                                    '<template v-for="(d,i) in param.detail">' +
                                    '{{i}} : {{d}}' +
                                    '<br />' +
                                    '</template>' +
                                '</div>' +
                            '</el-collapse-transition>' +
                        '</div>' +
                    '</el-tooltip>',
        data: function () {
            return {
                showMore: false
            }
        },
        methods: {
            //显示胶站详细信息页面
            showDetail: function (id) {
                //console.log(id)
                loadPage('/Main/DeviceDetail')
            }
        },
        computed: {
            theme: function () {
                var theme
                var that = this
                switch (that.param.stationstate) {
                    
                    case '空闲': theme = {
                        mainClass: 'device-button-info',
                        warnType: 'warning',
                        text: '空闲',
                        color: '#E6A23C'
                    }; break;
                    case '运行': theme = {
                        mainClass: 'device-button-success',
                        warnType: 'success',
                        text: '运行',
                        color: '#67C23A'
                    }; break;
                    case '报警': theme = {
                        mainClass: 'device-button-danger',
                        warnType: 'danger',
                        text: '报警',
                        color: '#F56C6C'
                    }; break;
                    case '未启用': theme = {
                        mainClass: 'info-button-info',
                        warnType: 'info',
                        text: '未启用',
                        color: '#909399'
                    }; break;
                    default: theme = {
                        mainClass: 'device-button-info',
                        warnType: 'info',
                        text: '停止',
                        color: '#909399'
                    };
                }
                return theme
            }
        }
    })


function _cloneObj(obj) {
    var newObj = {}
    for (let o in obj) {
        newObj[o]=obj[o]
    }
    return newObj
}

function _cloneArr(arr) {
    var newArr = []
    for (var a = 0; a < arr.length;a++) {
        if (typeof (arr[a]) == 'object') {
            newArr.push($.extend(true, {}, arr[a]))
        }
        else newArr.push(arr[a])
    }
    return newArr
}

function _formatQueryStr(obj) {
    var queryStr = '?'
    for (var o in obj) {
        queryStr = queryStr+o+'='+obj[o]+'&'
    }
    return queryStr.substring(0, queryStr.length-1)
}
