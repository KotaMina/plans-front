export const state = () => ({
    userId: "",
    authority: "000",
    isLogin: false,
})

export const mutations = {
    logined(state){
        state.isLogin = true;
    },
}