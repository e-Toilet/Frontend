const app = new Vue({
  el: "#app",
  data: {
    account: {},
    account_info: {
      name: "",
      email: "",
      password: "",
      member_id: 112,
    },
    comment: 0,
    password: "",
    checkpass: "",
  },
  created: () => {
    let member_id = `; ${document.cookie}`
      .split("; member_id=")
      .pop()
      .split(";")
      .shift();
    axios
      .get(`https://etoilet.ddns.net:8090/getMemberInfo?member_id=${member_id}`)
      .then((response) => {
        result = JSON.parse(response.data.Memberinfo);
        app.account = result[0];
        app.account_info.name = app.account.name;
        app.account_info.email = app.account.email;
        app.account_info.password = app.account.password;
      });
    axios
      .get(
        `https://etoilet.ddns.net:8090/getMemberReviewCount?member_id=${member_id}`
      )
      .then((response) => {
        result = JSON.parse(response.data.Review_count);
        app.comment = result;
        console.log(result);
      });
  },
  methods: {
    update_account: () => {
      console.log(app.account_info);
      let checkupdate =
        app.validEmail(app.account_info.email) &&
        app.validPassword(app.account_info.password);
      if (checkupdate) {
        axios
          .post(
            "https://etoilet.ddns.net:8090/updateMemberInfo",
            app.account_info
          )
          .then(() => {
            swal({
              title: "修改成功",
              icon: "success",
            }).then(function () {
              self.location.reload();
            });
            // app.account
            app.account[app.account_info.member_id - 1] = app.account_info;
          })
          .catch((error) => {
            console.log();
            swal({
              title: "修改失敗",
              icon: "error",
            });
          });
      }
      if (!app.validEmail(app.account_info.email)) {
        alert("請輸入有效的Email");
      }
      if (!app.validPassword(app.account_info.password)) {
        alert("Password格式不符合，需要超過6位之字母或數字");
      }
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPassword: function (password) {
      var re = /[A-Za-z0-9]{6,}/;
      return re.test(password);
    },
  },
});
