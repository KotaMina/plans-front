<template>
    <header>
            <div id="header-left">
                <h1>{{this.title}}</h1>
            </div>
            <div id="header-right">
                <ul>
                    <li v-for="(menu,index) in menuList" :key="index">
                        <nuxt-link :to="menu.path">{{menu.jpName}}</nuxt-link>
                    </li>
                </ul>
            </div>
            <Login />
    </header>
</template>
<script>
import Login from '~/components/Login.vue'
import {mapState, mapMutations, mapGetters} from "vuex"

export default {
    components: {
        Login
    },
    data(){
        return{
            title: "plans",
            menuList: [],
            errorList: [],
            authority: "000",
            user: this.$cookies.get('user')
        }
    },
    created(){
        this.setMenuList();
        if(this.user != null){
            this.$store.state.common.isLogin = this.user.isLogin
            this.$store.state.common.userId = this.userId;
        }
    },
    methods:{
        //store
        ...mapState("common", ["userId","authority", "isLogin"]),

        //メニュー情報取得する。
        async setMenuList() {
            const query = { authorityList: [this.authority]};
            const res = await this.$axios.$post("http://localhost:8080/request/menu/", {data: query})
            if(res.result == 0){
                this.menuList = res.menuList;
            } else if(res.result == 1){
                this.errorList = res.errorList;
            }
        }
    }
}
</script>