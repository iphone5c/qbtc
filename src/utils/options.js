import options from '@/utils/options'
import {isEmpty} from '@/utils/common'
// import a from '@/utils/highstock'
// import b from '@/utils/exporting'

export default{
  bar: {
    chart: {
        type: 'area',
        spacingBottom: 30,
        // animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {
                // console.log(options.sellValue)
                var series1 = this.series[0];
                var series2 = this.series[1];
                var chart = this;
                options.refreshDatas(chart,series1,series2);
                setInterval(function(){
                    options.refreshDatas(chart,series1,series2);
                },1000)
            }
        }, 
    },
    exporting: {
        enabled:false
    },
    title: {
        text: '行情深度'
    },
    subtitle: {
        text: '价格',
        floating: true,
        align: 'center',
        verticalAlign: 'bottom',
        y: -20
    },
    legend:{
        y: 10
    },
    yAxis: {
        title: {
            text: '数量'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        formatter: function () {
            var tipInfo = '<b>' + this.series.name + ':' + this.y + '</b><br/><b>价格:￥' + this.x + '</b>';
            return tipInfo;
        }
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
    },
    credits: {
        enabled: false
    },
    plotOptions:{
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: '累计买单',
        data: [],
        color:'#50B432'
    }, {
        name: '累计卖单',
        data: [],
        color:'#FF9655'
    }]
  },
  buyDatas:[],
  sellDatas:[],
  refreshDatas:function(chart,series1,series2){
    var buyDatas = options.buyDatas;
    var sellDatas = options.sellDatas;

    var data1 = [];
    var data2 = [];
    var buyTotalAmount = 0;
    var sellTotalAmount = 0;
    for(var i=0;i<buyDatas.length;i++){
        if (i>=30)
            break;
        buyTotalAmount += Number(buyDatas[i].noAmount)
        data1.splice(0,0,{x:Number(buyDatas[i].price),y:buyTotalAmount});
    }
    for(var i=0;i<sellDatas.length;i++){
        if (i>=30)
            break;
        sellTotalAmount += Number(sellDatas[i].noAmount)
        data2.push({x:Number(sellDatas[i].price),y:sellTotalAmount});
    }
    series1.setData(data1,true,true);
    series2.setData(data2,true,true);
  },
klineSmallChart:[],
  trend:{
    chart: {
            type: 'area',
            backgroundColor: '#FFFFFF',
            events: {
            load: function () {
                    // console.log(options.sellValue)
                    var series1 = this.series[0];
                    var chart = this;
                    options.refreshChartDatas(chart,series1);
                    setInterval(function(){
                        options.refreshChartDatas(chart,series1);
                    },1000)
                }
            }, 
        },
        title:{
            text:null
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        xAxis: {
            visible:false
        },
        yAxis: {
          visible:false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            showInLegend:false,
            data: [],
            color: '#C7EDC7'
        }]
  },
  refreshChartDatas:function(chart,series1){

    var klineSmallChart = options.klineSmallChart;

    var data1 = [];
    for(var i=0;i<klineSmallChart.length;i++){
        data1.push(Number(klineSmallChart[i]));
    }
    series1.setData(data1,true,true);
  },

initKline:function(config){   
    if (isEmpty(config)) {
        config = {};
    }
    return {
        chart: {
            type: 'area',
            backgroundColor: isEmpty(config.background)?'#FFF':config.background,
            margin:[10,0,0,0],
            events: {
            load: function () {
                    var chart = this;
                    var series1 = chart.series[0];
                    chart.options.refreshChartDatas(chart,series1)
                    setInterval(function(){
                        chart.options.refreshChartDatas(chart,series1)
                    },1000)
                }
            }, 
        },
        title:{
            text:null
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        xAxis: {
            visible:false
        },
        yAxis: {
          visible:false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            showInLegend:false,
            data: [],
            color: isEmpty(config.seriesColor)?'#C7EDC7':config.seriesColor,
        }],
        klineSmallChart:[],
        refreshChartDatas:function(chart,series1){

            var klineSmallChart = chart.options.klineSmallChart;
            if (klineSmallChart == undefined) {
                return
            }

            var data1 = [];
            for(var i=0;i<klineSmallChart.length;i++){
                data1.push(Number(klineSmallChart[i]));
            }
            series1.setData(data1,true,true);
        }
    }
  },
  updateChartDatas:function(obj,klineSmallChart){
    obj.klineSmallChart = klineSmallChart;
  }
}