const app = new Vue({
    el: '#app',
    data: {
        email: "",
        password: "",
        name: "",
        isRegistered: false,
        account: [],
        comment: "",
        loginFrom: {
            useremail: "",
            pass: ""
        },
        accountInfo: []
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getMemberInfo?member_id=112')
            .then((response) => {
                result = JSON.parse(response.data.Memberinfo)
                app.account = result
                //                console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getMemberReviewCount?member_id=112')
            .then((response) => {
                result = JSON.parse(response.data.Review_count)
                app.comment = result
                console.log(result)
            })
    },
    methods: {
        checkForm: function (e) {
            let checkIsInputedAndLegal = this.email && this.validEmail(this.email) && this.password && this.validPassword(this.password) && this.name
            if (checkIsInputedAndLegal) {
                axios.post('http://140.115.87.117:8090/Register', {
                        email: app.email,
                        password: app.password,
                        name: app.name
                    })
                    .then((response) => {
                        result = response.data
                        alert("註冊成功")
                        self.location.reload()
                    })
                    .catch((error) => {
                        alert("註冊失敗！此信箱已存在，請嘗試新的信箱！")
                    })
            }
            if (!this.name) {
                alert('Name欄位為必填.');
            }
            if (!this.password) {
                alert('Password欄位為必填.');
            } else if (!this.validPassword(this.password)) {
                alert('Password格式不符合');
            }
            if (!this.email) {
                alert('Email欄位為必填.');
            } else if (!this.validEmail(this.email)) {
                alert('請輸入有效的Email.');
            }
            e.preventDefault();
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPassword: function (password) {
            var re = /[A-Za-z0-9]{6,}/;
            return re.test(password);
        },
        login: function () {
            console.log(this.loginFrom.useremail)
            console.log(this.loginFrom.pass)
            let checkLogin = this.loginFrom.useremail && this.validEmail(this.loginFrom.useremail) && this.loginFrom.pass && this.validPassword(this.loginFrom.pass)
            if (checkLogin) {
                axios.post('http://140.115.87.117:8090/Signin', {
                        email: app.loginFrom.useremail,
                        password: app.loginFrom.pass
                    })
                    .then((response) => {
                        axios.get('http://140.115.87.117:8090/getAllMember')
                            .then((response) => {
                                result = JSON.parse(response.data.Memberinfo)
                                app.accountInfo = result
                            });
                        result = response.data;
                        alert("登入成功");
                        location.href = `index.html`;
                    })
                    .catch(() => {
                        alert("登入失敗！請再輸入一次信箱密碼");
                    });
            }
            if (!this.loginFrom.useremail) {
                alert('Email欄位為必填.');
            } else if (!this.validEmail(this.loginFrom.useremail)) {
                alert('請輸入有效的Email.');
            }
            if (!this.loginFrom.pass) {
                alert('Password欄位為必填.');
            } else if (!this.validPassword(this.loginFrom.pass)) {
                alert('Password格式不符合');
            }
        }
    }
})
