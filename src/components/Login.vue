<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'Login',
 
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref(''); 
    const password = ref('');
    const incorrectCredentials = ref(false);

    const login = async () => {
      try {
        const emailResponse = await fetch('https://ua-ai-llm.vercel.app/api/getEmailFromMongoDB');
        const emailData = await emailResponse.json();
        const storedEmail = emailData.email;

        const passwordResponse = await fetch('https://ua-ai-llm.vercel.app/api/getPasswordFromMongoDB');
        const passwordData = await passwordResponse.json();
        const storedPassword = passwordData.password;

        if (email.value && password.value) {
          if (email.value === storedEmail && password.value === storedPassword) {
            console.log('Login successful');
            await store.dispatch('login');
            console.log('isAuthenticated:', store.state.auth.isAuthenticated);

            router.push('/analytics');
          } else {
            console.log('Login failed');
            incorrectCredentials.value = true;
          }
        } else {
          console.log('Email and/or password are empty.');
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    return {
      email,
      password,
      incorrectCredentials,
      login,
    };
  },
};
</script>

<template>
  <div class="login-background">
    <div class="login-container">
      <header>
        <ul>
          <img class="logo" src="../assets/UA-Logo.png" alt="">
          <li>UA Virtual Assistant</li>
      </ul>
      </header>
      
        <form @submit.prevent="login" class="formcon">
          <h2><b>Welcome Back</b></h2>
          <div class="form-group">
            <label for="email">Email:</label><br>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label><br>
            <input type="password" id="password" v-model="password" required>
            <span v-if="incorrectCredentials" class="incorrect">Incorrect email or password</span>
          </div>
          <div class="form-group">
            <button class="login-button" type="submit">Login</button>
            <span class="forgot-pass">
              <a href="">Forgot password?</a>
            </span>
          </div>
        </form>
        
    </div>
    <div class="login-cover">
      <div class="login-img"></div>
    </div>
  </div>
</template>
  
<style scoped>
.login-background {
  height: 100vh;
  display: flex;
}
.login-cover {
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-img{
  width: 100%;
  height: 100%;
  background: url('../assets/12.png') no-repeat center center;
  background-size: cover;
}
.login-container {
  background-color: #fff;
  padding: 1.5rem;
  width: 40%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;    
  flex-direction: column;
}
.login-container header{
  height: 4rem;
  width: 100%;
}
.logo{
  height: 3rem;
}
.login-container header ul{
  display: flex;
  align-items: center;
}
.login-container header ul li{
  margin: 0 1rem 0 1rem;
  font-size: 1.2rem;
}
h2{
  text-align: center;
  font-size: 1.4rem;}
.forgot-pass{
  display: flex;
  flex-direction: end;
  width: 100%;
  padding: .5rem 0 .5rem 0;
}
form {
  display: flex;
  align-items: center;    
  flex-direction: column;
  width: 70%;
  padding: 5rem 0 5rem 0;
}
.formcon {
  text-align: left;
}
.form-group {
  margin-bottom: 10px;
  width: 100%;
}
 
input {
  width: 100%;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1.25rem .5rem 1.25rem .5rem;
  margin: .5rem 0 .5rem 0;
}
  
.login-button {
  width:100%;
  height: 40px;
  border-radius: 5px;
  background-color: #002366; 
  color: white;
  cursor: pointer;
  margin: .5rem 0 .5rem 0;
  transition: background-color 0.2s, transform 0.1s;
}

.login-button:hover{
  background-color: #003cff;

}
.incorrect {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
  