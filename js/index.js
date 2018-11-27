
var char1,char2,char3,char4,option1,option2,option3,option4
var date = new Date()
var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
//获取数据的周期
var cycle = 12
var colors = ['#f845f1','#ad46f3','#5045f6','#4777f5','#44aff0','#45dbf7','#f6d54a','#f69846','#ff4343']

var ws
ws = new WebSocket("ws://" + hostName + "/api/dt/Get");
ws.onopen = function () {
    // $("#messageSpan").text("Connected!");
    console.log('open')
    if (ws.readyState == WebSocket.OPEN) {
        ws.send("1");
        window.setInterval(function () {
            ws.send("1");
        }, 500)

    } else {

    }
};


var vue = new Vue({
        el: "#main",
        data: function () {
            return {
                activeNames: ['1'],
                deviceBtns: _cloneArr(DEVICES[0]),
                showMask: false,
                loading: true,
                useages: [
                    {
                        ProductLineName: '',
                        Data: {},
                        ProductLineId: ''
                    }, {
                        ProductLineName: '',
                        Data: {},
                        ProductLineId: ''
                    }],
                peopleBeat:[],
                machineBeat:[]
            }
        },
        methods: {
        	getAllData:function(){
        		this.getUseage()
        		this.getYield({ DataTime: dateStr, Count: 200 })
        		this.getEfficiency({ DataTime: dateStr, dura: 10 })
        		this.getBeat(1,dateStr)
        		this.getBoard()
        	},
        	//获取看板通用数据
        	getBoard:function(){
        		var that = this
                $.ajax({
                    url: host + "DataView/GetData?lineid=1",
                    success: function (data) {
                    	data = JSON.parse(data)
                        console.log('获取看板通用数据')
                        console.log(data)
                        var busyData = data.location_busy

                        
                        //忙闲程度数据
                        var arr = []
                        var legend = []
                        for(var i = 0;i< busyData.length; i++){
                        	legend.push(busyData[i].locationName)
                        	arr.push(
                        		{
                        			value: busyData[i].NUM,
			                        name: busyData[i].locationName,
			                        itemStyle: {
			                            normal: {
			                                color: colors[i]
			                            }
			                        }
                        		})
                        }
                        for(var j = 0;j< busyData.length; j++){
                        	arr.push(
                        		{
			                        value: 0,
			                        name: "",
			                        itemStyle: {
			                            normal: {
			                                color: 'transparent'
			                            }
			                        },
			                        label: {
			                            show: false
			                        },
			                        labelLine: {
			                            show: false
			                        }
			                    }
                        	)
                        }
                        option1.legend.data = legend
                        option1.series[0].data = arr
                        char1.setOption(option1, true)
                        //合格率数据
                        option4.series[0].data[0].value = data.quality.pass_rate
                        option4.series[0].data[1].value = data.quality.inferior_rate
                        option4.series[0].data[2].value = data.quality.waste_rate
                        option4.series[1].data[0].value = data.quality.pass_rate7
                        option4.series[1].data[1].value = data.quality.inferior_rate7
                        option4.series[1].data[2].value = data.quality.waste_rate7
                        char4.setOption(option4, true)
                    }
                    
                })
        	},
            //获取实时数量信息
            getUseage: function () {
                var that = this
                $.ajax({
                    url: host + "usage/getusage",
                    success: function (data) {
                        console.log('获取实时数量信息')
                        console.log(JSON.parse(data))
                        that.useages = JSON.parse(data)
                    }
                })
            },
            //获取产量图数据
            getYield:function(param){
            	 $.ajax({
		            url: host + "Statistics/GetCurrentProduction" + _formatQueryStr(param),
		            success: function (data) {
		                var xArr = [], y1Arr = [], y2Arr = []
		                console.log("获取产量图数据")
		                data = JSON.parse(data).Rows
		                console.log(data)
		                if (data.length == 0) {
		                    xArr = [0], y1Arr = [0], y2Arr = [0]
		                }else{
		                	 for (let d = 0; d < data.length; d++) {
			                    xArr.push(data[d].ID_RealTimeUsage)
			                    y1Arr.push(parseInt(data[d].NowN))
			                    y2Arr.push(parseInt(data[d].ChildN))
			                }
		                }

		                option2.xAxis.data = xArr
		                option2.series[0].data = y1Arr
		                option2.series[1].data = y2Arr
		                char2.setOption(option2, true)
		            }
		        })
            },
            //获取效率图数据
            getEfficiency:function(param){
            	$.ajax({
	            url: host + "Statistics/GetYieldFluct" + _formatQueryStr(param),
	            success: function (data) {
	                console.log("获取生产速度数据")
	                data = JSON.parse(data).Rows
	                console.log(data)
	                var xArr = [], yArr = []
	                for (var d in data) {
	                    xArr.push(data[d].ID_RealTimeUsage)
	                    yArr.push(data[d].CurrN)
	                }
	                if (data.length == 0) {
	                    xArr = [0], yArr = [0]
	                }
	                option3.xAxis.data = xArr
	                option3.series[0].data = yArr
	                char3.setOption(option3,true)
	            }
	        })
            },
            //获取生产节拍数据
            getBeat:function(lineid,date) {
                var that = this
                $.ajax({
                    url: host + "Statistics/ChartBeatQuery?DataTime=" + date + "&lineid=" + lineid,
                    success: function (data) {
                        data = JSON.parse(data).Rows
                        console.log('获取生产节拍数据')
                        console.log(data)
						var peopleBeat = []
						var machineBeat = []
                        for (let d of data) {
                            if (d.JobType == '人工') {
                            	peopleBeat.push(d)
                            }else{
                            	machineBeat.push(d)
                            }
                        }
                        console.log(machineBeat)
                        that.handleModData('peopleBeat',peopleBeat)
                        that.handleModData('machineBeat',machineBeat)
                    }
                })
            },
            //长数据定期切片切换
            handleModData:function(dataName,data){
            	var that = this
            	var times = Math.ceil(data.length/5)
            	var time = cycle/times
            	var i = 1
            	this[dataName] = data.slice(0,5)
            	console.log(this[dataName])
            	var intval = setInterval(function(){
            		that[dataName] = data.slice(i*5,(i+1)*5)
            		i++
            		if(i == times){
            			clearInterval(intval)
            		}

            	},time*1000)
            },
            //处理实时状态数据
            handleStatusData: function (devData) {
                var that = this;
                //一号线数据
                var devDataObj = devData[0].Data
    
                that.deviceBtns = _cloneArr(DEVICES[0])
                console.log(devDataObj)
                for (let i = 0; i < that.deviceBtns.length; i++) {
                    var dev = that.deviceBtns[i]
                    if (!dev.detail) continue
                    //胶站设置数据
                    for (let d in devDataObj) {
                        let dObj = devDataObj[d]
                        if (d == dev.name) {
                            dev.stationstate = dObj.stationstate
                            for (let det in dev.detail) {
                                var ele = dev.detail[det]
                                if (dObj[ele] != null) {
                                    dev.detail[det] = dObj[ele]
                                }
                            }
                            break
                        }
                    }
                }
                console.log('处理好的状态数据')
                console.log(that.deviceBtns)
            },
            //通过ajax而不是webSocket获取状态数据
            getStatusData: function () {
                var that = this
                $.ajax({
                    url: host + "api/dt/GetAllTable?strMessage=GetAllTable",
                    success: function (data) {
                        that.loading = false
                        data = JSON.parse(data)
                        console.log('ajax 获取状态数据')
                        console.log(data)
                        that.handleStatusData(data)
                    }
                })
            }
        },
        created: function () {
        	
            var that = this;
            //ajax 获取状态数据
            this.getStatusData()
            //webSocket 获取数据
            ws.onmessage = function (result) {
                that.loading = false
                console.log('webSocket 获取数据')
                console.log(JSON.parse(result.data))
                that.handleStatusData(JSON.parse(result.data))
            };
            ws.onerror = function (error) {
              console.log(error);
            };

            //获取useage参数
            window.setInterval(function () {
                that.getAllData()
            },12000)
            this.getAllData()
			
        }
    })




