<template>
    <div id="login_form">
        <template v-if="!this.$store.state.common.isLogin">
            <div class="login">
                <input v-model="userId" type="text" placeholder="ユーザーIDを入力ください。" />
                <input v-model="password" type="password"  placeholder="パスワードを入力ください。" />
                <button type="button" v-on:click="login">Login</button>
                <p v-if="errorList != null && errorList.length > 0">{{this.errorList[0].message}}</p>
            </div>
        </template>
        <template v-if="this.$store.state.common.isLogin">
            <div class="logined">
                    <button type="button" v-on:click="logout">ログアウト</button>
            </div>
        </template>
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
        ...mapState("common",["user","isLogin"])
    },
    methods: {
        async login(){
            if(!this.isNotNull(this.userId)){
                const err = {message: "ユーザーIDを入力してください。"}
                this.errorList = []
                this.errorList.push(err)
            }
            if(!this.isNotNull(this.password)){
                const err = {message: "パスワードを入力してください。"}
                this.errorList = []
                this.errorList.push(err)
            }
            if(this.isNotNull(this.userId) && this.isNotNull(this.password)){
                const res = await this.$axios.$post("http://localhost:8080/login/", { userId: this.userId, password: this.password });
                if(res.result == 1){
                    this.errorList = res.errorList;
                }else if(res.result==0){
                    this.$store.commit('common/logined');
                    const setCached = { userId: this.userId, isLogin: true};
                    this.$store.state.common.user = setCached;
                    this.$cookies.set("user", setCached)
                }
            }
        },
        logout(){
            this.$cookies.remove("user");
            this.$store.commit('common/logout');
            this.$store.state.common.user = {};
        },
        isNotNull(params){
            return params == null || params == "" ? false : true;
        }
    }
}
</script>