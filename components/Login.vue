<template>
    <div class="outer_login">
        <template v-if="!this.$store.state.common.isLogin">
            <div class="inner_login">
                <template v-if="!this.isEnterUserId">
                    <input v-model="userId" type="text" placeholder="ユーザーIDを入力ください。" />
                    <p v-if="errorList != null && errorList.length > 0">{{this.errorList[0].message}}</p>
                    <button type="button" v-on:click="enterUserId">次へ</button>
                </template>
                <template v-if="this.isEnterUserId">
                    <button type="button" v-on:click="backEnterUserId">{{this.userId}}</button>
                    <input v-model="password" type="password"  placeholder="パスワードを入力ください。" />
                    <p v-if="errorList != null && errorList.length > 0">{{this.errorList[0].message}}</p>
                    <button type="button" v-on:click="login">Login</button>
                </template>
            </div>
        </template>
        <template v-if="this.$store.state.common.isLogin">
            <div class="inner_login">
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
            isEnterUserId: false,
            errorList: []
        }
    },
    computed:{
        ...mapState("common",["user","isLogin","menuList","authority"])
    },
    methods: {
        async login(){
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
                    const setCached = { userId: this.userId, isLogin: true, authority: res.authority };
                    this.$store.state.common.authority = res.authority;
                    this.$store.state.common.user = setCached;
                    this.$cookies.set("user", setCached)
                    const menures = await this.$axios.$post("http://localhost:8080/request/menu/", {authorityList: [this.$store.state.common.authority]})
                    if(menures.result == 0){
                        this.$store.state.common.menuList = menures.menuList;
                    } else if(menures.result == 1){
                        this.errorList = menures.errorList;
                    }
                }
            }
        },
        async logout(){
            this.$cookies.remove("user");
            this.$store.commit('common/logout');
            this.$store.state.common.user = {};
            this.$store.state.common.authority = "000";
            this.isEnterUserId = false;
            const menures = await this.$axios.$post("http://localhost:8080/request/menu/", {authorityList: [this.$store.state.common.authority]})
            if(menures.result == 0){
                this.$store.state.common.menuList = menures.menuList;
            } else if(menures.result == 1){
                this.errorList = menures.errorList;
            }
        },
        isNotNull(params){
            return params != null && params != "";
        },
        enterUserId(){
            if(!this.isNotNull(this.userId)){
                const err = {message: "ユーザーIDを入力してください。"}
                this.errorList = []
                this.errorList.push(err)
            } else{
                this.errorList = []
                this.isEnterUserId = true;
            }
        },
        backEnterUserId(){
             this.errorList = []
             this.isEnterUserId = false;
        }
    }
}
</script>