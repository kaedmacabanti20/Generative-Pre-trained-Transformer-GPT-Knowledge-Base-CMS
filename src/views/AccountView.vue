<script>
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      baseUrl:'https://ua-ai-llm.vercel.app',
    };
  },
  setup() {
    const currentEmail = ref('');
    const newEmail = ref('');
    const confirmemail = ref('');
    const currentPassword = ref('');
    const newPass = ref('');
    const confirmpass = ref('');
    const emailError = ref('');
    const passwordError = ref('');

    const store = useStore();
    const router = useRouter();

    const updateInfo = async () => {
      emailError.value = '';
      passwordError.value = '';

      if (newEmail.value && !isValidEmail(newEmail.value)) {
        emailError.value = 'Please enter a valid email address.';
        return;
      }

      if (newPass.value && !isValidPassword(newPass.value)) {
        passwordError.value = 'Password must contain both uppercase and lowercase letters, at least one number, and at least one special character.';
        return;
      }

      try {
        const response = await fetch(this.baseUrl+'/api/updateAccount', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentEmail: currentEmail.value,
            newEmail: newEmail.value,
            confirmemail: confirmemail.value,
            currentPassword: currentPassword.value,
            newPass: newPass.value,
            confirmpass: confirmpass.value,
          }),
        });

        if (response.ok) {
          currentEmail.value = '';
          newEmail.value = '';
          confirmemail.value = '';
          currentPassword.value = '';
          newPass.value = '';
          confirmpass.value = '';

        } else {
          const data = await response.json();

          if (data.error) {
            if (data.error === 'Invalid email or password') {
              emailError.value = data.error;
              passwordError.value = data.error;
            } else {
              emailError.value = data.error;
            }
          }
        }
      } catch (error) {
        console.error('Error updating account:', error);
      }
    };

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function isValidPassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      return passwordRegex.test(password);
    }

    const logout = async () => {
      try {
        if (store) {
          await store.dispatch('logout');
          console.log('isAuthenticated:', store.state.auth.isAuthenticated);
        } else {
          console.error('Store is not available.');
        }

        if (router) {
          router.push('/');
        } else {
          console.error('Router is not available.');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };


    return {
      currentEmail,
      newEmail,
      confirmemail,
      currentPassword,
      newPass,
      confirmpass,
      emailError,
      passwordError,
      updateInfo,
      logout,
    };
  },
};
</script>

<template>
<div class="navside">
  <Navbar/>
  <Sidebar/>
  <div class="container">
    <div class="content">
      <div class="box">
        <h1 class="box-heading"><b>Account</b></h1>
        <div class="accountInfo">
          <div class="emailcon">
            <label for="email">Email:</label><br>
            <input placeholder="Email" class="input-box" v-model="currentEmail" type="email" id="email" name="email" required><br><br>
            <label for="newemail">New Email:</label><br>
            <input placeholder="New email" class="input-box" v-model="newEmail" type="email" id="newemail" name="newemail"><br><br>
            <label for="emailconfirm">Re-Enter New Email:</label><br>
            <input placeholder="Re-enter new email" class="input-box" v-model="confirmemail" type="email" id="emailconfirm" name="emailconfirm"><br><br>
            <span class="error-message" v-if="emailError">{{ emailError }}</span>
          </div>
          <div class="passcon">
            <label for="password">Password:</label><br>
            <input placeholder="Password" class="input-box" v-model="currentPassword" type="password" id="password" name="password" required><br><br>
            <label for="newpass">New Password:</label><br>
            <input placeholder="New password" class="input-box" v-model="newPass" type="password" id="newpass" name="newpass"><br><br>
            <label for="passconfirm">Re-Enter New Password:</label><br>
            <input placeholder="Re-enter new password" class="input-box" v-model="confirmpass" type="password" id="passconfirm" name="passconfirm"><br><br>
            <span class="error-message" v-if="passwordError">{{ passwordError }}</span>
          </div>
        </div>
      </div>
      <div class="bot">
        <button class="secondary-button-save" @click="updateInfo">Save Changes</button>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.accountInfo {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.bot{
  display: flex;
  justify-content: right;
 }

 .emailcon, .passcon{
   width: 48%;
 }
.items {
  margin-right: 5%;
  width: 550px;
}

input{
  width: 100%;
  height: 20px;
  margin-bottom: -10px;
}
</style>

 
