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
      Label: '',
      Content: '',
    };
  },
  mounted() {
    axios
      .get(this.baseUrl+'/api/getClassifierNameFromMongoDB')
      .then(response => {
        console.log('ClassifierName API Response:', response.data);
        if (response.data && response.data.name) {
          this.Label = response.data.name;
          this.$nextTick(() => {
          this.adjustTextarea();
        });
        } else {
          console.error('Invalid API response for ClassifierName:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching ClassifierName:', error);
      });
  
    axios
      .get(this.baseUrl+'/api/getClassifierFromMongoDB')
      .then(response => {
        if (response.data && response.data.classifier) {
          this.Content = response.data.classifier; 
        } else {
          console.error('Invalid API response for Classifier:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching Classifier:', error);
      });
  },
  methods: {
    adjustTextarea() {
      const textarea = this.$refs.contentTextarea;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    },
    async updateInfo() {
  try {
    const updateData = {};

    if (this.Label.trim() !== '') {
      updateData.name = this.Label;
    }

    if (this.Content.trim() !== '') {
      updateData.classifier = this.Content;
    }

    if (Object.keys(updateData).length > 0) {
      const response = await axios.put(this.baseUrl+'/api/updateClassifier', updateData);

      console.log('information updated successfully:', response.data);
    } else {
      console.log('No fields to update.');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    }
  },
  }
};
</script>

<template>
<div class="navside">
  <Navbar/>
  <Sidebar/>
  <div class="container">
    <div class="content">
      <div class="box">
        <h2 class="box-heading"><b>Information</b></h2>
        <div>
          <label for="name">Label</label><br>
          <input placeholder="Information label" class="input-box" v-model="Label" type="text" id="name" name="name"><br><br>
          <label for="role-and-personality">Enter Information here</label><br>
          <textarea placeholder="Information content" class="text-area" v-model="Content" ref="contentTextarea"
            @input="adjustTextarea" cols="30" rows="10"></textarea><br><br>
        </div>
      </div>
      <div class="bot">
        <button class="secondary-button-save" @click="updateInfo">Save Changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

.bot{
  display: flex;
  justify-content: right;
}

input{
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
}
</style>

 