<template>
  <div class="x-bar">
    <div :id="id" option="option"  style="min-width:400px;height:400px"></div>
  </div>
</template>
<script>
import klines from '@/utils/kline'
export default {
  // 验证类型
  props: {
    id: {
      type: String,
      default: ''

    }
  },
  data(){
        var klineOption = {"chart":{"events":{ load: function () {
                    var series1 = this.series[0];
                    var series2 = this.series[1];
                    var chart = this;
                    klines.refreshDatas(chart,series1,series2);
                    setInterval(function(){
                        klines.refreshDatas(chart,series1,series2);
                    },1000)
                }}},"rangeSelector":{"selected":3,"inputDateFormat":"%Y-%m-%d","buttons":[{"type":"minute","count":30,"text":"1分","dataGrouping":{"forced":true,"units":[["minute",[1]]]}},{"type":"minute","count":30,"text":"5分","dataGrouping":{"forced":true,"units":[["minute",[5]]]}},{"type":"minute","count":60,"text":"15分","dataGrouping":{"forced":true,"units":[["minute",[15]]]}},{"type":"hour","count":2,"text":"30分","dataGrouping":{"forced":true,"units":[["minute",[30]]]}},{"type":"week","count":2,"text":"日 K","dataGrouping":{"forced":true,"units":[["day",[1]]]}},{"type":"month","count":1,"text":"周 K","dataGrouping":{"forced":true,"units":[["week",[1]]]}},{"type":"all","text":"所有"}]},"title":{"text":"K线"},"xAxis":[
        {
            "minPadding":0,
            "maxPadding":0,
            "ordinal":true,
            "title":{
                "text":null
            },
            "labels":{
                "overflow":"justify"
            },
            "showLastLabel":true,
            "dateTimeLabelFormats":{
                "millisecond":"%H:%M:%S.%L",
                "second":"%H:%M:%S",
                "minute":"%H:%M",
                "hour":"%H:%M",
                "day":"%m-%d",
                "week":"%m-%d",
                "month":"%y-%m",
                "year":"%Y"
            },
            "type":"datetime",
            "categories":null,
            "startOnTick":false,
            "endOnTick":false,
            "index":0,
            "isX":true
        }
    ],"yAxis":[{"labels":{"align":"right","x":-3},"title":{"text":"价格"},"height":"60%","lineWidth":2},{"labels":{"align":"right","x":-3},"title":{"text":"成交量"},"top":"65%","height":"35%","offset":0,"lineWidth":2}],"series":[{"type":"candlestick","name":"data","color":"red","lineColor":"red","upColor":"green","upLineColor":"green","tooltip":{},"navigatorOptions":{"color":"#7cb5ec"},"data":[],"dataGrouping":{"units":[["minute",[1,5,15,30]],["hour",[1]],["day",[1]],["week",[1]],["month",[1]]]}},{"type":"column","name":"数量","data":[],"yAxis":1,"dataGrouping":{"units":[["minute",[1,5,15,30]],["hour",[1]],["day",[1]],["week",[1]],["month",[1]]]}}]};
    return{
      option : klineOption
    }
  },
  mounted() {
      this.highstock.StockChart(this.id,this.option);
  }
}
</script>