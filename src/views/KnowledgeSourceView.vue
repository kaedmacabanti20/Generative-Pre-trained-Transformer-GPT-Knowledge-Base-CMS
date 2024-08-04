<script>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import axios from 'axios';

export default {
  components: {
    Sidebar,
    Navbar,
  },
    data() {
      return {
        baseUrl:'https://ua-ai-llm.vercel.app',
        classify: '',
        faq: '',
        about: '', 
        admissions: '', 
        academics: '', 
        date_events: '', 
        classTokens: 0,
        faqTokens: 0,
        aboutTokens: 0,
        admTokens: 0,
        acadTokens: 0,
        dateEventsTokens: 0,
      }
    },
    mounted() {
      axios
      .get(this.baseUrl+'/api/getClassifierFromMongoDB')
      .then(response => {
        if (response.data && response.data.classifier) {
          this.classTokens = response.data.classifier.length;
        } else {
          console.error('Invalid API response for classTokens:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching classifier tokens:', error);
      });

      axios
      .get(this.baseUrl+'/api/getFaQFromMongoDB')
      .then(response => {
        if (response.data && response.data.faq) {
          this.faqTokens = response.data.faq.length;
        } else {
          console.error('Invalid API response for faqTokens:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching faqTokens:', error);
      });

      axios
      .get(this.baseUrl+'/api/getAboutUAFromMongoDB')
      .then(response => {
        if (response.data && response.data.about) {
          this.aboutTokens = response.data.about.length;
        } else {
          console.error('Invalid API response for aboutTokens:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching aboutUA tokens:', error);
      });

      axios
      .get(this.baseUrl+'/api/getAdmissionsFromMongoDB')
      .then(response => {
        if (response.data && response.data.admissionInfo) {
          this.admTokens = response.data.admissionInfo.length;
        } else {
          console.error('Invalid API response for admTokens:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching admission tokens:', error);
      });

      axios
      .get(this.baseUrl+'/api/getacadFromMongoDB')
      .then(response => {
        if (response.data && response.data.acads) {
          this.acadTokens = response.data.acads.length;
        } else {
          console.error('Invalid API response for acadTokens:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching admission tokens:', error);
      });

      axios
      .get(this.baseUrl+'/api/getDateEventsFromMongoDB')
      .then(response => {
        if (response.data && response.data.dateEvents) {
          this.dateEventsTokens = response.data.dateEvents.length;
        } else {
          console.error('Invalid API response for dateEventsTokens:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching admission tokens:', error);
      });
      

      axios
      .get(this.baseUrl+'/api/getClassifierNameFromMongoDB')
      .then(response => {
        console.log('ClassifierName API Response:', response.data);
        if (response.data && response.data.name) {
          this.classify = response.data.name;
        } else {
          console.error('Invalid API response for ClassifierName:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching ClassifierName:', error);
      });

      axios
      .get(this.baseUrl+'/api/getClassNameFromMongoDB/frequently_asked')
      .then(response => {
        if (response.data && response.data.name) {
          this.faq = response.data.name;
        } else {
          console.error('Invalid API response for FAQ:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching FAQ:', error);
      });

      axios
      .get(this.baseUrl+'/api/getClassNameFromMongoDB/about_ua')
      .then(response => {
        if (response.data && response.data.name) {
          this.about = response.data.name;
        } else {
          console.error('Invalid API response for about:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching about:', error);
      });

      axios
      .get(this.baseUrl+'/api/getClassNameFromMongoDB/admissions')
      .then(response => {
        if (response.data && response.data.name) {
          this.admissions = response.data.name;
        } else {
          console.error('Invalid API response for admissions:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching admissions:', error);
      });

      axios
      .get(this.baseUrl+'/api/getClassNameFromMongoDB/academics')
      .then(response => {
        if (response.data && response.data.name) {
          this.academics = response.data.name;
        } else {
          console.error('Invalid API response for academics:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching academics:', error);
      });

      axios
      .get(this.baseUrl+'/api/getClassNameFromMongoDB/date_events')
      .then(response => {
        if (response.data && response.data.name) {
          this.date_events = response.data.name;
        } else {
          console.error('Invalid API response for date_events:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching academics:', error);
      });
    },
  }
</script>

<template>
<div class="navside">
  <Navbar/>
  <Sidebar/>
  <div class="container">

    <div class="content">

    <div class="box">
      <h2 class="box-heading"><b>Classifier</b></h2>
      <div class="box-content">
        <table>
        <thead>
          <tr>
            <th width="10%">No.</th>
            <th width="20%">Tokens</th>
            <th width="50%">Label</th>
            <th width="20%"> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td >1.</td>
            <td >{{ classTokens }}</td>
            <td >{{ classify }}</td>
            <td class="details-btn-td"><button class="secondary-button"><RouterLink to="/knowledge-source/main/classifier">Edit</RouterLink></button></td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
    

    <div class="box">
      <h2 class="box-heading"><b>Knowledge Base</b></h2>
      <div class="box-content">
        <table>
          <thead>
            <tr>
                <th width="20%">Tokens.</th>
                <th width="20%">Code.</th>
                <th width="40%">Label</th>
                <th width="20%" > </th>
             </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ faqTokens }}</td>
              <td>one_111</td>
              <td>{{ faq }}</td>
              <td class="details-btn-td"><button class="secondary-button"><RouterLink to="/knowledge-source/frequently_asked">Edit</RouterLink></button></td>
            </tr>
            <tr>
               <td>{{ aboutTokens }}</td>
              <td>two_222</td>
              <td>{{ about }}</td>
              <td class="details-btn-td"><button class="secondary-button"><RouterLink to="/knowledge-source/about">Edit</RouterLink></button></td>
            </tr>
            <tr>
               <td>{{ admTokens }}</td>
              <td>three_333</td>
              <td>{{ admissions }}</td>
              <td class="details-btn-td"><button class="secondary-button"><RouterLink to="/knowledge-source/admissions">Edit</RouterLink></button></td>
            </tr>
            <tr>
              <td>{{ acadTokens }}</td>
              <td>four_444</td>
              <td>{{ academics }}</td>
              <td class="details-btn-td"><button class="secondary-button"><RouterLink to="/knowledge-source/academics">Edit</RouterLink></button></td>
            </tr>
            <tr>
              <td>{{ dateEventsTokens }}</td>
              <td>five_555</td>
              <td>{{ date_events }}</td>
              <td class="details-btn-td"><button class="secondary-button"><RouterLink to="/knowledge-source/date_events">Edit</RouterLink></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
 
 
  </div>

  </div>
</div>
</template>

<style scoped>
</style>
