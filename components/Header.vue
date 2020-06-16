<template>
    <header>
            <div id="header-left">
                <nuxt-link to="/">
                <h1>{{this.title}}</h1>
                </nuxt-link>
            </div>
            <div id="header-center">
                <ul>
                    <li v-for="(menu,index) in this.$store.state.common.menuList" :key="index">
                        <nuxt-link :to="menu.path">{{menu.jpName}}</nuxt-link>
                    </li>
                </ul>
            </div>
            <div id="header-right">
                <nuxt-link to="/login">
                ログイン画面
                </nuxt-link>
            </div>
    </header>
</template>
<script>
import {mapState, mapMutations, mapGetters} from "vuex"

export default {
    data(){
        return{
            title: "plans"
        }
    },
    created(){
        if(this.$cookies.get('user') != null){
            this.$store.commit('common/logined');
            this.$store.state.common.user = this.$cookies.get('user');
            this.$store.state.common.authority = this.$cookies.get('user').authority;
            //再度cookiesの保存期間を３日間にリセットする。
            this.$cookies.set("user", this.$store.state.common.user, { maxAge: 60 * 60 * 24 * 3 })
        }else{
            this.$store.commit('common/logout');
            this.$store.state.common.user = {};
        }
        this.setMenuList();
    },
    computed:{
        ...mapState("common", ["user","authority", "isLogin", "menuList", "errorList"])
    },
    methods:{
        //メニュー情報取得する。
        async setMenuList() {
            const res = await this.$axios.$post("/api/menu/", { authorityList: [this.$store.state.common.authority]})
            if(res.result == 0){
                this.$store.state.common.menuList = res.menuList;
            } else if(res.result == 1){
               this.$store.state.common.errorList = res.errorList;
            }
        }
    }
}
</script>
<style lang="scss">

</style>