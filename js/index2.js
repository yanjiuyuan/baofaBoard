var char1,char2,char3,char4,option1,option2,option3,option4
var date = new Date()
var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
//获取数据的周期
var cycle = 12
var colors = ['#f845f1','#ad46f3','#5045f6','#4777f5','#44aff0','#45dbf7','#f6d54a','#f69846','#ff4343']

var vue = new Vue({
        el: "#main",
        data: function () {
            return {
                activeNames: ['1'],
				devices:[],
                showMask: false,
                loading: true,
                devWarn:[]
            }
        },
        methods: {
        	getAllData:function(){
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
                        that.handleChart1(data.line_oee)
                        //that.handleChart2(data.activation_line)
                        that.handleChart3(data.location_stat)
                        //that.handleChart4(data.dev_activation,data.dev_activation7)
                        this.devices = data.dev_activation7
                        that.handleChart5(data.dev_warn_stat)
                    }
                    
                })
        	},
        	handleChart1:function(data){
        		var legend = ['时间开动率','设备利用率','稼动率','综合效率','产能利用率']
        		var xArr = []
        		var series = []
        		for(var i = 0;i<legend.length;i++){
        			series.push({
        				name:legend[i],
		                type:'line',
		                data:[]
        			})
        		}
        		for(let d of data){
        			xArr.push(d.ProductionT.substring(5,10))
        			series[0].data.push(d.TACT)
        			series[1].data.push(d.DACT)
        			series[2].data.push(d.ACT)
        			series[3].data.push(d.OEE)
        			series[4].data.push(d.TEEP)
        		}
        		option1.xAxis.data = xArr
        		option1.legend.data = legend
        		option1.series = series
        		char1.setOption(option1, true)
        	},
        	handleChart2:function(data){
        		//var legend = ['末班产线效率','七日产线效率']
        		var legend = ['七日产线效率']
        		var xArr = ['稼动率','设备利用率','时间开动率']
        		var series = []
        		for(var i = 0;i<legend.length;i++){
        			series.push({
        				name:legend[i],
		                type:'bar',
		                data:[]
        			})
        		}
    			//series[0].data = [data.ACT,data.DACT,data.TACT]
    			//series[1].data = [data.ACT7,data.DACT7,data.TACT7]
    			series[0].data = [data.ACT7,data.DACT7,data.TACT7]
        		option2.xAxis.data = xArr
        		option2.legend.data = legend
        		option2.series = series
        		char2.setOption(option2, true)
        	},
        	handleChart3:function(data){
        		var legend = ['加工周期','七日加工周期']
        		var xArr = []
        		var series = []
        		for(var i = 0;i<legend.length;i++){
        			series.push({
        				name:legend[i],
		                type:'bar',
		                data:[]
        			})
        		}
        		for(let d of data){
        			xArr.push(d.stationNAME)
        			series[0].data.push(d.run)
        			series[1].data.push(d.run7)
        		}
        		option3.xAxis.data = xArr
        		option3.legend.data = legend
        		option3.series = series
        		char3.setOption(option3, true)
        	},
        	handleChart4:function(data1,data2){
        		for(let d1 of data1){
        			for(let d2 of data2){
        				if(d1.stationname == d2.stationname){
        					d1['dev_activation7'] = d2.dev_activation7
        					d1['dev_plan_activation7'] = d2.dev_plan_activation7
        					d1['dev_time_activation7'] = d2.dev_time_activation7
        					break
        				}
        			}
        		}
        		this.devices = data1
        	},
        	
            handleChart5:function(data){
            	var arr = [['设备工位名称'],['报警次数'],['首次报警时间（秒）'],['平均报警时间（秒）'],['平均报警间隔（秒）'],['近一个月日平均报警'],['近一个月首次报警时间（秒）'],['近一个月平均报警时间（秒）'],['近一个月平均报警间隔（秒）']]
            	
            	for(let d of data){
            		arr[0].push(d.stationname)
            		arr[1].push(d.warn_c)
            		arr[2].push(d.firstwarninter)
            		arr[3].push(d.avgwarnt)
            		arr[4].push(d.avgwarninter)
            		arr[5].push(d.h_avg_warn_c)
            		arr[6].push(d.h_firstwarninter)
            		arr[7].push(d.h_avgwarnt)
            		arr[8].push(d.h_avgwarninter)
            	}
            	
            	this.devWarn = arr
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

     
        },
        created: function () {
        	
            var that = this;

            window.setInterval(function () {
                that.getAllData()
            },12000)
            this.getAllData()
			
        }
    })


$(function () {
	//月产线 线形
	char1 = echarts.init(document.getElementById('chart_1'))
	option1 = {
            title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[],
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
            data: [],
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
            name: '',
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
                name:'时间开动率',
                type:'line',
                data:[]
            }
        ]
        };
    // 使用刚指定的配置项和数据显示图表。
    char1.setOption(option1);
    window.addEventListener("resize", function () {
        char1.resize()
        //char2.resize()
        char3.resize()
    });
    
    //效率统计 柱状
	//char2 = echarts.init(document.getElementById('chart_2'))
	option2 = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[],
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
            data: [],
            boundaryGap : [0, 0.01],
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            name: '',
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
            
        ]
    };
    //char2.setOption(option2);

    //加工周期 柱状
	char3 = echarts.init(document.getElementById('chart_3'))
	option3 = {
            title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[],
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
            data: [],
            boundaryGap : [0, 0.01],
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            name: '',
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
            
        ]
    };
    char3.setOption(option3);

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
