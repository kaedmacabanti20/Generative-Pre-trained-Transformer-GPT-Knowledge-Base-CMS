<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import axios from 'axios';

export default {
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      baseUrl:'https://ua-ai-llm.vercel.app',
      // baseUrl: 'http://localhost:3000',
      session: null
    };
  },
  created() {
    const customId = this.$route.params.customId; // Use this.$route.params.customId to get the customId
    axios.get(this.baseUrl + '/api/getSessionDetails/' + customId)
      .then(response => {
        this.session = response.data;
      })
      .catch(error => {
        console.error('Error fetching session details:', error);
      });
  }
};
</script>

<template>
  <div class="navside">
    <Sidebar/>
    <Navbar/>
    <div class="container">
      <div class="content">
        <div class="session-details-box">
          <div class="session-details">
            <div v-for="message in session.details" :key="message._id.$oid" class="message">
              <div :class="[message.role === 'user' ? 'user-message' : 'bot-message']">
                <span class="roles"></span>
                <span class="message text-[15px] mx-[10px]" v-html="message.content"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  </div>
</template>
  
<style scoped>
.message-container-initial {margin-bottom: 1rem; margin-top:.6rem;}
.message-container {margin-bottom: 1rem;}
.user-message{display: flex; justify-content:flex-end;}
.user-message .message {background-color: #0084ff; padding: 0.5rem; border-radius: 0.5rem; color: white;}
.message{font-size: 15px; margin: 10px 10px;}
.bot-message{display: flex; justify-content: flex-start;}
.bot-message .message {background-color: #e4e6eb;padding: 0.5rem;border-radius: 0.5rem;color: black;}
</style>

