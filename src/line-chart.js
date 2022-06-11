
import { Line } from '@ant-design/charts';
import "@ant-design/flowchart/dist/index.css";

export default (props) => {
  const { data, height, xField, yField, seriesField } = props;
  const config = {
    data,
    height: height || 400,
    xField,
    yField,
    seriesField,
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${Math.round(v / 1024 / 1024)} MB`,
      },
    }
  }
  return (
    <div className='line-chart-container'>
      <Line { ...config }></Line>
    </div>
  );
}
