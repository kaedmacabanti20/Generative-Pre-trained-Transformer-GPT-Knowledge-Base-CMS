<!-- <template>
  <div class="donutchart-container">
    <g-chart type="PieChart" :data="donutChartData" :options="chartOptions"></g-chart>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';

export default {
  components: { GChart },
  data() {
    return {
      donutChartData: [
        ['Metric', 'Value'],
        ['No. user inquiries', 12],
        ['Average Session Duration', 2.00],
 
      ],
      chartOptions: {
        height: 300,
        chartArea: { width: '70%', height: '80%' },
        pieHole: 0.4, // This creates the donut chart effect by specifying a pie hole value
        dataTable: {
          format: ['string', 'number'],
          sourceColumn: 0,
        },
      },
    };
  },
};
</script> -->


<style>
.chart-container {
  width: 100%;
}
</style>

<template>
  <div class="barchart-container">
    <g-chart type="ColumnChart" :data="columnChartData" :options="chartOptions"></g-chart>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';

export default {
  components: { GChart },
  data() {
    return {
      topKeywords: [],
      columnChartData: [
        ['Metric', 'Value'],
        ['No. user inquiries', 12],
        ['Average Session Duration', 2.00],
        ['Average Session Duration', 2.00],
        ['Average Session Duration', 2.00],
        ['Average Session Duration', 2.00],
        ['Average Session Duration', 2.00],
        ['Average Session Duration', 2.00],
        ['Average Session Duration', 2.00],
        ['Average Session Duration', 2.00],
        ['Average Session Duration', 2.00],
      ],
      chartOptions: {
        height: 300, // Specify the desired height
        chartArea: { width: '70%', height: '80%' }, // Adjust chart area as needed
        dataTable: {
          // Use the '0' column for the header row
          format: [
            'string',
            'number',
          ],
          sourceColumn: 0,
        },
      },
    };
  },
  
};
</script>

<!-- 
<style>
.barchart-container{
  width: 100%;
}
</style>
<template>
    <div class="barchart-container">
      <g-chart type="BarChart" :data="barChartData" :options="chartOptions"></g-chart>
    </div>
  </template>
  
  <script>
  import { GChart } from 'vue-google-charts';
  
  export default {
    components: { GChart },
    data() {
      return {
        barChartData: [
          ['Topping', 'Slices'],
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2],
          ['Pepperoni', 2],
          ['Pepperoni', 2],
          ['Pepperoni', 2],
          ['Pepperoni', 2],
          ['Pepperoni', 2],
        ],
        chartOptions: {
          height: 300, // Specify the desired height
          chartArea: { width: '70%', height: '80%' }, // Adjust chart area as needed
          dataTable: {
            // Use the '0' column for the header row
            format: [
              'string',
              'number',
            ],
            sourceColumn: 0,
          },
        },
      };
    },
  };
  </script>
   -->