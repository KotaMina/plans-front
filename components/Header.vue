<template>
    <header>
            <div id="header-left">
                <h1>{{this.title}}</h1>
            </div>
            <div id="header-center">
                <ul>
                    <li v-for="(menu,index) in this.$store.state.common.menuList" :key="index">
                        <nuxt-link :to="menu.path">{{menu.jpName}}</nuxt-link>
                    </li>
                </ul>
            </div>
            <div id="header-right">
            <Login />
            </div>
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
            errorList: []
        }
    },
    created(){
        if(this.$cookies.get('user') != null){
            this.$store.commit('common/logined');
            this.$store.state.common.user = this.$cookies.get('user');
            this.$store.state.common.authority = this.$cookies.get('user').authority;
        }else{
            this.$store.commit('common/logout');
            this.$store.state.common.user = {};
        }
        this.setMenuList();
    },
    computed:{
        ...mapState("common", ["user","authority", "isLogin", "menuList"])
    },
    methods:{
        //メニュー情報取得する。
        async setMenuList() {
            const res = await this.$axios.$post("http://localhost:8080/request/menu/", { authorityList: [this.$store.state.common.authority]})
            if(res.result == 0){
                this.$store.state.common.menuList = res.menuList;
            } else if(res.result == 1){
                this.errorList = res.errorList;
            }
        }
    }
}
</script>