<template>
    <div id="login_form">
        <input v-model="userId" type="text" placeholder="ユーザーIDを入力ください。" />
        <input v-model="password" type="password"  placeholder="パスワードを入力ください。" />
         <button type="button" v-on:click="login">Login</button>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex"

export default {

    data(){
        return {
            userId: "",
            password: "",
            errorList: [],
        }
    },
    computed:{
        ...mapState("common",["userId","isLogin"])
    },
    methods: {
        async login(){
            const res = await this.$axios.$post("http://localhost:8080/login/", { userId: this.userId, password: this.password });
            if(res.result == 1){
                this.errorList = res.errorList;
            }else if(res.result==0){
                this.$store.commit('common/logined');
                this.$store.state.common.userId = this.userId;
            }
        }
    }
}
</script>