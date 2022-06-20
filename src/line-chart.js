
import { Line } from '@ant-design/charts';
import { DualAxes } from '@ant-design/plots'
import "@ant-design/flowchart/dist/index.css";

export default (props) => {
  const { data, height, xField, yField, seriesField, yaxis } = props;
  const config = {
    data,
    height: height || 400,
    xField,
    yField,
    seriesField,
    xAxis: {
      type: 'time',
    },
    yAxis: yaxis || {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${Math.round(v / 1024 / 1024)} MB`
      }
    }
  }
  if(true === Array.isArray(yField)) {
    return (
      <div className='line-chart-container'>
        <DualAxes { ...config }></DualAxes>
      </div>
    );
  } else {
    return (
      <div className='line-chart-container'>
        <Line { ...config }></Line>
      </div>
    )
  }
}
