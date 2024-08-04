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
      localUrl:'http://localhost:3000',
      input: '',
      isLoading: false,
      error: null,
      message: null,
      messageUser: null,
      uiData: {},
      conv:[]
    };
  },
  mounted() {
    axios.get(this.baseUrl+'/api/getImageFromMongoDB')
        .then(response => {
            const imageName = response.data.Image || 'stacy.png'; 
            const imageSrc = `/${imageName}`;

            console.log(imageSrc);
            
            this.loadImage(imageSrc);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
  },
  methods: {
    loadImage(src) {
            const img = new Image();
            img.onload = () => {
                this.$refs.profileImage.src = src;
            };
            img.onerror = () => {
                console.error('Error loading image:', src);
            };
            img.src = src;
        },
    
     async fetchData() {
      this.isLoading = true;
  
      const options = {
        method: "POST",
        body: JSON.stringify({
          messages: this.input
        }), 
        headers: {
          "Content-Type": "application/json"
        }
      };
      try {
        const response = await fetch(this.localUrl+'/completions', options);
        const data = await response.json();
        const conMessage = data.choices[0].message;

        console.log("Testing")

        this.messageUser = { role: "user", content: this.input};
        this.message = { role: conMessage.role, content: conMessage.content};
        this.input = ' '
        this.conv.push(this.messageUser, this.message);
       
 
        // console.log(this.conv) 
      } catch (error) {
        this.error = 'An error occurred while fetching data.';
      } finally {
        this.isLoading = false;
      }
    },
 
    saveData(){
        console.log(messageUser)
        console.log(message)
    }
  }
};
</script>

<template>
<div class="navside">
  <Navbar/>
  <Sidebar/>
  <div class="container">
    <div class="content">
      <div class="chatcontainer w-[100%]  flex justify-center">
      <div class="flex flex-col w-[100%] ">
      <!-- CHAT CONTAINERS -->
        <div class=" flex justify-center ">
            <!-- render all messages in the conv array -->
          <div class="messagecontainer flex flex-col flex-grow justify-start w-[100%] py-[2rem]">

            <div v-for="(message, index) in conv" :key="index" class="message-container">
              <div :class="[message.role === 'user' ? 'flex user-message user-container justify-end text-right' : 'flex bot-message justify-start text-left']">
                <span class="role"></span>
                <span class="message text-[15px] mx-[10px]" v-html="message.content"></span>
              </div>
            </div>

            <div v-if="isLoading" class="loading-message text-black flex">
              <span class="role"> 
                <!-- <img class="h-[2.5rem]" src="../assets/profile.png" alt=""> -->
                <img class="profile-img h-[2.5rem]" ref="profileImage" alt="">
              </span>
              <div class="loading-box">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>

          </div>
        </div>
      <div class="w-[100%] h-[4rem]"></div>
    </div>

        <!-- INPUT CONTAINER  -->
      <div class="inputcontainer pt-[1rem] pb-[2rem]  flex justify-center w-[80%] bg-[#eef5f9] ">
        <div class="shadow-2xl  w-[85%] bg-white  ">
          <input  class="w-[95%]  p-[.7rem] focus:border-transparent focus:outline-none focus:ring-0 placeholder-gray" placeholder="Input question here" type="text" v-model="input" @keyup.enter="fetchData" >
          <button  class="w-[5%] " type="submit" @click="fetchData" ><i class="fa-solid fa-paper-plane text-[gray]"></i> </button>
        </div>
      </div>
    </div>

    </div>
  </div>
</div>
</template>

<style >
.inputcontainer{position: fixed;bottom: 0;}

.message-container-initial {margin-bottom: 1rem; margin-top:.6rem;}
.message-container {margin-bottom: 1rem;}
.user-message{display: flex; justify-content:flex-end;}
.user-message .message {background-color: #0084ff; padding: 0.5rem; border-radius: 0.5rem; color: white;}
.message{font-size: 15px; margin: 10px 10px;}
.bot-message{display: flex; justify-content: flex-start;}
.bot-message .message {background-color: #e4e6eb;padding: 0.5rem;border-radius: 0.5rem;color: black;}
 
/* ////////////// */
.loading-box {width: 50px;height: 30px;display: flex;align-items: center;justify-content: center;background-color: #f0f0f0;border: 1px solid #ccc;overflow: hidden;border-radius: 25px;border: none;margin: .5rem 10px .5rem 10px;}
.dot-container {display: flex;align-items: center;justify-content: center;}

.dot{width: 5px;height: 5px;background-color: #8c9095;border-radius: 50%;margin: 0 3px;animation: jump 1s infinite alternate;}
.dot:nth-child(2) {animation-delay: 0.2s;}
.dot:nth-child(3) {animation-delay: 0.4s;}
@keyframes jump {0%, 100% {transform: translateY(0);}50% {transform: translateY(-5px);}}

@media screen and (max-width: 770px){
.chatcontainer{
  width: 100vw;
  margin: 0;  
}

.inputcontainer{
    width: 100vw;
    margin: 0;
}

.inputcontainer div{
  width: 80%;}
}
</style>

