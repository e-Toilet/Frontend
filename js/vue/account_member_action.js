const app = new Vue({
    el: "#app",
    data: {
        account: {},
        account_info: {},
        comment: 0,
        password: "",
        checkpass: "",
    },
    created: () => {
        axios
            .get("http://140.115.87.117:8090/getMemberInfo?member_id=112")
            .then((response) => {
                result = JSON.parse(response.data.Memberinfo);
                app.account = result[0];
                //                console.log(result)
            });
        axios
            .get("http://140.115.87.117:8090/getMemberReviewCount?member_id=112")
            .then((response) => {
                result = JSON.parse(response.data.Review_count);
                app.comment = result;
                console.log(result);
            });
    },
    methods: {
        update_account: () => {
            console.log(app.account_info)
            axios
                .post("http://140.115.87.117:8090/updateMemberInfo", app.account_info)
                .then(() => {
                    // app.account
                    app.account[app.account_info.member_id - 1] = app.account_info;
                })
                .catch((error) => {
                    console.log()
                    alert("輸入錯誤")
                });
        }
    }
})
