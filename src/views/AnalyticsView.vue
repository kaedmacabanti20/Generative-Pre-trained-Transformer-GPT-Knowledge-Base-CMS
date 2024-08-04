<script>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import BarChart from '../components/BarChart.vue'
import axios from 'axios';
import { GChart } from 'vue-google-charts';

export default {
  components: {Sidebar, Navbar, BarChart , GChart },
  data() {
    return {
      baseUrl:'https://ua-ai-llm.vercel.app',
      // baseUrl: 'http://localhost:3000',
      sessions: [], topKeywords: [],
      SessionCount: '',DurationCount: '',AverageDuration: '',
      selectedDate: null,
      topTen: 10,
     
      columnChartData: [['Keyword', 'Count']],
      chartOptions: {
        height: 300,
         chartArea: { width: '100%', height: '80%' },
      },
      donutChartData: [['Metric', 'Value'], ['No. user inquiries', 0], ['Average Session Duration', 0],],
      donutChartOptions: {
        height: 210,
        chartArea: { width: '90%', height: '90%' },
        pieHole: 0.4,   
        dataTable: {
          format: ['string', 'number'],
          sourceColumn: 0,
        },
      },
    };
  },
  created() {
    const customId = this.$route.params.details;
    axios.get(this.baseUrl + '/api/getSessionDetails/' + customId)
    .then(response => {
      this.sessions = [response.data];
      this.calculateDurationCount();
    })
    .catch(error => {
      console.error('Error fetching session details:', error);
    });
    
    axios.get(this.baseUrl+'/api/getAllSessions')
    .then(response => {
        this.sessions = response.data;
        this.calculateDurationCount();
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
    
    axios.get(this.baseUrl+'/api/getKeywords')
    .then(response => {
      this.topKeywords = response.data.sort((a, b) => b.count - a.count);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  },
  mounted() {
    axios
      .get(this.baseUrl+'/api/SessionCount')
      .then(response => {
        console.log('SessionCount API Response:', response.data);
        if (response.data && response.data.count) {
          this.SessionCount = response.data.count;
          this.calculateAverageDuration();
        } else {
          console.error('Invalid API response for SessionCount:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching SessionCount:', error);
      });
  },
  computed: {

    firstDetails() {
    return this.filteredSessions.map(session => {
      if (session.details && session.details.length > 0) {
        return session.details[0];
      }
      return null;
      });
    },
    
    transformedData() {
      // Create an array of arrays from topKeywords
      return this.topKeywords.slice(0, 10).map(keyword => [keyword._id, keyword.count]);
    },
    
    filteredSessions() {
    if (!this.selectedDate) {
      return this.sessions;
    }

    

    const selectedDate = new Date(this.selectedDate);
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedDay = selectedDate.getDate();

    return this.sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      const sessionYear = sessionDate.getFullYear();
      const sessionMonth = sessionDate.getMonth() + 1;
      const sessionDay = sessionDate.getDate();

      return (
        selectedYear === sessionYear &&
        selectedMonth === sessionMonth &&
        selectedDay === sessionDay
      );
    });
    },

    sortedDetails() {
      return this.filteredSessions.map((session) => {
        const sortedDetails = [...session.details];
        sortedDetails.sort((a, b) => a.content.length - b.content.length);
        return sortedDetails;
      });
    },
  },
  methods: {
    updateChartData() {
      // Update columnChartData when topKeywords changes
      this.columnChartData = [['Keyword', 'Count'], ...this.transformedData];
    },

    updateDonutChartData() {
      // Calculate the percentages
      const totalValue = this.DurationCount + this.AverageDuration;
      const noUserInquiriesPercentage = (this.DurationCount / totalValue) * 100;
      const averageSessionDurationPercentage = (this.AverageDuration / totalValue) * 100;

      // Update the donutChartData with the calculated percentages
      this.donutChartData = [
        ['Metric', 'Percentage'],
        ['No. user inquiries', noUserInquiriesPercentage],
        ['Average Session Duration', averageSessionDurationPercentage],
      ];
    },
  calculateDurationCount() {
    let count = 0;
    for (const session of this.sessions) {
      if (session.details && Array.isArray(session.details)) {
        count += session.details.length;
      }
    }
    this.DurationCount = count;
  },

  calculateAverageDuration() {
    let totalDuration = 0;
    for (const session of this.sessions) {
      totalDuration += session.duration;
    }
    const averageDuration = totalDuration / this.sessions.length;
    this.AverageDuration = isNaN(averageDuration) ? 'N/A' : averageDuration.toFixed(2);
  },

  filterSessionsByDate() {
    if (!this.selectedDate) {
      return this.sessions;
    }

    const selectedDate = new Date(this.selectedDate);
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedDay = selectedDate.getDate();

    return this.sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      const sessionYear = sessionDate.getFullYear();
      const sessionMonth = sessionDate.getMonth() + 1;
      const sessionDay = sessionDate.getDate();

      return (
        selectedYear === sessionYear &&
        selectedMonth === sessionMonth &&
        selectedDay === sessionDay
      );
    });
  },

  recalculateUserEngagement() {
    const filteredSessions = this.filterSessionsByDate();
    let count = 0;
    for (const session of filteredSessions) {
      if (session.details && Array.isArray(session.details)) {
        count += session.details.length;
      }
    }
    this.DurationCount = count;
    this.SessionCount = filteredSessions.length;
    let totalDuration = 0;
    for (const session of filteredSessions) {
      totalDuration += session.duration;
    }
    const averageDuration = totalDuration / filteredSessions.length;
    this.AverageDuration = isNaN(averageDuration) ? 'N/A' : averageDuration.toFixed(2);
  },
  },
  watch: {
    selectedDate: 'recalculateUserEngagement',
    DurationCount: 'updateDonutChartData',
    AverageDuration: 'updateDonutChartData',
    topKeywords: {
      handler: 'updateChartData',
      deep: true,
    },

  }
}
</script>

<template>
  <div class="navside">
    <Sidebar/>
    <Navbar/>
    <div class="container">
      <div class="content">
        <section class="box">
          <span>
            <label for="datepicker"><b>Select Date </b></label>
            <input class="date-input" type="date" id="datepicker" name="selectedDate" v-model="selectedDate">
          </span>
        </section>
  
        <section class="analytics-box1">
          
        <form class="user-engagement">
          <dl>
            <span class="ue-row1">
                <dt><b>Sessions:</b></dt>
                <dd><b>{{ SessionCount }}</b></dd>    
            </span>
            <g-chart type="PieChart" :data="donutChartData" :options="donutChartOptions"></g-chart>
          </dl>
        </form>
        <form class="keywords">
          <h2 class="box-heading"><b>Top Keywords</b></h2>
          <div class="keyword-columns">
            <div class="keyword-column">
              <g-chart type="ColumnChart" :data="columnChartData" :options="donutChartOptions"></g-chart>
            </div>
          </div>
        </form>
      </section>
 
      <section class="analytics-box2">
        <div class="box">
          <h2 class="box-heading"><b>Records</b></h2>
          <table>
            <thead>
              <tr>
                <th width="20%">Duration</th>
                <th width="80%">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(session, index) in filteredSessions" :key="session.customId">
                <td>{{ session.duration }}</td>
                <td>
                  <ul>
                    <li>{{ firstDetails[index] ? firstDetails[index].content : 'N/A' }}</li>
                  </ul>
                </td>
                <td class="details-btn-td">
                  <button class="secondary-button">
                    <router-link :to="'/analytics/' + session.customId">
                      Details
                    </router-link>
                  </button>
                </td>
               </tr>
            </tbody>
          </table>
        </div>
      </section>
  
      </div>
    </div>
  </div>
</template>
   
<style scoped> 
.keyword-container{width: 100%;display: grid; grid-template-columns: 1fr 1fr;}
.keyword-item ul{display: flex; margin: .2rem 0 .2rem 0;}
.keyword-item ul li{padding: 0 .2rem 0 .2rem;}

hr{ margin: .5rem 0 .5rem 0;}
.analytics-bargraph{display: flex;justify-content: space-between;margin: 4rem 0 0 0;width: 100%;}
.analytics-box1{display: flex;justify-content: space-between;margin: 4rem 0 0 0;height: 19rem;width: 100%;}

.user-engagement{background-color: white;width: 35%;height: 100%;border-radius: 5px;box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);padding: 2rem;}
.user-engagement span, .keywords span {display: flex; justify-content: space-between;align-items: center;}
.keywords{background-color: white;width: 60%;height: 100%;border-radius: 5px;box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);padding: 2rem;}
.date-input{background-color: #F4F5F7;padding: .5rem;}
.ue-row1{display: flex;  width: 60%;font-size: 2rem;}
.ue-row2{display: flex; margin: 1rem 0 1rem 0;}
.ue-row3{display: flex;margin: 1rem 0 1rem 0;}
</style>

   