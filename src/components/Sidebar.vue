<script>
import axios from 'axios';

export default {
    name: 'Sidebar',
    data() {
        return {
            Name: '',
            baseUrl:'https://ua-ai-llm.vercel.app',
            imageSrc: '', // Define imageName here
        };
    },
    mounted() {
        axios.get(this.baseUrl+'/api/getNameFromMongoDB')
        .then(response => {
            this.Name = response.data.Name;
        })
        .catch(error => {
            console.error('Error fetching Name:', error);
            console.log('Response status:', error.response ? error.response.status : 'N/A');
            console.log('Response data:', error.response ? error.response.data : 'N/A');
        });

        axios.get(this.baseUrl+'/api/getImageFromMongoDB')
            .then(response => {
                const imageName = response.data.Image || 'stacy.png'; 
                const imageSrc = `/${imageName}`;
                this.imageSrc = imageSrc;
 
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
    },
};
</script>

<template>
    <div class="sidebar">
        <div class="sidebar-heading">
            <div class="profile-img-cont">
                <img :class="[imageSrc === '/UA-Logo.png' ? 'profile-img-ua-logo' : 'profile-img']" ref="profileImage" alt="">
             </div>
            <b class="name">{{ Name }}</b>
        </div>
        
        <p>Main</p>
        <nav class="sidebar-nav">
            
            <RouterLink to="/testing" :class="['router-link', { 'selected': $route.path === '/testing' }]">
                <div class="link-content">
                    <i class="fa-solid fa-comment"></i>
                    Testing
                </div>
            </RouterLink>
            <RouterLink to="/analytics" :class="['router-link', { 'selected': $route.path === '/analytics' }]">
                <div class="link-content">
                    <i class="fa-solid fa-chart-simple"></i>
                    Analytics
                </div>
            </RouterLink>
            <RouterLink to="/chatbot-settings" :class="['router-link', { 'selected': $route.path === '/chatbot-settings' }]">
                <div class="link-content">
                    <i class="fa-solid fa-gear"></i>
                    Chatbot Settings
                </div>
            </RouterLink>
            <RouterLink to="/knowledge-source" :class="['router-link', { 'selected': $route.path === '/knowledge-source' }]">
                <div class="link-content">
                    <i class="fa-solid fa-sitemap"></i> 
                    Knowledge Source
                </div>
            </RouterLink>
           
          
        </nav>
    </div> 
</template>

<style scoped>
.sidebar {position: fixed; left: 0;top: 4rem;z-index: 50;background-color: white;box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);height: calc(100vh - 4rem);width: 275px;transition: top 0.3s;padding:2rem;color: rgb(70, 70, 70);font-size: 1rem;}
.sidebar p{
    margin: 20px 10px 20px 10px;
}
.sidebar-heading{
    display: flex;
    align-items: center;
}
.profile-img-cont{
  height: 65px; width: 70px;
  background-color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 2px rgba(37, 37, 37, 0.5);
}
.profile-img{
 height: 55px;    
}

.name{
    font-size: 1.2rem;
}
.sidebar-heading .name{
    margin: 0 10px 0 10px;
}
.router-link {
    text-decoration: none;
    transition: background-color 0.3s, font-weight 0.3s;
}
.router-link.selected {
    font-weight: bold;
    background-color: #E6E9EB;
}
.link-content {
    display: flex;
    align-items: center;
    padding: 10px ;
}
.link-content i{padding: 0 12px 0 0;}
</style>



