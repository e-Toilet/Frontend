const app = new Vue({
  el: "#app",
  data: {
    members: [],
    member_info: {},
    isEmailLegal: false,
    isPasswordLegal: false,
  },
  created: () => {
    axios.get("https://etoilet.ddns.net:8090/getAllMember").then((response) => {
      result = JSON.parse(response.data.Memberinfo);
      app.members = result;
    });
  },
  methods: {
    delete_member: (memberobj) => {
      let member_id = memberobj.member_id;
      let member_name = memberobj.name;
      let membersArray = app.members;

      swal({
        title: `Sure to delete User: ${member_name}?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((response) => {
        if (response) {
          axios
            .post("https://etoilet.ddns.net:8090/updateMemberStatus", {
              member_id: member_id,
              status: 0,
            })
            .then(() => {
              let deleted_obj_index = membersArray.indexOf(memberobj);
              console.log(deleted_obj_index);
              if (deleted_obj_index > -1)
                membersArray.splice(deleted_obj_index, 1);
              swal({
                title: `${member_name} delete successfully`,
                icon: "success",
              });
            })
            .catch((error) => {
              swal({
                title: "Encounter error message",
                text: error,
                icon: "error",
              });
            });
        } else {
          swal({
            title: "Cancel",
            icon: "error",
          });
        }
      });
    },
    update_member: () => {
      axios
        .post("https://etoilet.ddns.net:8090/updateMemberInfo", app.member_info)
        .then(() => {
          swal({
            title: "Member update Successfully",
            icon: "success",
          }).then(function () {
            self.location.reload();
        });
        })
        .catch((error) => {
          swal({
            title: "Encounter error message",
            text: error,
            icon: "error",
          });
        });
    },
    SendMemberInfo: (memberobj) => {
      app.member_info = memberobj;
      app.checkIFEmailLegal();
      app.checkIFPasswordLegal();
    },
    checkIFEmailLegal: () => {
      app.isEmailLegal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        app.member_info.email
      );
    },
    checkIFPasswordLegal: () => {
      app.isPasswordLegal = app.member_info.password.length >= 6;
    },
    upgrade_member_to: (member_name, member_id, set_member_status) => {
      swal({
        title: `Sure to turn User: ${member_name} into ${
          set_member_status == 1 ? "member" : "admin"
        }?`,
        icon: "info",
        buttons: true,
        dangerMode: false,
      }).then((response) => {
        if (response) {
          axios
            .post("https://etoilet.ddns.net:8090/updateMemberStatus", {
              member_id: member_id,
              status: set_member_status,
            })
            .then(() => {
              swal({
                title: `Member is now ${
                  set_member_status == 1 ? "member" : "admin"
                }`,
                icon: "success",
              }).then(function () {
                self.location.reload();
              });
            })
            .catch((error) => {
              swal({
                title: "Encounter error message",
                text: error,
                icon: "error",
              });
            });
        } else {
          swal({
            title: "Cancel",
            icon: "error",
          });
        }
      });
    },
  },
});
