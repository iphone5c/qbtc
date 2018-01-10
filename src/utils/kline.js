import klines from '@/utils/kline'
import {isEmpty} from '@/utils/common'
import Highcharts from 'highcharts'
export default{
    klineDatas:[],
    lhlc:[],
    volume:[],
    marketTitle:'',
    marketCoin:'',
    refreshDatas:function(chart,series1,series2){
        var klineDatas = klines.klineDatas;
        var lhlc=klines.lhlc;
        var volume=klines.volume;
        var lastTime = lhlc.length>0 ? lhlc[lhlc.length-1][0] : 0;

        var dataLength=klineDatas.length;
        for(var i=0;i<dataLength;i++){
            var data = JSON.parse(klineDatas[i]);

            if (data[0]<=lastTime) 
                continue;
            lhlc.push([
                data[0],//时间
                data[1],//开
                data[2],//高
                data[3],//低
                data[4]//收
                ]);
            volume.push([
                data[0],
                data[5]
                ]);
        }
        klines.lhlc=lhlc;
        klines.volume=volume;
        series1.setData(lhlc,true,true);
        series2.setData(volume,true,true);
        // series2.name=klines.marketCoin+"/"+klines.marketTitle;
        // console.log();
    },
    kline:{
        chart: {
            events: {
                load: function () {
                    var series1 = this.series[0];
                    var series2 = this.series[1];
                    var chart = this;
                    klines.refreshDatas(chart,series1,series2);
                    setInterval(function(){
                        klines.refreshDatas(chart,series1,series2);
                    },1000)
                }
            }, 
        },
        rangeSelector: {
            selected: 3,
            inputDateFormat: '%Y-%m-%d',
            buttons: [
                {
                    type: 'minute',
                    count: 30,
                    text: '1分',
                    dataGrouping: {
                        forced: true,
                        units: [['minute', [1]]]
                    }
                },{
                    type: 'minute',
                    count: 30,
                    text: '5分',
                    dataGrouping: {
                        forced: true,
                        units: [['minute', [5]]]
                    }
                },{
                    type: 'minute',
                    count: 60,
                    text: '15分',
                    dataGrouping: {
                        forced: true,
                        units: [['minute', [15]]]
                    }
                },{
                    type: 'hour',
                    count: 2,
                    text: '30分',
                    dataGrouping: {
                        forced: true,
                        units: [['minute', [30]]]
                    }
                },{
                    type: 'week',
                    count: 2,
                    text: '日 K',
                    dataGrouping: {
                        forced: true,
                        units: [['day', [1]]]
                    }
                },{
                    type: 'month',
                    count: 1,
                    text: '周 K',
                    dataGrouping: {
                        forced: true,
                        units: [['week', [1]]]
                    }
                },{
                    type: 'all',
                    text: '所有'
                }],
        },
        title: {
            text: 'K线'
        },
        xAxis: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%y-%m',
                year: '%Y'
            }
        },
        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: '价格'
            },
            height: '60%',
            lineWidth: 2
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: '成交量'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],
        series: [{
            type: 'candlestick',
            name: 'data',
            color: 'red',
            lineColor: 'red',
            upColor: 'green',
            upLineColor: 'green',
            tooltip: {
            },
            navigatorOptions: {
                color: Highcharts.getOptions().colors[0]
            },
            data: [],
            dataGrouping: {
                units: [[
                    'minute',                         // unit name
                    [1, 5, 15, 30]                             // allowed multiples
                ], [
                    'hour',
                    [1]
                ], [
                    'day',
                    [1]
                ], [
                    'week',
                    [1]
                ], [
                    'month',
                    [1]
                ]]
            }
        }, {
            type: 'column',
            name: '数量',
            data: [],
            yAxis: 1,
            dataGrouping: {
                units: [[
                    'minute',                         // unit name
                    [1, 5, 15, 30]                             // allowed multiples
                ], [
                    'hour',
                    [1]
                ], [
                    'day',
                    [1]
                ], [
                    'week',
                    [1]
                ], [
                    'month',
                    [1]
                ]]
            }
        }]
    }
}