$(function () {
	//当前闲忙程度 扇形
	char1 = echarts.init(document.getElementById('chart_1'))
	option1 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}"
            },
            legend: {
                x: 'center',
                y: '15%',
                data: [ '视觉1站', '一次喷胶', '压底','视觉2站', '喷处理剂', '二次喷胶','三次喷胶','护齿喷胶', '十字压'],
                icon: 'circle',
                textStyle: {
                    color: '#fff',
                }
            },
            calculable: true,
            series: [{
                name: '闲忙程度',
                type: 'pie',
                //起始角度，支持范围[0, 360]
                startAngle: 0,
                //饼图的半径，数组的第一项是内半径，第二项是外半径
                radius: [41, 100.75],
                //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                center: ['50%', '40%'],
                //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                //  'area' 所有扇区面积相同，仅通过半径展现数据大小
                roseType: 'area',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length2: 1,
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [{
                        value: 0,
                        name: '',
                        itemStyle: {
                            normal: {
                                color: '#f845f1'
                            }
                        }
                   },
                    {
                        value: 0,
                        name: "",
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                ]
            }]
        };
    // 使用刚指定的配置项和数据显示图表。
    char1.setOption(option1);
    window.addEventListener("resize", function () {
        char1.resize()
        char2.resize()
        char3.resize()
        char4.resize()
    });
    
    //产量统计图 折线
	char2 = echarts.init(document.getElementById('chart_2'))
	option2 = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['当班产量','预计产量'],
            textStyle:{
                color: '#fff'
            },
            top: '8%'
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        color: ['#FF4949','#FFA74D','#FFEA51','#4BF0FF','#44AFF0','#4E82FF','#584BFF','#BE4DFF','#F845F1'],
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['09:05','11:06','11:07','11:08','11:09'],
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            name: '数量(只)',
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name:'当班产量',
                type:'line',
                data:[3961.88, 4233.63, 4183.14, 3633.01, 3704.47]
            },
            {
                name:'预计产量',
                type:'line',
                data:[3374.76, 3364.76, 3274.76, 3371.82, 3259.87]
            }
        ]
    };
    char2.setOption(option2);

    //效率统计图 面积
	char3 = echarts.init(document.getElementById('chart_3'))
	option3 = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['效率'],
                textStyle:{
                    color: '#fff'
                },
                top: '8%'
            },
            grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            color: ['#4E82FF','#44AFF0','#4BF0FF','#FFEA51','#FF4949','#FFA74D','#584BFF','#BE4DFF','#F845F1'],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['11:05','11:06','11:07','11:08','11:09'],
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                name: '只/小时',
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [
                {
                    name:'效率',
                    type:'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data:[396, 423, 418, 363, 370]
                }
            ]
        };
    char3.setOption(option3);

	//品检合格率(日-周) 扇形	
	char4 = echarts.init(document.getElementById('chart_4'))
	option4 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            legend: {
                x: 'center',
                y: '0%',
                data: [ '合格率', '次品率', 'C等品率'],
                icon: 'circle',
                textStyle: {
                    color: '#fff',
                }
            },
            calculable: true,
			color: ['#FF4949','#FFA74D','#FFEA51','#4BF0FF','#44AFF0','#4E82FF','#584BFF','#BE4DFF','#F845F1'],
            series: [{
                name: '当日品检',
                type: 'pie',
                //饼图的半径，数组的第一项是内半径，第二项是外半径
                radius: [10, 70],
                //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                center: ['22%', '50%'],
                //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                //  'area' 所有扇区面积相同，仅通过半径展现数据大小
                //roseType: 'area',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length2: 1,
                    },
                    emphasis: {
                        show: true
                    }
                },
                
                data: [{
                        value: 19,
                        name: '合格率',
                        itemStyle: {
                            normal: {
                                color: '#584BFF'
                            }
                        }
                    },
                    {
                        value: 11,
                        name: '次品率',
                        itemStyle: {
                            normal: {
                                color: '#FFA74D'
                            }
                        }
                    },
                    {
                        value: 12,
                        name: 'C等品率',
                        itemStyle: {
                            normal: {
                                color: '#FFEA51'
                            }
                        }
                    }
                ]
            },
            {
                name: '七日品检',
                type: 'pie',
                //饼图的半径，数组的第一项是内半径，第二项是外半径
                radius: [10, 70],
                //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                center: ['70%', '50%'],
                //x: '50%', 
                //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                //  'area' 所有扇区面积相同，仅通过半径展现数据大小
                //roseType: 'radius',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length2: 0,
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [{
                        value: 19,
                        name: '合格率',
                        itemStyle: {
                            normal: {
                                color: '#584BFF'
                            }
                        }
                    },
                    {
                        value: 11,
                        name: '次品率',
                        itemStyle: {
                            normal: {
                                color: '#FFA74D'
                            }
                        }
                    },
                    {
                        value: 12,
                        name: 'C等品率',
                        itemStyle: {
                            normal: {
                                color: '#FFEA51'
                            }
                        }
                    }
                ]
            }
            ]

      };
      char4.setOption(option4);

    //点击跳转
    /*
    $('#chart_map').click(function(){
        window.location.href = './page/index.html';
    });
    $('.t_btn2').click(function(){
        window.location.href = "./page/index.html?id=2";
    });
    $('.t_btn3').click(function(){
        window.location.href = "./page/index.html?id=3";
    });
    $('.t_btn4').click(function(){
        window.location.href = "./page/index.html?id=4";
    });
    $('.t_btn5').click(function(){
        window.location.href = "./page/index.html?id=5";
    });
    $('.t_btn6').click(function(){
        window.location.href = "./page/index.html?id=6";
    });
    $('.t_btn7').click(function(){
        window.location.href = "./page/index.html?id=7";
    });
    $('.t_btn8').click(function(){
        window.location.href = "./page/index.html?id=8";
    });
    $('.t_btn9').click(function(){
        window.location.href = "./page/index.html?id=9";
    });
    */
});
