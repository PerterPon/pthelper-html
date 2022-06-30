
import { Line } from '@ant-design/charts';
import { DualAxes } from '@ant-design/plots'
import * as _ from 'lodash';
import "@ant-design/flowchart/dist/index.css";

function smoothData(data, yField) {
  if (false === _.isArray(yField)) {
    data = [data];
    yField = [yField];
  }
  for (let i = 0; i < data.length; i++) {
    const dataArr = data[i];
    const field = yField[i];
    for (let j = 1; j < dataArr.length; j++) {
      const item = dataArr[j];
      const itemData = item[field];
      if (0 === Number(itemData)) {
        item[field] = dataArr[j - 1][field];
      }
    }
  }

  return data;
}

export default (props) => {
  const { data, height, xField, yField, seriesField, yaxis } = props;

  const config = {
    data: smoothData(data, yField),
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
